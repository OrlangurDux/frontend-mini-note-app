import { STORAGE_KEYS } from '../config';
import { getItem, removeItem, setItem } from './safeStorage';

export const AuthStorage = {
  getToken() {
    return getItem(STORAGE_KEYS.authToken, '');
  },
  getExpiresAt() {
    const v = getItem(STORAGE_KEYS.authExpiresAt, '');
    return v ? Number(v) : 0;
  },
  set(token, expiresIn) {
    setItem(STORAGE_KEYS.authToken, token);
    const n = Number(expiresIn) || 0;
    // The API's `expires_in` is actually an absolute unix timestamp (in
    // seconds) — it matches the JWT's own `exp` claim, not a duration.
    // Guard with a duration fallback in case that ever changes upstream.
    const expiresAt = n > 1e6 ? n * 1000 : Date.now() + Math.max(0, n) * 1000;
    setItem(STORAGE_KEYS.authExpiresAt, String(expiresAt));
  },
  clear() {
    removeItem(STORAGE_KEYS.authToken);
    removeItem(STORAGE_KEYS.authExpiresAt);
  },
  isValid() {
    const token = AuthStorage.getToken();
    if (!token) return false;
    const expiresAt = AuthStorage.getExpiresAt();
    return !expiresAt || Date.now() < expiresAt;
  },
};
