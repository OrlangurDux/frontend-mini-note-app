// Parses an `otpauth://totp/...` URL (as returned by PUT /users/tfa) into
// the pieces needed for manual entry when the user can't scan the QR code.
export function parseOtpAuthUrl(url) {
  try {
    const u = new URL(url);
    const label = decodeURIComponent(u.pathname.replace(/^\/+/, ''));
    const sep = label.indexOf(':');
    const issuerFromLabel = sep === -1 ? '' : label.slice(0, sep);
    const account = sep === -1 ? label : label.slice(sep + 1);
    return {
      secret: u.searchParams.get('secret') || '',
      issuer: u.searchParams.get('issuer') || issuerFromLabel,
      account,
    };
  } catch (e) {
    return { secret: '', issuer: '', account: '' };
  }
}

// Groups a secret into 4-character chunks — the usual way authenticator
// apps display a key for manual entry, easier to read/type than one block.
export function formatSecret(secret) {
  return (secret || '').replace(/(.{4})/g, '$1 ').trim();
}
