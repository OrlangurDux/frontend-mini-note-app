import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function scorePassword(pw) {
  if (!pw) return -1;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length < 8) return 0;
  return Math.min(4, score);
}

export function StrengthMeter({ value, labels }) {
  const score = scorePassword(value);
  if (score < 0) return null;
  const colors = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#22c55e'];
  return (
    <Stack spacing={0.75} sx={{ mt: -1 }}>
      <Stack direction="row" spacing={0.5}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Box key={i} sx={{
            height: 4, flex: 1, borderRadius: 999,
            bgcolor: i <= score ? colors[score] : 'action.hover',
            transition: 'background-color .25s',
          }} />
        ))}
      </Stack>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{labels[score]}</Typography>
    </Stack>
  );
}
