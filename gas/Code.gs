/**
 * エントリポイント
 */

function doGet(e) {
  try {
    e = e || { parameter: {} };
    var params = e.parameter || {};

    saveDoGetDebug_({
      tokenLen: (params.token || '').length,
      page: Number(params.page) || 1,
      at: new Date().toISOString()
    });

    if (params.page === 'announcements') {
      return renderAnnouncementsPage_();
    }

    if (params.admin === '1') {
      return renderAdminPage_();
    }

    // 常に login.html（ログイン＋掲示板を同一ページで表示）
    return renderLoginPage_();
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<!DOCTYPE html><html><body style="font-family:sans-serif;padding:24px">' +
        '<h1>掲示板の表示エラー</h1>' +
        '<p>' +
        String(err.message) +
        '</p>' +
        '<p><a href="?">ログイン画面に戻る</a></p>' +
        '</body></html>'
    )
      .setTitle('エラー')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function doPost(e) {
  return handleLineWebhook_(e);
}

function renderLoginPage_() {
  return HtmlService.createTemplateFromFile('login')
    .evaluate()
    .setTitle('会員専用掲示板')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function renderAdminPage_() {
  return HtmlService.createTemplateFromFile('admin')
    .evaluate()
    .setTitle('掲示板管理')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function renderAnnouncementsPage_() {
  return HtmlService.createTemplateFromFile('announcements')
    .evaluate()
    .setTitle('VANZからのおしらせ')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getBoardViewData(token, page) {
  if (!isValidSession(token)) {
    return { ok: false, message: 'セッションが無効です。再度ログインしてください。' };
  }
  var safePage = Math.max(1, Number(page) || 1);
  return { ok: true, model: buildViewModel_(safePage, token) };
}

function saveDoGetDebug_(info) {
  try {
    PropertiesService.getScriptProperties().setProperty('last_doget_debug', JSON.stringify(info));
  } catch (err) {
    // ignore
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getWebAppUrl_() {
  return ScriptApp.getService().getUrl();
}
