
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 8. Managing Buffers

A "buffer" is a file loaded into Vim's memory for editing. You can have many files open at once, each in its own buffer.

| Command | What it does |
|---|---|
| \`:ls\` or \`:buffers\` | **L**i**s**t all open buffers. |
| \`:b <number or name>\` | Go to a specific **b**uffer by its number or partial name. |
| \`:bn\` | Go to the **b**uffer **n**ext. |
| \`:bp\` | Go to the **b**uffer **p**revious. |
| \`:bd\` | **D**elete (close) the current **b**uffer. |
| \`:b#\` | Switch to the previously open buffer (the one with the # symbol in \`:ls\`). |

👉 Example: Type \`:ls\` to see all open files. If \`notes.txt\` is buffer 2, you can jump to it with \`:b 2\` or \`:b notes\`.
`;

export default function VimBuffersPage() {
    return <MarkdownRenderer markdown={content} />;
}
