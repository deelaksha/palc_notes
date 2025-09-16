
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 5. Searching & Replacing

| Command | What it does |
|---|---|
| \`/word\` | Search forward for “word” |
| \`?word\` | Search backward for “word” |
| \`n\` | Jump to next match |
| \`N\` | Jump to previous match |
| \`:%s/old/new/g\` | Replace all “old” with “new” |% - range | s - Stands for substitute (replace).| g - Stands for global
| \`:%s/old/new/gc\` | Replace with confirmation | c - confirmation for each word

👉 Example: Type \`/error\` to find the word “error” in your file. Press \`n\` to go to the next match.

👉 Example: If your file has many “cat” words, \`:%s/cat/dog/g\` changes all cats into dogs.
`;

export default function VimSearchingPage() {
    return <MarkdownRenderer markdown={content} />;
}
