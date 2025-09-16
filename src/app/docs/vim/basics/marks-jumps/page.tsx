
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 10. Marks & Jumps

| Command | What it does |
|---|---|
| \`m<a>\` | Mark a position with a letter (a, b, c…) |
| \`'a\` | Jump to start of line of mark |
| \`\`a\` | Jump to exact cursor position of mark |

👉 Example: If you are editing a long file, type \`ma\` to mark a spot. Later type \`'a\` to quickly return.
`;

export default function VimMarksJumpsPage() {
    return <MarkdownRenderer markdown={content} />;
}
