// Tracks the visitor's cookie/local-storage consent choice. MiniNote sets
// no tracking, analytics, or advertising cookies — the only thing gated
// behind consent is the "preferences" bucket (remembering theme/language
// across visits, see lib/prefs.js). Everything else the app stores
// locally (auth session, selected server, offline note cache) is strictly
// necessary for the app to function and isn't gated.
//
// The decision itself is recorded in localStorage (not a cookie) so the
// site never needs to set an actual cookie just to remember your answer —
// storing that choice is itself "strictly necessary" and doesn't require
// consent (GDPR/ePrivacy recital 66; same logic under 152-FZ).
import { STORAGE_KEYS } from '../config';
import { getJSON, setJSON } from './safeStorage';

// Bump this if the cookie/privacy policy text changes in a way that
// should re-prompt users who already made a choice under the old text.
export const CONSENT_VERSION = 1;

export function getConsent() {
  const record = getJSON(STORAGE_KEYS.cookieConsent, null);
  if (!record || record.v !== CONSENT_VERSION) return null;
  return record;
}

export function hasConsentDecision() {
  return getConsent() !== null;
}

export function hasPreferencesConsent() {
  return getConsent()?.preferences === true;
}

export function setConsent(preferences) {
  const record = { v: CONSENT_VERSION, preferences: !!preferences, decidedAt: new Date().toISOString() };
  setJSON(STORAGE_KEYS.cookieConsent, record);
  return record;
}
