// src/screens/LandingScreen.jsx — index.html (marketing) page.
// Composes Hero + NoteMockup + the section components from
// components/landing/LandingSections.jsx. Reuses AppShell's chrome via
// the `landing` prop (no FloatingLayout wrapping).
const { Box, Container, Stack, Typography, Button, Chip } = window.MUI;

function HeroSection({ mode, t }) {
  return (
    <Box component="section" sx={{
      position: 'relative', overflow: 'hidden',
      pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 },
      background: mode === 'dark'
        ? 'radial-gradient(1200px 700px at 20% 110%, rgba(25,118,210,.25), transparent 55%), radial-gradient(900px 600px at 90% 0%, rgba(66,165,245,.18), transparent 60%)'
        : 'radial-gradient(1200px 700px at 20% 110%, rgba(25,118,210,.12), transparent 55%), radial-gradient(900px 600px at 90% 0%, rgba(144,202,249,.25), transparent 60%)',
    }}>
      {/* dotted grid backdrop */}
      <Box aria-hidden sx={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: mode === 'dark'
          ? 'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)'
          : 'linear-gradient(rgba(15,23,42,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.045) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 6, md: 5 }} alignItems="center">
          {/* copy */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
              <Chip label={t.lHeroEyebrow} size="small" sx={{
                fontFamily: 'JetBrains Mono, monospace',
                bgcolor: mode === 'dark' ? 'rgba(66,165,245,.16)' : 'rgba(25,118,210,.10)',
                color: 'primary.main', fontWeight: 600,
                letterSpacing: '.04em',
              }} />
            </Stack>
            <Typography variant="h2" sx={{
              fontWeight: 700, letterSpacing: '-0.03em',
              fontSize: { xs: 38, sm: 48, md: 60 }, lineHeight: 1.05,
              mb: 2.5,
            }}>
              {t.lHeroTitle}
            </Typography>
            <Typography sx={{
              color: 'text.secondary',
              fontSize: { xs: 16, md: 18 }, lineHeight: 1.55,
              maxWidth: 560, mb: 4,
            }}>
              {t.lHeroSub}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3.5 }}>
              <Button {...window.Router.linkTo('signup.html')}
                      variant="contained" disableElevation size="large"
                      sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 3.5, py: 1.25, fontSize: 15 }}>
                {t.lHeroCta}
              </Button>
              <Button {...window.Router.linkTo('login.html')}
                      variant="text" size="large"
                      sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 2, py: 1.25, fontSize: 15 }}>
                {t.lHeroAlt} →
              </Button>
            </Stack>
            <Stack direction="row" spacing={2.5} flexWrap="wrap" useFlexGap sx={{ rowGap: 1 }}>
              {t.lHeroBadges.map((b) => (
                <Stack key={b} direction="row" spacing={0.75} alignItems="center">
                  <Box sx={{
                    width: 16, height: 16, borderRadius: '50%',
                    bgcolor: 'primary.main', display: 'grid', placeItems: 'center',
                  }}>
                    <window.Icon d="M5 12.5 10 17.5 19 7.5" size={11} sw={2.5} stroke="#fff" />
                  </Box>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{b}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* note mockup */}
          <Box sx={{
            flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' },
            width: { xs: '100%', md: 'auto' },
          }}>
            <window.NoteMockup mode={mode} t={t} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

function LandingScreen({ t, mode }) {
  return (
    <Box data-screen-label="00 Landing">
      <HeroSection mode={mode} t={t} />
      <window.FeaturesSection mode={mode} t={t} />
      <window.WorkflowSection mode={mode} t={t} />
      <window.StatsQuoteSection mode={mode} t={t} />
      <window.CtaBand mode={mode} t={t} />
    </Box>
  );
}

window.LandingScreen = LandingScreen;
