
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 9. Working with Windows & Tabs

| Command | What it does |
|---|---|
| \`:split filename\` | Open file in new horizontal window |
| \`:vsplit filename\` | Open file in new vertical window |
| \`Ctrl + w, w\` | Switch between windows |
| \`:tabnew filename\` | Open file in new tab |
| \`gt\` | Next tab |
| \`gT\` | Previous tab |

👉 Example: If you want to compare two files, use \`:vsplit file2.txt\` and both files show side by side.
`;

export default function VimWindowsTabsPage() {
    return <MarkdownRenderer markdown={content} />;
}
