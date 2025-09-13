import { CodeBlock } from '@/components/markdown/CodeBlock';
import { TableOfContents } from '@/components/toc/TableOfContents';

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
|---------|--------------|
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
|---------|--------------|
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
|---------|--------------|
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
|---------|--------------|
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
|---------|--------------|
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
|---------|--------------|
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
|---------|--------------|
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
|---------|--------------|
| \`m<a>\` | Mark a position with a letter (a, b, c…) |
| \`'a\` | Jump to start of line of mark |
| \`\`a\` | Jump to exact cursor position of mark |

👉 Example: If you are editing a long file, type \`ma\` to mark a spot. Later type \`'a\` to quickly return.

---

## ✨ 10. Useful Shortcuts

| Command | What it does |
|---------|--------------|
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

export default function VimPage() {
  return (
    <div className="flex">
      <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
        <h1 id="-vim-commands--beginner-friendly-guide">
          📘 Vim Commands – Beginner Friendly Guide
        </h1>
        <p>
          Vim is a text editor used inside the terminal. At first, it feels
          confusing, but once you understand the modes and commands, it becomes
          very powerful.
        </p>
        <hr />
        <h2 id="-1-modes-in-vim">✨ 1. Modes in Vim</h2>
        <p>Think of Vim modes like tools in a toolbox:</p>
        <ul>
          <li>
            <strong>Normal Mode (default)</strong> → move around and give
            commands.
          </li>
          <li>
            <strong>Insert Mode</strong> → type text like a regular editor.
          </li>
          <li>
            <strong>Visual Mode</strong> → highlight and select text.
          </li>
          <li>
            <strong>Command-Line Mode</strong> → run commands like save, quit,
            search.
          </li>
          <li>
            <strong>Replace Mode</strong> → type over existing text.
          </li>
        </ul>
        <p>
          👉 Example: When you open Vim, you’re in <strong>Normal Mode</strong>.
          Press <code>i</code> to type, then press <code>Esc</code> to stop
          typing.
        </p>
        <hr />
        <h2 id="-2-moving-around-navigation">
          ✨ 2. Moving Around (Navigation)
        </h2>
        <p>Use these keys like arrow keys:</p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>h</code>
                </td>
                <td>Move left</td>
              </tr>
              <tr>
                <td>
                  <code>l</code>
                </td>
                <td>Move right</td>
              </tr>
              <tr>
                <td>
                  <code>j</code>
                </td>
                <td>Move down</td>
              </tr>
              <tr>
                <td>
                  <code>k</code>
                </td>
                <td>Move up</td>
              </tr>
              <tr>
                <td>
                  <code>0</code>
                </td>
                <td>Jump to beginning of line</td>
              </tr>
              <tr>
                <td>
                  <code>^</code>
                </td>
                <td>Jump to first word in line</td>
              </tr>
              <tr>
                <td>
                  <code>$</code>
                </td>
                <td>Jump to end of line</td>
              </tr>
              <tr>
                <td>
                  <code>w</code>
                </td>
                <td>Jump forward word by word</td>
              </tr>
              <tr>
                <td>
                  <code>b</code>
                </td>
                <td>Jump backward word by word</td>
              </tr>
              <tr>
                <td>
                  <code>gg</code>
                </td>
                <td>Go to top of file</td>
              </tr>
              <tr>
                <td>
                  <code>G</code>
                </td>
                <td>Go to bottom of file</td>
              </tr>
              <tr>
                <td>
                  <code>Ctrl + d</code>
                </td>
                <td>Scroll down half a screen</td>
              </tr>
              <tr>
                <td>
                  <code>Ctrl + u</code>
                </td>
                <td>Scroll up half a screen</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: If your file is very long, <code>gg</code> takes you to the
          top and <code>G</code> takes you to the end.
        </p>
        <hr />
        <h2 id="-3-typing-text-insert-mode">
          ✨ 3. Typing Text (Insert Mode)
        </h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>i</code>
                </td>
                <td>Start typing before cursor</td>
              </tr>
              <tr>
                <td>
                  <code>I</code>
                </td>
                <td>Start typing at beginning of line</td>
              </tr>
              <tr>
                <td>
                  <code>a</code>
                </td>
                <td>Start typing after cursor</td>
              </tr>
              <tr>
                <td>
                  <code>A</code>
                </td>
                <td>Start typing at end of line</td>
              </tr>
              <tr>
                <td>
                  <code>o</code>
                </td>
                <td>Create new line below and type</td>
              </tr>
              <tr>
                <td>
                  <code>O</code>
                </td>
                <td>Create new line above and type</td>
              </tr>
              <tr>
                <td>
                  <code>R</code>
                </td>
                <td>Replace text while typing</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: If you want to add a note below the current line, press{' '}
          <code>o</code>, and a new line opens where you can type.
        </p>
        <hr />
        <h2 id="-4-editing-text">✨ 4. Editing Text</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>x</code>
                </td>
                <td>Delete character under cursor</td>
              </tr>
              <tr>
                <td>
                  <code>dw</code>
                </td>
                <td>Delete a word</td>
              </tr>
              <tr>
                <td>
                  <code>dd</code>
                </td>
                <td>Delete a whole line</td>
              </tr>
              <tr>
                <td>
                  <code>2dd</code>
                </td>
                <td>Delete 2 lines</td>
              </tr>
              <tr>
                <td>
                  <code>u</code>
                </td>
                <td>Undo last action</td>
              </tr>
              <tr>
                <td>
                  <code>Ctrl + r</code>
                </td>
                <td>Redo undone change</td>
              </tr>
              <tr>
                <td>
                  <code>yy</code>
                </td>
                <td>Copy (yank) a line</td>
              </tr>
              <tr>
                <td>
                  <code>2yy</code>
                </td>
                <td>Copy 2 lines</td>
              </tr>
              <tr>
                <td>
                  <code>yw</code>
                </td>
                <td>Copy a word</td>
              </tr>
              <tr>
                <td>
                  <code>p</code>
                </td>
                <td>Paste after cursor</td>
              </tr>
              <tr>
                <td>
                  <code>P</code>
                </td>
                <td>Paste before cursor</td>
              </tr>
              <tr>
                <td>
                  <code>r&lt;char&gt;</code>
                </td>
                <td>Replace one character</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: If you typed something wrong, press <code>u</code> to undo
          it. If you deleted by mistake, press <code>Ctrl + r</code> to bring it
          back.
        </p>
        <hr />
        <h2 id="-5-searching-replacing">✨ 5. Searching & Replacing</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>/word</code>
                </td>
                <td>Search forward for “word”</td>
              </tr>
              <tr>
                <td>
                  <code>?word</code>
                </td>
                <td>Search backward for “word”</td>
              </tr>
              <tr>
                <td>
                  <code>n</code>
                </td>
                <td>Jump to next match</td>
              </tr>
              <tr>
                <td>
                  <code>N</code>
                </td>
                <td>Jump to previous match</td>
              </tr>
              <tr>
                <td>
                  <code>:%s/old/new/g</code>
                </td>
                <td>Replace all “old” with “new”</td>
              </tr>
              <tr>
                <td>
                  <code>:%s/old/new/gc</code>
                </td>
                <td>Replace with confirmation</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: Type <code>/error</code> to find the word “error” in your
          file. Press <code>n</code> to go to the next match.
        </p>
        <p>
          👉 Example: If your file has many “cat” words,{' '}
          <code>:%s/cat/dog/g</code> changes all cats into dogs.
        </p>
        <hr />
        <h2 id="-6-selecting-text-visual-mode">
          ✨ 6. Selecting Text (Visual Mode)
        </h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>v</code>
                </td>
                <td>Select characters</td>
              </tr>
              <tr>
                <td>
                  <code>V</code>
                </td>
                <td>Select whole lines</td>
              </tr>
              <tr>
                <td>
                  <code>Ctrl + v</code>
                </td>
                <td>Select block/columns</td>
              </tr>
              <tr>
                <td>
                  <code>y</code>
                </td>
                <td>Copy selection</td>
              </tr>
              <tr>
                <td>
                  <code>d</code>
                </td>
                <td>Cut selection</td>
              </tr>
              <tr>
                <td>
                  <code>p</code>
                </td>
                <td>Paste selection</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: Press <code>V</code> to highlight a line, then{' '}
          <code>d</code> to delete it. Press <code>p</code> to paste it
          somewhere else.
        </p>
        <hr />
        <h2 id="-7-file-commands">✨ 7. File Commands</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>:w</code>
                </td>
                <td>Save file</td>
              </tr>
              <tr>
                <td>
                  <code>:q</code>
                </td>
                <td>Quit</td>
              </tr>
              <tr>
                <td>
                  <code>:wq</code>
                </td>
                <td>Save and quit</td>
              </tr>
              <tr>
                <td>
                  <code>:q!</code>
                </td>
                <td>Quit without saving</td>
              </tr>
              <tr>
                <td>
                  <code>:x</code>
                </td>
                <td>Save and quit (same as <code>:wq</code>)</td>
              </tr>
              <tr>
                <td>
                  <code>:e filename</code>
                </td>
                <td>Open another file</td>
              </tr>
              <tr>
                <td>
                  <code>:saveas newfile</code>
                </td>
                <td>Save as new file</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: If you edited a file and want to quit, type{' '}
          <code>:wq</code>. If you don’t want to save, type <code>:q!</code>.
        </p>
        <hr />
        <h2 id="-8-working-with-windows-tabs">
          ✨ 8. Working with Windows & Tabs
        </h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>:split filename</code>
                </td>
                <td>Open file in new horizontal window</td>
              </tr>
              <tr>
                <td>
                  <code>:vsplit filename</code>
                </td>
                <td>Open file in new vertical window</td>
              </tr>
              <tr>
                <td>
                  <code>Ctrl + w, w</code>
                </td>
                <td>Switch between windows</td>
              </tr>
              <tr>
                <td>
                  <code>:tabnew filename</code>
                </td>
                <td>Open file in new tab</td>
              </tr>
              <tr>
                <td>
                  <code>gt</code>
                </td>
                <td>Next tab</td>
              </tr>
              <tr>
                <td>
                  <code>gT</code>
                </td>
                <td>Previous tab</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: If you want to compare two files, use{' '}
          <code>:vsplit file2.txt</code> and both files show side by side.
        </p>
        <hr />
        <h2 id="-9-marks-jumps">✨ 9. Marks & Jumps</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>m&lt;a&gt;</code>
                </td>
                <td>Mark a position with a letter (a, b, c…)</td>
              </tr>
              <tr>
                <td>
                  <code>&apos;a</code>
                </td>
                <td>Jump to start of line of mark</td>
              </tr>
              <tr>
                <td>
                  <code>``a</code>
                </td>
                <td>Jump to exact cursor position of mark</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: If you are editing a long file, type <code>ma</code> to
          mark a spot. Later type <code>&apos;a</code> to quickly return.
        </p>
        <hr />
        <h2 id="-10-useful-shortcuts">✨ 10. Useful Shortcuts</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.</code>
                </td>
                <td>Repeat last command</td>
              </tr>
              <tr>
                <td>
                  <code>&gt;&gt;</code>
                </td>
                <td>Indent line</td>
              </tr>
              <tr>
                <td>
                  <code>&lt;&lt;</code>
                </td>
                <td>Remove indentation</td>
              </tr>
              <tr>
                <td>
                  <code>:set number</code>
                </td>
                <td>Show line numbers</td>
              </tr>
              <tr>
                <td>
                  <code>:set nonumber</code>
                </td>
                <td>Hide line numbers</td>
              </tr>
              <tr>
                <td>
                  <code>:syntax on</code>
                </td>
                <td>Enable syntax highlighting</td>
              </tr>
              <tr>
                <td>
                  <code>:syntax off</code>
                </td>
                <td>Disable syntax highlighting</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          👉 Example: If you want to repeat deleting a line multiple times, type{' '}
          <code>dd</code> once and then press <code>.</code> to repeat.
        </p>
        <hr />
        <h2 id="-practice-scenario">🎯 Practice Scenario</h2>
        <ol>
          <li>
            Open Vim: <CodeBlock>vim notes.txt</CodeBlock>
          </li>
          <li>
            Press <code>i</code> → type: <code>Hello, this is my note.</code>
          </li>
          <li>
            Press <code>Esc</code> → type <code>o</code> → new line opens → type{' '}
            <code>Another note.</code>
          </li>
          <li>
            Type <code>/note</code> → finds the word “note.”
          </li>
          <li>
            Type <code>:%s/note/task/g</code> → replaces “note” with “task.”
          </li>
          <li>
            Press <code>:wq</code> → saves and quits.
          </li>
        </ol>
        <hr />
        <p>
          ✅ With this, you can{' '}
          <strong>move, edit, search, and manage files in Vim</strong> like a
          beginner-friendly pro!
        </p>
      </main>
      <aside className="hidden lg:block w-80 p-8">
        <div className="sticky top-20">
          <TableOfContents content={vimMarkdownContent} />
        </div>
      </aside>
    </div>
  );
}
