import { STORAGE_KEYS } from '../config';
import { getItem, setItem } from './safeStorage';

// Persistent, non-sensitive user prefs (theme mode, language).
export const Prefs = {
  get(key, fallback) {
    return getItem(STORAGE_KEYS.pref(key), fallback);
  },
  set(key, val) {
    setItem(STORAGE_KEYS.pref(key), val);
  },
};
