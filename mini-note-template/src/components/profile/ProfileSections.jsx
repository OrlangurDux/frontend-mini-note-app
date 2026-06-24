// src/components/profile/ProfileSections.jsx — all the cards stacked in the right column.
const { Box, Stack, Typography, TextField, Button, Divider, Switch, MenuItem, Chip, LinearProgress, IconButton, Tooltip } = window.MUI;

function Card({ id, title, subtitle, action, children, danger }) {
  return (
    <Box id={id} sx={{
      scrollMarginTop: 88,
      borderRadius: 3, p: { xs: 2.5, sm: 3.5 },
      border: 1, borderColor: danger ? 'error.main' : 'divider',
      bgcolor: 'background.paper',
      boxShadow: '0 6px 20px rgba(15,23,42,.04)',
    }}>
      <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ mb: 2 }}>
        <Stack spacing={0.25} sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: danger ? 'error.main' : 'text.primary' }}>{title}</Typography>
          {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
        </Stack>
        {action}
      </Stack>
      {children}
    </Box>
  );
}

function Row({ label, hint, action, children }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={1.5}
           sx={{ py: 1.5, borderTop: 1, borderColor: 'divider', '&:first-of-type': { borderTop: 0 } }}>
      <Stack spacing={0.25} sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>{label}</Typography>
        {hint && <Typography variant="caption" color="text.secondary">{hint}</Typography>}
      </Stack>
      {children}
      {action}
    </Stack>
  );
}

function AppLogo({ letter, color }) {
  return <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700 }}>{letter}</Box>;
}

