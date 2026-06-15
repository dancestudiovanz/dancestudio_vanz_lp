/**
 * スプレッドシート読み取り
 *
 * 列構成（A〜H）:
 * 投稿日 | カテゴリー | タイトル | 曜日 | クラス | 本文 | URL | 添付画像
 */

var SHEET_COLUMN_COUNT = 8;

function getPostsSheet_() {
  var ss = SpreadsheetApp.openById(getSpreadsheetId_());
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('シート "' + SHEET_NAME + '" が見つかりません。');
  }
  return sheet;
}

function getSheetHeaders_() {
  return ['投稿日', 'カテゴリー', 'タイトル', '曜日', 'クラス', '本文', 'URL', '添付画像'];
}

function formatPostDate_(value) {
  if (value === '' || value === null || value === undefined) {
    return '';
  }
  if (Object.prototype.toString.call(value) === '[object Date]') {
    if (isNaN(value.getTime())) {
      return '';
    }
    return Utilities.formatDate(value, 'Asia/Tokyo', 'yyyy-MM-dd');
  }
  var text = String(value).trim();
  if (!text) {
    return '';
  }
  var parsed = new Date(text);
  if (!isNaN(parsed.getTime())) {
    return Utilities.formatDate(parsed, 'Asia/Tokyo', 'yyyy-MM-dd');
  }
  return text;
}

function parseImageUrls_(value) {
  if (!value && value !== 0) {
    return [];
  }
  var text = String(value).trim();
  if (!text || text === '[]') {
    return [];
  }
  if (text.charAt(0) === '[') {
    try {
      var parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed.map(function (url) {
          return String(url || '').trim();
        }).filter(function (url) {
          return url;
        });
      }
    } catch (e) {
      // fall through
    }
  }
  return text
    .split(/[\n,]/)
    .map(function (part) {
      return part.trim();
    })
    .filter(function (part) {
      return part;
    });
}

function getPublishedPosts(page, pageSize) {
  var sheet = getPostsSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { posts: [], total: 0, page: page, pageSize: pageSize };
  }

  var values = sheet.getRange(2, 1, lastRow, SHEET_COLUMN_COUNT).getValues();
  var posts = [];

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var title = String(row[2] || '').trim();
    if (!title) {
      continue;
    }

    var postDate = formatPostDate_(row[0]);
    posts.push({
      rowIndex: i + 2,
      postDate: postDate,
      postDateSort: postDate || '0000-00-00',
      category: String(row[1] || '').trim(),
      title: title,
      weekday: String(row[3] || '').trim(),
      className: String(row[4] || '').trim(),
      body: String(row[5] || ''),
      url: String(row[6] || '').trim(),
      imageUrls: parseImageUrls_(row[7])
    });
  }

  posts.sort(function (a, b) {
    if (a.postDateSort !== b.postDateSort) {
      return a.postDateSort < b.postDateSort ? 1 : -1;
    }
    return b.rowIndex - a.rowIndex;
  });

  var total = posts.length;
  var safePage = Math.max(1, page);
  var start = (safePage - 1) * pageSize;
  var paged = posts.slice(start, start + pageSize);

  return {
    posts: paged,
    total: total,
    page: safePage,
    pageSize: pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize))
  };
}

function linkifyBody_(text) {
  if (!text) {
    return '';
  }

  var escaped = escapeHtml_(text);
  var linked = escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return linked.replace(/\n/g, '<br>');
}

function escapeHtml_(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildViewModel_(page, token) {
  var result = getPublishedPosts(page, PAGE_SIZE);
  var posts = result.posts.map(function (post) {
    return {
      rowIndex: post.rowIndex,
      title: escapeHtml_(post.title),
      bodyHtml: linkifyBody_(post.body),
      postDate: escapeHtml_(post.postDate),
      category: escapeHtml_(post.category),
      weekday: escapeHtml_(post.weekday),
      className: escapeHtml_(post.className),
      url: escapeHtml_(post.url),
      imageUrls: post.imageUrls || []
    };
  });

  var start = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  var end = Math.min(result.page * result.pageSize, result.total);

  return {
    posts: posts,
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
    pageSize: result.pageSize,
    rangeLabel: result.total === 0 ? '0件' : start + '-' + end,
    token: token,
    tokenEncoded: encodeURIComponent(token || ''),
    hasPrev: result.page > 1,
    hasNext: result.page < result.totalPages,
    prevPage: Math.max(1, result.page - 1),
    nextPage: Math.min(result.totalPages, result.page + 1),
    lastPage: result.totalPages
  };
}
