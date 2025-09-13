import { generateTableOfContents } from '@/ai/flows/dynamic-table-of-contents';
import { RenderedToc } from './RenderedToc';

export async function TableOfContents({ content }: { content: string }) {
  let tocMarkdown = '';
  try {
    const result = await generateTableOfContents({ markdownContent: content });
    tocMarkdown = result.tableOfContents;
  } catch (error) {
    console.error('Failed to generate Table of Contents:', error);
    // Return an empty TOC or a fallback message on error
    return (
        <div className="p-4 rounded-lg bg-card border">
            <h3 className="font-headline text-lg font-semibold mb-2">On this page</h3>
            <p className="text-sm text-muted-foreground">Could not load table of contents.</p>
        </div>
    );
  }

  return <RenderedToc tocMarkdown={tocMarkdown} />;
}
