// Thin guards around localStorage so modules can be imported during SSR
// without touching `window` at import time (only inside function bodies).

export function getItem(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v === null ? fallback : v;
  } catch (e) {
    return fallback;
  }
}

export function setItem(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    /* ignore (private mode, quota, etc.) */
  }
}

export function removeItem(key) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    /* ignore */
  }
}

export function getJSON(key, fallback) {
  const raw = getItem(key, null);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

export function setJSON(key, value) {
  setItem(key, JSON.stringify(value));
}
