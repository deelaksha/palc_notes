
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 7. File Commands

| Command | What it does |
|---|---|
| \`:w\` | Save file |
| \`:q\` | Quit |
| \`:wq\` | Save and quit |
| \`ZZ\` | Save and quit (alternative) |
| \`:q!\` | Quit without saving |
| \`:x\` | Save and quit (same as \`:wq\`) |
| \`:e filename\` | Open another file |
| \`:saveas newfile\` | Save as new file |

👉 Example: If you edited a file and want to quit, type \`:wq\`. If you don’t want to save, type \`:q!\`.
`;

export default function VimFileCommandsPage() {
    return <MarkdownRenderer markdown={content} />;
}
