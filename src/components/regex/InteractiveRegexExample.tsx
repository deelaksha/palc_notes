'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRegex } from '@/context/RegexContext';

export function InteractiveRegexExample({ pattern, text, explanation }: { pattern: string; text: string; explanation: string; }) {
  const { setPattern, setText } = useRegex();
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);

  const handleTryIt = () => {
    setPattern(pattern);
    setText(text);
    setIsSent(true);

    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 flex items-center gap-2';
    toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg> Pattern sent to Visualizer!`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.5s ease';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 2000);
    
    setTimeout(() => {
        router.push('/regex/practical');
    }, 300);

    setTimeout(() => setIsSent(false), 2500);
  };

  return (
    <div className="my-4 p-4 rounded-lg bg-card border border-border relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Pattern</p>
          <code className="font-code text-keyword text-base bg-transparent p-0 rounded-none">
            {pattern}
          </code>
        </div>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
        <Button onClick={handleTryIt} size="sm" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
            {isSent ? <Check className="mr-2 h-4 w-4" /> : <Send className="mr-2 h-4 w-4" />}
            {isSent ? 'Sent!' : 'Try It'}
        </Button>
        </motion.div>
      </div>
      
      <p className="text-sm text-muted-foreground">Test String</p>
      <p className="font-mono text-sm p-2 bg-code-bg rounded-md">
        {text}
      </p>

      {explanation && (
        <div className="mt-3 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground/80 mb-1">Explanation:</p>
          <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }} />
        </div>
      )}
    </div>
  );
}
