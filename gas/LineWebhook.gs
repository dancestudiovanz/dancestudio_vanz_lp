/**
 * LINE Messaging API Webhook
 *
 * @deprecated LINE投稿は廃止しました。投稿はスプレッドシートから行ってください。
 * doPost は無効化されており、このファイルは参照用に残しています。
 */

var POST_WAIT_MS = 3000;

function processLineWebhook_(body, signature) {
  if (!isLineWebhookBody_(body)) {
    saveWebhookDebug_('エラー: LINE Webhook 形式ではありません');
    return ContentService.createTextOutput('Bad Request').setMimeType(ContentService.MimeType.TEXT);
  }

  if (signature) {
    if (!verifyLineSignature_(body, signature)) {
      saveWebhookDebug_('エラー: 署名検証失敗（Channel Secret が一致しない可能性）');
      return createTextResponse_('Invalid signature', 403);
    }
    saveWebhookDebug_('署名OK: ' + new Date().toISOString());
  } else {
    saveWebhookDebug_('署名ヘッダーなし — GAS制限のため本文のみ処理: ' + new Date().toISOString());
  }

  var payload = JSON.parse(body);
  var events = payload.events || [];

  for (var i = 0; i < events.length; i++) {
    handleLineEvent_(events[i]);
  }

  return ContentService.createTextOutput('OK');
}

function isLineWebhookBody_(body) {
  try {
    var payload = JSON.parse(body);
    return payload && Object.prototype.hasOwnProperty.call(payload, 'events');
  } catch (e) {
    return false;
  }
}

function handleLineWebhook_(e) {
  return processLineWebhook_(e.postData.contents, getPostHeader_(e, 'X-Line-Signature'));
}

function verifyLineSignature_(body, signature) {
  if (!signature) {
    return false;
  }
  var hash = Utilities.computeHmacSha256Signature(body, getLineChannelSecret_());
  var computed = Utilities.base64Encode(hash);
  return computed === signature;
}

function handleLineEvent_(event) {
  if (!event || event.type !== 'message') {
    return;
  }

  var userId = event.source && event.source.userId;
  if (!userId) {
    return;
  }

  try {
    CacheService.getScriptCache().put('last_line_user_id', userId, 3600);
    PropertiesService.getScriptProperties().setProperties({
      last_line_user_id: userId,
      last_line_user_id_at: new Date().toISOString()
    });

    if (userId !== getAdminLineUserId_()) {
      notifyAdmin_(
        event.replyToken,
        userId,
        '管理者IDが一致しません。\nScript Properties の ADMIN_LINE_USER_ID を確認してください。'
      );
      saveWebhookDebug_('管理者ID不一致: 送信=' + userId);
      return;
    }

    var message = event.message;
    if (message.type === 'text') {
      handleAdminTextMessage_(event.replyToken, userId, message.text);
    } else if (message.type === 'image') {
      handleAdminImageMessage_(event.replyToken, userId, message.id);
    } else {
      notifyAdmin_(event.replyToken, userId, 'テキストまたは画像を送信してください。');
    }
  } catch (err) {
    saveWebhookDebug_('handleLineEvent エラー: ' + err.message);
    PropertiesService.getScriptProperties().setProperty(
      'last_publish_debug',
      '失敗: ' + err.message + ' at ' + new Date().toISOString()
    );
    notifyAdmin_(event.replyToken, userId, 'エラーが発生しました: ' + err.message);
  }
}

function handleAdminTextMessage_(replyToken, userId, text) {
  var trimmed = (text || '').trim();
  if (!trimmed) {
    notifyAdmin_(replyToken, userId, 'テキストを入力してください。');
    return;
  }

  if (trimmed === '投稿') {
    confirmDraft_(replyToken, userId);
    return;
  }

  if (trimmed === 'キャンセル') {
    clearDraft_(userId);
    notifyAdmin_(replyToken, userId, '下書きを破棄しました。');
    return;
  }

  if (trimmed === 'ヘルプ' || trimmed === 'help') {
    notifyAdmin_(
      replyToken,
      userId,
      '【投稿手順】\n' +
        '1. 1通目（テキスト）\n' +
        '   1行目 = タイトル\n' +
        '   2行目以降 = 本文（URLもここに含める）\n' +
        '2. 画像を送信（任意）\n' +
        '3. 少し待ってから「投稿」\n\n' +
        '※「投稿」するまでスプシには載りません\n' +
        '「キャンセル」で下書き破棄'
    );
    return;
  }

  var existingDraft = getDraft_(userId);

  // タイトル設定済み → 追加分は本文に追加（上書きしない）
  if (existingDraft && existingDraft.title) {
    existingDraft.body = (existingDraft.body ? existingDraft.body + '\n' : '') + trimmed;
    existingDraft.updatedAt = Date.now();
    saveDraft_(userId, existingDraft);
    notifyAdmin_(
      replyToken,
      userId,
      formatDraftSavedMessage_(existingDraft, '本文に追加しました。')
    );
    return;
  }

  var lines = trimmed.split(/\r?\n/);
  var title = (lines[0] || '').trim();
  var body = lines.slice(1).join('\n').trim();

  if (!title) {
    notifyAdmin_(replyToken, userId, '1行目にタイトルを入力してください。');
    return;
  }

  var draft = { title: title, body: body, imageUrls: [] };
  draft.updatedAt = Date.now();
  saveDraft_(userId, draft);

  notifyAdmin_(replyToken, userId, formatDraftSavedMessage_(draft, '下書きを保存しました。'));
}

