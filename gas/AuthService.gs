/**
 * 会員向けパスワード認証・セッショントークン
 */

function loginMember(password) {
  if (!password) {
    return { ok: false, message: 'パスワードを入力してください。' };
  }

  if (password !== getMemberViewPassword_()) {
    return { ok: false, message: 'パスワードが正しくありません。' };
  }

  return {
    ok: true,
    token: createSessionToken_()
  };
}

function createSessionToken_() {
  var expiry = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  var nonce = Utilities.getUuid();
  var payload = expiry + ':' + nonce;
  var signature = signPayload_(payload);
  return Utilities.base64EncodeWebSafe(payload + ':' + signature);
}

function isValidSession(token) {
  if (!token) {
    return false;
  }

  try {
    var decoded = Utilities.newBlob(Utilities.base64DecodeWebSafe(token)).getDataAsString();
    var parts = decoded.split(':');
    if (parts.length !== 3) {
      return false;
    }

    var expiry = Number(parts[0]);
    var nonce = parts[1];
    var signature = parts[2];
    var payload = expiry + ':' + nonce;

    if (Date.now() > expiry) {
      return false;
    }

    return signPayload_(payload) === signature;
  } catch (e) {
    return false;
  }
}

function signPayload_(payload) {
  var hash = Utilities.computeHmacSha256Signature(payload, getSessionSecret_());
  return Utilities.base64EncodeWebSafe(hash);
}
