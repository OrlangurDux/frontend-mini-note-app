import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useThemeMode, buildTheme } from '../lib/theme';
import { useTranslations } from '../lib/i18n';
import { AppHeader } from './AppHeader';
import { FloatingLayout } from './FloatingLayout';
import { CookieConsentBanner } from './CookieConsentBanner';
import { useMemo, useState } from 'react';

// `landing`/`inner` render children directly (full-bleed page); otherwise
// children sit inside the frosted FloatingLayout card (auth forms).
export function AppShell({ variant = 'public', landing, inner, wide, children }) {
  const { mode, toggleMode } = useThemeMode();
  const { lang, toggleLang, t } = useTranslations();
  const theme = useMemo(() => buildTheme(mode), [mode]);
  // Bumped by the footer's "Cookie settings" link to reopen the consent
  // banner even after a decision was already recorded.
  const [cookieReopenToken, setCookieReopenToken] = useState(0);

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
          <Stack spacing={0.75} alignItems="center">
            <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '.02em' }}>
              {t.footer}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ fontSize: 12 }}>
              <Link href="/cookies" style={{ color: 'inherit' }}>{t.footerCookies}</Link>
              <Link href="/privacy" style={{ color: 'inherit' }}>{t.footerPrivacy}</Link>
              <Link href="/personal-data" style={{ color: 'inherit' }}>{t.footerPersonalData}</Link>
              <Box component="button" onClick={() => setCookieReopenToken((n) => n + 1)}
                sx={{
                  font: 'inherit', color: 'inherit', background: 'none', border: 0, p: 0,
                  cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2,
                }}>
                {t.footerCookieSettings}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <CookieConsentBanner t={t} reopenToken={cookieReopenToken} />
    </ThemeProvider>
  );
}
