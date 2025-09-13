import { TerminalSquare } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <TerminalSquare className="size-6 text-primary" />
      <span className="font-headline text-lg font-bold">NoteMark</span>
    </div>
  );
}
