// src/components/AppHeader.jsx — sticky top bar with brand, theme & lang
// toggles, and a Sign in/Sign up CTA that flips depending on the active
// screen.
const { AppBar, Toolbar, Box, Container, Stack, Typography, Button, IconButton, Tooltip } = window.MUI;

function AppHeader({ mode, lang, active, t, inner, onToggleTheme, onToggleLang }) {
  const goRegister = () => window.Router.go(active === 'register' ? 'login' : 'signup');
  const goHome = () => { if (inner) { window.location.href = 'index.html'; } else { window.Router.go('login'); } };
  const goApp = () => { window.location.href = 'success.html'; };
  const goSignOut = () => { try { sessionStorage.removeItem('nimbus:email'); } catch (e) {} window.location.href = 'login.html'; };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: 'saturate(180%) blur(14px)',
        WebkitBackdropFilter: 'saturate(180%) blur(14px)',
        backgroundColor: mode === 'dark' ? 'rgba(11,18,32,.72)' : 'rgba(255,255,255,.72)',
        borderBottom: 1,
        borderColor: mode === 'dark' ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 60, sm: 68 }, gap: 2 }}>
          <Box onClick={goHome} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <window.BrandMark mode={mode} />
          </Box>
          <Box sx={{ flex: 1 }} />
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
            <Tooltip title={lang === 'en' ? 'Русский' : 'English'} arrow>
              <IconButton size="small" onClick={onToggleLang} aria-label="toggle language" sx={{ color: 'text.secondary' }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: '.08em' }}>
                  {lang === 'en' ? 'RU' : 'EN'}
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title={mode === 'dark' ? 'Light' : 'Dark'} arrow>
              <IconButton size="small" onClick={onToggleTheme} aria-label="toggle theme" sx={{ color: 'text.secondary' }}>
                {mode === 'dark'
                  ? <window.Icon d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4 7 17M17 7l1.4-1.4">
                      <circle cx="12" cy="12" r="4" />
                    </window.Icon>
                  : <window.Icon d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                }
              </IconButton>
            </Tooltip>
            <Box sx={{ width: 1, height: 20, bgcolor: 'divider', mx: { xs: 0.5, sm: 1 } }} />
            {inner ? (
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Button variant="text" onClick={goApp} sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, fontSize: 14, color: 'text.primary' }}>{t.pOpenApp}</Button>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 60%, #90caf9 100%)',
                  display: 'grid', placeItems: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '.02em',
                  cursor: 'pointer',
                  boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 4px 10px rgba(25,118,210,.35)',
                }} onClick={goSignOut} title={t.signOut}>M</Box>
              </Stack>
            ) : (
              <Button
                variant={active === 'register' ? 'outlined' : 'contained'}
                disableElevation
                onClick={goRegister}
                sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 2.25, py: 0.9, fontSize: 14 }}
              >
                {active === 'register' ? t.signIn : t.register}
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

window.AppHeader = AppHeader;
