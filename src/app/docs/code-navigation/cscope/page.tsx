import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';

const cscopeMarkdownContent = `
# 🏷️ Code Navigation with Cscope

Cscope is like ctags on steroids. While ctags only knows *where* symbols are defined, cscope builds a richer database that understands the relationships *between* symbols. It's a more powerful code-browsing tool for answering questions like "Who calls this function?".

---

## ✨ 1. What is Cscope?

- **Purpose**: Advanced code analysis. It answers questions like "Who calls this function?" or "Where is this variable used?".
- **How it works**: It creates a \`cscope.out\` database that maps out the entire structure of your code, including function calls and symbol usages.
- **Strength**: Incredibly powerful for understanding code flow and impact analysis. It's indispensable for exploring an unfamiliar codebase.

---

## ✨ 2. Installing and Using Cscope

Cscope is also a standard package on most systems.

### Installation

<CodeBlock>sudo apt-get install cscope</CodeBlock>

### Generating the Cscope Database

From your project's root directory, you first need to generate a list of files for cscope to index.

| Command | What it does |
|---|---|
| \`find . -name "*.c" -o -name "*.h" > cscope.files\` | This command finds all files ending in \`.c\` or \`.h\` in the current directory and subdirectories and saves that list into a file named \`cscope.files\`. |
| \`cscope -b -k -i cscope.files\` | **-b**: Build the database only; don't open the interactive cscope TUI. **-k**: "Kernel mode." This tells cscope not to look in \`/usr/include\` for system headers, which keeps your database focused on *your* project code. **-i**: Tells cscope to use the \`cscope.files\` file as its input list. |

This creates \`cscope.out\` and other related database files.

### Using Cscope with Vim

Vim's integration with cscope is also excellent. First, you must add the database to your Vim session.

<CodeBlock>:cs add cscope.out</CodeBlock>

You can automate this by adding it to your \`.vimrc\` file. Now, you can run powerful queries. The format is always \`:cs find <query_type> <symbol>\`.

| Command | Detailed Explanation |
|---|---|
| \`:cs find s <symbol>\` | **(Symbol)** Finds every single occurrence of this C symbol in your project. This includes definitions, function calls, and variable assignments. |
| \`:cs find g <symbol>\` | **(Global Definition)** Finds the global definition of the symbol. This is very similar to what ctags does, but it's guaranteed to be the global one. |
| \`:cs find c <function>\` | **(Callers)** This is one of cscope's killer features. It finds all the functions that *call* the given \`<function>\`. It's incredibly useful for tracing how and where a function is used. |
| \`:cs find d <function>\` | **(Callees)** The opposite of 'c'. It finds all the functions that are *called by* the given \`<function>\`. This helps you understand what a function does internally. |
| \`:cs find t <text>\` | **(Text)** Performs a simple text search for any string across all indexed files. It's like a project-wide \`grep\`. |
| \`:cs find f <filename>\` | **(File)** Finds and opens a file by name. It's faster than searching through the file tree. |
| \`:cs find i <filename>\` | **(Includes)** Finds all files that \`#include\` the given \`<filename>\`. Perfect for finding dependencies. |

👉 **How to access other files:** To find every place where \`update_user_profile()\` is called across your entire project, you would use \`:cs find c update_user_profile\`. Vim will show you a list of every location in every file. You can select one to jump directly to that file and line.

---

## ✨ 3. The Ultimate Workflow: Ctags + Cscope

You don't have to choose! The best workflow uses both tools for what they do best.

- Use **Ctags** for its lightning-fast "go to definition" (\`Ctrl + ]\`), as this is the most frequent navigation action.
- Use **Cscope** for its powerful analytical queries (\`:cs find c\`, \`:cs find s\`, etc.) when you need to understand the context and usage of your code.

### Combined Generation
1.  **Generate a file list for Cscope**:
    <CodeBlock>find . -name "*.c" -o -name "*.h" > cscope.files</CodeBlock>
2.  **Generate both databases in one go**:
    <CodeBlock>
    ctags -R .
    cscope -b -k -i cscope.files
    </CodeBlock>
    
### Practice Scenario
1.  Navigate to a C project directory.
2.  Generate both databases using the commands above.
3.  Open a source file: \`vim main.c\`
4.  Add the cscope database to Vim: \`:cs add cscope.out\`
5.  Place your cursor on a function call and press \`Ctrl + ]\` to jump to its definition in another file.
6.  Press \`Ctrl + T\` to jump back.
7.  Now, find all functions that call that same function: \`:cs find c <function_name>\`
8.  Vim presents a list of results. Type a number and press Enter to jump to a new location.

✅ By mastering ctags and cscope, you can navigate massive, multi-file codebases with the same ease as a small script, dramatically boosting your productivity.
`;

export default function CscopePage() {
    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={cscopeMarkdownContent} />
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={cscopeMarkdownContent} />
                </div>
            </aside>
        </div>
    );
}
