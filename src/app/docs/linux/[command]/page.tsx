
import { commandsData } from '@/lib/linux-commands';
import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return commandsData.map((command) => ({
    command: command.name,
  }));
}

export default function CommandDetailPage({
  params,
}: {
  params: { command: string };
}) {
  const command = commandsData.find((cmd) => cmd.name === params.command);

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
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/docs/linux">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Commands
            </Link>
        </Button>

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 font-headline">
          The <span className="text-primary">{command.name}</span> Spell
        </h1>
        <p className="text-lg text-muted-foreground">{command.description}</p>
        <Badge variant="secondary" className="mt-2">{command.category}</Badge>
      </header>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          How It Works
        </h2>
        <div className="space-y-4 text-muted-foreground">
          {command.howItWorks.map((item, index) => (
            <p key={index}>{renderTextWithCode(item)}</p>
          ))}
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Examples
        </h2>
        <div className="space-y-6">
          {command.examples.map((ex, index) => (
            <div key={index}>
              <CodeBlock className="bg-code-bg text-code-text">
                {ex.code}
              </CodeBlock>
              <p className="text-muted-foreground mt-2">{ex.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Real-World Quest
        </h2>
        <p className="text-muted-foreground">{command.realWorld}</p>
      </section>
    </div>
  );
}
