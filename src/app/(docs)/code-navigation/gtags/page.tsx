
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { TableOfContents } from '@/components/toc/TableOfContents';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

    const conclusionIndex = sections.findIndex(s => s.content.includes('✅'));
    let conclusion = '';
    if (conclusionIndex > -1) {
        conclusion = sections[conclusionIndex].content;
        sections.splice(conclusionIndex, 1);
    }


    return { intro, sections, conclusion };
};


export default function GtagsPage() {
    const { intro, sections, conclusion } = parseSections(gtagsMarkdownContent);

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
                    <TableOfContents content={gtagsMarkdownContent} />
                </div>
            </aside>
        </div>
    );
}
