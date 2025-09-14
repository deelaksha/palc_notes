
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';
import { Chatbot } from '@/components/chatbot/Chatbot';

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
            <Chatbot pageContent={cscopeMarkdownContent} />
        </div>
    );
}
