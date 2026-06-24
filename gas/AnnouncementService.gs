/**
 * LP公開用おしらせ読み取り
 *
 * 列構成（A〜C）:
 * 公開日 | タイトル | 本文
 */

var ANNOUNCEMENT_COLUMN_COUNT = 3;

function getAnnouncementsSheet_() {
  var ss = SpreadsheetApp.openById(getSpreadsheetId_());
  var sheet = ss.getSheetByName(ANNOUNCEMENTS_SHEET_NAME);
  if (!sheet) {
    throw new Error('シート "' + ANNOUNCEMENTS_SHEET_NAME + '" が見つかりません。');
  }
  return sheet;
}

function getPublicAnnouncements() {
  var sheet = getAnnouncementsSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return [];
  }

  var values = sheet.getRange(2, 1, lastRow - 1, ANNOUNCEMENT_COLUMN_COUNT).getValues();
  var announcements = [];

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var title = String(row[1] || '').trim();
    if (!title) {
      continue;
    }

    announcements.push({
      id: 'announcement-' + (i + 2),
      date: formatPostDate_(row[0]),
      title: title,
      body: String(row[2] || '').trim(),
      sortDate: formatPostDate_(row[0]) || '0000-00-00'
    });
  }

  announcements.sort(function (a, b) {
    if (a.sortDate < b.sortDate) return 1;
    if (a.sortDate > b.sortDate) return -1;
    return 0;
  });

  return announcements;
}
