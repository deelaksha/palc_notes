'use client';

import { generateTableOfContents } from '@/ai/flows/dynamic-table-of-contents';
import { RenderedToc } from './RenderedToc';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function TableOfContents({ content }: { content: string }) {
  const [tocMarkdown, setTocMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateToc = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await generateTableOfContents({ markdownContent: content });
        setTocMarkdown(result.tableOfContents);
      } catch (err) {
        console.error('Failed to generate Table of Contents:', err);
        setError('Could not load table of contents.');
      } finally {
        setLoading(false);
      }
    };
    generateToc();
  }, [content]);

  if (loading) {
    return (
      <div className="p-4 rounded-lg bg-card border">
        <h3 className="font-headline text-lg font-semibold mb-3">On this page</h3>
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error) {
     return (
        <div className="p-4 rounded-lg bg-card border">
            <h3 className="font-headline text-lg font-semibold mb-2">On this page</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
        </div>
    );
  }

  return <RenderedToc tocMarkdown={tocMarkdown} />;
}
