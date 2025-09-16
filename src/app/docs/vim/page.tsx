
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
| \`1G\` | Go to top of file (alternative) |
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
| \`:%s/old/new/g\` | Replace all “old” with “new” |% - range | s - Stands for substitute (replace).| g - Stands for global
| \`:%s/old/new/gc\` | Replace with confirmation | c - confirmation for each word

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
| \`ZZ\` | Save and quit (alternative) |
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
`;

const ctagsMarkdownContent = `
# 🏷️ Code Navigation with Ctags

Imagine you're reading a giant book with hundreds of characters. When you see a character's name, how do you find out who they are? You'd flip to the book's index! Ctags is like creating an index for your code. It scans your entire project and builds a special file called \`tags\` that lists where every "tag" (like a function, variable, or class) is defined. This lets you instantly jump to the definition of anything, anywhere in your project.

---

## ✨ 1. What is Ctags?

Ctags is a tool that acts like a dictionary for your code. It helps your text editor (like Vim) know exactly where to find the definition of a function or variable.

- **Primary Purpose**: The "Go to Definition" superpower. It knows *where* things are, but not who uses them.
- **How it works**: It creates a simple text file named \`tags\`. This file contains a sorted list of names (tags) and maps each name to its location (which file it's in and on which line).
- **Strength**: It is extremely fast, very simple to set up, and is supported by almost every programmer's editor, especially Vim.

---

## ✨ 2. Installing and Generating Tags

To get started, you first need to install the right tool. We recommend **Universal Ctags** because it understands hundreds of programming languages.

### Installation

<CodeBlock>sudo apt-get install universal-ctags</CodeBlock>

### Generating the Tags File

The most important step is to run the command from the **root directory** of your project. This ensures Ctags scans every file.

| Command | What it does |
|---|---|
| \`ctags -R .\` | **-R** stands for **Recursive**. It tells ctags to scan the current directory (\`.\`) and every single subdirectory inside it. It then creates one single \`tags\` file for the entire project. |

This one \`tags\` file is all your editor needs to navigate your code like a pro.

---

## ✨ 3. Using Ctags with Vim

Vim has fantastic, built-in support for ctags. As long as you open Vim from the same folder where your \`tags\` file is, these commands will work automatically.

### The Most Important Commands

| Command | What it does | How to Use It (in Normal Mode) |
|---|---|---|
| \`Ctrl + ]\` | **Jump to Definition**. This is the main event! It instantly takes you to where the word under your cursor is defined. | Place your cursor on a function name (e.g., \`calculate_total()\`) anywhere in your code and press this key combination. Vim will immediately open the correct file and jump to the line where \`function calculate_total()\` is written. |
| \`Ctrl + T\` | **Jump Back**. This is your "go back" button. After jumping to a definition, this command takes you back to the exact spot you were before. | After you've jumped to a definition with \`Ctrl + ]\`, just press \`Ctrl + T\` to return to your original location. You can press it multiple times to go back up the "call stack" of your jumps. |

### Other Useful Commands

| Command | What it does | How to Use It (in Command-Line Mode) |
|---|---|---|
| \`:tag <symbol>\` | Manually jump to a symbol's definition. | Type \`:tag calculate_total\` and press Enter. You can even use Tab to auto-complete the symbol name after typing a few letters. |
| \`:tselect <symbol>\` | **Tag Select**. Use this if a symbol is defined in multiple places (e.g., a function with the same name in different files). It shows you a numbered list of all possible matches. | Type \`:tselect my_function\`. Vim will display a list. Type the number of the definition you want and press Enter to jump to it. |
| \`g]\` | This is a quicker, visual alternative to \`:tselect\`. | In Normal Mode, place your cursor on a symbol and press \`g]\`. Vim will show a list of matches at the bottom of the screen. You can choose which one to jump to. |


👉 **How It Feels**: You're reading code in \`main.c\` and see a call to a function named \`render_user_profile()\`. You're not sure what it does. You place your cursor on the name, press \`Ctrl + ]\`, and instantly you are teleported to the \`ui_utils.c\` file, right at the line where that function begins. It feels like magic.
`;

