
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 3. Typing Text (Insert Mode)

| Command | What it does |
|---|---|
| \`i\` | Start typing before cursor |
| \`I\` | Start typing at beginning of line |
| \`a\` | Start typing after cursor |
| \`A\` | Start typing at end of line |
| \`o\` | Create new line below and type |
| \`O\` | Create new line above and type |
| \`R\` | Replace text while typing |

👉 Example: If you want to add a note below the current line, press \`o\`, and a new line opens where you can type.
`;

export default function VimInsertModePage() {
    return <MarkdownRenderer markdown={content} />;
}
