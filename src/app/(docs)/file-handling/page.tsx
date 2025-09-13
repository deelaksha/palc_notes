
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { TableOfContents } from '@/components/toc/TableOfContents';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ctagsAndCscopeMarkdownContent = `
# 🏷️ Code Navigation with Ctags & Cscope

When working with large codebases, finding where a function is defined or where it's used can be slow and difficult. Ctags and Cscope are two powerful command-line tools that create an index of your source code. This index acts like a map, allowing your text editor (like Vim) to instantly jump between files, find definitions, and trace function calls with superhuman speed.

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

---

## ✨ 3. What is Cscope?

Cscope is like ctags on steroids. While ctags only knows *where* symbols are defined, cscope builds a richer database that understands the relationships *between* symbols. It's a more powerful code-browsing tool.

- **Purpose**: Advanced code analysis. It answers questions like "Who calls this function?" or "Where is this variable used?".
- **How it works**: It creates a \`cscope.out\` database that maps out the entire structure of your code, including function calls and symbol usages.
- **Strength**: Incredibly powerful for understanding code flow and impact analysis. It's indispensable for exploring an unfamiliar codebase.

---

## ✨ 4. Installing and Using Cscope

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

## ✨ 5. The Ultimate Workflow: Ctags + Cscope

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

// A simple and naive markdown to JSX renderer.
function renderMarkdown(markdown: string) {
  if (!markdown) return null;
  // Split by newline and then process blocks
  const blocks = markdown.trim().split(/\n{2,}/);

  const renderInlines = (text: string) => {
    // Escape HTML to prevent XSS
    const escapedText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
      
    return escapedText
      .replace(/`([^`]+)`/g, '<code class="font-code bg-muted text-foreground px-1 py-0.5 rounded-sm text-sm">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/👉/g, '<span class="mr-2">👉</span>');
  }

  return blocks.map((block, index) => {
    if (block.startsWith('<CodeBlock>')) {
      const code = block.replace(/<\/?CodeBlock>/g, '');
      return <CodeBlock key={index}>{code}</CodeBlock>;
    }
    if (block.startsWith('### ')) {
        const id = block.substring(4).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return <h3 key={index} id={id} className="font-headline text-xl font-semibold mt-6 mb-3" dangerouslySetInnerHTML={{ __html: renderInlines(block.substring(4)) }} />;
    }
    if (block.startsWith('## ')) {
        const id = block.substring(3).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return <h2 key={index} id={id} className="font-headline text-2xl font-bold mt-8 mb-4 pb-2 border-b" dangerouslySetInnerHTML={{ __html: renderInlines(block.substring(3)) }} />;
    }
    if (block.startsWith('# ')) {
      const id = block.substring(2).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return <h1 key={index} id={id} className="font-headline text-4xl font-extrabold mt-4 mb-6 pb-2 border-b" dangerouslySetInnerHTML={{ __html: renderInlines(block.substring(2)) }} />;
    }
    if (block.startsWith('---')) {
      return <hr key={index} className="my-6" />;
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').map((item, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: renderInlines(item.substring(2)) }} />
      ));
      return <ul key={index} className="list-disc pl-6 space-y-1 mb-4">{items}</ul>;
    }
    if (block.match(/^\d+\./)) {
        const items = block.split('\n').map((item, i) => {
            const content = item.substring(item.indexOf('.') + 2);
            return <li key={i} dangerouslySetInnerHTML={{ __html: renderInlines(content) }} />
        });
        return <ol key={index} className="list-decimal pl-6 space-y-1 mb-4">{items}</ol>;
    }
    if (block.startsWith('|')) {
        const rows = block.split('\n');
        const headers = rows[0].split('|').slice(1, -1).map(h => h.trim());
        const body = rows.slice(2);

        return (
            <div key={index} className="overflow-x-auto my-4 border rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="bg-muted">
                            {headers.map((header, i) => <th key={i} className="p-3 text-left font-semibold">{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map((row, i) => (
                            <tr key={i} className="border-t">
                                {row.split('|').slice(1, -1).map((cell, j) => (
                                    <td key={j} className="p-3" dangerouslySetInnerHTML={{ __html: renderInlines(cell.trim()) }} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInlines(block) }} />;
  });
}

const parseSections = (markdown: string) => {
    const sections: { title: string; content: string }[] = [];
    let currentContent: string[] = [];
    let currentTitle = '';

    const introSeparator = markdown.indexOf('---');
    const intro = markdown.substring(0, introSeparator !== -1 ? introSeparator : 0).trim();

    const mainContent = introSeparator !== -1 ? markdown.substring(introSeparator) : markdown;

    const blocks = mainContent.split('---');

    for (const block of blocks) {
        if (!block.trim()) continue;

        const lines = block.trim().split('\n');
        const titleMatch = lines.find(line => line.startsWith('## '));

        if (titleMatch) {
            if (currentTitle) {
                sections.push({ title: currentTitle, content: currentContent.join('\n\n') });
            }
            currentTitle = titleMatch.substring(3).trim();
            currentContent = lines.slice(1).map(l => l.trim()).filter(Boolean);
        } else {
            currentContent.push(...lines.map(l => l.trim()).filter(Boolean));
        }
    }
    
    if (currentTitle) {
        sections.push({ title: currentTitle, content: currentContent.join('\n\n') });
    }

    // Find conclusion
    const conclusionIndex = sections.findIndex(s => s.content.includes('✅'));
    let conclusion = '';
    if (conclusionIndex > -1) {
        conclusion = sections[conclusionIndex].content;
        sections.splice(conclusionIndex, 1);
    }


    return { intro, sections, conclusion };
};


export default function FileHandlingPage() {
    const { intro, sections, conclusion } = parseSections(ctagsAndCscopeMarkdownContent);

    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                {renderMarkdown(intro)}
                <hr className="my-6" />
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {sections.map(({ title, content }) => (
                        <AccordionItem value={title} key={title} className="border rounded-lg bg-card overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 font-headline text-lg hover:no-underline">
                                {title}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pt-0 pb-6 prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1">
                                {renderMarkdown(content)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {conclusion && (
                    <>
                        <hr className="my-6" />
                        <div className="mt-8">
                            {renderMarkdown(conclusion)}
                        </div>
                    </>
                )}
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={ctagsAndCscopeMarkdownContent} />
                </div>
            </aside>
        </div>
    );
}

    