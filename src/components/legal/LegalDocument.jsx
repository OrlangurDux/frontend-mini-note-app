import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// Shared renderer for the cookie/privacy/personal-data policy pages —
// content is plain data (see lib/legal/*.js) so the three documents (each
// in two languages) share one consistent look instead of three ad-hoc
// screens.
export function LegalDocument({ mode, t, doc, relatedLinks }) {
  return (
    <Box sx={{
      flex: 1, bgcolor: 'background.default',
      backgroundImage: mode === 'dark'
        ? 'radial-gradient(1000px 600px at 90% 0%, rgba(25,118,210,.10), transparent 60%)'
        : 'radial-gradient(1000px 600px at 90% 0%, rgba(144,202,249,.18), transparent 60%)',
    }}>
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
        <Box sx={{
          bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 4,
          p: { xs: 3, sm: 5 },
          boxShadow: mode === 'dark' ? '0 24px 60px rgba(0,0,0,.45)' : '0 24px 60px rgba(15,23,42,.06)',
        }}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4" sx={{ fontSize: { xs: 26, sm: 32 }, fontWeight: 700, letterSpacing: '-0.02em' }}>
                {doc.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {t.legalUpdated}: {doc.updated}
              </Typography>
              {doc.intro && (
                <Typography sx={{ color: 'text.secondary', pt: 1, lineHeight: 1.7 }}>{doc.intro}</Typography>
              )}
            </Stack>

            <Stack spacing={2.5}>
              {doc.sections.map((s, i) => (
                <Stack key={i} spacing={1}>
                  {s.heading && (
                    <Typography variant="h6" sx={{ fontSize: 17, fontWeight: 700 }}>{s.heading}</Typography>
                  )}
                  {(s.body || []).map((p, j) => (
                    <Typography key={j} sx={{ lineHeight: 1.7 }}>{p}</Typography>
                  ))}
                  {s.list && (
                    <Box component="ul" sx={{ m: 0, pl: 3 }}>
                      {s.list.map((item, j) => (
                        <Typography key={j} component="li" sx={{ lineHeight: 1.7, mb: 0.5 }}>{item}</Typography>
                      ))}
                    </Box>
                  )}
                  {(s.after || []).map((p, j) => (
                    <Typography key={'a' + j} sx={{ lineHeight: 1.7 }}>{p}</Typography>
                  ))}
                </Stack>
              ))}
            </Stack>

            {relatedLinks && relatedLinks.length > 0 && (
              <Stack direction="row" spacing={2} sx={{ pt: 2, borderTop: 1, borderColor: 'divider', flexWrap: 'wrap', rowGap: 1 }}>
                {relatedLinks.map((l) => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 600 }}>{l.label}</Link>
                ))}
              </Stack>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
