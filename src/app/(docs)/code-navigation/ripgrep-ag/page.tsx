
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { TableOfContents } from '@/components/toc/TableOfContents';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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


export default function RipgrepAgPage() {
    const { intro, sections, conclusion } = parseSections(ripgrepAgMarkdownContent);

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
                    <TableOfContents content={ripgrepAgMarkdownContent} />
                </div>
            </aside>
        </div>
    );
}
