import { STORAGE_KEYS } from '../config';
import { getItem, setItem } from './safeStorage';
import { hasPreferencesConsent } from './cookieConsent';

// Persistent, non-sensitive user prefs (theme mode, language). Gated on
// the "preferences" cookie-consent category (see cookieConsent.js /
// CookieConsentBanner) — without that consent, a toggle still updates the
// UI for the current session (the caller keeps its own React state) but
// doesn't persist, so it reverts on reload instead of being written to
// local storage.
export const Prefs = {
  get(key, fallback) {
    return getItem(STORAGE_KEYS.pref(key), fallback);
  },
  set(key, val) {
    if (!hasPreferencesConsent()) return;
    setItem(STORAGE_KEYS.pref(key), val);
  },
};
