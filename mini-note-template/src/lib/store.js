// src/lib/store.js — tiny sessionStorage wrapper for passing email/name
// between screens during a flow.
window.AuthStore = {
  get: function (key, fallback) {
    if (fallback === undefined) fallback = '';
    try { return sessionStorage.getItem('nimbus:' + key) || fallback; }
    catch (e) { return fallback; }
  },
  set: function (key, val) {
    try { sessionStorage.setItem('nimbus:' + key, val); } catch (e) {}
  },
  clear: function (key) {
    try { sessionStorage.removeItem('nimbus:' + key); } catch (e) {}
  },
};
