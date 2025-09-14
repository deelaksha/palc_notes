import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';

const ctagsMarkdownContent = `
# 🏷️ Code Navigation with Ctags

When working with large codebases, finding where a function is defined can be slow and difficult. Ctags is a powerful command-line tool that creates an index of your source code. This index acts like a map, allowing your text editor (like Vim) to instantly jump between files and find definitions with superhuman speed.

---

## ✨ 1. What is Ctags?

Ctags generates an index file (called a "tags" file) of language objects found in source code files. Think of it as a dictionary for your code. It scans your project and creates a map of where every function, variable, class, and other "tag" is defined.

- **Primary Purpose**: The "Go to Definition" superpower. It knows *where* things are, but not who uses them.
- **How it works**: It creates a simple \`tags\` file that maps names to their locations (file and line number).
- **Strength**: Extremely fast, simple to set up, and supported by almost every programmer's editor, including Vim.

---

## ✨ 2. Installing and Using Ctags

Installation is straightforward. We recommend \`universal-ctags\` as it supports a vast number of languages out of the box.

### Installation

<CodeBlock>sudo apt-get install universal-ctags</CodeBlock>

### Generating Tags

Navigate to the root directory of your project. This is crucial, as you want the index to cover all your source files.

| Command | What it does |
|---|---|
| \`ctags -R .\` | The **-R** flag stands for "Recursive." It tells ctags to scan the current directory (\`.\`) and all its subdirectories, generating a single \`tags\` file that acts as the database for your entire project. |

This single \`tags\` file is all your editor needs to navigate your code.

### Using Ctags with Vim

Vim has excellent, built-in support for ctags. As long as you open Vim from the same directory where your \`tags\` file is located, these commands will work automatically.

| Command | Detailed Explanation |
|---|---|
| \`Ctrl + ]\` | **(Jump to Definition)** This is the most important ctags command. Place your cursor on any function, variable, or macro name and press \`Ctrl + ]\`. Vim will instantly jump to the file and line where that symbol is defined, even if it's in a completely different file. This is how you navigate *across* files. |
| \`Ctrl + T\` | **(Jump Back)** After jumping to a definition, this command takes you back to the exact spot you were before the jump. You can press it multiple times to go back up the "call stack" of your navigation. |
| \`:tag <symbol>\` | Manually jump to the definition of a \`<symbol>\`. You can use Tab for auto-completion after typing a few letters. For example: \`:tag calculate_tot\` then pressing Tab might complete to \`:tag calculate_total\`. |
| \`:tselect <symbol>\` | **(Tag Select)** If a symbol is defined in multiple places (e.g., in different classes), this command shows you a numbered list of all matches. You can then type the number and press Enter to jump to the one you want. |
| \`g]\` | If a symbol is defined multiple times, this is a quicker alternative to \`:tselect\`. It shows a list of matches that you can choose from. |

👉 **How to access other files:** Place your cursor on a function call like \`calculate_total()\` in \`main.c\` and press \`Ctrl + ]\`. If that function is defined in \`utils.c\`, Vim will automatically open \`utils.c\` and place your cursor on the definition. This is the primary way ctags helps you navigate a multi-file project.
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
        </div>
    );
}
