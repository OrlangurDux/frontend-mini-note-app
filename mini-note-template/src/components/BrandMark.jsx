// src/components/BrandMark.jsx — Nimbus wordmark + cloud/bolt glyph.
const { Box, Stack, Typography } = window.MUI;

function BrandMark({ mode }) {
  const ink = mode === 'dark' ? '#f4f6fa' : '#0b1220';
  return (
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ userSelect: 'none' }}>
      <Box sx={{
        width: 30, height: 30, borderRadius: '9px',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 60%, #90caf9 100%)',
        boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 4px 12px rgba(25,118,210,.35)',
        display: 'grid', placeItems: 'center',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 16c-1.7 0-3-1.3-3-3s1.3-3 3-3c.2-2.8 2.5-5 5.5-5 2.6 0 4.8 1.7 5.4 4.1.3-.1.7-.1 1.1-.1 2.2 0 4 1.8 4 4s-1.8 4-4 4H5Z"
                fill="#fff" fillOpacity=".95"/>
          <path d="M8.5 13.5v-3l3 3v-3" stroke="#1976d2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', color: ink }}>
        Nimbus
      </Typography>
    </Stack>
  );
}

window.BrandMark = BrandMark;
