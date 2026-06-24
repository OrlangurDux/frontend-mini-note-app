import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useThemeMode, buildTheme } from '../lib/theme';
import { useTranslations } from '../lib/i18n';
import { AppHeader } from './AppHeader';
import { FloatingLayout } from './FloatingLayout';
import { useMemo } from 'react';

// `landing`/`inner` render children directly (full-bleed page); otherwise
// children sit inside the frosted FloatingLayout card (auth forms).
export function AppShell({ variant = 'public', landing, inner, wide, children }) {
  const { mode, toggleMode } = useThemeMode();
  const { lang, toggleLang, t } = useTranslations();
  const theme = useMemo(() => buildTheme(mode), [mode]);

  const ctx = { t, mode, lang, toggleMode, toggleLang };
  const renderChildren = () => (typeof children === 'function' ? children(ctx) : children);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100%', display: 'flex', flexDirection: 'column',
        bgcolor: 'background.default', color: 'text.primary',
      }}>
        <AppHeader
          mode={mode} lang={lang} t={t} variant={variant}
          onToggleTheme={toggleMode} onToggleLang={toggleLang}
        />
        {(landing || inner)
          ? <Box sx={{ flex: 1 }}>{renderChildren()}</Box>
          : <FloatingLayout mode={mode} wide={wide}>{renderChildren()}</FloatingLayout>}
        <Box component="footer" sx={{
          py: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider', color: 'text.secondary',
        }}>
          <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '.02em' }}>
            {t.footer}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
