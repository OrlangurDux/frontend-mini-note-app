// WYSIWYG markdown editor with a code/visual toggle, used for the note
// body. Bound to a plain markdown string (`value`/`onChange`) so the rest
// of the app (backend, search, plain-text rendering) keeps working with
// markdown text — TipTap + tiptap-markdown only handle the visual mode.
import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Icon } from '../Icon';

function ToolbarButton({ title, active, onClick, d, sw }) {
  return (
    <Tooltip title={title} arrow>
      <IconButton size="small" onClick={onClick}
        sx={{ color: active ? 'primary.main' : 'text.secondary', bgcolor: active ? 'action.selected' : 'transparent' }}>
        <Icon d={d} size={16} sw={sw || 1.8} />
      </IconButton>
    </Tooltip>
  );
}

export function MarkdownEditor({ t, value, onChange, placeholder }) {
  const [viewMode, setViewMode] = useState('visual');
  const prevMode = useRef(viewMode);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({ html: false, bulletListMarker: '-' }),
    ],
    content: value || '',
    onUpdate: ({ editor: ed }) => onChange(ed.storage.markdown.getMarkdown()),
    editorProps: { attributes: { class: 'nimbus-md-editor' } },
    immediatelyRender: false,
  }, []);

  // Only push the external value back into the editor when switching from
  // code mode into visual mode — not on every keystroke, otherwise
  // round-trip markdown formatting differences would fight the cursor.
  useEffect(() => {
    if (editor && prevMode.current === 'code' && viewMode === 'visual') {
      editor.commands.setContent(value || '', false);
    }
    prevMode.current = viewMode;
  }, [editor, viewMode, value]);

  if (!editor) return null;

  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <Stack direction="row" alignItems="center" spacing={0.25} sx={{
        px: 1, py: 0.5, borderBottom: 1, borderColor: 'divider', bgcolor: 'action.hover', flexWrap: 'wrap', rowGap: 0.5,
      }}>
        {viewMode === 'visual' && (
          <>
            <ToolbarButton title={t.nEdBold} active={editor.isActive('bold')} d="M6 4h7a4 4 0 0 1 0 8H6zM6 12h8a4 4 0 0 1 0 8H6z"
              onClick={() => editor.chain().focus().toggleBold().run()} />
            <ToolbarButton title={t.nEdItalic} active={editor.isActive('italic')} d="M10 4h6M8 20h6M14 4 10 20"
              onClick={() => editor.chain().focus().toggleItalic().run()} />
            <ToolbarButton title={t.nEdH1} active={editor.isActive('heading', { level: 1 })} d="M4 6v12M11 6v12M4 12h7M14 18l4-9v9" sw={1.6}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
            <ToolbarButton title={t.nEdH2} active={editor.isActive('heading', { level: 2 })} d="M4 6v12M11 6v12M4 12h7M14 9c2-2 6-1 6 1s-6 3-6 6h6" sw={1.5}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
            <ToolbarButton title={t.nEdQuote} active={editor.isActive('blockquote')} d="M7 7h4v4c0 3-2 5-4 5M14 7h4v4c0 3-2 5-4 5"
              onClick={() => editor.chain().focus().toggleBlockquote().run()} />
            <ToolbarButton title={t.nEdBullet} active={editor.isActive('bulletList')} d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"
              onClick={() => editor.chain().focus().toggleBulletList().run()} />
            <ToolbarButton title={t.nEdOrdered} active={editor.isActive('orderedList')} d="M9 6h12M9 12h12M9 18h12M5 4v4M4 6h2M4 14h2.5L4 17h2.5" sw={1.5}
              onClick={() => editor.chain().focus().toggleOrderedList().run()} />
            <ToolbarButton title={t.nEdCode} active={editor.isActive('codeBlock')} d="m9 9-4 4 4 4m6-8 4 4-4 4"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
          </>
        )}
        <Box sx={{ flex: 1 }} />
        <ToggleButtonGroup value={viewMode} exclusive size="small" onChange={(_, v) => v && setViewMode(v)}>
          <ToggleButton value="visual" sx={{ textTransform: 'none', px: 1.25, fontSize: 12.5 }}>{t.nEdVisual}</ToggleButton>
          <ToggleButton value="code" sx={{ textTransform: 'none', px: 1.25, fontSize: 12.5 }}>{t.nEdCodeMode}</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {viewMode === 'visual' ? (
        <Box sx={{
          p: 2, fontSize: 14, lineHeight: 1.7, cursor: 'text',
          '& .nimbus-md-editor': { outline: 'none', minHeight: 280 },
          '& .nimbus-md-editor p': { margin: '0 0 0.75em' },
          '& .nimbus-md-editor h1': { fontWeight: 700, fontSize: '1.7em', margin: '0.6em 0 0.4em' },
          '& .nimbus-md-editor h2': { fontWeight: 700, fontSize: '1.35em', margin: '0.6em 0 0.4em' },
          '& .nimbus-md-editor h3': { fontWeight: 600, fontSize: '1.15em', margin: '0.6em 0 0.4em' },
          '& .nimbus-md-editor blockquote': {
            borderLeft: '3px solid', borderColor: 'primary.main', paddingLeft: 12,
            color: 'text.secondary', fontStyle: 'italic', margin: '0.5em 0',
          },
          '& .nimbus-md-editor pre': {
            bgcolor: 'action.hover', borderRadius: 1, p: 1.25,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 13, overflowX: 'auto',
          },
          '& .nimbus-md-editor code': { fontFamily: 'JetBrains Mono, monospace', fontSize: '0.92em' },
          '& .nimbus-md-editor ul, & .nimbus-md-editor ol': { paddingLeft: 24, margin: '0 0 0.75em' },
        }} onClick={() => editor.chain().focus().run()}>
          <EditorContent editor={editor} />
        </Box>
      ) : (
        <TextField value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} multiline minRows={14} fullWidth variant="outlined"
          InputProps={{ sx: { borderRadius: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, lineHeight: 1.7 } }}
          sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 0 } }} />
      )}
    </Box>
  );
}
