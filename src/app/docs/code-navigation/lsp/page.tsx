import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';

const lspMarkdownContent = `
# 🤖 Code Navigation with LSP (Language Server Protocol)

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
`;

export default function LspPage() {
    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={lspMarkdownContent} />
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={lspMarkdownContent} />
                </div>
            </aside>
        </div>
    );
}
