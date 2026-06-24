// src/components/ScreenHead.jsx — title + optional subtitle + optional
// progress dots for multi-step flows (password reset).
const { Stack, Box, Typography } = window.MUI;

function ScreenHead({ title, subtitle, step, totalSteps }) {
  return (
    <Stack spacing={1}>
      {step != null && totalSteps != null && (
        <Stack direction="row" spacing={0.75} sx={{ mb: 0.5 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <Box key={i} sx={{
              height: 3, flex: 1, borderRadius: 999,
              bgcolor: i <= step ? 'primary.main' : 'action.hover',
              transition: 'background-color .3s',
            }} />
          ))}
        </Stack>
      )}
      <Typography variant="h4" sx={{ fontSize: { xs: 24, sm: 28 }, fontWeight: 700, letterSpacing: '-0.02em' }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ textWrap: 'pretty' }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}

window.ScreenHead = ScreenHead;
