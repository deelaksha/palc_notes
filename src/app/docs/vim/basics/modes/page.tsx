
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 1. Modes in Vim

Think of Vim modes like tools in a toolbox:

- **Normal Mode (default)** → move around and give commands.
- **Insert Mode** → type text like a regular editor.
- **Visual Mode** → highlight and select text.
- **Command-Line Mode** → run commands like save, quit, search.
- **Replace Mode** → type over existing text.

👉 Example: When you open Vim, you’re in **Normal Mode**. Press \`i\` to type, then press \`Esc\` to stop typing.
`;

export default function VimModesPage() {
    return <MarkdownRenderer markdown={content} />;
}
