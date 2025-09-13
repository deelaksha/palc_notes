import { CodeBlock } from './CodeBlock';

// A simple and naive markdown to JSX renderer.
export function MarkdownRenderer({ markdown }: { markdown: string }) {
  if (!markdown) return null;
  // Split by newline and then process blocks
  const blocks = markdown.trim().split(/\n{2,}/);

  const renderInlines = (text: string) => {
    // Escape HTML to prevent XSS, but be careful with existing entities
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
        if (rows[1].startsWith('|--')) { // Markdown table format check
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
    }

    return <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInlines(block) }} />;
  });
}
