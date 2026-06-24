// src/lib/prefs.js — localStorage wrapper for persistent user prefs
// (theme mode, language). Kept separate from AuthStore which is
// sessionStorage-backed and flow-scoped.
window.Prefs = {
  get: function (key, fallback) {
    try { return localStorage.getItem('nimbus:pref:' + key) || fallback; }
    catch (e) { return fallback; }
  },
  set: function (key, val) {
    try { localStorage.setItem('nimbus:pref:' + key, val); } catch (e) {}
  },
};
