
import { gitCommandsData } from './git-commands';
import { commandsData as linuxCommandsData } from './linux-commands';

// Import markdown content from various pages
const cscopeMarkdownContent = `
# 🏷️ Code Navigation with Cscope
... content from cscope page ...
`;
const ctagsMarkdownContent = `
# 🏷️ Code Navigation with Ctags
... content from ctags page ...
`;
const gtagsMarkdownContent = `
# 🌍 Code Navigation with GNU Global (Gtags)
... content from gtags page ...
`;
const lspMarkdownContent = `
# 🤖 Code Navigation with LSP (Language Server Protocol)
... content from lsp page ...
`;
const ripgrepAgMarkdownContent = `
# ⚡️ Fast Code Search with ripgrep (rg) and The Silver Searcher (ag)
... content from ripgrep-ag page ...
`;
const regexAdvancedLookarounds = `
# 🧙‍♂️ Advanced Magic: Lookarounds
... content from advanced-lookarounds page ...
`;
const regexAnchorsBoundaries = `
# ⚓️ Anchors & Boundaries
... content from anchors-boundaries page ...
`;
const regexBasics = `
# 🧙‍♂️ The Basics: Characters & Sets
... content from basics page ...
`;
const regexGroupingCapturing = `
# 📦 Grouping & Capturing
... content from grouping-capturing page ...
`;
const regexPractice = `
# 🌟 Common Patterns & Practice
... content from practice page ...
`;
const regexQuantifiers = `
# 🔢 Quantifiers: Greedy vs. Lazy
... content from quantifiers page ...
`;
const vimMarkdownContent = `
# 📘 Vim Commands – Beginner Friendly Guide
... content from vim page ...
`;

const formatCommands = (title: string, commands: any[]) => {
  let context = `\n# ${title}\n`;
  commands.forEach(cmd => {
    context += `\n## Command: ${cmd.name}\n`;
    context += `**Description**: ${cmd.description}\n`;
    context += `**Category**: ${cmd.category}\n`;
    context += `**How it works**:\n${cmd.howItWorks.join('\n- ')}\n`;
    context += `**Examples**:\n`;
    cmd.examples.forEach((ex: { code: string, text: string }) => {
        context += `- ${ex.text}: \`${ex.code}\`\n`;
    });
    context += `**Real-world application**: ${cmd.realWorld}\n`;
  });
  return context;
};

const allDocsContext = `
${formatCommands('Git Commands', gitCommandsData)}
${formatCommands('Linux Commands', linuxCommandsData)}

# Code Navigation Docs
${ctagsMarkdownContent}
${cscopeMarkdownContent}
${gtagsMarkdownContent}
${lspMarkdownContent}
${ripgrepAgMarkdownContent}

# Regex Docs
${regexBasics}
${regexAnchorsBoundaries}
${regexQuantifiers}
${regexGroupingCapturing}
${regexAdvancedLookarounds}
${regexPractice}

# Vim Docs
${vimMarkdownContent}
`;

// To avoid making this file too large with all the content,
// here is the placeholder for the full content of each markdown file.
// In the actual implementation, you would replace these placeholders
// with the full markdown content.

