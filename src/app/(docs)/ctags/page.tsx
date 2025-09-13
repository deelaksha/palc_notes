
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { TableOfContents } from '@/components/toc/TableOfContents';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ctagsAndCscopeMarkdownContent = `
# 🏷️ Ctags & Cscope – Code Navigation Superpowers

Ctags and Cscope are powerful tools that index your source code, allowing you to jump to definitions, find usages, and navigate large projects with lightning speed, especially within editors like Vim.

---

## ✨ 1. What is Ctags?

Ctags generates an index file (called a "tags" file) of names found in source code. It scans your project and creates a map of where every function, variable, class, and other "tag" is defined. This lets your editor instantly jump to a symbol's definition.

- **Purpose**: Primarily for "Go to Definition."
- **How it works**: Creates a `tags` file that maps names to file locations.
- **Strength**: Fast, simple, and supported by many editors.

---

## ✨ 2. Installing and Using Ctags

Installation is straightforward on most Linux systems. We recommend `exuberant-ctags` or `universal-ctags` as they support more languages.

### Installation

<CodeBlock>sudo apt-get install universal-ctags</CodeBlock>

### Generating Tags

Navigate to the root directory of your project and run:

| Command | What it does |
|---|---|
| \`ctags -R .\` | **-R** stands for "recursive." It tells ctags to scan the current directory (\`.\`) and all subdirectories, generating a \`tags\` file. |

This creates a single \`tags\` file in your project's root.

### Using Ctags with Vim

Vim has built-in support for ctags. Once the \`tags\` file is in your project root, you can use these commands in Normal Mode:

| Command | What it does |
|---|---|
| \`Ctrl + ]\` | Jump to the definition of the symbol under your cursor. |
| \`Ctrl + T\` | Jump back to where you were before the last tag jump. |
| \`:tag <symbol>\` | Jump to the definition of a specific \`<symbol>\`. You can use Tab for auto-completion. |
| \`:tselect <symbol>\` | If a symbol is defined multiple times, this shows a list of matches to choose from. |

👉 Example: Place your cursor on a function call like \`calculate_total()\` and press \`Ctrl + ]\`. Vim will instantly take you to the file where that function is defined.

---

## ✨ 3. What is Cscope?

Cscope is like ctags on steroids. While ctags knows *where* symbols are defined, cscope knows much more. It builds a more complex database of your code, allowing for more powerful queries.

- **Purpose**: Advanced code searching and browsing. Find definitions, usages, callers, callees, and more.
- **How it works**: Creates a \`cscope.out\` database file.
- **Strength**: Much more powerful queries than ctags. It understands the relationships between symbols.

---

## ✨ 4. Installing and Using Cscope

Cscope is also a standard package on most Linux systems.

### Installation

<CodeBlock>sudo apt-get install cscope</CodeBlock>

### Generating the Cscope Database

From your project's root directory:

| Command | What it does |
|---|---|
| \`cscope -b -R -k\` | **-b**: Build the database only; don't open the cscope interface. |
| | **-R**: Recursive, just like ctags. |
| | **-k**: Kernel mode. This tells cscope not to look in \`/usr/include\` for system headers, which keeps your database focused on *your* project code. |

This command creates a \`cscope.out\` file (and related files like \`cscope.in.out\` and \`cscope.po.out\`).

### Using Cscope with Vim

Vim's integration with cscope is also excellent. First, you need to add the database:

<CodeBlock>:cs add cscope.out</CodeBlock>

You only need to do this once per session. You can automate this in your \`.vimrc\`. Now, you can run powerful queries:

| Command | What it does |
|---|---|
| \`:cs find s <symbol>\` | **s**ymbol: Find all occurrences of this C symbol. |
| \`:cs find g <symbol>\` | **g**lobal: Find the global definition(s) of this symbol. Similar to ctags. |
| \`:cs find d <function>\` | **d**efinitions: Find functions called by this \`<function>\`. |
| \`:cs find c <function>\` | **c**allers: Find all functions that call this \`<function>\`. This is incredibly useful! |
| \`:cs find t <text>\` | **t**ext: Find all occurrences of this text string anywhere in the code. |
| \`:cs find e <pattern>\` | **e**grep: A powerful search for a regular expression pattern. |
| \`:cs find f <filename>\` | **f**ile: Find and open a file by name. |
| \`:cs find i <filename>\` | **i**ncludes: Find all files that \`#include\` this \`<filename>\`. |

👉 Example: To find every place where the function \`update_user_profile()\` is called, you would use \`:cs find c update_user_profile\`. Vim will show you a list of every location.

---

## ✨ 5. Combining Ctags and Cscope

You don't have to choose! Ctags and Cscope work perfectly together.

- Use **Ctags** for its fast "go to definition" feature (\`Ctrl + ]\`), which is the most common action.
- Use **Cscope** for more complex queries when you need to understand how code is being used.

### Combined Workflow
1.  **Generate both databases**:
    <CodeBlock>
    ctags -R .
    cscope -b -R -k
    </CodeBlock>
2.  **Use Vim**:
    - Need a definition? Use \`Ctrl + ]\`.
    - Need to see who calls a function? Use \`:cs find c <function>\`.
    - Need to find every usage of a variable? Use \`:cs find s <variable>\`.

---

## 🎯 Practice Scenario
1.  Navigate to your C project directory.
2.  Run \`ctags -R .\` to create your tags file.
3.  Run \`cscope -b -R -k\` to create your cscope database.
4.  Open a source file in Vim: \`vim main.c\`
5.  Add the cscope database: \`:cs add cscope.out\`
6.  Place your cursor on a function call and press \`Ctrl + ]\` to jump to its definition.
7.  Press \`Ctrl + T\` to jump back.
8.  Find all callers of that same function: \`:cs find c <function_name>\`
9.  Vim shows a list of results. Type a number and press Enter to jump to a location.

✅ By mastering ctags and cscope, you can navigate massive codebases with the same ease as a small script, dramatically boosting your productivity.
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
      p.replace(/</g, '&lt;')
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


export default function CtagsPage() {
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
