import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';

const gtagsMarkdownContent = `
# 🌍 Code Navigation with GNU Global (Gtags)

GNU Global is a source code tagging system that allows you to find objects (functions, classes, variables) in your source code and easily navigate between them. It's similar to ctags/cscope but is often faster and has better support for navigating large, complex projects, especially those written in C, C++, Java, and PHP.

---

## ✨ 1. What is Gtags?

Gtags creates a set of database files (\`GTAGS\`, \`GRTAGS\`, \`GPATH\`) that index your entire project. This index allows for lightning-fast lookups of symbol definitions, references, and file paths.

- **Primary Purpose**: To provide project-wide "Go to Definition," "Find References," and "Find file" functionality.
- **How it works**: It parses your source code to build a comprehensive database of symbols and their locations. It maintains separate databases for definitions (\`GTAGS\`) and references (\`GRTAGS\`).
- **Strength**: Extremely fast, handles very large codebases (like the Linux kernel) with ease, and integrates well with editors like Vim and Emacs.

---

## ✨ 2. Installation and Setup

Gtags is available on most package managers.

### Installation

<CodeBlock>sudo apt-get install global</CodeBlock>

You may also need language-specific parsers for better accuracy, like \`exuberant-ctags\`. Global can use ctags as a backend parser.

### Generating the Tags Database

Navigate to the root directory of your project and run the \`gtags\` command.

| Command | What it does |
|---|---|
| \`gtags\` | This command scans the current directory and all subdirectories to find source files. It then parses them to create the \`GTAGS\` (for definitions) and \`GRTAGS\` (for references) files. For very large projects, this might take a minute. |

That's it! Once these files exist, your editor can use them.

---

## ✨ 3. Using Gtags with Vim

Vim doesn't have built-in support for Gtags, but several plugins make the integration seamless. A popular choice is \`gtags.vim\`. However, you can use it without plugins by running commands directly.

First, you need to "load" the Gtags database. Many plugins do this automatically.

### Manual Vim Integration

You can use the \`:Gglobal\` command (if provided by a plugin) or shell out to the \`global\` command-line tool.

| Command | Detailed Explanation |
|---|---|
| \`:!global -x <symbol>\` | **(Find Definition)** Shows a list of all locations where \`<symbol>\` is defined. The \`-x\` flag produces a ctags-style output. You can jump to a location from the results. |
| \`:!global -r <symbol>\` | **(Find References)** Shows a list of all locations where \`<symbol>\` is referenced or used. This is one of Global's most powerful features. |
| \`:!global -P <path>\` | **(Find File)** Finds a file with the given \`<path>\` anywhere in the indexed project. |
| \`:!global -c\` | **(Completion)** Provides context-aware symbol completion, which can be hooked into Vim's autocomplete. |

### With a Plugin (like gtags.vim)

With a plugin, you get much nicer keybindings.

| Common Keybinding | Action |
|---|---|
| \`Ctrl-T\` (custom map) | Jump to definition of the symbol under the cursor. |
| \`Ctrl-R\` (custom map) | Find all references to the symbol under the cursor. |

These plugins provide a much smoother experience by populating Vim's quickfix or location list with the results, allowing you to easily jump between them.

---

## ✨ 4. Gtags vs. Ctags/Cscope

| Feature | Gtags (Global) | Ctags | Cscope |
|---|---|---|---|
| **Primary Goal** | Definitions & References | Definitions Only | Definitions, References, Callers |
| **Speed** | Very Fast | Extremely Fast | Fast |
| **Database** | Multiple files (GTAGS, GRTAGS) | Single \`tags\` file | Single \`cscope.out\` file |
| **Find References** | Yes (core feature) | No | Yes |
| **Editor Integration** | Excellent (Vim, Emacs) | Universal | Good (Vim, Emacs) |
| **Updating Index** | Fast incremental updates | Must regenerate | Must regenerate |

Gtags often shines in C/C++ projects where finding all references to a function or variable is a common and critical task. Its ability to quickly update its index is also a significant advantage in actively developed projects.

---

## 🎯 Practice Scenario
1.  Navigate to a large C or C++ project directory.
2.  Generate the Gtags database: \`gtags\`
3.  Open a source file in Vim: \`vim main.c\`
4.  Find the definition of a function: place your cursor on it and (with a plugin) use the "go to definition" command.
5.  Find all references to that function: use the "find references" command. Vim's quickfix list will be populated with every location.
6.  Navigate through the quickfix list with \`:cnext\` and \`:cprev\` to see every usage of the function across the entire project.

✅ Gtags is a professional-grade tool for serious code spelunking. Its speed and powerful reference-finding capabilities make it an indispensable asset for developers working on large and complex systems.
`;


export default function GtagsPage() {
    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={gtagsMarkdownContent} />
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={gtagsMarkdownContent} />
                </div>
            </aside>
        </div>
    );
}
