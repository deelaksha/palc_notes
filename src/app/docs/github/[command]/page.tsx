import { gitCommandsData } from '@/lib/git-commands';
import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return gitCommandsData.map((command) => ({
    command: command.name,
  }));
}

export default function CommandDetailPage({
  params,
}: {
  params: { command: string };
}) {
  const command = gitCommandsData.find((cmd) => cmd.name.replace(/\s+/g, '-') === params.command);

  if (!command) {
    notFound();
  }

  const renderTextWithCode = (text: string) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="font-code bg-muted text-foreground px-1 py-0.5 rounded-sm text-sm">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };


  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
        <Button asChild variant="ghost" className="mb-4">
            <Link href="/docs/github">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Commands
            </Link>
        </Button>
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-code">
            {command.name}
            </h1>
            <Badge variant="secondary">{command.category}</Badge>
        </div>
        <p className="text-lg text-muted-foreground">{command.description}</p>
      </header>

      <div className="space-y-8">
        <div>
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 pb-2 border-b">
            How it works:
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            {command.howItWorks.map((item, index) => (
              <li key={index}>{renderTextWithCode(item)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 pb-2 border-b">
            Examples:
          </h2>
          <div className="space-y-6">
            {command.examples.map((ex, index) => (
              <div key={index}>
                <CodeBlock>{ex.code}</CodeBlock>
                <p className="text-muted-foreground mt-2">{ex.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-headline text-2xl font-bold mt-8 mb-4 pb-2 border-b">
            Real-world application:
          </h2>
          <p className="text-muted-foreground">{command.realWorld}</p>
        </div>
      </div>
    </div>
  );
}
