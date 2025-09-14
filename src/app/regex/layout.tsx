
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/regex">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Regex Hub
        </Link>
      </Button>
      <div className="markdown-content">{children}</div>
    </div>
  );
}
