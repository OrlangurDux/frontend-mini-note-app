// Strips common markdown syntax down to plain text, for note previews (card
// list) where raw `**bold**`/`# heading` syntax would otherwise show up
// unrendered. Full WYSIWYG rendering happens in the note detail view via
// MarkdownEditor — instantiating a TipTap editor per card would be too
// heavy for a grid of many notes, so this is a cheap regex pass instead.
export function stripMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/```[\s\S]*?```/g, ' ')            // fenced code blocks
    .replace(/`([^`]+)`/g, '$1')                // inline code
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')   // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')    // links
    .replace(/^#{1,6}\s+/gm, '')                // headings
    .replace(/^>\s?/gm, '')                     // blockquotes
    .replace(/^[-*+]\s+/gm, '')                 // bullet list markers
    .replace(/^\d+\.\s+/gm, '')                 // ordered list markers
    .replace(/(\*\*|__)(.*?)\1/g, '$2')         // bold
    .replace(/(\*|_)(.*?)\1/g, '$2')            // italic
    .replace(/~~(.*?)~~/g, '$1')                // strikethrough
    .replace(/\s+/g, ' ')                       // collapse whitespace/newlines
    .trim();
}
