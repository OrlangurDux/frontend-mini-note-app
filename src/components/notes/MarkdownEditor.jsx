// WYSIWYG markdown editor for the note body, bound to a plain markdown
// string (`value`/`onChange`) so the rest of the app (backend, search,
// plain-text preview) keeps working with markdown text regardless of what
// renders it. Editing goes through MDXEditor (Lexical-based); read-only
// rendering goes through react-markdown instead of MDXEditor's own
// `readOnly` mode, per MDXEditor's own guidance that `readOnly` isn't meant
// for plain content display.
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const EditableMarkdownEditor = dynamic(
  () => import('./MarkdownEditorEditable').then((m) => m.MarkdownEditorEditable),
  { ssr: false, loading: () => <Box sx={{ p: 2, minHeight: 280, color: 'text.secondary', fontSize: 14 }}>…</Box> },
);

const PROSE_SX = {
  '& p': { margin: '0 0 0.75em' },
  '& h1': { fontWeight: 700, fontSize: '1.7em', margin: '0.6em 0 0.4em' },
  '& h2': { fontWeight: 700, fontSize: '1.35em', margin: '0.6em 0 0.4em' },
  '& h3': { fontWeight: 600, fontSize: '1.15em', margin: '0.6em 0 0.4em' },
  '& blockquote': {
    borderLeft: '3px solid', borderColor: 'primary.main', paddingLeft: 12, margin: '0.5em 0 0.5em 0',
    color: 'text.secondary', fontStyle: 'italic',
  },
  '& pre': {
    bgcolor: 'action.hover', borderRadius: 1, p: 1.25,
    fontFamily: 'JetBrains Mono, monospace', fontSize: 13, overflowX: 'auto',
  },
  '& code': { fontFamily: 'JetBrains Mono, monospace', fontSize: '0.92em' },
  '& pre code': { fontSize: 13 },
  '& ul, & ol': { paddingLeft: 24, margin: '0 0 0.75em' },
  '& table': { borderCollapse: 'collapse', width: '100%', margin: '0 0 0.75em' },
  '& th, & td': { border: '1px solid', borderColor: 'divider', padding: '4px 8px', textAlign: 'left' },
  '& a': { color: 'primary.main' },
};

export function MarkdownEditor({ mode, value, onChange, placeholder, editable = true }) {
  if (!editable) {
    return (
      <Box sx={{ fontSize: 14, lineHeight: 1.7, ...PROSE_SX }}>
        {value
          ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          : <Typography variant="body2" color="text.secondary">—</Typography>}
      </Box>
    );
  }

  return <EditableMarkdownEditor mode={mode} value={value} onChange={onChange} placeholder={placeholder} />;
}
