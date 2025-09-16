
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ✨ 11. Useful Shortcuts

| Command | What it does |
|---|---|
| \`.\` | Repeat last command |
| \`>>\` | Indent line |
| \`<<\` | Remove indentation |
| \`:set number\` | Show line numbers |
| \`:set nonumber\` | Hide line numbers |
| \`:syntax on\` | Enable syntax highlighting |
| \`:syntax off\` | Disable syntax highlighting |

👉 Example: If you want to repeat deleting a line multiple times, type \`dd\` once and then press \`.\` to repeat.

---

## 🎯 Practice Scenario
1. Open Vim: \`vim notes.txt\`
2. Press \`i\` → type: \`Hello, this is my note.\`
3. Press \`Esc\` → type \`o\` → new line opens → type \`Another note.\`
4. Press \`Esc\` → type \`/note\` → finds the word “note.”
5. Type \`:%s/note/task/g\` → replaces “note” with “task.”
6. Press \`:wq\` → saves and quits.

---

✅ With this, you can **move, edit, search, and manage files in Vim** like a beginner-friendly pro!
`;

export default function VimShortcutsPage() {
    return <MarkdownRenderer markdown={content} />;
}
