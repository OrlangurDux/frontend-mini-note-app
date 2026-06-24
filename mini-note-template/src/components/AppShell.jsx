// src/components/AppShell.jsx — top-level wrapper that installs the MUI
// ThemeProvider + CssBaseline, renders the AppHeader + FloatingLayout +
// footer, and passes `t`, `mode`, `lang` to children via a render-prop.
const { ThemeProvider, CssBaseline, Box, Typography } = window.MUI;

function AppShell({ active, wide, landing, inner, children }) {
  const { mode, toggleMode } = window.useThemeMode();
  const { lang, toggleLang, t } = window.useTranslations();
  const theme = React.useMemo(() => window.buildTheme(mode), [mode]);

  const ctx = { t, mode, lang, toggleMode, toggleLang };
  const renderChildren = () => typeof children === 'function' ? children(ctx) : children;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column',
                 bgcolor: 'background.default', color: 'text.primary' }}>
        <window.AppHeader
          mode={mode} lang={lang} active={active} t={t} inner={inner}
          onToggleTheme={toggleMode} onToggleLang={toggleLang}
        />
        {(landing || inner)
          ? <Box sx={{ flex: 1 }}>{renderChildren()}</Box>
          : <window.FloatingLayout mode={mode} wide={wide}>{renderChildren()}</window.FloatingLayout>
        }
        <Box component="footer" sx={{
          py: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider', color: 'text.secondary',
        }}>
          <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '.02em' }}>
            {t.footer}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

window.AppShell = AppShell;
