const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

function pad(n) {
  return String(n).padStart(2, '0');
}

// SQLiteのdatetime('now')はUTCで、タイムゾーン表記が付かない文字列を返すため、
// 明示的に'Z'を付けてUTCとして解釈させる。
function toJstDisplayString(sqliteUtcDatetime) {
  const utcDate = new Date(`${sqliteUtcDatetime.replace(' ', 'T')}Z`);
  const jstDate = new Date(utcDate.getTime() + JST_OFFSET_MS);

  const year = jstDate.getUTCFullYear();
  const month = pad(jstDate.getUTCMonth() + 1);
  const day = pad(jstDate.getUTCDate());
  const hours = pad(jstDate.getUTCHours());
  const minutes = pad(jstDate.getUTCMinutes());
  const seconds = pad(jstDate.getUTCSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (JST)`;
}

module.exports = { toJstDisplayString };
