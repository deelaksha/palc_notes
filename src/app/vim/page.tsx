
import { TableOfContents } from '@/components/toc/TableOfContents';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const vimTutorialContent = `
# 📘 The Interactive Vim Tutor

Welcome to your personalized Vim tutorial. This guide breaks down essential commands into detailed, practical lessons. Each section explains the what, why, and how, turning you into a Vim proficient in no time.

---

## ✨ 1. Understanding Vim's Core Philosophy: Modes

The most crucial concept in Vim is its use of **modes**. Unlike regular text editors where typing always inserts characters, Vim separates the act of writing from the act of editing and commanding. This is Vim's superpower.

- **Normal Mode (The Command Center)**: This is the default mode. Every key press is a potential command. You use this mode to navigate, delete, copy, paste, and perform all other editing operations. You are a commander, and the keys are your orders. You'll spend most of your time in this mode. Press \`Esc\` from any other mode to return here.

- **Insert Mode (The Typewriter)**: This is for typing text. Once you enter Insert Mode, Vim behaves like a standard editor (like Notepad or Google Docs). You enter it from Normal mode using commands like \`i\`, \`a\`, \`o\`.

- **Visual Mode (The Highlighter)**: This mode is for selecting text. Once text is selected, you can run a command on it (like copy, delete, or transform). You enter it from Normal mode using \`v\` (character-wise), \`V\` (line-wise), or \`Ctrl-v\` (block-wise).

- **Command-Line Mode (The Power Tool)**: This mode is for running more complex "Ex" commands. When you press \`:\` in Normal mode, you jump to the command line at the bottom of the screen. This is where you save files (\`:w\`), quit (\`:q\`), perform search and replace (\`:%s/old/new/g\`), and manage editor settings.

The master workflow is: **Normal Mode** -> Enter another mode to perform a task -> Press **\`Esc\`** to return to **Normal Mode**.

---
`;

