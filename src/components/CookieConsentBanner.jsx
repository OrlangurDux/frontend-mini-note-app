import { useEffect, useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { hasConsentDecision, setConsent } from '../lib/cookieConsent';

// Modeled on the accept-all / reject-non-essential pattern used by the
// well-known open-source cookie-consent projects (e.g. orestbida's
// CookieConsent) — a single binary choice plus a link to the full policy —
// rather than a multi-category picker, since MiniNote only has one
// optional category (preferences) to begin with. Built natively in MUI
// instead of importing one of those libraries so it follows the app's own
// theme (dark mode, colors) rather than shipping a second, mismatched
// stylesheet.
//
// `reopenToken`: bump this (see AppShell's footer "Cookie settings" link)
// to show the banner again even after a decision was already recorded.
export function CookieConsentBanner({ t, reopenToken }) {
  const [visible, setVisible] = useState(false);

  // Consent lives in localStorage, so the real check only happens after
  // mount (SSR always renders "not visible" to avoid a hydration
  // mismatch) — same pattern as useThemeMode/useTranslations.
  useEffect(() => {
    setVisible(!hasConsentDecision());
  }, []);

  useEffect(() => {
    if (reopenToken) setVisible(true);
  }, [reopenToken]);

  const decide = (preferences) => {
    setConsent(preferences);
    setVisible(false);
  };

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Box sx={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: (theme) => theme.zIndex.snackbar,
        borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper',
        boxShadow: '0 -12px 30px rgba(15,23,42,.12)',
      }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14.5 }}>{t.cookieBannerTitle}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                {t.cookieBannerBody}{' '}
                <Link href="/cookies" style={{ fontWeight: 600 }}>{t.cookieBannerLearnMore}</Link>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
              <Button onClick={() => decide(false)} variant="outlined"
                sx={{ textTransform: 'none', borderRadius: 2, whiteSpace: 'nowrap' }}>
                {t.cookieBannerNecessaryOnly}
              </Button>
              <Button onClick={() => decide(true)} variant="contained" disableElevation
                sx={{ textTransform: 'none', borderRadius: 2, whiteSpace: 'nowrap' }}>
                {t.cookieBannerAcceptAll}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Slide>
  );
}
