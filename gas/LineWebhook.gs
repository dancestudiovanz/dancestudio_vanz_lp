/**
 * LINE Messaging API Webhook
 * 投稿用LINEに届いたメッセージから掲示板投稿を作成する
 */

var POST_CATEGORY_OPTIONS = ['曲', '衣装', 'おしらせ'];
var POST_WEEKDAY_OPTIONS = ['月', '水', '金', '空欄'];
var POST_CLASS_OPTIONS = ['幼児', '低学年', 'can☆bang', 'vanZ', 'HIPHOP', '空欄'];
var POST_IMAGE_MAX = 4;

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
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService.createTextOutput('No post body').setMimeType(ContentService.MimeType.TEXT);
  }
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

    var message = event.message || {};
    if (message.type === 'text') {
      handleAdminTextMessage_(event.replyToken, userId, message.text);
      return;
    }

    if (message.type === 'image') {
      handleAdminImageMessage_(event.replyToken, userId, message.id);
      return;
    }

    notifyAdmin_(event.replyToken, userId, 'テキストまたは画像を送信してください。');
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

  if (trimmed === 'ヘルプ' || trimmed === 'help') {
    sendPostHelp_(replyToken, userId);
    return;
  }

  if (trimmed === 'キャンセル') {
    clearDraft_(userId);
    notifyAdmin_(replyToken, userId, '下書きを破棄しました。');
    return;
  }

  if (trimmed === '投稿') {
    startPostFlow_(replyToken, userId);
    return;
  }

  var draft = getDraft_(userId);
  if (!draft || !draft.step) {
    notifyAdmin_(replyToken, userId, '「投稿」と送ると入力を開始します。');
    return;
  }

  proceedDraftStepByText_(replyToken, userId, draft, trimmed);
}

