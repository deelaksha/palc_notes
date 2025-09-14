
import { commandsData } from '@/lib/linux-commands';
import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/markdown/CodeBlock';
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
          <code key={i} className="font-code bg-code-bg text-tag px-1 py-0.5 rounded-sm text-sm">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };
  
  const pageContent = `
# ${command.name}

**Category**: ${command.category}
**Description**: ${command.description}

## How it works:
${command.howItWorks.join('\n')}

## Examples:
${command.examples.map(ex => `### ${ex.text}\n\`\`\`\n${ex.code}\n\`\`\``).join('\n\n')}

## Real-world application:
${command.realWorld}
`;


  return (
    <div className="flex">
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 flex-1">
      <Button asChild variant="ghost" className="mb-4">
          <Link href="/docs/linux">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Commands
          </Link>
      </Button>

      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 font-headline">
          The <span className="text-primary">{command.name}</span> Spell
        </h1>
        <p className="text-lg text-muted-foreground">{command.description}</p>
      </header>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Chapter 1: How the Spell Works
        </h2>
        <div className="space-y-4 text-muted-foreground">
          {command.howItWorks.map((item, index) => (
            <p key={index}>{renderTextWithCode(item)}</p>
          ))}
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Chapter 2: Casting Examples
        </h2>
        <div className="space-y-8">
          {command.examples.map((ex, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-command mb-2">Example {index + 1}:</h3>
              <p className="text-muted-foreground mb-4">{ex.text}</p>
              <CodeBlock className="bg-code-bg text-code-text">
                {ex.code}
              </CodeBlock>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Chapter 3: A Real-World Quest
        </h2>
        <p className="text-muted-foreground">{command.realWorld}</p>
        <div className="mt-6 p-4 rounded-xl bg-card-nested border-l-4 border-l-yellow-400">
          <p><span className="text-tips font-bold">Quest Tip:</span> Mastering the <code className="font-code bg-code-bg text-tag px-1 py-0.5 rounded-sm text-sm">{command.name}</code> spell will make you a true command-line champion!</p>
        </div>
      </section>
    </div>
    </div>
  );
}
