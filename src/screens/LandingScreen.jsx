import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Icon } from '../components/Icon';
import { NoteMockup } from '../components/landing/NoteMockup';
import { FeaturesSection, WorkflowSection, StatsQuoteSection, CtaBand } from '../components/landing/LandingSections';

function HeroSection({ mode, t }) {
  return (
    <Box component="section" sx={{
      position: 'relative', overflow: 'hidden', pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 },
      background: mode === 'dark'
        ? 'radial-gradient(1200px 700px at 20% 110%, rgba(25,118,210,.25), transparent 55%), radial-gradient(900px 600px at 90% 0%, rgba(66,165,245,.18), transparent 60%)'
        : 'radial-gradient(1200px 700px at 20% 110%, rgba(25,118,210,.12), transparent 55%), radial-gradient(900px 600px at 90% 0%, rgba(144,202,249,.25), transparent 60%)',
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 6, md: 5 }} alignItems="center">
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
              <Chip label={t.lHeroEyebrow} size="small" sx={{
                fontFamily: 'JetBrains Mono, monospace',
                bgcolor: mode === 'dark' ? 'rgba(66,165,245,.16)' : 'rgba(25,118,210,.10)',
                color: 'primary.main', fontWeight: 600, letterSpacing: '.04em',
              }} />
            </Stack>
            <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: '-0.03em', fontSize: { xs: 38, sm: 48, md: 60 }, lineHeight: 1.05, mb: 2.5 }}>
              {t.lHeroTitle}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: { xs: 16, md: 18 }, lineHeight: 1.55, maxWidth: 560, mb: 4 }}>
              {t.lHeroSub}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3.5 }}>
              <Link href="/signup" style={{ textDecoration: 'none' }}>
                <Button variant="contained" disableElevation size="large" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 3.5, py: 1.25, fontSize: 15 }}>{t.lHeroCta}</Button>
              </Link>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button variant="text" size="large" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 2, py: 1.25, fontSize: 15 }}>{t.lHeroAlt} →</Button>
              </Link>
            </Stack>
            <Stack direction="row" spacing={2.5} flexWrap="wrap" useFlexGap sx={{ rowGap: 1 }}>
              {t.lHeroBadges.map((b) => (
                <Stack key={b} direction="row" spacing={0.75} alignItems="center">
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: 'primary.main', display: 'grid', placeItems: 'center' }}>
                    <Icon d="M5 12.5 10 17.5 19 7.5" size={11} sw={2.5} stroke="#fff" />
                  </Box>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{b}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, width: { xs: '100%', md: 'auto' } }}>
            <NoteMockup mode={mode} t={t} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export function LandingScreen({ t, mode }) {
  return (
    <Box>
      <HeroSection mode={mode} t={t} />
      <FeaturesSection mode={mode} t={t} />
      <WorkflowSection mode={mode} t={t} />
      <StatsQuoteSection mode={mode} t={t} />
      <CtaBand mode={mode} t={t} />
    </Box>
  );
}
