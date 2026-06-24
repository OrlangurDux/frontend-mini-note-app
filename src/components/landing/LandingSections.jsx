import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Icon } from '../Icon';

function Eyebrow({ children }) {
  return (
    <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: 'primary.main', mb: 1.5 }}>
      {children}
    </Typography>
  );
}

function SectionHeading({ eyebrow, title, sub, align = 'left' }) {
  return (
    <Stack spacing={1.25} sx={{ textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start', mb: { xs: 4, md: 6 } }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: 28, md: 36 }, lineHeight: 1.15, maxWidth: 720 }}>{title}</Typography>
      {sub ? <Typography sx={{ color: 'text.secondary', fontSize: 16, maxWidth: 620, lineHeight: 1.55 }}>{sub}</Typography> : null}
    </Stack>
  );
}

function FeatureCard({ mode, icon, title, body }) {
  return (
    <Paper elevation={0} sx={{
      p: 3, height: '100%', borderRadius: 3, border: 1,
      borderColor: mode === 'dark' ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.08)',
      bgcolor: mode === 'dark' ? 'rgba(17,25,43,.5)' : 'rgba(255,255,255,.7)',
      backdropFilter: 'blur(6px)',
      transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
      '&:hover': {
        transform: 'translateY(-2px)', borderColor: 'primary.main',
        boxShadow: mode === 'dark' ? '0 20px 40px rgba(0,0,0,.4)' : '0 20px 40px rgba(25,118,210,.10)',
      },
    }}>
      <Box sx={{
        width: 40, height: 40, borderRadius: 2, mb: 2,
        bgcolor: mode === 'dark' ? 'rgba(66,165,245,.16)' : 'rgba(25,118,210,.10)',
        color: 'primary.main', display: 'grid', placeItems: 'center',
      }}>{icon}</Box>
      <Typography sx={{ fontWeight: 700, fontSize: 17, mb: 0.75, letterSpacing: '-0.01em' }}>{title}</Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 14.5, lineHeight: 1.55 }}>{body}</Typography>
    </Paper>
  );
}

export function FeaturesSection({ mode, t }) {
  const items = [
    { icon: <Icon d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" sw={1.6} />, title: t.lFeat1T, body: t.lFeat1B },
    { icon: <Icon d="M4 6h16M4 12h12M4 18h16" sw={2} />, title: t.lFeat2T, body: t.lFeat2B },
    { icon: <Icon d="m21 21-4.3-4.3"><circle cx="11" cy="11" r="7" /></Icon>, title: t.lFeat3T, body: t.lFeat3B },
    { icon: <Icon d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5" />, title: t.lFeat4T, body: t.lFeat4B },
    { icon: <Icon d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4ZM9 12l2 2 4-4" />, title: t.lFeat5T, body: t.lFeat5B },
    { icon: <Icon d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />, title: t.lFeat6T, body: t.lFeat6B },
  ];
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionHeading eyebrow={t.lFeaturesEyebrow} title={t.lFeaturesTitle} sub={t.lFeaturesSub} />
        <Grid container spacing={2.5}>
          {items.map((it) => (
            <Grid key={it.title} item xs={12} sm={6} md={4}>
              <FeatureCard mode={mode} {...it} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export function WorkflowSection({ mode, t }) {
  const steps = [
    { n: '01', title: t.lFlow1T, body: t.lFlow1B },
    { n: '02', title: t.lFlow2T, body: t.lFlow2B },
    { n: '03', title: t.lFlow3T, body: t.lFlow3B },
  ];
  return (
    <Box component="section" sx={{
      py: { xs: 8, md: 12 }, borderTop: 1, borderBottom: 1, borderColor: 'divider',
      bgcolor: mode === 'dark' ? 'rgba(11,18,32,.4)' : 'rgba(246,248,251,.7)',
    }}>
      <Container maxWidth="lg">
        <SectionHeading eyebrow={t.lFlowEyebrow} title={t.lFlowTitle} />
        <Grid container spacing={4}>
          {steps.map((s) => (
            <Grid key={s.n} item xs={12} md={4}>
              <Stack spacing={1.5}>
                <Stack direction="row" alignItems="baseline" spacing={1.5}>
                  <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'primary.main', fontWeight: 600 }}>{s.n}</Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: 'divider' }} />
                </Stack>
                <Typography sx={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em' }}>{s.title}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 15, lineHeight: 1.6 }}>{s.body}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export function StatsQuoteSection({ mode, t }) {
  const stats = [
    { n: t.lStat1n, l: t.lStat1 },
    { n: t.lStat2n, l: t.lStat2 },
    { n: t.lStat3n, l: t.lStat3 },
    { n: t.lStat4n, l: t.lStat4 },
  ];
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {stats.map((s) => (
                <Grid key={s.l} item xs={6}>
                  <Box sx={{
                    p: 2.5, height: '100%', borderRadius: 3, border: 1, borderColor: 'divider',
                    bgcolor: mode === 'dark' ? 'rgba(17,25,43,.4)' : 'rgba(255,255,255,.7)',
                  }}>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: 28, md: 34 }, letterSpacing: '-0.02em', color: 'primary.main', fontFamily: 'JetBrains Mono, monospace' }}>{s.n}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>{s.l}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{
              p: { xs: 3, md: 4 }, height: '100%', borderRadius: 3, border: 1, borderColor: 'divider',
              bgcolor: mode === 'dark' ? 'rgba(25,118,210,.10)' : 'rgba(227,242,253,.4)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <Box sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'primary.main', fontSize: 28, lineHeight: 1, mb: 1 }}>&ldquo;</Box>
              <Typography sx={{ fontSize: { xs: 18, md: 20 }, lineHeight: 1.5, fontWeight: 500, mb: 2.5, letterSpacing: '-0.01em' }}>{t.lQuote}</Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1976d2, #90caf9)',
                  display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 14,
                }}>
                  {t.lQuoteWho.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                </Box>
                <Stack spacing={0}>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{t.lQuoteWho}</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 12.5 }}>{t.lQuoteRole}</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export function CtaBand({ mode, t }) {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{
          p: { xs: 4, md: 6 }, borderRadius: 4,
          border: 1, borderColor: mode === 'dark' ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.08)',
          background: mode === 'dark'
            ? 'linear-gradient(135deg, rgba(25,118,210,.25), rgba(11,18,32,.6))'
            : 'linear-gradient(135deg, rgba(227,242,253,.9), rgba(255,255,255,.95))',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <Box sx={{ position: 'relative' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: 26, md: 34 }, letterSpacing: '-0.02em', mb: 1.5 }}>{t.lCtaTitle}</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 16, mb: 4, maxWidth: 560, mx: 'auto' }}>{t.lCtaSub}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
              <Link href="/signup" style={{ textDecoration: 'none' }}>
                <Button variant="contained" disableElevation size="large" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 3.5, py: 1.25, fontSize: 15 }}>{t.lCtaPrimary}</Button>
              </Link>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="large" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 3.5, py: 1.25, fontSize: 15 }}>{t.lCtaSecondary}</Button>
              </Link>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
