// The actual MDXEditor instance — split into its own file and loaded via
// `next/dynamic({ ssr: false })` from MarkdownEditor.jsx, because MDXEditor
// (built on Lexical) touches the DOM while initializing and isn't safe to
// render on the server.
import { useEffect, useRef } from 'react';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  markdownShortcutPlugin,
  diffSourcePlugin,
  toolbarPlugin,
  DiffSourceToggleWrapper,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  BlockTypeSelect,
  ListsToggle,
  CreateLink,
  InsertCodeBlock,
  InsertThematicBreak,
  Separator,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import Box from '@mui/material/Box';

const CODE_LANGUAGES = {
  '': 'Plain text', js: 'JavaScript', jsx: 'JSX', ts: 'TypeScript', tsx: 'TSX',
  css: 'CSS', json: 'JSON', bash: 'Bash', python: 'Python', go: 'Go', sql: 'SQL', yaml: 'YAML', html: 'HTML',
};

export function MarkdownEditorEditable({ mode, value, onChange, placeholder }) {
  const ref = useRef(null);
  // Tracks the last value that came out of this editor (via onChange), so
  // the sync effect below can tell "the parent echoed our own edit back
  // down as a prop" apart from "the parent handed us genuinely new content"
  // (switching notes, a post-save reload) — MDXEditor's `markdown` prop is
  // read only once, at mount, so external updates need this explicit push.
  const lastEmitted = useRef(value);

  useEffect(() => {
    if (value !== lastEmitted.current) {
      lastEmitted.current = value;
      ref.current?.setMarkdown(value || '');
    }
  }, [value]);

  const handleChange = (md) => {
    lastEmitted.current = md;
    onChange(md);
  };

  return (
    <Box className={mode === 'dark' ? 'dark-theme' : undefined} sx={{
      border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden',
      '& .mdxeditor': { fontFamily: 'inherit', fontSize: 14 },
      '& .mdxeditor-root-contenteditable': { minHeight: 280 },
    }}>
      <MDXEditor
        ref={ref}
        markdown={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        plugins={[
          headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
          codeMirrorPlugin({ codeBlockLanguages: CODE_LANGUAGES }),
          markdownShortcutPlugin(),
          diffSourcePlugin({ viewMode: 'rich-text' }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper options={['rich-text', 'source']}>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <ListsToggle />
                <Separator />
                <CreateLink />
                <InsertCodeBlock />
                <InsertThematicBreak />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </Box>
  );
}
