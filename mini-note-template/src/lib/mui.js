// src/lib/mui.js — resolve the MUI UMD export and expose it globally.
// The UMD bundle attaches to window.MaterialUI; older builds used
// window['material-ui']. Keep both fallbacks so a single <script> include
// covers either version.
(function () {
  var MUI = window.MaterialUI || window['material-ui'];
  if (!MUI) {
    console.error('[mui] MUI UMD not loaded. Check the <script> tag for @mui/material.');
    return;
  }
  window.MUI = MUI;
})();