const allDocsContextFilled = allDocsContext
  .replace('... content from cscope page ...', `
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

---

## 🎯 Practice Scenario

Let's put it all together in a real-world scenario.

1.  **Navigate** to a C project directory in your terminal.
2.  **Generate** both databases using the two commands from the section above.
3.  **Open** a source file in Vim:
    <CodeBlock>vim main.c</CodeBlock>
4.  **Add** the cscope database to your Vim session:
    <CodeBlock>:cs add cscope.out</CodeBlock>
5.  **Go to Definition**: Place your cursor on a function call and press \`Ctrl + ]\` to instantly jump to its definition (using Ctags).
6.  **Jump Back**: Press \`Ctrl + T\` to return to where you were.
7.  **Find Callers**: Now, find all functions that call that same function using Cscope:
    <CodeBlock>:cs find c <function_name></CodeBlock>
8.  **Navigate Results**: Vim will present a list of every location where the function is called. Type a number from the list and press Enter to jump to that new location.

✅ By mastering the combination of ctags for speed and cscope for power, you can navigate massive, multi-file codebases with the same ease as a small script, dramatically boosting your productivity and understanding.
  `)
  .replace('... content from ctags page ...', `
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
  `)
  .replace('... content from gtags page ...', `
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
  `)
  .replace('... content from lsp page ...', `
The Language Server Protocol (LSP) is a modern standard developed by Microsoft that revolutionizes how development tools understand code. Instead of building language support into every single editor, LSP allows a single "language server" to provide intelligent features like autocomplete, go-to-definition, and diagnostics to any compatible editor or client.

---

## ✨ 1. What is LSP?

LSP separates the "brains" of language analysis from the text editor. The editor is the *client* and the language-specific tool is the *server*. They communicate using a standardized JSON-RPC protocol.

- **Primary Purpose**: To provide rich, real-time language features like diagnostics, code completion, and navigation in a standardized way.
- **How it works**: When you open a project, your editor starts the appropriate language server (e.g., \`rust-analyzer\` for Rust, \`gopls\` for Go). The server analyzes your code in the background and responds to requests from the editor as you type.
- **Strength**: Extremely intelligent and context-aware. It understands your code's structure, types, and dependencies, providing IDE-level features in a lightweight editor like Vim.

---

## ✨ 2. Key LSP Features

LSP enables a wide range of powerful features that go far beyond simple text matching.

| Feature | Detailed Explanation |
|---|---|
| **Go to Definition** | Jumps to the exact definition of a function, variable, or type, even across different files and dependencies. This is highly accurate because the server understands the code's semantics. |
| **Find References** | Finds every place a symbol is used in your project. This is a semantic search, not a text search, so it won't find references in comments or strings. |
| **Code Completion** | Provides intelligent, context-aware suggestions for functions, methods, variables, and keywords as you type. |
| **Hover Information** | Shows detailed information about the symbol under your cursor, such as its type signature, documentation, and where it's defined. |
| **Real-time Diagnostics** | Underlines errors and warnings in your code as you type, providing instant feedback without needing to run a compiler. |
| **Code Actions** | Suggests and applies automatic fixes for common problems, such as adding missing imports or correcting typos. |
| **Rename Symbol** | Safely renames a variable, function, or type across the entire project, updating all its references automatically. |

---

## ✨ 3. Setting Up LSP with Vim/Neovim

Setting up LSP in Vim or Neovim requires a few components:
1.  **An LSP Client Plugin**: This is the plugin that manages starting language servers and communicating with them. The most popular choice for Neovim is its built-in LSP client (\`nvim-lspconfig\`). For Vim, plugins like \`vim-lsp\` or \`coc.nvim\` are common.
2.  **A Language Server**: You need to install the specific server for the language you're working with.

### Example Setup (Neovim with nvim-lspconfig)

1.  **Install the LSP config plugin**: Add \`nvim-lspconfig\` to your plugin manager.
2.  **Install a Language Server**: For example, to get support for TypeScript:
    <CodeBlock>npm install -g typescript-language-server typescript</CodeBlock>
3.  **Configure Neovim**: In your \`init.lua\` or \`init.vim\`, you configure the server:
    <CodeBlock>
    -- init.lua
    require'lspconfig'.tsserver.setup{}
    </CodeBlock>
4.  **Set up keybindings**: You then map keys to trigger LSP actions.

| Common Neovim LSP Keybinding | Action |
|---|---|
| \`gd\` | **g**o to **d**efinition of the symbol under the cursor. |
| \`gr\` | Find all **r**eferences to the symbol. |
| \`K\` (Shift + k) | Show **h**over documentation for the symbol. |
| \`[d\` and \`]d\` | Jump to the **p**revious or **n**ext diagnostic (error/warning). |
| \`<leader>ca\` | Show available **c**ode **a**ctions for the current line. |

---

## ✨ 4. LSP vs. Indexing Tools (Ctags, Gtags)

| Feature | LSP | Ctags/Gtags |
|---|---|---|
| **Analysis** | Real-time, dynamic | Static, pre-computed index |
| **Accuracy** | High (semantic understanding) | Lower (regex-based) |
| **Features** | Go-to-def, references, autocomplete, diagnostics, rename, etc. | Go-to-def, find references (Gtags) |
| **Setup** | More complex (client + server per language) | Simple (run one command) |
| **Performance** | Can be resource-intensive | Extremely lightweight and fast |
| **Cross-File Nav** | Excellent, follows imports and dependencies | Good, based on indexed files |

👉 **When to use which?**
-   **LSP**: The modern default for daily development. Its real-time feedback and intelligent features are invaluable for writing and refactoring code.
-   **Ctags/Gtags**: Still incredibly useful for quickly exploring a new or unfamiliar codebase where you just want to get a lay of the land without setting up a full LSP environment. Their speed is unmatched for simple "go to definition."

---

## 🎯 Practice Scenario
1.  Set up Neovim with \`nvim-lspconfig\` and a language server for your favorite language (e.g., \`pyright\` for Python).
2.  Open a project in that language.
3.  Place your cursor over a function call and press \`gd\` to jump to its definition in another file.
4.  Press \`Ctrl-O\` to jump back.
5.  Place your cursor over the same function and press \`gr\` to open a list of all its usages in the project.
6.  Introduce a syntax error in your code and watch as the LSP immediately underlines it and provides an error message.
7.  Hover over a variable to see its inferred type without having to trace it back yourself.

✅ LSP brings the power of a full-featured IDE into the terminal, providing a development experience that is both lightweight and deeply intelligent.
  `)
  .replace('... content from ripgrep-ag page ...', `
When you need to find a specific string or pattern in a large codebase, traditional tools like \`grep\` can be slow. \`ripgrep\` (command: \`rg\`) and \`The Silver Searcher\` (command: \`ag\`) are modern, hyper-fast alternatives designed specifically for searching source code.

---

## ✨ 1. What are rg and ag?

Both are command-line tools that recursively search your current directory for a pattern. They are built for speed and developer convenience.

- **Primary Purpose**: To find lines of text that match a pattern within a project's files, as quickly as possible.
- **How they work**: They achieve their speed by running searches in parallel, automatically ignoring files listed in your \`.gitignore\`, and skipping binary files by default.
- **Strength**: Speed, speed, and more speed. They are significantly faster than traditional search tools, making them essential for large projects.

**ripgrep (rg) is generally considered the fastest and most modern tool in this category.**

---

## ✨ 2. ripgrep (rg)

\`ripgrep\` is written in Rust and is known for its correctness and raw performance.

### Installation

<CodeBlock>sudo apt-get install ripgrep</CodeBlock>

### Common Usage

| Command | Detailed Explanation |
|---|---|
| \`rg "pattern"\` | Searches for the literal string "pattern" in the current directory and subdirectories. Output includes the filename, line number, and the matching line. |
| \`rg -i "pattern"\` | **-i**: Case-**i**nsensitive search. Finds "pattern", "Pattern", "PATTERN", etc. |
| \`rg -l "pattern"\` | **-l**: **l**ist files. Only prints the names of files that contain a match, instead of the matching lines. |
| \`rg -w "pattern"\` | **-w**: **w**hole word search. Matches "pattern" but not "patterns". |
| \`rg "my_function\\("\` | To search for special characters like parentheses, you often need to escape them with a backslash. |
| \`rg -t py "class"\` | **-t**: file **t**ype. Restricts the search to files of a specific type. Here, it only searches Python files for the word "class". |
| \`rg -g "*.js" "=>"\` | **-g**: **g**lob pattern. Restricts the search to files matching a glob. Here, it searches for fat arrows (\`=>\`) only in JavaScript files. |
| \`rg -C 5 "error"\` | **-C**: **C**ontext. Shows 5 lines of context before and after each matching line. Useful for understanding the surrounding code. |

---

## ✨ 3. The Silver Searcher (ag)

\`ag\`, named after the chemical symbol for silver, was the predecessor to \`ripgrep\` and is written in C. It is also extremely fast and has similar features.

### Installation

<CodeBlock>sudo apt-get install silversearcher-ag</CodeBlock>

### Common Usage

The flags for \`ag\` are very similar to \`rg\` and classic \`grep\`.

| Command | Detailed Explanation |
|---|---|
| \`ag "pattern"\` | Searches for "pattern" recursively. Its output format is very readable by default. |
| \`ag -i "pattern"\` | Case-**i**nsensitive search. |
| \`ag -l "pattern"\` | Only **l**ist the names of files containing matches. |
| \`ag --python "class"\` | \`ag\` has built-in helpers for file types. This searches for "class" only in Python files. |

---

## ✨ 4. rg vs. ag vs. grep

| Feature | ripgrep (rg) | Silver Searcher (ag) | grep |
|---|---|---|---|
| **Speed** | Blazing Fast | Very Fast | Slow |
| **.gitignore aware**| Yes (by default) | Yes (by default) | No |
| **Parallel Search** | Yes | Yes | No |
| **Output Format** | Optimized for readability | Readable | Basic |
| **Unicode Support** | Excellent | Good | Varies |
| **Configuration** | Rich (\`.ripgreprc\` file) | Limited | N/A |
| **Availability** | Universal (Rust) | Universal (C) | Guaranteed on all Unix-like systems |

👉 **Why not just use \`grep\`?**
For a single file, \`grep\` is fine. But for searching a 500,000-line project, \`rg\` might finish in half a second while \`grep -r\` could take 10-15 seconds. This speed difference is transformative for a developer's workflow.

---

## ✨ 5. Editor Integration (Vim)

Both tools integrate beautifully with Vim, especially with fuzzy finders like **FZF**.

### Using with FZF.vim

You can configure FZF to use \`rg\` or \`ag\` as its backend for searching file contents.

1.  **Install FZF and FZF.vim**.
2.  **Install ripgrep**.
3.  FZF.vim will automatically detect and use \`rg\` if it's available, as it's the preferred provider.

Now you can use FZF's search commands:

| Command | Action |
|---|---|
| \`:Rg <pattern>\` | This FZF command uses \`ripgrep\` to search for the pattern in your project. It opens the results in a fuzzy-find window, where you can instantly preview and jump to any matching line. |
| \`:Ag <pattern>\` | The equivalent command if you are using \`The Silver Searcher\`. |

This combination is one of the most powerful and efficient ways to search code available in any editor.

---

## 🎯 Practice Scenario
1.  Navigate to a large project directory.
2.  Install \`ripgrep\`.
3.  Search for a common function name: \`rg "myFunction"\`
4.  Search for the same function, but only in JavaScript files: \`rg -g "*.js" "myFunction"\`
5.  Find only the names of files that import a specific module: \`rg -l "import { someModule }"\`
6.  Set up FZF.vim and use the \`:Rg\` command to do an interactive, fuzzy search for a variable name.

✅ \`ripgrep\` and \`ag\` are fundamental tools for the modern developer. Their incredible speed turns code search from a slow, cumbersome task into an instantaneous and pleasant experience.
  `)
  .replace('... content from advanced-lookarounds page ...', `
Lookarounds are the secret weapons of a Regex master. Like anchors, they are **zero-width assertions**, meaning they match a position, not characters. They allow you to create conditions—"match this pattern, but only if it's next to that other pattern"—without including the "other pattern" in the final match.

---

## ✨ 1. Lookahead \`(?=...)\`
**Positive Lookahead**: Asserts that the characters following the current position must match the pattern inside the lookahead, but doesn't consume them.

Think of it as looking ahead in the string to see if a condition is met before deciding to match.

- **Use Case**: You want to match the word "Mission", but only if it's followed by a colon.
- **Input Text**: "Mission: 1, Mission 2, Mission: 3"
- **Regex**: \`Mission(?=:)\`
- **Explanation**:
    1.  The engine matches "Mission".
    2.  It then encounters the lookahead \`(?=:)\`. It *peeks* forward. Is the next character a colon \`:\`?
    3.  In "Mission: 1", yes it is. The lookahead succeeds. The entire match is "Mission". The colon is not included.
    4.  In "Mission 2", the lookahead peeks forward and sees a space. It fails. The engine backtracks and determines there is no match here.
- **Output**: "Mission" (twice)

---

## ✨ 2. Negative Lookahead \`(?!...)\`
**Negative Lookahead**: Asserts that the characters following the current position must **not** match the pattern inside the lookahead.

- **Use Case**: You want to match the word "cat", but not if it's part of the word "catfish".
- **Input Text**: "I have a cat, a dog, and a catfish."
- **Regex**: \`\\bcat(?!fish)\\b\`
- **Explanation**:
    1.  The engine matches the whole word "cat".
    2.  It hits the negative lookahead \`(?!fish)\`. It peeks forward. Are the next characters "fish"? No, they are a comma and a space. The lookahead succeeds. Match found: "cat".
    3.  Later, in "catfish", the engine matches "cat".
    4.  It peeks forward. Are the next characters "fish"? Yes. The negative lookahead *fails*. This is not a match.
- **Output**: "cat"

---

## ✨ 3. Lookbehind \`(?<=...)\`
**Positive Lookbehind**: Asserts that the characters preceding the current position must match the pattern inside the lookbehind.

Think of it as looking over your shoulder to check what came before.

- **Use Case**: You want to extract the numbers from prices in dollars, but you don't want the dollar sign in your match.
- **Input Text**: "$100, €50, $20"
- **Regex**: \`(?<=\\$)\\d+\`
- **Explanation**:
    1.  The engine moves along the string. When it gets to "1", it triggers the lookbehind.
    2.  It *peeks* backward. Is the preceding character a dollar sign \`$\`? (Note the \`\\$\` to escape it). Yes. The lookbehind succeeds.
    3.  The engine then proceeds to match \`\\d+\`, which matches "100".
    4.  Later, when it gets to "5", it peeks backward and sees "€". The lookbehind fails. No match.
- **Output**: "100" and "20"
- **Important Note**: Many regex engines require the pattern inside a lookbehind to be of a fixed length. You can't put quantifiers like \`*\` or \`+\` in them in most flavors.

---

## ✨ 4. Negative Lookbehind \`(?<!...)\`
**Negative Lookbehind**: Asserts that the characters preceding the current position must **not** match the pattern.

- **Use Case**: You want to find a number, but only if it's not preceded by "ID: ".
- **Input Text**: "Order: 123, ID: 456, Quantity: 789"
- **Regex**: \`(?<!ID: )\\b\\d+\\b\`
- **Explanation**:
    1.  When the engine gets to "123", it looks behind. Is it preceded by "ID: "? No. The lookbehind succeeds. Match: "123".
    2.  When it gets to "456", it looks behind. Is it preceded by "ID: "? Yes. The negative lookbehind *fails*. No match.
    3.  When it gets to "789", it looks behind. It's not preceded by "ID: ". Match: "789".
- **Output**: "123" and "789"

---

## Example: Password Strength Check
Lookaheads are famously used for password validation. Let's create a pattern that requires at least one lowercase letter, one uppercase letter, one digit, and is at least 8 characters long.

- **Regex**: \`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\`
- **Explanation**:
    - \`^\`: Anchor to the start of the string.
    - \`(?=.*[a-z])\`: A lookahead that asserts "somewhere in the string, there is a lowercase letter". It doesn't consume any characters.
    - \`(?=.*[A-Z])\`: A second lookahead from the same starting position. It asserts "somewhere in the string, there is an uppercase letter".
    - \`(?=.*\\d)\`: A third lookahead asserting "somewhere in the string, there is a digit".
    - After all three lookaheads succeed (without moving the cursor!), the engine finally tries to consume characters with \`.{8,}\`.
    - \`.{8,}$\`: This matches any character, 8 or more times, until the end of the string.

This powerful combination lets you enforce multiple conditions on the same string simultaneously.
  `)
  .replace('... content from anchors-boundaries page ...', `
Anchors are special metacharacters that don't match any character. Instead, they match a **position** before, after, or between characters. They are crucial for ensuring your pattern matches at the right place.

---

## ✨ 1. Start and End of String Anchors

These are the most common anchors. They lock your pattern to the beginning or end of the entire string (or line, with the multiline flag).

### Caret: \`^\` (Start of String)
The caret \`^\` asserts that the position is the very beginning of the string.

- **Input Text**: "Hello world"
- **Regex Pattern**: \`^Hello\`
- **Explanation**: The engine first checks if it's at the start of the string. It is. Then it matches "H", "e", "l", "l", "o". This is a match.
- **Output**: "Hello"

If we tried the pattern \`world^\`, it would fail because "world" is not at the start of the string.

### Dollar Sign: \`$\` (End of String)
The dollar sign \`$\` asserts that the position is the very end of the string.

- **Input Text**: "Hello world"
- **Regex Pattern**: \`world$\`
- **Explanation**: The engine matches "world" and then checks if the position immediately after is the end of the string. It is. This is a match.
- **Output**: "world"

- **Real-world Example**: Validating a username format. You want to ensure the entire string matches, not just part of it. A pattern like \`^[a-z0-9]{3,16}$\` ensures the string starts, contains 3-16 valid characters, and then immediately ends. Without the anchors, "!!username!!" would match because it *contains* a valid username.

---

## ✨ 2. Word Boundaries

Word boundaries are incredibly useful for matching whole words.

### Word Boundary: \`\\b\`
The anchor \`\\b\` matches a position that is a "word boundary". A word boundary is a position between a word character and a non-word character, or at the start/end of a string.

- **Word Characters** (\`\\w\`): Letters (\`a-z\`, \`A-Z\`), numbers (\`0-9\`), and the underscore (\`_\`).
- **Non-Word Characters** (\`\\W\`): Everything else (spaces, punctuation like \`.\`, \`,\`, etc.).

- **Input Text**: "The cat scattered."
- **Regex Pattern**: \`\\bcat\\b\`
- **Explanation**:
    1.  In "The cat", the space before "c" creates a boundary. The space after "t" creates another. \`cat\` is matched.
    2.  In "scattered", "s" and "c" are both word characters, so there is no boundary before the "c". This is not a match.
- **Output**: "cat"

### Non-Word Boundary: \`\\B\`
The anchor \`\\B\` is the opposite of \`\\b\`. It matches any position that is **not** a word boundary.

- **Input Text**: "The bobcat scattered."
- **Regex Pattern**: \`\\Bcat\`
- **Explanation**: The engine looks for "cat" that does *not* have a word boundary before it. In "bobcat", the position between "b" and "c" is not a boundary because both are word characters. This is a match.
- **Output**: "cat" (inside "bobcat")

- **Real-world Example**: You want to find all instances of the word "view" but not "review" or "preview". The pattern \`\\bview\\b\` is perfect for this. Without the boundaries, a simple search for "view" would incorrectly match inside "review".
  `)
  .replace('... content from basics page ...', `
Welcome, adventurer, to the world of Regular Expressions! Think of Regex as a secret language for finding and manipulating text. Let's start with the absolute basics.

---

## ✨ 1. Introduction to Regex

### What is Regex?
A **Regular Expression** (or **Regex**) is a special sequence of characters that defines a search pattern. You can use this pattern to find specific words, numbers, or structures within text. It's like a super-powered version of the "Find" feature in your text editor.

### Why use Regex?
- **Validation**: Check if an email address, phone number, or password is in the correct format.
- **Searching**: Find complex patterns in large log files or documents.
- **Replacing**: Find all instances of a word and replace them with another.
- **Extraction**: Pull out all URLs or email addresses from a block of text.

### Where is it used?
Regex is used almost everywhere in programming and text processing:
- **Text editors and IDEs** (like VS Code, Vim) for advanced search and replace.
- **Programming languages** (like JavaScript, Python, Java, Go) for string manipulation.
- **Command-line tools** (like \`grep\`, \`sed\`, \`awk\`).

---

## ✨ 2. Basic Concepts and Syntax

Let's start with the building blocks of our secret language.

### Literal Characters
The simplest regex is just a plain string of characters. The regex \`hello\` will find the exact substring "hello" in your text.

- **Input Text**: "hello world"
- **Regex Pattern**: \`hello\`
- **Explanation**: The engine looks for the character 'h', followed by 'e', 'l', 'l', 'o'.
- **Output**: "hello"

### Special Characters (Metacharacters)
These are characters with special meanings. They are the wizards of our language.

| Character | Name | What it Does | Example | Matches |
|---|---|---|---|---|
| \`.\` | Wildcard | Matches any single character (except newline) | \`h.t\` | "hat", "hot", "h@t" |
| \`\\\` | Backslash | **Escapes** a special character, treating it as a literal | \`\\.\` | Matches an actual dot "." |

### Escaping Characters
What if you actually want to find a dot \`.\` or a plus \`+\`? You use a backslash \`\\\` to tell the engine, "Hey, this next character is just a normal guy, not a wizard."

- **Input Text**: "The file is file.txt"
- **Regex Pattern**: \`file\\.txt\`
- **Explanation**: We escape the dot with a backslash \`\\.\` to match a literal dot.
- **Output**: "file.txt"
- **Pitfall**: Forgetting to escape special characters is a very common mistake! The pattern \`file.txt\` would also match "file-txt" or "file@txt".

### Character Sets \`[]\`
Character sets, or character classes, let you match one character from a specific group.

| Pattern | What it Does | Example | Matches |
|---|---|---|---|
| \`[abc]\` | Matches a single 'a', 'b', or 'c' | \`h[aeiou]t\` | "hat", "het" |
| \`[a-z]\` | Matches any single lowercase letter from 'a' to 'z' | \`[a-z]ing\` | "sing", "ring" |
| \`[A-Z0-9]\` | Matches any uppercase letter or any digit | \`[A-Z][0-9]\` | "A1", "C5" |
| \`[^abc]\` | **Negation**: Matches any single character **except** 'a', 'b', or 'c' | \`h[^o]t\` | "hat", "hit" (but not "hot") |

### Predefined Character Classes

| Class | Equivalent | What it Does |
|---|---|---|
| \`\\d\` | \`[0-9]\` | Matches any digit. |
| \`\\w\` | \`[a-zA-Z0-9_]\` | Matches any "word" character (letter, number, or underscore). |
| \`\\s\` | \`[ \\t\\r\\n\\f]\` | Matches any whitespace character (space, tab, newline). |
| \`\\D\` | \`[^0-9]\` | Matches any character that is **not** a digit. |
| \`\\W\` | \`[^a-zA-Z0-9_]\` | Matches any character that is **not** a word character. |
| \`\\S\` | \`[^ \\t\\r\\n\\f]\` | Matches any character that is **not** whitespace. |
  `)
  .replace('... content from grouping-capturing page ...', `
Parentheses \`()\` are one of the most powerful features in regex. They let you group parts of a pattern together and "capture" the text that matches inside them for later use.

---

## ✨ 1. Grouping
At its simplest, grouping lets you apply a quantifier to a whole sequence of characters, not just one.

- **Input Text**: "hahaha"
- **Regex Pattern**: \`(ha)+\`
- **Explanation**:
    1.  The \`(ha)\` creates a group containing "ha".
    2.  The \`+\` quantifier applies to the *entire group*, meaning "match the sequence 'ha' one or more times".
- **Output**: "hahaha"

Without the group, the pattern \`ha+\` would mean "match 'h' followed by 'a' one or more times", which would only match "haaaa...".

---

## ✨ 2. Capturing Groups
When you group a pattern using \`()\`, the text that matches inside the group is automatically "captured" and stored in memory. These captures are numbered starting from 1 based on the opening parenthesis's position.

- **Input Text**: "My file is image.jpg and not image.png"
- **Regex Pattern**: \`(image)\\.(jpg|png)\`
- **Explanation**:
    - \`(image)\`: This is **Group 1**. It captures the text "image".
    - \`\\.\`: Matches a literal dot.
    - \`(jpg|png)\`: This is **Group 2**. It uses alternation and captures either "jpg" or "png".
- **Output Matches**: "image.jpg" and "image.png"
- **Captured Groups for the first match ("image.jpg")**:
    - **Group 1**: "image"
    - **Group 2**: "jpg"

### Backreferences
You can refer back to a captured group *within the same regex pattern* using \`\\1\`, \`\\2\`, etc. This is perfect for finding repeated words.

- **Input Text**: "This is a test test."
- **Regex Pattern**: \`\\b(\\w+)\\s+\\1\\b\`
- **Explanation**:
    - \`\\b\`: Word boundary.
    - \`(\\w+)\`: Matches one or more word characters and captures them into **Group 1**. Let's say it captures "test".
    - \`\\s+\`: Matches one or more spaces.
    - \`\\1\`: This is the backreference. It tells the engine to match the exact text that was captured by Group 1, which is "test".
    - \`\\b\`: Word boundary.
- **Output**: "test test"

---

## ✨ 3. Non-Capturing Groups \`(?:...)\`
Sometimes you need to group parts of your pattern (e.g., to use a quantifier or alternation) but you don't care about capturing the result. Using a non-capturing group \`(?:...)\` is slightly more efficient because the engine doesn't have to store the matched text.

- **Regex Pattern**: \`(?:Mr|Mrs|Ms)\\. [A-Z]\\w*\`
- **Explanation**: The \`(?:Mr|Mrs|Ms)\` part groups the titles together so the \`\\.\` applies to all of them, but it doesn't create a capture group that you'd have to skip over if you had other, more important capture groups later in the pattern.

---

## ✨ 4. Named Groups \`(?<name>...)\`
In modern regex engines, you can give your capture groups names, which makes your regex and the code that uses it much more readable. The syntax varies slightly between languages (\`(?<name>...)\` or \`(?P<name>...)\` are common).

- **Input Text**: "Date: 2023-10-27"
- **Regex Pattern**: \`Date: (?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})\`
- **Explanation**: Instead of remembering that the year is Group 1, the month is Group 2, etc., you can now access the captured values by the names "year", "month", and "day". This makes your code self-documenting.

- **Captured Groups**:
    - **year**: "2023"
    - **month**: "10"
    - **day**: "27"
  `)
  .replace('... content from practice page ...', `
The best way to learn regex is to use it. This section provides a reference for common real-world patterns and practice problems to test your skills.

---

## ✨ 1. Common Pattern Reference

| Use Case | Regex Pattern | Explanation |
|---|---|---|
| **Email Validation** | \`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\` | Starts with user chars, then @, then domain, then ., then TLD. (A simplified version). |
| **US Phone Number** | \`\\(?\\d{3}\\)?[ -]?\\d{3}[ -]?\\d{4}\` | Matches formats like (123)-456-7890, 123-456-7890, 123 456 7890, 1234567890. |
| **Date (YYYY-MM-DD)** | \`^\\d{4}-\\d{2}-\\d{2}$\` | Exactly 4 digits, a dash, 2 digits, a dash, 2 digits. Anchored to start/end. |
| **URL (simple)** | \`https?:\\/\\/[\\w\\-.]+\\.\\w{2,}(\\/\\S*)?\` | Matches http/https, domain, and optional path. |
| **Password Strength** | \`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\` | Requires at least one lowercase, one uppercase, one digit, and be at least 8 chars long. (Uses Lookaheads). |

---

## ✨ 2. How to Test Regex

You should never write regex blind! Always use a testing tool.
- **Online Tools**: [regex101.com](https://regex101.com) is the gold standard. It provides real-time matching, a full explanation of your pattern, a reference library, and supports multiple regex "flavors" (like Python, JS, PCRE).
- **In Code**:

<CodeBlock>
// JavaScript
const text = "My email is test@example.com";
const pattern = /[a-z]+@[a-z]+\\.[a-z]+/;
const match = text.match(pattern);
console.log(match[0]); // "test@example.com"
</CodeBlock>

<CodeBlock>
# Python
import re
text = "My email is test@example.com"
pattern = r"[a-z]+@[a-z]+\\.[a-z]+"
match = re.search(pattern, text)
print(match.group(0)) # "test@example.com"
</CodeBlock>

---

## ✨ 3. Practice Problems

### Problem 1: Match Hex Color Codes
Find all 3 or 6-digit hex color codes.
- **Input**: "The main color is #F0A3C1 and the accent is #FFF. Invalid: #F, #12345."
- **Solution**: \`#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b\`
- **Explanation**: It looks for a \`#\` followed by either exactly 6 hex characters OR exactly 3 hex characters, followed by a word boundary.

### Problem 2: Extract Image Filenames
From a list of HTML tags, get just the filenames from the \`src\` attribute.
- **Input**: \`<img src="image1.jpg">, <img src="photo.png">\`
- **Solution**: \`<img src="([^"]+)"\`
- **Explanation**: It finds the literal text \`<img src="\`, then uses a capturing group \`([^"]+)\` to capture one or more characters that are NOT a double quote. The filename is in capture group 1.

### Problem 3: Validate a Time Format (HH:MM)
Match valid 24-hour time formats from 00:00 to 23:59.
- **Input**: "Valid: 14:30, 09:05. Invalid: 25:00, 12:60"
- **Solution**: \`^([01]\\d|2[0-3]):([0-5]\\d)$\`
- **Explanation**: Anchored start/end. The hour part \`([01]\\d|2[0-3])\` matches a 0 or 1 followed by any digit, OR a 2 followed by a digit from 0-3. The minute part \`([0-5]\\d)\` matches a digit from 0-5 followed by any digit.

### Problem 4: Find Duplicate Words
Find consecutive repeated words.
- **Input**: "This is a test test. This is fine."
- **Solution**: \`\\b(\\w+)\\s+\\1\\b\`
- **Explanation**: Uses a capturing group \`(\\w+)\` to grab a word, followed by one or more spaces \`\\s+\`, and a backreference \`\\1\` to match the exact same word again.

### Problem 5: Extract Quoted Strings
Capture the content inside double quotes.
- **Input**: He said "hello" and she said "world".
- **Solution**: \`"([^"]*)"\`
- **Explanation**: It matches a \`"\`, then captures zero or more characters that are not a \`"\` (\`[^"]*\`), and finally matches the closing \`"\`. The content is in group 1.

---

## ✨ 4. Tips & Best Practices
- **Be Specific**: Write patterns that are as specific as possible. \`.+\` is powerful but lazy. \`[^<]+\` (match anything that isn't a closing bracket) is often better and more performant.
- **Comment Your Regex**: Complex regex is hard to read. Use comments if your engine supports them (\`(?#...) \` or free-spacing mode \`x\`).
- **Start Simple**: Build your pattern piece by piece. Get one part working, then add the next.
- **Debug with a Tool**: Use regex101.com to see exactly how the engine is processing your string step-by-step.
- **Avoid Catastrophic Backtracking**: A poorly written regex like \`(a|b|c)*d\` on a long string without a 'd' can take forever to run. Be careful with nested quantifiers and alternation.
  `)
  .replace('... content from quantifiers page ...', `
Quantifiers answer the question, "How many times should this part of the pattern appear?" They are essential for matching repeating characters.

---

## ✨ 1. The Basic Quantifiers

| Quantifier | Name | What it Does | Example | Matches in "booot" |
|---|---|---|---|---|
| \`*\` | Star | Matches the preceding character **0 or more** times | \`o*\` | "ooo" |
| \`+\` | Plus | Matches the preceding character **1 or more** times | \`o+\` | "ooo" |
| \`?\` | Question Mark | Matches the preceding character **0 or 1** time | \`o?\` | "o" (the first one) |

### Specific Repetitions with Curly Braces \`{}\`

| Quantifier | What it Does | Example | Matches in "booot" |
|---|---|---|---|
| \`{n}\` | Exactly \`n\` times | \`o{3}\` | "ooo" |
| \`{n,}\` | \`n\` or more times | \`o{2,}\` | "ooo" |
| \`{n,m}\` | Between \`n\` and \`m\` times (inclusive) | \`o{1,2}\` | "oo" (the first two) |

- **Real-world Example**: Matching a phone number format. The pattern \`\\d{3}-\\d{4}\` would match a 3-digit area code, a dash, and a 4-digit number, like "555-1234".

---

## ✨ 2. Greedy vs. Lazy Matching

This is a critical concept. By default, quantifiers are **Greedy**. This means they try to match **as much text as possible** while still allowing the rest of the pattern to match.

### Greedy Quantifiers
Let's see a greedy quantifier in action.

- **Input Text**: \`<h1>This is a heading</h1>\`
- **Greedy Regex**: \`<.*>\`
- **Explanation**:
    1.  The engine sees \`<\` and matches the first one.
    2.  Then it sees \`.*\`. The \`.\` matches any character, and the \`*\` says "match 0 or more times, greedily".
    3.  The engine's greedy nature makes it consume the *entire rest of the string*: \`h1>This is a heading</h1>\`.
    4.  It reaches the end of the string. Now it checks the rest of the pattern: \`>\`.
    5.  The engine has to backtrack from the end of its greedy match, one character at a time, until it finds a \`>\` that allows the pattern to succeed. It finds the very last \`>\`.
- **Output**: \`<h1>This is a heading</h1>\` (The whole thing!)

This is often not what you want. You probably wanted to match just the tags.

### Lazy Quantifiers
To make a quantifier **Lazy**, you add a question mark \`?\` after it (\`*?\`, \`+?\`, \`{n,m}?\`). A lazy quantifier tries to match **as little text as possible**.

- **Input Text**: \`<h1>This is a heading</h1>\`
- **Lazy Regex**: \`<.*?>\`
- **Explanation**:
    1.  The engine sees \`<\` and matches the first one.
    2.  Then it sees \`.*?\`. It's lazy, so it first tries to match *zero* characters.
    3.  It checks the rest of the pattern: \`>\`. Does the next character match? Yes, it's 'h'. No match.
    4.  The lazy quantifier expands its match one character at a time. It matches 'h', then checks for \`>\`. No. It matches '1', then checks for \`>\`. Yes!
- **Output**: The engine finds two matches: \`<h1>\` and \`</h1>\`.

- **Pitfall**: Using greedy quantifiers like \`.*\`, especially with patterns that can be found multiple times in a string, is a common source of bugs. When in doubt, start with a lazy quantifier (\`.*?_\
\`) or a more specific negated character set (\`[^>]*\`). The pattern \`<[^>]*>\` is often a better and more efficient way to match an HTML tag than \`<.*?>\`.
  `)
  .replace('... content from vim page ...', `
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
4. Press \`Esc\` → type \`/note\` → finds the word “note.”
5. Type \`:%s/note/task/g\` → replaces “note” with “task.”
6. Press \`:wq\` → saves and quits.

---

✅ With this, you can **move, edit, search, and manage files in Vim** like a beginner-friendly pro!
`);

export { allDocsContextFilled as allDocsContext };

