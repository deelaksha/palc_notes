
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';

const ripgrepAgMarkdownContent = `
# ⚡️ Fast Code Search with ripgrep (rg) and The Silver Searcher (ag)

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
`;

export default function RipgrepAgPage() {
    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={ripgrepAgMarkdownContent} />
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={ripgrepAgMarkdownContent} />
                </div>
            </aside>
        </div>
    );
}
