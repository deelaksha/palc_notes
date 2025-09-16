
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 2. Moving Around (Navigation)

Use these keys like arrow keys:

| Command | What it does |
|---|---|
| \`h\` | Move left |
| \`l\` | Move right |
| \`j\` | Move down |
| \`k\` | Move up |
| \`0\` | Jump to beginning of line |
| \`^\` | Jump to first word in line |
| \`$\` | Jump to end of line |
| \`w\` | Jump forward word by word |
| \`b\` | Jump backward word by word |
| \`gg\` | Go to top of file |
| \`G\` | Go to bottom of file |
| \`1G\` | Go to top of file (alternative) |
| \`Ctrl + d\` | Scroll down half a screen |
| \`Ctrl + u\` | Scroll up half a screen |

👉 Example: If your file is very long, \`gg\` takes you to the top and \`G\` takes you to the end.
`;

export default function VimNavigationPage() {
    return <MarkdownRenderer markdown={content} />;
}