const cscopeMarkdownContent = `
# 🏷️ Code Navigation with Cscope

If Ctags is a book's index, Cscope is its interactive table of contents and concordance, all in one. While ctags only knows *where* symbols are defined, cscope builds a richer database that understands the relationships *between* symbols. It's an incredibly powerful code-browsing tool for answering complex questions like "Who calls this function?" or "Where is this variable used?".

---

## ✨ 1. What is Cscope?

- **Purpose**: To perform advanced code analysis and answer contextual questions about your code.
- **How it works**: It scans your project files and creates a special database (usually \`cscope.out\`). This database doesn't just list symbol locations; it maps out the entire structure of your code, including function calls and symbol usages.
- **Strength**: It is indispensable for understanding code flow and performing impact analysis. If you need to know how a change in one function might affect the rest of the project, cscope is the tool to use.

---

## ✨ 2. Installing and Using Cscope

Cscope is a standard package on most Linux systems.

### Installation
<CodeBlock>sudo apt-get install cscope</CodeBlock>

### Generating the Cscope Database
From your project's root directory, you first need to generate a list of files for cscope to index.

1.  **Create a file list**:
    <CodeBlock>find . -name "*.c" -o -name "*.h" > cscope.files</CodeBlock>
    This command finds all files ending in \`.c\` or \`.h\` in the current directory and its subdirectories and saves that list into a file named \`cscope.files\`.

2.  **Build the database**:
    <CodeBlock>cscope -b -k -i cscope.files</CodeBlock>
    Let's break down these flags:
    - **-b**: **B**uild the database only; don't open the interactive cscope text-based UI.
    - **-k**: **K**ernel mode. This is a crucial flag that tells cscope *not* to look in system-wide include paths like \`/usr/include\`. This keeps your database focused on *your* project's code, making it faster and more relevant.
    - **-i**: **I**nput file. Tells cscope to use the \`cscope.files\` file we just created as its input list.

This command creates the \`cscope.out\` file, which is the database Vim will use.

---

## ✨ 3. Using Cscope with Vim

Vim has excellent built-in integration with cscope. To get started, you must add the database to your Vim session.

<CodeBlock>:cs add cscope.out</CodeBlock>

You can automate this by adding it to your \`.vimrc\` or \`init.vim\` file so it's always available. Once added, you can run powerful queries. The format is always \`:cs find <query_type> <symbol>\`.

### Cscope Find Commands

This is where cscope's true power lies. Here are the different types of queries you can run:

| Command | Query Type | What it Does & Beginner Explanation |
|---|---|---|
| \`:cs find s <symbol>\` | **s**ymbol | **"Find every single mention."** Finds every single occurrence of this C symbol in your project. This includes definitions, function calls, variable assignments, and struct members. It's the most comprehensive search. |
| \`:cs find g <symbol>\` | **g**lobal definition | **"Find where this is defined globally."** This finds the main, global definition of the symbol. It's very similar to what ctags does, but it's guaranteed to be the global one, not a local declaration. |
| \`:cs find c <function>\` | **c**allers | **"Who calls this function?"** This is one of cscope's killer features. It finds all the other functions that *call* the given \`<function>\`. It's incredibly useful for tracing how and where a function is used and understanding its impact. |
| \`:cs find d <function>\` | **d**one by (callees) | **"What does this function do?"** The opposite of 'c'. It finds all the functions that are *called by* the given \`<function>\`. This helps you understand what a function does internally without having to read all its code. |
| \`:cs find e <pattern>\` | **e**grep pattern | **"Find this exact text string anywhere."** Performs a simple text search for any string across all indexed files, just like the command-line tool \`egrep\`. This is useful for finding text in comments or strings. |
| \`:cs find f <filename>\` | **f**ile | **"Find this file."** Finds and opens a file by name. It's often faster than searching through the file tree if you know the name of the file you want. |
| \`:cs find i <filename>\` | **i**ncludes | **"Who includes this header file?"** Finds all files that use an \`#include\` statement for the given \`<filename>\`. This is perfect for tracking dependencies and understanding header relationships. |
| \`:cs find t <text>\` | **t**ext | **"Find this text string."** This is very similar to \`egrep\` but can be faster as it uses the cscope index. |

👉 **How to use it**: To find every place where the function \`update_user_profile()\` is called across your entire project, you would use \`:cs find c update_user_profile\`. Vim will show you a list of every location in every file. You can select a number from the list to jump directly to that file and line.

---

## ✨ 4. The Ultimate Workflow: Ctags + Cscope

You don't have to choose! The best workflow uses both tools for what they do best.

-   Use **Ctags** for its lightning-fast "go to definition" with \`Ctrl + ]\`, as this is the most frequent navigation action you'll perform.
-   Use **Cscope** for its powerful analytical queries (\`:cs find c\`, \`:cs find d\`, etc.) when you need to understand the context, usage, and impact of your code.

### Generating Both Databases
Here’s how to generate everything in one go from your project's root directory:
1.  **Generate a file list for Cscope**:
    <CodeBlock>find . -name "*.c" -o -name "*.h" > cscope.files</CodeBlock>
2.  **Generate both the Ctags and Cscope databases**:
    <CodeBlock>
ctags -R .
cscope -b -k -i cscope.files
</CodeBlock>
`;

const practiceScenario = `
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

const parseSections = (markdown: string) => {
    const sections: { title: string; content: string }[] = [];
    const rawSections = markdown.split(/\n(?=##\s)/);

    const intro = rawSections.length > 0 ? rawSections.shift()! : '';

    rawSections.forEach((section) => {
        const lines = section.split('\n');
        const titleMatch = lines[0].match(/^##\s.*$/);
        if (titleMatch) {
            const title = titleMatch[0].substring(3).trim();
            const content = lines.slice(1).join('\n').trim();
            sections.push({ title: title, content });
        }
    });

    return { intro: intro.trim(), sections };
};

export default function VimPage() {
    const { intro, sections } = parseSections(vimMarkdownContent);

    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={intro} />
                
                <Accordion type="single" collapsible className="w-full space-y-4 mt-6">
                    {sections.map(({ title, content }) => (
                        <AccordionItem value={title} key={title} className="border rounded-lg bg-card overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 font-headline text-lg hover:no-underline">
                                {title}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pt-0 pb-6">
                                <MarkdownRenderer markdown={content} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                     <AccordionItem value="code-navigation" className="border rounded-lg bg-card overflow-hidden">
                        <AccordionTrigger className="px-6 py-4 font-headline text-lg hover:no-underline">
                            ✨ 11. Code Navigation
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pt-0 pb-6">
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                <AccordionItem value="ctags" className="border rounded-lg bg-card-nested overflow-hidden">
                                     <AccordionTrigger className="px-4 py-3 font-headline text-md hover:no-underline">
                                        Using Ctags
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pt-0 pb-4">
                                        <MarkdownRenderer markdown={ctagsMarkdownContent} />
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="cscope" className="border rounded-lg bg-card-nested overflow-hidden">
                                     <AccordionTrigger className="px-4 py-3 font-headline text-md hover:no-underline">
                                        Using Cscope
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pt-0 pb-4">
                                        <MarkdownRenderer markdown={cscopeMarkdownContent} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-8">
                    <MarkdownRenderer markdown={practiceScenario} />
                </div>
            </main>
        </div>
    );
}
