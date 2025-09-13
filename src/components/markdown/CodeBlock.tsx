'use client';

import { Check, Copy } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const CodeBlock = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = React.useState(false);

  const copyToClipboard = () => {
    if (typeof children === 'string') {
      navigator.clipboard.writeText(children);
      setHasCopied(true);
      toast({
        title: 'Copied to clipboard!',
        description: 'The code has been copied successfully.',
      });
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        'relative my-4 rounded-lg bg-card border font-code text-sm p-4 overflow-x-auto',
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7"
        onClick={copyToClipboard}
        aria-label="Copy code"
      >
        {hasCopied ? (
          <Check className="h-4 w-4 text-accent" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};
