import { useCallback, useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { Prefs } from './prefs';

export function buildTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      background: mode === 'dark'
        ? { default: '#0b1220', paper: '#111a2b' }
        : { default: '#f6f8fb', paper: '#ffffff' },
      text: mode === 'dark'
        ? { primary: '#e8edf5', secondary: 'rgba(232,237,245,.66)' }
        : { primary: '#0b1220', secondary: 'rgba(15,23,42,.62)' },
      divider: mode === 'dark' ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.08)',
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 700, letterSpacing: '-0.015em' },
      h6: { fontWeight: 600, letterSpacing: '-0.01em' },
      button: { fontWeight: 600 },
    },
  });
}

export function useThemeMode() {
  // Always start from the same default the server rendered ('light'); the
  // real stored preference is only applied after mount (client-only), so
  // SSR and the first client render stay in sync and React doesn't flag a
  // hydration mismatch.
  const [mode, setModeState] = useState('light');
  useEffect(() => { setModeState(Prefs.get('mode', 'light')); }, []);
  const setMode = useCallback((v) => { setModeState(v); Prefs.set('mode', v); }, []);
  const toggleMode = useCallback(() => {
    setModeState((cur) => {
      const next = cur === 'dark' ? 'light' : 'dark';
      Prefs.set('mode', next);
      return next;
    });
  }, []);
  return { mode, setMode, toggleMode };
}
