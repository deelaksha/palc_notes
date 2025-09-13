import { CodeBlock } from '@/components/markdown/CodeBlock';
import { TableOfContents } from '@/components/toc/TableOfContents';
import { Fragment } from 'react';

const vimMarkdownContent = `
# 📘 Vim Commands – Beginner Friendly Guide

Vim is a text editor used inside the terminal. At first, it feels confusing, but once you understand the modes and commands, it becomes very powerful.

---

## ✨ 1. Modes in Vim

Think of Vim modes like tools in a toolbox:

- **Normal Mode (default)** → move around and give commands.
- **Insert Mode** → type text like a regular editor.
- **Visual Mode** → highlight and select text.
- **Command-Line Mode** → run commands like save, quit, search.
- **Replace Mode** → type over existing text.

👉 Example: When you open Vim, you’re in **Normal Mode**. Press \`i\` to type, then press \`Esc\` to stop typing.

---

## ✨ 2. Moving Around (Navigation)

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
| \`Ctrl + d\` | Scroll down half a screen |
| \`Ctrl + u\` | Scroll up half a screen |

👉 Example: If your file is very long, \`gg\` takes you to the top and \`G\` takes you to the end.

---

## ✨ 3. Typing Text (Insert Mode)

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

---

## ✨ 4. Editing Text

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

---

## ✨ 5. Searching & Replacing

| Command | What it does |
|---|---|
| \`/word\` | Search forward for “word” |
| \`?word\` | Search backward for “word” |
| \`n\` | Jump to next match |
| \`N\` | Jump to previous match |
| \`:%s/old/new/g\` | Replace all “old” with “new” |
| \`:%s/old/new/gc\` | Replace with confirmation |

👉 Example: Type \`/error\` to find the word “error” in your file. Press \`n\` to go to the next match.

👉 Example: If your file has many “cat” words, \`:%s/cat/dog/g\` changes all cats into dogs.

---

## ✨ 6. Selecting Text (Visual Mode)

| Command | What it does |
|---|---|
| \`v\` | Select characters |
| \`V\` | Select whole lines |
| \`Ctrl + v\` | Select block/columns |
| \`y\` | Copy selection |
| \`d\` | Cut selection |
| \`p\` | Paste selection |

👉 Example: Press \`V\` to highlight a line, then \`d\` to delete it. Press \`p\` to paste it somewhere else.

---

## ✨ 7. File Commands

| Command | What it does |
|---|---|
| \`:w\` | Save file |
| \`:q\` | Quit |
| \`:wq\` | Save and quit |
| \`:q!\` | Quit without saving |
| \`:x\` | Save and quit (same as \`:wq\`) |
| \`:e filename\` | Open another file |
| \`:saveas newfile\` | Save as new file |

👉 Example: If you edited a file and want to quit, type \`:wq\`. If you don’t want to save, type \`:q!\`.

---

## ✨ 8. Working with Windows & Tabs

| Command | What it does |
|---|---|
| \`:split filename\` | Open file in new horizontal window |
| \`:vsplit filename\` | Open file in new vertical window |
| \`Ctrl + w, w\` | Switch between windows |
| \`:tabnew filename\` | Open file in new tab |
| \`gt\` | Next tab |
| \`gT\` | Previous tab |

👉 Example: If you want to compare two files, use \`:vsplit file2.txt\` and both files show side by side.

---

## ✨ 9. Marks & Jumps

| Command | What it does |
|---|---|
| \`m<a>\` | Mark a position with a letter (a, b, c…) |
| \`'a\` | Jump to start of line of mark |
| \`\`a\` | Jump to exact cursor position of mark |

👉 Example: If you are editing a long file, type \`ma\` to mark a spot. Later type \`'a\` to quickly return.

---

## ✨ 10. Useful Shortcuts

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
4. Type \`/note\` → finds the word “note.”
5. Type \`:%s/note/task/g\` → replaces “note” with “task.”
6. Press \`:wq\` → saves and quits.

---

✅ With this, you can **move, edit, search, and manage files in Vim** like a beginner-friendly pro!
`;

// A simple and naive markdown to JSX renderer.
// For a real-world scenario, you'd want to use a library like 'marked' or 'react-markdown'.
function renderMarkdown(markdown: string) {
  const sections = markdown.trim().split('\n\n');
  return sections.map((section, index) => {
    if (section.startsWith('# ')) {
      const id = section.substring(2).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return <h1 key={index} id={id}>{section.substring(2)}</h1>;
    }
    if (section.startsWith('## ')) {
        const id = section.substring(3).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return <h2 key={index} id={id}>{section.substring(3)}</h2>;
    }
    if (section.startsWith('### ')) {
        const id = section.substring(4).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return <h3 key={index} id={id}>{section.substring(4)}</h3>;
    }
    if (section.startsWith('---')) {
      return <hr key={index} />;
    }
    if (section.startsWith('- ')) {
      const items = section.split('\n').map((item, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: item.substring(2).replace(/`(.*?)`/g, '<code>$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      ));
      return <ul key={index}>{items}</ul>;
    }
    if (section.match(/^\d+\./)) {
        const items = section.split('\n').map((item, i) => {
            const content = item.substring(item.indexOf('.') + 2);
            if (content.includes('`vim notes.txt`')) {
                return <li key={i}>Open Vim: <CodeBlock>vim notes.txt</CodeBlock></li>;
            }
            return <li key={i} dangerouslySetInnerHTML={{ __html: content.replace(/`(.*?)`/g, '<code>$1</code>') }} />
        });
        return <ol key={index}>{items}</ol>;
    }
    if (section.startsWith('|')) {
        const rows = section.split('\n');
        const headers = rows[0].split('|').slice(1, -1).map(h => h.trim());
        // The third row is the separator `|---|---|`
        const body = rows.slice(2);

        return (
            <div key={index} className="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, i) => <th key={i}>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map((row, i) => (
                            <tr key={i}>
                                {row.split('|').slice(1, -1).map((cell, j) => (
                                    <td key={j} dangerouslySetInnerHTML={{ __html: cell.trim().replace(/`(.*?)`/g, '<code>$1</code>') }} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return <p key={index} dangerouslySetInnerHTML={{ __html: section.replace(/`(.*?)`/g, '<code>$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
  });
}

export default function VimPage() {
  return (
    <div className="flex">
      <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
        {renderMarkdown(vimMarkdownContent)}
      </main>
      <aside className="hidden lg:block w-80 p-8">
        <div className="sticky top-20">
          <TableOfContents content={vimMarkdownContent} />
        </div>
      </aside>
    </div>
  );
}
