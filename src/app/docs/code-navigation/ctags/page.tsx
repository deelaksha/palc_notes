
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { allDocsContext } from '@/lib/all-docs-context';

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

---

## 🎯 Practice Scenario

Let's try it out!

1.  Navigate to a project folder (or create a small one with a few files).
2.  Run \`ctags -R .\` to create the \`tags\` file.
3.  Open a file in Vim: \`vim main.c\`
4.  Find a function or variable that is defined in another file.
5.  Place your cursor on its name and press **\`Ctrl + ]\`**. Watch yourself jump!
6.  Now, press **\`Ctrl + T\`** to jump right back to where you were.
7.  Try finding a definition manually. Type **\`:tag <function_name>\`** and press Enter.

✅ By mastering these simple commands, you turn Vim from a simple text editor into a powerful code-browsing environment. It makes understanding large, complex projects much, much easier.
`;

export default function CtagsPage() {
    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={ctagsMarkdownContent} />
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={ctagsMarkdownContent} />
                </div>
            </aside>
            <Chatbot pageContent={allDocsContext} />
        </div>
    );
}
