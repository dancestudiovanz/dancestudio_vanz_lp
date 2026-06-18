/**
 * 管理者ダッシュボード向けサービス
 */

var ADMIN_PAGE_SIZE = 20;
var ADMIN_SESSION_DAYS = 1;

function loginAdmin(password) {
  if (!password) {
    return { ok: false, message: 'パスワードを入力してください。' };
  }
  if (password !== getAdminDashboardPassword_()) {
    return { ok: false, message: '管理パスワードが正しくありません。' };
  }
  return { ok: true, token: createAdminSessionToken_() };
}

function createAdminSessionToken_() {
  var expiry = Date.now() + ADMIN_SESSION_DAYS * 24 * 60 * 60 * 1000;
  var nonce = Utilities.getUuid();
  var payload = 'admin:' + expiry + ':' + nonce;
  var signature = signPayload_(payload);
  return Utilities.base64EncodeWebSafe(payload + ':' + signature);
}

function isValidAdminSession_(token) {
  if (!token) {
    return false;
  }
  try {
    var decoded = Utilities.newBlob(Utilities.base64DecodeWebSafe(token)).getDataAsString();
    var parts = decoded.split(':');
    if (parts.length !== 4 || parts[0] !== 'admin') {
      return false;
    }
    var expiry = Number(parts[1]);
    var nonce = parts[2];
    var signature = parts[3];
    var payload = 'admin:' + expiry + ':' + nonce;
    if (Date.now() > expiry) {
      return false;
    }
    return signPayload_(payload) === signature;
  } catch (e) {
    return false;
  }
}

function requireAdminSession_(token) {
  if (!isValidAdminSession_(token)) {
    throw new Error('セッションが無効です。再ログインしてください。');
  }
}

function normalizeImageColumns_(images) {
  var values = [];
  for (var i = 0; i < 4; i++) {
    values.push(String((images && images[i]) || '').trim());
  }
  return values;
}

function mapRowToAdminPost_(rowIndex, row) {
  return {
    rowIndex: rowIndex,
    postDate: formatPostDate_(row[0]),
    category: String(row[1] || '').trim(),
    title: String(row[2] || '').trim(),
    weekday: String(row[3] || '').trim(),
    className: String(row[4] || '').trim(),
    body: String(row[5] || ''),
    url: String(row[6] || '').trim(),
    imageUrls: collectImageUrls_(row)
  };
}

function listAdminPosts(token, page) {
  requireAdminSession_(token);
  var sheet = getPostsSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { posts: [], total: 0, page: 1, totalPages: 1, pageSize: ADMIN_PAGE_SIZE };
  }

  var rows = sheet.getRange(2, 1, lastRow - 1, SHEET_COLUMN_COUNT).getValues();
  var posts = [];
  for (var i = 0; i < rows.length; i++) {
    var post = mapRowToAdminPost_(i + 2, rows[i]);
    if (!post.title) {
      continue;
    }
    posts.push(post);
  }

  posts.sort(function (a, b) {
    var aDate = a.postDate || '0000-00-00';
    var bDate = b.postDate || '0000-00-00';
    if (aDate !== bDate) {
      return aDate < bDate ? 1 : -1;
    }
    return b.rowIndex - a.rowIndex;
  });

  var safePage = Math.max(1, Number(page) || 1);
  var total = posts.length;
  var totalPages = Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE));
  var currentPage = Math.min(safePage, totalPages);
  var start = (currentPage - 1) * ADMIN_PAGE_SIZE;

  return {
    posts: posts.slice(start, start + ADMIN_PAGE_SIZE),
    total: total,
    page: currentPage,
    totalPages: totalPages,
    pageSize: ADMIN_PAGE_SIZE
  };
}

function upsertAdminPost(token, post) {
  requireAdminSession_(token);
  post = post || {};

  var title = String(post.title || '').trim();
  if (!title) {
    throw new Error('タイトルは必須です。');
  }

  var sheet = getPostsSheet_();
  var rowIndex = Number(post.rowIndex) || 0;
  var values = [
    String(post.postDate || '').trim(),
    String(post.category || '').trim(),
    title,
    String(post.weekday || '').trim(),
    String(post.className || '').trim(),
    String(post.body || ''),
    String(post.url || '').trim()
  ].concat(normalizeImageColumns_(post.imageUrls));

  if (rowIndex >= 2) {
    sheet.getRange(rowIndex, 1, 1, SHEET_COLUMN_COUNT).setValues([values]);
  } else {
    sheet.appendRow(values);
    rowIndex = sheet.getLastRow();
  }

  return { ok: true, rowIndex: rowIndex };
}

function deleteAdminPost(token, rowIndex) {
  requireAdminSession_(token);
  var targetRow = Number(rowIndex) || 0;
  if (targetRow < 2) {
    throw new Error('削除対象の行番号が不正です。');
  }
  var sheet = getPostsSheet_();
  if (targetRow > sheet.getLastRow()) {
    throw new Error('削除対象の投稿が見つかりません。');
  }
  sheet.deleteRow(targetRow);
  return { ok: true };
}

function uploadAdminImage(token, dataUrl, filename) {
  requireAdminSession_(token);
  var folderId = getDriveFolderId_();
  if (!folderId) {
    throw new Error('DRIVE_FOLDER_ID が未設定です。');
  }

  var payload = String(dataUrl || '');
  var match = payload.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error('画像データの形式が不正です。');
  }

  var contentType = match[1];
  var bytes = Utilities.base64Decode(match[2]);
  var safeName = String(filename || 'upload_' + Date.now()).replace(/[\\/:*?"<>|]/g, '_');
  var blob = Utilities.newBlob(bytes, contentType, safeName);

  var folder = DriveApp.getFolderById(folderId);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    ok: true,
    url: 'https://drive.google.com/uc?export=view&id=' + file.getId(),
    fileId: file.getId(),
    fileName: file.getName()
  };
}
