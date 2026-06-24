// sessionStorage wrapper for passing short-lived values between screens of
// the same flow (e.g. signup -> mock confirmation), without persisting
// them beyond the browser tab's lifetime.
export const FlowStore = {
  get(key, fallback = '') {
    if (typeof window === 'undefined') return fallback;
    try {
      const v = window.sessionStorage.getItem('nimbus:flow:' + key);
      return v === null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    if (typeof window === 'undefined') return;
    try { window.sessionStorage.setItem('nimbus:flow:' + key, value); } catch (e) { /* ignore */ }
  },
  clear(key) {
    if (typeof window === 'undefined') return;
    try { window.sessionStorage.removeItem('nimbus:flow:' + key); } catch (e) { /* ignore */ }
  },
};
