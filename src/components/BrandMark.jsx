import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function BrandMark({ mode }) {
  const ink = mode === 'dark' ? '#f4f6fa' : '#0b1220';
  return (
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ userSelect: 'none' }}>
      <Box component="img" src="/icons/icon-192.png" alt=""
        sx={{ width: 30, height: 30, borderRadius: '9px', display: 'block' }} />
      <Typography sx={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', color: ink }}>
        MiniNote
      </Typography>
    </Stack>
  );
}