function formatDraftSavedMessage_(draft, headline) {
  var bodyPreview = draft.body || '（なし）';
  if (bodyPreview.length > 80) {
    bodyPreview = bodyPreview.slice(0, 80) + '...';
  }
  return (
    headline +
    '\n\n' +
    'タイトル:\n' +
    draft.title +
    '\n\n' +
    '本文:\n' +
    bodyPreview +
    '\n\n' +
    '画像があれば送信し、\n' +
    '少し待ってから「投稿」と送ってください。'
  );
}

function handleAdminImageMessage_(replyToken, userId, messageId) {
  var draft = getDraft_(userId);
  if (!draft || !draft.title) {
    notifyAdmin_(
      replyToken,
      userId,
      '先にテキストを送信してください。\n（1行目=タイトル、2行目以降=本文）'
    );
    return;
  }

  try {
    var blob = downloadLineImage_(messageId);
    var filename = 'board_' + userId.slice(-6) + '_' + Date.now() + '.jpg';
    var saved = saveImageToDrive_(blob, filename);
    draft.imageUrls = draft.imageUrls || [];
    draft.imageUrls.push(saved.url);
    draft.updatedAt = Date.now();
    saveDraft_(userId, draft);

    notifyAdmin_(
      replyToken,
      userId,
      '画像を追加しました（' +
        draft.imageUrls.length +
        '枚）。\n少し待ってから「投稿」と送ってください。'
    );
  } catch (err) {
    notifyAdmin_(replyToken, userId, '画像の保存に失敗しました: ' + err.message);
  }
}

function confirmDraft_(replyToken, userId) {
  var draft = getDraft_(userId);
  if (!draft || !draft.title) {
    notifyAdmin_(
      replyToken,
      userId,
      '下書きがありません。\n\n' +
        '1. 1行目=タイトル、2行目以降=本文（URL含む）\n' +
        '2. 画像（任意）\n' +
        '3. 少し待ってから「投稿」'
    );
    return;
  }

  // 画像メッセージの処理完了を待つ
  Utilities.sleep(POST_WAIT_MS);
  draft = getDraft_(userId);

  if (!draft || !draft.title) {
    notifyAdmin_(replyToken, userId, '下書きが見つかりません。もう一度テキストから送ってください。');
    return;
  }

  try {
    var postId = publishPost_(draft.title, draft.body || '', draft.imageUrls || []);
    clearDraft_(userId);
    PropertiesService.getScriptProperties().setProperty(
      'last_publish_debug',
      '成功 ID=' + postId + ' at ' + new Date().toISOString()
    );
    var imageCount = (draft.imageUrls || []).length;
    notifyAdmin_(
      replyToken,
      userId,
      '掲示板に投稿しました（ID: ' + postId + '）。\n画像: ' + imageCount + '枚'
    );
  } catch (err) {
    PropertiesService.getScriptProperties().setProperty(
      'last_publish_debug',
      '失敗: ' + err.message + ' at ' + new Date().toISOString()
    );
    notifyAdmin_(replyToken, userId, '投稿に失敗しました: ' + err.message);
  }
}

function getDraftKey_(userId) {
  return 'draft_' + userId;
}

function getDraft_(userId) {
  var raw = PropertiesService.getScriptProperties().getProperty(getDraftKey_(userId));
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveDraft_(userId, draft) {
  PropertiesService.getScriptProperties().setProperty(getDraftKey_(userId), JSON.stringify(draft));
}

function clearDraft_(userId) {
  PropertiesService.getScriptProperties().deleteProperty(getDraftKey_(userId));
}

function notifyAdmin_(replyToken, userId, text) {
  var replied = false;
  if (replyToken) {
    replied = replyLineMessage_(replyToken, text);
  }
  if (!replied) {
    pushLineMessage_(userId, text);
  }
}

function pushLineMessage_(userId, text) {
  var url = 'https://api.line.me/v2/bot/message/push';
  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + getLineChannelAccessToken_()
    },
    payload: JSON.stringify({
      to: userId,
      messages: [{ type: 'text', text: text }]
    }),
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    saveWebhookDebug_(
      'LINEプッシュ失敗 ' + response.getResponseCode() + ': ' + response.getContentText().slice(0, 200)
    );
    return false;
  }
  return true;
}

function downloadLineImage_(messageId) {
  var url = 'https://api-data.line.me/v2/bot/message/' + messageId + '/content';
  var response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + getLineChannelAccessToken_()
    },
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    throw new Error('LINE画像取得失敗 (' + response.getResponseCode() + ')');
  }

  return response.getBlob();
}

function replyLineMessage_(replyToken, text) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var payload = {
    replyToken: replyToken,
    messages: [{ type: 'text', text: text }]
  };

  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + getLineChannelAccessToken_()
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    saveWebhookDebug_(
      'LINE返信失敗 ' + response.getResponseCode() + ': ' + response.getContentText().slice(0, 200)
    );
    return false;
  }
  return true;
}

function createTextResponse_(text, status) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);
}