function ProfileSections({ t, lang, mode, editing, onToggleLang, onToggleMode }) {
  const inputProps = { sx: { borderRadius: 2 } };
  const fieldProps = editing
    ? { InputProps: inputProps }
    : { InputProps: { ...inputProps, readOnly: true } };
  const usernameProps = editing
    ? { InputProps: { ...inputProps, startAdornment: <Typography sx={{ color: 'text.secondary', mr: 0.5 }}>@</Typography> } }
    : { InputProps: { ...inputProps, readOnly: true, startAdornment: <Typography sx={{ color: 'text.secondary', mr: 0.5 }}>@</Typography> } };
  const ro = fieldProps;

  return (
    <Stack spacing={3}>
      <Card id="about" title={t.pSecAbout} subtitle={t.pSecAboutSub}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label={t.pName} defaultValue={t.pSampleName} fullWidth {...ro} />
            <TextField label={t.pUsername} defaultValue={t.pSampleUser} fullWidth {...usernameProps} />
          </Stack>
          <TextField label={t.pBio} defaultValue={t.pSampleBio} fullWidth multiline minRows={3} helperText={editing ? t.pBioHint : ' '} {...ro} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label={t.pPronouns} defaultValue={t.pSamplePronouns} fullWidth {...ro} />
            <TextField label={t.pLocation} defaultValue={t.pSampleLoc} fullWidth {...ro} />
            <TextField label={t.pWebsite} defaultValue={t.pSampleSite} fullWidth {...ro} />
          </Stack>
        </Stack>
      </Card>

      <Card id="contact" title={t.pSecContact} subtitle={t.pSecContactSub}>
        <Stack spacing={2}>
          <TextField label={t.email} type="email" defaultValue={t.pSampleEmail} fullWidth {...ro} />
          <TextField label={t.pPhone} defaultValue={t.pSamplePhone} fullWidth {...ro} />
        </Stack>
      </Card>

      <Card id="prefs" title={t.pSecPrefs} subtitle={t.pSecPrefsSub}>
        <Row label={t.pLanguage}>
          <TextField select size="small" value={lang} onChange={() => onToggleLang()} sx={{ minWidth: 160 }}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </TextField>
        </Row>
        <Row label={t.pTheme}>
          <TextField select size="small" value={mode} onChange={() => onToggleMode()} sx={{ minWidth: 160 }}>
            <MenuItem value="light">{t.pThemeLight}</MenuItem>
            <MenuItem value="dark">{t.pThemeDark}</MenuItem>
          </TextField>
        </Row>
        <Row label={t.pTimezone}>
          <TextField select size="small" defaultValue="Europe/Berlin" sx={{ minWidth: 200 }}>
            <MenuItem value="Europe/Berlin">Europe/Berlin (UTC+1)</MenuItem>
            <MenuItem value="UTC">UTC</MenuItem>
            <MenuItem value="America/New_York">America/New_York (UTC−5)</MenuItem>
          </TextField>
        </Row>
        <Row label={t.pDateFmt}>
          <TextField select size="small" defaultValue="iso" sx={{ minWidth: 200 }}>
            <MenuItem value="iso">2026-05-06</MenuItem>
            <MenuItem value="eu">06/05/2026</MenuItem>
            <MenuItem value="us">05/06/2026</MenuItem>
          </TextField>
        </Row>
        <Row label={t.pDensity}>
          <TextField select size="small" defaultValue="comfort" sx={{ minWidth: 200 }}>
            <MenuItem value="comfort">{t.pDensityComfort}</MenuItem>
            <MenuItem value="compact">{t.pDensityCompact}</MenuItem>
          </TextField>
        </Row>
      </Card>

      <Card id="security" title={t.pSecSecurity} subtitle={t.pSecSecuritySub}>
        <Row label={t.pPasswordRow} hint={t.pPasswordHint}
             action={<Button variant="outlined" size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pChange}</Button>} />
        <Row label={t.p2faRow} hint={<Stack direction="row" alignItems="center" spacing={0.75}><Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'success.main' }} />{t.p2faOn}</Stack>}
             action={<Button variant="outlined" size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pManage}</Button>} />
        <Row label={t.pSessionsRow} hint={t.pSessionsHint}
             action={<Button variant="outlined" size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pView}</Button>} />
      </Card>

      <Card id="billing" title={t.pSecBilling} subtitle={t.pSecBillingSub}>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ flex: 1 }}>
              <Chip label={t.pPlanName} sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'primary.contrastText' }} />
              <Stack spacing={0}>
                <Typography sx={{ fontSize: 14.5, fontWeight: 600 }}>{t.pPlan}</Typography>
                <Typography variant="caption" color="text.secondary">{t.pPlanPrice}</Typography>
              </Stack>
            </Stack>
            <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pUpgrade}</Button>
          </Stack>
          <Stack spacing={0.75}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">{t.pUsage}</Typography>
              <Typography variant="body2" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'text.secondary' }}>{t.pUsageVal}</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={8.4} sx={{ height: 6, borderRadius: 999 }} />
          </Stack>
        </Stack>
      </Card>

      <Card id="apps" title={t.pSecApps} subtitle={t.pSecAppsSub}>
        {[
          { name: 'Google Calendar', letter: 'G', color: '#ea4335', connected: true,  meta: 'mira@gmail.com' },
          { name: 'Slack',           letter: 'S', color: '#4a154b', connected: true,  meta: 'helix.slack.com' },
          { name: 'Notion',          letter: 'N', color: '#111827', connected: false, meta: '—' },
          { name: 'GitHub',          letter: 'Gh', color: '#24292e', connected: true, meta: '@mira' },
        ].map((a) => (
          <Row key={a.name}
               label={<Stack direction="row" alignItems="center" spacing={1.5}><AppLogo letter={a.letter} color={a.color} /><Stack spacing={0}><Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>{a.name}</Typography><Typography variant="caption" color="text.secondary">{a.meta}</Typography></Stack></Stack>}
               action={<Button variant={a.connected ? 'outlined' : 'contained'} size="small" disableElevation
                               sx={{ textTransform: 'none', borderRadius: 2, color: a.connected ? 'text.secondary' : undefined, borderColor: a.connected ? 'divider' : undefined }}>
                         {a.connected ? t.pDisconnect : t.pConnect}
                       </Button>} />
        ))}
      </Card>

      <Card id="sessions" title={t.pNavSessions} subtitle={t.pSessionsHint}>
        {[
          { dev: t.pSessionWeb,    where: 'Berlin, DE', when: t.pNow,                   here: true },
          { dev: t.pSessionPhone,  where: 'Berlin, DE', when: '2 ' + t.pHrs,            here: false },
          { dev: t.pSessionTablet, where: 'Munich, DE', when: '3 ' + t.pDays,           here: false },
        ].map((s) => (
          <Row key={s.dev}
               label={<Stack direction="row" alignItems="center" spacing={1.25}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: s.here ? 'success.main' : 'text.disabled' }} />
                        <Typography sx={{ fontSize: 14.5, fontWeight: 500 }}>{s.dev}</Typography>
                        {s.here && <Chip size="small" label={t.pSessionThis} sx={{ height: 20, fontSize: 11 }} />}
                      </Stack>}
               hint={<Typography variant="caption" color="text.secondary">{`${s.where} · ${s.when}`}</Typography>}
               action={!s.here && <Button variant="text" size="small" sx={{ textTransform: 'none', color: 'error.main' }}>{t.signOut}</Button>} />
        ))}
      </Card>

      <Card id="danger" title={t.pSecDanger} subtitle={t.pSecDangerSub} danger>
        <Row label={t.pExport} hint={t.pExportHint}
             action={<Button variant="outlined" size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pExport.split(' ')[0]}</Button>} />
        <Row label={t.pSignOutAll} hint={t.pSignOutHint}
             action={<Button variant="outlined" size="small" color="warning" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.signOut}</Button>} />
        <Row label={t.pDelete} hint={t.pDeleteHint}
             action={<Button variant="outlined" size="small" color="error" sx={{ textTransform: 'none', borderRadius: 2 }}>{t.pDelete}</Button>} />
      </Card>
    </Stack>
  );
}

window.ProfileSections = ProfileSections;