function startPostFlow_(replyToken, userId) {
  var draft = {
    step: 'awaitCategory',
    category: '',
    title: '',
    weekday: '',
    className: '',
    body: '',
    imageUrls: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  saveDraft_(userId, draft);
  sendCategoryPrompt_(replyToken, userId);
}

function proceedDraftStepByText_(replyToken, userId, draft, text) {
  switch (draft.step) {
    case 'awaitCategory':
      if (POST_CATEGORY_OPTIONS.indexOf(text) === -1) {
        sendCategoryPrompt_(replyToken, userId, 'カテゴリーは選択肢から選んでください。');
        return;
      }

      draft.category = text;
      draft.step = 'awaitTitle';
      draft.updatedAt = Date.now();
      saveDraft_(userId, draft);
      notifyAdmin_(replyToken, userId, '②タイトルを入力してください。\n例: 4月分衣装');
      return;

    case 'awaitTitle':
      draft.title = text;
      draft.step = 'awaitWeekday';
      draft.updatedAt = Date.now();
      saveDraft_(userId, draft);
      sendWeekdayPrompt_(replyToken, userId);
      return;

    case 'awaitWeekday':
      if (POST_WEEKDAY_OPTIONS.indexOf(text) === -1) {
        sendWeekdayPrompt_(replyToken, userId, '曜日は選択肢から選んでください。');
        return;
      }

      draft.weekday = text === '空欄' ? '' : text;
      draft.step = 'awaitClassName';
      draft.updatedAt = Date.now();
      saveDraft_(userId, draft);
      sendClassPrompt_(replyToken, userId);
      return;

    case 'awaitClassName':
      if (POST_CLASS_OPTIONS.indexOf(text) === -1) {
        sendClassPrompt_(replyToken, userId, 'クラスは選択肢から選んでください。');
        return;
      }

      draft.className = text === '空欄' ? '' : text;
      draft.step = 'awaitBody';
      draft.updatedAt = Date.now();
      saveDraft_(userId, draft);
      notifyAdmin_(
        replyToken,
        userId,
        '⑤本文を入力してください。\nURLは本文にそのまま貼ってOKです。'
      );
      return;

    case 'awaitBody':
      draft.body = text;
      draft.step = 'awaitImagesOrDone';
      draft.updatedAt = Date.now();
      saveDraft_(userId, draft);
      sendImageOrConfirmPrompt_(replyToken, userId, draft);
      return;

    case 'awaitImagesOrDone':
      if (text === '確認') {
        draft.step = 'awaitConfirm';
        draft.updatedAt = Date.now();
        saveDraft_(userId, draft);
        sendConfirmPrompt_(replyToken, userId, draft);
        return;
      }

      if (text === '本文追記') {
        draft.step = 'awaitBodyAppend';
        draft.updatedAt = Date.now();
        saveDraft_(userId, draft);
        notifyAdmin_(replyToken, userId, '追記する本文を送信してください。');
        return;
      }

      notifyAdmin_(
        replyToken,
        userId,
        '画像を送るか「確認」を送ってください。本文追記は「本文追記」です。'
      );
      return;

    case 'awaitBodyAppend':
      draft.body = (draft.body ? draft.body + '\n' : '') + text;
      draft.step = 'awaitImagesOrDone';
      draft.updatedAt = Date.now();
      saveDraft_(userId, draft);
      sendImageOrConfirmPrompt_(replyToken, userId, draft, '本文を追記しました。');
      return;

    case 'awaitConfirm':
      if (text === '送信') {
        publishDraft_(replyToken, userId, draft);
        return;
      }

      if (text === '修正') {
        draft.step = 'awaitBodyAppend';
        draft.updatedAt = Date.now();
        saveDraft_(userId, draft);
        notifyAdmin_(replyToken, userId, '修正本文を送信してください（追記されます）。');
        return;
      }

      notifyAdmin_(replyToken, userId, '「送信」で投稿確定、「修正」で本文追記できます。');
      return;

    default:
      clearDraft_(userId);
      notifyAdmin_(replyToken, userId, 'セッションが不正です。もう一度「投稿」と送ってください。');
      return;
  }
}

function sendPostHelp_(replyToken, userId) {
  notifyAdmin_(
    replyToken,
    userId,
    '【投稿手順】\n' +
      '1. 「投稿」\n' +
      '2. カテゴリー→タイトル→曜日→クラス→本文を入力\n' +
      '3. 画像を最大4枚送信（任意）\n' +
      '4. 「確認」→「送信」で投稿確定\n' +
      '※中断は「キャンセル」'
  );
}

function sendCategoryPrompt_(replyToken, userId, prefix) {
  sendQuickReply_(
    replyToken,
    userId,
    (prefix ? prefix + '\n' : '') + '①カテゴリーを選択してください。',
    POST_CATEGORY_OPTIONS
  );
}

function sendWeekdayPrompt_(replyToken, userId, prefix) {
  sendQuickReply_(
    replyToken,
    userId,
    (prefix ? prefix + '\n' : '') + '③曜日を選択してください。',
    POST_WEEKDAY_OPTIONS
  );
}

function sendClassPrompt_(replyToken, userId, prefix) {
  sendQuickReply_(
    replyToken,
    userId,
    (prefix ? prefix + '\n' : '') + '④クラスを選択してください。',
    POST_CLASS_OPTIONS
  );
}

function sendImageOrConfirmPrompt_(replyToken, userId, draft, prefix) {
  var imageCount = (draft.imageUrls || []).length;
  sendQuickReply_(
    replyToken,
    userId,
    (prefix ? prefix + '\n' : '') +
      '⑥画像を送信してください（最大4枚）。\n現在: ' +
      imageCount +
      '枚\n完了する場合は「確認」を選択。',
    ['確認', '本文追記', 'キャンセル']
  );
}

function sendConfirmPrompt_(replyToken, userId, draft) {
  var summary =
    '【確認】\n' +
    'カテゴリー: ' +
    (draft.category || '（なし）') +
    '\n' +
    'タイトル: ' +
    (draft.title || '（なし）') +
    '\n' +
    '曜日: ' +
    (draft.weekday || '（空欄）') +
    '\n' +
    'クラス: ' +
    (draft.className || '（空欄）') +
    '\n' +
    '本文: ' +
    (draft.body ? '\n' + draft.body : '（なし）') +
    '\n\n画像: ' +
    (draft.imageUrls || []).length +
    '枚';

  sendQuickReply_(replyToken, userId, summary, ['送信', '修正', 'キャンセル']);
}

function handleAdminImageMessage_(replyToken, userId, messageId) {
  var draft = getDraft_(userId);

  if (!draft || draft.step !== 'awaitImagesOrDone') {
    notifyAdmin_(
      replyToken,
      userId,
      '画像は本文入力後に受け付けます。先に「投稿」で入力を開始してください。'
    );
    return;
  }

  draft.imageUrls = draft.imageUrls || [];

  if (draft.imageUrls.length >= POST_IMAGE_MAX) {
    notifyAdmin_(replyToken, userId, '画像は最大' + POST_IMAGE_MAX + '枚までです。');
    return;
  }

  try {
    var blob = downloadLineImage_(messageId);
    var filename = 'board_' + userId.slice(-6) + '_' + Date.now() + '.jpg';
    var saved = saveImageToDrive_(blob, filename);

    draft.imageUrls.push(saved.url);
    draft.updatedAt = Date.now();
    saveDraft_(userId, draft);

    sendImageOrConfirmPrompt_(
      replyToken,
      userId,
      draft,
      '画像を追加しました（' + draft.imageUrls.length + '/' + POST_IMAGE_MAX + '）。'
    );
  } catch (err) {
    notifyAdmin_(replyToken, userId, '画像の保存に失敗しました: ' + err.message);
  }
}

function publishDraft_(replyToken, userId, draft) {
  if (!draft.category || !draft.title || !draft.body) {
    notifyAdmin_(replyToken, userId, '必須項目が不足しています。キャンセルして再実行してください。');
    return;
  }

  try {
    var row = buildPostRowFromDraft_(draft);
    var rowIndex = appendPostRow_(row);

    clearDraft_(userId);

    PropertiesService.getScriptProperties().setProperty(
      'last_publish_debug',
      '成功 row=' + rowIndex + ' at ' + new Date().toISOString()
    );

    notifyAdmin_(
      replyToken,
      userId,
      '掲示板に投稿しました。\n行番号: ' + rowIndex + '\n画像: ' + (draft.imageUrls || []).length + '枚'
    );
  } catch (err) {
    PropertiesService.getScriptProperties().setProperty(
      'last_publish_debug',
      '失敗: ' + err.message + ' at ' + new Date().toISOString()
    );
    notifyAdmin_(replyToken, userId, '投稿に失敗しました: ' + err.message);
  }
}

function buildPostRowFromDraft_(draft) {
  var images = normalizeImageUrls_(draft.imageUrls || []);

  return [
    Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd'),
    draft.category || '',
    draft.title || '',
    draft.weekday || '',
    draft.className || '',
    draft.body || '',
    '',
    images[0] || '',
    images[1] || '',
    images[2] || '',
    images[3] || ''
  ];
}

function appendPostRow_(row) {
  var sheet = getPostsSheet_();
  sheet.appendRow(row);
  return sheet.getLastRow();
}

function normalizeImageUrls_(urls) {
  var result = [];

  for (var i = 0; i < urls.length; i++) {
    var url = String(urls[i] || '').trim();
    if (url) {
      result.push(url);
    }

    if (result.length >= POST_IMAGE_MAX) {
      break;
    }
  }

  while (result.length < POST_IMAGE_MAX) {
    result.push('');
  }

  return result;
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
  notifyAdminMessage_(replyToken, userId, [{ type: 'text', text: text }]);
}

function sendQuickReply_(replyToken, userId, text, labels) {
  var items = labels.map(function (label) {
    return {
      type: 'action',
      action: {
        type: 'message',
        label: label,
        text: label
      }
    };
  });

  notifyAdminMessage_(replyToken, userId, [
    {
      type: 'text',
      text: text,
      quickReply: {
        items: items
      }
    }
  ]);
}

function notifyAdminMessage_(replyToken, userId, messages) {
  var replied = false;

  if (replyToken) {
    replied = replyLineMessages_(replyToken, messages);
  }

  if (!replied) {
    pushLineMessages_(userId, messages);
  }
}

function pushLineMessage_(userId, text) {
  return pushLineMessages_(userId, [{ type: 'text', text: text }]);
}

function pushLineMessages_(userId, messages) {
  var url = 'https://api.line.me/v2/bot/message/push';

  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + getLineChannelAccessToken_()
    },
    payload: JSON.stringify({
      to: userId,
      messages: messages
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
  return replyLineMessages_(replyToken, [{ type: 'text', text: text }]);
}

function replyLineMessages_(replyToken, messages) {
  var url = 'https://api.line.me/v2/bot/message/reply';

  var payload = {
    replyToken: replyToken,
    messages: messages
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

function getPostHeader_(e, name) {
  var headers = (e && e.headers) || {};
  var direct = headers[name];

  if (direct) {
    return direct;
  }

  var lowerName = String(name).toLowerCase();
  return headers[lowerName] || '';
}

function saveImageToDrive_(blob, filename) {
  var folderId = getDriveFolderId_();

  if (!folderId) {
    throw new Error('DRIVE_FOLDER_ID が未設定です。');
  }

  var folder = DriveApp.getFolderById(folderId);
  var file = folder.createFile(blob.setName(filename));

  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    id: file.getId(),
    url: 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1000'
  };
}
