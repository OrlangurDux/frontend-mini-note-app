// src/components/CodeInput.jsx — 6-digit OTP-style input with auto-advance,
// paste, and backspace-back-navigation.
const { Stack, Box } = window.MUI;

function CodeInput({ value, onChange, error }) {
  const [digits, setDigits] = React.useState(() => {
    const d = Array(6).fill('');
    for (let i = 0; i < Math.min(6, value.length); i++) d[i] = value[i];
    return d;
  });
  const refs = React.useRef([]);
  React.useEffect(() => { onChange(digits.join('')); }, [digits]);

  const setAt = (i, v) => {
    const clean = v.replace(/\D/g, '').slice(-1);
    setDigits(prev => { const next = [...prev]; next[i] = clean; return next; });
    if (clean && i < 5) refs.current[i + 1]?.focus();
  };
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === 'ArrowRight' && i < 5) refs.current[i + 1]?.focus();
  };
  const onPaste = (i, e) => {
    const paste = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
    if (!paste) return;
    e.preventDefault();
    const next = Array(6).fill('');
    for (let k = 0; k < paste.length; k++) next[k] = paste[k];
    setDigits(next);
    refs.current[Math.min(paste.length, 5)]?.focus();
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="space-between">
      {digits.map((d, i) => (
        <Box key={i} component="input" inputMode="numeric" maxLength={1} value={d}
             ref={(el) => (refs.current[i] = el)}
             onChange={(e) => setAt(i, e.target.value)}
             onKeyDown={(e) => onKey(i, e)}
             onPaste={(e) => onPaste(i, e)}
             sx={{
               width: { xs: 42, sm: 48 }, height: { xs: 52, sm: 58 },
               textAlign: 'center',
               fontFamily: 'JetBrains Mono, ui-monospace, monospace',
               fontSize: { xs: 20, sm: 22 }, fontWeight: 600,
               border: 1, borderColor: error ? 'error.main' : 'divider',
               borderRadius: 2, bgcolor: 'background.paper', color: 'text.primary',
               outline: 'none', transition: 'border-color .15s, box-shadow .15s',
               '&:focus': { borderColor: 'primary.main', boxShadow: '0 0 0 3px rgba(25,118,210,.18)' },
             }}
        />
      ))}
    </Stack>
  );
}

window.CodeInput = CodeInput;
