
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 4. Editing Text

| Command | What it does |
|---|---|
| \`x\` | Delete character under cursor |
| \`dw\` | Delete a word |
| \`dd\` | Delete a whole line |
| \`2dd\` | Delete 2 lines |
| \`u\` | Undo last action |
| \`Ctrl + r\` | Redo undone change |
| \`yy\` | Copy (yank) a line |
| \`2yy\` | Copy 2 lines |
| \`yw\` | Copy a word |
| \`p\` | Paste after cursor |
| \`P\` | Paste before cursor |
| \`r<char>\` | Replace one character |

👉 Example: If you typed something wrong, press \`u\` to undo it. If you deleted by mistake, press \`Ctrl + r\` to bring it back.
`;

export default function VimEditingPage() {
    return <MarkdownRenderer markdown={content} />;
}