const commandDetails = [
  {
    id: 'navigation',
    title: '✨ 2. Moving Around (Navigation)',
    content: `
### In-Depth Explanation

Navigation in Vim is designed to keep your hands on the home row, making you faster and more efficient. Instead of reaching for arrow keys or a mouse, you use letter keys. This feels slow at first but becomes lightning fast with practice.

**Mode**: Normal Mode

| Command | Breakdown | Detailed Explanation |
|---|---|---|
| \`h\` | (h) | **Move Left**: Moves the cursor one character to the left. It's on the home row, right under your index finger. |
| \`j\` | (j) | **Move Down**: Moves the cursor one line down. Think of the letter 'j' having a tail that goes down. |
| \`k\` | (k) | **Move Up**: Moves the cursor one line up. |
| \`l\` | (l) | **Move Right**: Moves the cursor one character to the right. |
| \`0\` | (zero) | **Jump to Beginning of Line**: Moves the cursor to the absolute first column of the current line. |
| \`^\` | (caret) | **Jump to First Non-Whitespace**: Moves to the first non-blank character on the line. More useful than \`0\` for indented code. |
| \`$\` | (dollar) | **Jump to End of Line**: The '$' often signifies the end in programming (e.g., regex), so it's a natural fit. |
| \`w\` | (word) | **Jump Forward by Word**: Moves to the beginning of the next word. Punctuation is treated as a word. |
| \`b\` | (back) | **Jump Backward by Word**: Moves to the beginning of the previous word. |
| \`gg\` | (go go) | **Go to Top of File**: Moves the cursor to the first line of the file. An easy way to remember is "Good Game" to restart. |
| \`G\` | (Go) | **Go to End of File**: Moves the cursor to the last line of the file. |
| \`Ctrl+d\` | (down) | **Scroll Down Half Page**: Moves the view down by half a screen. |
| \`Ctrl+u\` | (up) | **Scroll Up Half Page**: Moves the view up by half a screen. |

#### Real-World Example
Imagine you're editing a long configuration file. You need to get to the very last line to add a new setting. Instead of holding the down arrow for 30 seconds, you just press \`G\` in Normal mode. Instantly, you're at the bottom, ready to edit.

#### Tips & Common Pitfalls
- **Pitfall**: New users often stay in Insert mode and use the arrow keys. This is the biggest anti-pattern. Force yourself to use \`hjkl\`. It's the only way to build muscle memory.
- **Tip**: You can prefix movement commands with a number. \`10j\` moves you down 10 lines. \`5w\` jumps forward 5 words. This is called a **count** and is fundamental to Vim's efficiency.

#### Practice Exercises
1.  Open a multi-line file.
2.  Press \`G\` to go to the end, then \`gg\` to go to the top.
3.  Navigate to line 5 by typing \`5G\` or \`gg\` then \`4j\`.
4.  On a line of code, use \`0\` to go to the start, then \`^\` to jump past the indentation.
5.  Move forward 3 words at a time using \`3w\`.
`
  },
  {
    id: 'insert',
    title: '✨ 3. Typing Text (Insert Mode)',
    content: `
### In-Depth Explanation

Insert mode is your "typing" mode. The key is not just *how* to enter it, but *where* you want to start typing. Vim provides multiple commands to enter Insert mode at the precise location you need, saving you extra navigation keystrokes.

**Mode**: Enter *from* Normal Mode.

| Command | Breakdown | Detailed Explanation |
|---|---|---|
| \`i\` | (insert) | **Insert Before Cursor**: Enters Insert mode and places the cursor *before* the character it's currently on. |
| \`I\` | (Insert) | **Insert at Beginning of Line**: A shortcut for \`^\` + \`i\`. Enters Insert mode at the first non-whitespace character of the line. Incredibly useful. |
| \`a\` | (append) | **Append After Cursor**: Enters Insert mode and places the cursor *after* the character it's currently on. |
| \`A\` | (Append) | **Append at End of Line**: A shortcut for \`$\` + \`a\`. Enters Insert mode at the very end of the current line. |
| \`o\` | (open) | **Open New Line Below**: Creates a new, empty line *below* the current line and enters Insert mode, ready for you to type. |
| \`O\` | (Open) | **Open New Line Above**: Creates a new, empty line *above* the current line and enters Insert mode. |
| \`R\` | (Replace) | **Enter Replace Mode**: Each character you type will overwrite an existing character, like the "Overwrite" mode in old word processors. |

#### Real-World Example
You're on a line of code: \`const name = "John"\`. You realize you forgot a semicolon. Instead of navigating to the end and then entering insert mode, you just press \`A\` from anywhere on the line, type \`;\`, and press \`Esc\`. Done in 3 keystrokes.

#### Tips & Common Pitfalls
- **Pitfall**: "Sticking" in Insert mode. New users often enter Insert mode and never leave. The Vim way is to enter, make your change, and immediately press \`Esc\` to return to Normal mode. Think of it as quick surgical strikes.
- **Tip**: Use the most specific command. Need to add a comment above the current line? Use \`O\` instead of \`k\` -> \`o\`. It saves keystrokes and mental energy.

#### Practice Exercises
1.  Place your cursor in the middle of a word. Press \`i\` and type something. Press \`Esc\`.
2.  Place your cursor in the middle of the same word. Press \`a\` and type something. Notice the difference.
3.  From anywhere on a line, press \`I\` and type \`// \` to comment it out.
4.  From anywhere on a line, press \`A\` to add text to the very end.
`
  },
  {
    id: 'editing',
    title: '✨ 4. Editing Text (The "Verbs")',
    content: `
### In-Depth Explanation

In Vim, editing commands are like verbs in a language. You combine a verb (like \`d\` for delete) with a motion (like \`w\` for word). This "Vim grammar" is what makes it so powerful.

**Mode**: Normal Mode

| Command | Breakdown | Detailed Explanation |
|---|---|---|
| \`x\` | (x-out) | **Delete Character**: Deletes the character directly under the cursor. |
| \`dw\` | (delete word) | **Delete Word**: Deletes from the cursor to the beginning of the next word. A perfect example of Vim's verb+noun grammar! |
| \`dd\` | (delete line) | **Delete Whole Line**: Deletes the entire line the cursor is on. The double character (\`dd\`, \`yy\`, \`cc\`) often signifies a line-wise operation. |
| \`2dd\` | (2 delete line) | **Delete 2 Lines**: Combines a count (2) with a command (\`dd\`). This works for most Normal mode commands. |
| \`d$\` | (delete to end) | **Delete to End of Line**: Deletes from the cursor to the end of the line. |
| \`u\` | (undo) | **Undo**: Undoes the last change. You can press it multiple times. |
| \`Ctrl + r\` | (redo) | **Redo**: Reverses the last undo. |
| \`yy\` | (yank line) | **Copy (Yank) a Line**: "Yank" is Vim's term for copy. This copies the entire current line into a register (clipboard). |
| \`yw\` | (yank word) | **Copy (Yank) a Word**: Copies from the cursor to the start of the next word. |
| \`p\` | (paste) | **Paste After Cursor**: Pastes the copied content *after* the cursor's position. If you copied a whole line, it pastes on the line below. |
| \`P\` | (Paste) | **Paste Before Cursor**: Pastes the copied content *before* the cursor. If you copied a whole line, it pastes on the line above. |

#### Real-World Example
You have a line of code you want to move. You don't need to highlight it with a mouse, press Ctrl-C, move your cursor, and press Ctrl-V. In Vim, you just press \`dd\` to delete (and automatically copy) the line, move your cursor with \`j\` or \`k\`, and press \`p\` to paste it. It's incredibly fast.

#### Tips & Common Pitfalls
- **Pitfall**: Forgetting that \`dd\` also copies. When you delete a line with \`dd\`, it's automatically in your clipboard. You don't need to \`yy\` first. This lets you move lines very quickly.
- **Tip**: The "change" operator, \`c\`, is a powerful combination of "delete" and "insert". \`cw\` will **c**hange a **w**ord by deleting it and immediately putting you in Insert mode. \`cc\` will change a whole line. It's often more efficient than \`d\` followed by \`i\`.

#### Practice Exercises
1.  Use \`dd\` to delete a line. Move somewhere else and use \`p\` to paste it.
2.  Place your cursor on a word and type \`dw\`. Then press \`u\` to undo it.
3.  Yank a line with \`yy\` and paste it 5 times using \`5p\`.
4.  Place your cursor on a word and type \`cw\`. Type a new word and press \`Esc\`. Notice how it replaced the old word.
`
  },
  {
    id: 'search-replace',
    title: '✨ 5. Searching & Replacing',
    content: `
### In-Depth Explanation

Searching is a fundamental editing task. Vim provides powerful tools for finding text and for performing complex search-and-replace operations.

**Mode**: Enter from Normal Mode. Search-and-replace happens in Command-Line Mode.

| Command | Breakdown | Detailed Explanation |
|---|---|---|
| \`/word\` | (forward slash) | **Search Forward**: Press \`/\` in Normal mode. The cursor jumps to the command line. Type your search term and press Enter. Vim will jump to the first match *after* the cursor. |
| \`?word\` | (question mark) | **Search Backward**: Same as \`/\`, but searches *before* the cursor. |
| \`n\` | (next) | **Jump to Next Match**: After a search, press \`n\` to jump to the next occurrence in the same direction you were searching. |
| \`N\` | (Next, opposite) | **Jump to Previous Match**: Jumps to the next occurrence in the opposite direction. |
| \`:%s/old/new/g\` | (substitute) | **Search and Replace**: This is a Command-Line mode command. <br> **:** Enters Command-Line mode. <br> **%**: A range, meaning "every line in the file". <br> **s**: The substitute command. <br> **/old/**: The pattern to find. <br> **/new/**: The replacement text. <br> **/g**: A flag for "global," meaning replace *every* occurrence on a line, not just the first one. |
| \`:%s/old/new/gc\` | (substitute confirm) | **Replace with Confirmation**: The \`c\` flag at the end adds a confirmation step. For each match, Vim will pause and ask you to confirm the replacement (y/n/a/q). |

#### Real-World Example
You've misspelled a variable name, \`calculateTotal\`, as \`calculatTotal\` throughout a file. You don't need to hunt for each one. You simply run \`:%s/calculatTotal/calculateTotal/g\`. In one command, every instance is fixed.

#### Tips & Common Pitfalls
- **Pitfall**: Forgetting the \`g\` flag in substitute. If you run \`:%s/old/new/\`, it will only replace the *first* "old" on each line. The \`g\` flag is crucial for replacing all instances.
- **Tip**: To make searches case-insensitive, you can type \`\\c\` in your search pattern (e.g., \`/word\\c\`) or set it permanently with \`:set ignorecase\`.
- **Tip**: The search term you use with \`/\` is remembered. If you want to replace that term, you can leave the "find" part of the substitute command empty: \`:%s//new/g\`.

#### Practice Exercises
1.  Use \`/\` to search for a common word in your file. Use \`n\` and \`N\` to jump between matches.
2.  Use \`?\` to search for the same word backwards.
3.  Replace every instance of "the" with "THE" by running \`:%s/the/THE/g\`.
4.  Use the confirmation flag \`c\` to selectively replace a word. Try replacing some but not others.
`
  },
];

export default function VimPage() {
    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={vimTutorialContent} />

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {commandDetails.map((item) => (
                        <AccordionItem value={item.id} key={item.id} className="border rounded-lg bg-card overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 font-headline text-lg hover:no-underline">
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pt-0 pb-6 prose prose-invert max-w-none">
                                <MarkdownRenderer markdown={item.content} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="mt-8">
                     <MarkdownRenderer markdown="✅ Master these foundational commands, and you'll have a powerful toolkit for any editing task. The key is consistent practice to build muscle memory." />
                </div>
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={vimTutorialContent + commandDetails.map(c => `## ${c.title}`).join('\\n')} />
                </div>
            </aside>
        </div>
    );
}
