// src/components/landing/NoteMockup.jsx — decorative "sample note" card
// rendered next to the hero. It's purely visual; no real content.
const { Box, Stack, Typography, Chip } = window.MUI;

function NoteMockup({ mode, t }) {
  const isDark = mode === 'dark';
  const surface = isDark ? 'rgba(17,25,43,.85)' : 'rgba(255,255,255,.92)';
  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.08)';

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 460 }}>
      {/* back card (offset) */}
      <Box aria-hidden sx={{
        position: 'absolute', inset: 0, transform: 'translate(18px, 18px) rotate(2deg)',
        borderRadius: 4, border: 1, borderColor: border,
        bgcolor: isDark ? 'rgba(25,118,210,.18)' : 'rgba(144,202,249,.35)',
        boxShadow: isDark ? '0 20px 60px rgba(0,0,0,.4)' : '0 20px 60px rgba(15,23,42,.1)',
      }} />
      {/* mid card (offset) */}
      <Box aria-hidden sx={{
        position: 'absolute', inset: 0, transform: 'translate(9px, 9px) rotate(-1deg)',
        borderRadius: 4, border: 1, borderColor: border,
        bgcolor: isDark ? 'rgba(66,165,245,.10)' : 'rgba(227,242,253,.85)',
      }} />
      {/* top: real note */}
      <Box sx={{
        position: 'relative', borderRadius: 4, border: 1, borderColor: border,
        bgcolor: surface, p: 3,
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        boxShadow: isDark
          ? '0 30px 80px rgba(0,0,0,.55), 0 1px 0 rgba(255,255,255,.06) inset'
          : '0 30px 80px rgba(15,23,42,.14), 0 1px 0 rgba(255,255,255,.8) inset',
      }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#22c55e' }} />
          <Box sx={{ flex: 1 }} />
          <Typography sx={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: 'text.secondary', letterSpacing: '.04em',
          }}>
            {t.lNoteSampleTime}
          </Typography>
        </Stack>

        <Typography sx={{ fontWeight: 700, fontSize: 20, lineHeight: 1.25, mb: 0.5 }}>
          {t.lNoteSampleTitle}
        </Typography>

        <Stack direction="row" spacing={0.75} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.75 }}>
          {t.lNoteSampleTags.map((tag) => (
            <Chip key={tag} label={'#' + tag} size="small" sx={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, height: 22,
              bgcolor: isDark ? 'rgba(66,165,245,.16)' : 'rgba(25,118,210,.10)',
              color: 'primary.main', border: 0,
            }} />
          ))}
        </Stack>

        <Stack spacing={1.25} sx={{ mb: 2 }}>
          {t.lNoteSampleBullets.map((line, i) => (
            <Stack key={i} direction="row" spacing={1.25} alignItems="flex-start">
              <Box sx={{
                mt: '7px', width: 6, height: 6, borderRadius: '50%',
                bgcolor: 'primary.main', flexShrink: 0,
              }} />
              <Typography sx={{ fontSize: 14, color: 'text.primary', lineHeight: 1.55 }}>
                {line}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Box sx={{
          pt: 1.5, borderTop: 1, borderColor: 'divider',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
          color: 'primary.main',
        }}>
          {t.lNoteSampleLink}
        </Box>

        {/* Floating cursor caret */}
        <Box sx={{
          position: 'absolute', bottom: 24, right: 28,
          width: 2, height: 18, bgcolor: 'primary.main',
          animation: 'nimbusCaret 1.1s steps(2, end) infinite',
          '@keyframes nimbusCaret': { '50%': { opacity: 0 } },
        }} />
      </Box>
    </Box>
  );
}

window.NoteMockup = NoteMockup;
