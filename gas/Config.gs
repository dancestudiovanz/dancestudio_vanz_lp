/**
 * VANZ 会員掲示板 — 設定
 * Script Properties に以下を設定してください（setupSecrets 関数参照）:
 *   SPREADSHEET_ID
 *   MEMBER_VIEW_PASSWORD
 *   DRIVE_FOLDER_ID（画像URL用・任意）
 */

var SHEET_NAME = '掲示板';
var ANNOUNCEMENTS_SHEET_NAME = 'おしらせ';
var PAGE_SIZE = 10;
var SESSION_DAYS = 7;

function getScriptProp_(key) {
  var value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) {
    throw new Error('Script Property が未設定です: ' + key);
  }
  return value;
}

function getSpreadsheetId_() {
  return getScriptProp_('SPREADSHEET_ID');
}

function getDriveFolderId_() {
  return PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER_ID') || '';
}

function getLineChannelSecret_() {
  return getScriptProp_('LINE_CHANNEL_SECRET');
}

function getLineChannelAccessToken_() {
  return getScriptProp_('LINE_CHANNEL_ACCESS_TOKEN');
}

function getAdminLineUserId_() {
  var configured = getScriptProp_('ADMIN_LINE_USER_ID');
  var extracted = extractLineUserId_(configured);

  if (extracted && !isPlaceholderAdminId_(extracted)) {
    return extracted;
  }

  if (isPlaceholderAdminId_(configured)) {
    var last = PropertiesService.getScriptProperties().getProperty('last_line_user_id');
    if (last) {
      return last;
    }
  }

  return configured;
}

function extractLineUserId_(value) {
  if (!value) {
    return '';
  }
  var match = value.match(/U[a-f0-9]{32}/i);
  return match ? match[0] : value.trim();
}

function isPlaceholderAdminId_(userId) {
  if (!userId) {
    return true;
  }
  if (userId.indexOf('x') !== -1) {
    return true;
  }
  return userId === 'Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
}

function getMemberViewPassword_() {
  return getScriptProp_('MEMBER_VIEW_PASSWORD');
}

function getAdminDashboardPassword_() {
  return getScriptProp_('ADMIN_DASHBOARD_PASSWORD');
}

function getSessionSecret_() {
  var secret = PropertiesService.getScriptProperties().getProperty('SESSION_SECRET');
  if (!secret) {
    secret = Utilities.getUuid();
    PropertiesService.getScriptProperties().setProperty('SESSION_SECRET', secret);
  }
  return secret;
}

/**
 * 初回セットアップ用 — 値を書き換えて GAS エディタから1回実行
 */
function setupSecrets() {
  PropertiesService.getScriptProperties().setProperties({
    MEMBER_VIEW_PASSWORD: '会員に共有するパスワード',
    ADMIN_DASHBOARD_PASSWORD: '管理画面用パスワード',
    DRIVE_FOLDER_ID: 'DriveフォルダID（任意）',
    SPREADSHEET_ID: 'スプレッドシートID'
  });
  Logger.log('Script Properties を設定しました。');
}

/**
 * 管理者の LINE userId を取得するための一時関数
 * デプロイ後、管理者が掲示板LINEにメッセージを送り、実行ログを確認
 */
function saveWebhookDebug_(message) {
  PropertiesService.getScriptProperties().setProperty('last_webhook_debug', message);
}

function logLastLineUserId() {
  var props = PropertiesService.getScriptProperties();
  var userId = props.getProperty('last_line_user_id') || CacheService.getScriptCache().get('last_line_user_id');
  var at = props.getProperty('last_line_user_id_at') || '';
  var debug = props.getProperty('last_webhook_debug') || '(Webhook未受信)';
  var headers = props.getProperty('last_webhook_headers') || '(なし)';
  var publish = props.getProperty('last_publish_debug') || '(投稿ログなし)';
  var adminId = props.getProperty('ADMIN_LINE_USER_ID') || '(未設定)';
  var effectiveAdminId = getAdminLineUserId_();

  Logger.log('--- 診断結果 ---');
  Logger.log('Last userId: ' + (userId || '(未取得)'));
  Logger.log('ADMIN_LINE_USER_ID（保存値）: ' + adminId);
  Logger.log('有効な管理者ID: ' + effectiveAdminId);
  Logger.log('ID一致: ' + (userId && userId === effectiveAdminId ? 'はい' : 'いいえ'));
  Logger.log('取得日時: ' + (at || '(なし)'));
  Logger.log('Webhook状況: ' + debug);
  Logger.log('投稿状況: ' + publish);
  Logger.log('受信ヘッダー: ' + headers);

  if (userId) {
    var draftRaw = props.getProperty('draft_' + userId);
    Logger.log('下書き: ' + (draftRaw || '(なし)'));
  }

  if (!userId) {
    Logger.log('');
    Logger.log('【確認してください】');
    Logger.log('1. GASを「新しいデプロイ」したか');
    Logger.log('2. LINE Developers の Webhook URL がデプロイURLと一致するか');
    Logger.log('3. Webhookの利用 = オン、検証 = 成功');
    Logger.log('4. デプロイ設定: アクセス = 全員');
    Logger.log('5. LINEに送信後、左メニュー「実行数」に doPost があるか');
  }
}

/**
 * スプレッドシート接続を確認（GASエディタから実行）
 */
function diagnoseBoardSetup() {
  Logger.log('--- 掲示板セットアップ診断 ---');

  try {
    var ss = SpreadsheetApp.openById(getSpreadsheetId_());
    Logger.log('スプレッドシート: ' + ss.getName() + ' … OK');
  } catch (e) {
    Logger.log('スプレッドシート: エラー — ' + e.message);
    Logger.log('→ SPREADSHEET_ID を確認してください');
    return;
  }

  try {
    var sheet = getPostsSheet_();
    Logger.log('シート名「' + SHEET_NAME + '」… OK（行数: ' + sheet.getLastRow() + '）');
  } catch (e) {
    Logger.log('シート: エラー — ' + e.message);
    Logger.log('→ シート名が「' + SHEET_NAME + '」か確認してください');
    return;
  }

  try {
    var folderId = getDriveFolderId_();
    if (folderId) {
      var folder = DriveApp.getFolderById(folderId);
      Logger.log('Driveフォルダ: ' + folder.getName() + ' … OK');
    } else {
      Logger.log('Driveフォルダ: (未設定・任意)');
    }
  } catch (e) {
    Logger.log('Driveフォルダ: エラー — ' + e.message);
  }

  try {
    var posts = getPublishedPosts(1, PAGE_SIZE);
    Logger.log('掲示板表示件数: ' + posts.total + '件');
    if (posts.posts.length > 0) {
      Logger.log('最新: ' + posts.posts[0].postDate + ' / ' + posts.posts[0].title);
    }
  } catch (e) {
    Logger.log('投稿読み込み: エラー — ' + e.message);
  }
}

function diagnoseViewHtml() {
  var token = createSessionToken_();
  var model = buildViewModel_(1, token);
  Logger.log('投稿数: ' + model.total);
  if (model.posts.length > 0) {
    Logger.log(
      'サンプル: ' +
        model.posts[0].postDate +
        ' / ' +
        model.posts[0].category +
        ' / ' +
        model.posts[0].title
    );
  }

  var payload = getBoardViewData(token, 1);
  Logger.log('getBoardViewData: ' + (payload.ok ? 'OK' : payload.message));
}

function diagnoseLastDoGet() {
  var raw = PropertiesService.getScriptProperties().getProperty('last_doget_debug');
  Logger.log('last_doget_debug: ' + (raw || '(なし — WebアプリURLにアクセスしてください)'));
}
