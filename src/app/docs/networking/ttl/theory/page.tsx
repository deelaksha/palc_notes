
import { networkingConceptsData } from '@/lib/networking-concepts';
import { notFound } from 'next/navigation';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConceptTheoryPage() {
  const concept = networkingConceptsData.find((cmd) => cmd.slug === 'ttl');

  if (!concept) {
    notFound();
  }

  const renderTextWithCode = (text: string) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="font-code bg-code-bg keyword-text px-1 py-0.5 rounded-sm text-sm">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };
  
  return (
    <div className="flex">
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 flex-1">
      <Button asChild variant="ghost" className="mb-4">
        <Link href={`/docs/networking/ttl`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concept Hub
        </Link>
      </Button>

      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 font-headline">
          The <span className="text-primary">{concept.name}</span> Explained
        </h1>
        <p className="text-lg text-muted-foreground">{concept.description}</p>
      </header>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          How It Works
        </h2>
        
        <div className="space-y-4 text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
                {concept.howItWorks.map((item, index) => (
                    <li key={index}>{renderTextWithCode(item)}</li>
                ))}
            </ul>
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Analogy
        </h2>
        <div className="mt-6 p-4 rounded-xl bg-card-nested border-l-4 border-l-blue-400">
            <p className="text-muted-foreground italic">{concept.analogy}</p>
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-secondary-accent">
          Examples
        </h2>
        <div className="space-y-8">
          {concept.examples.map((ex, index) => (
            <Card key={index} className="bg-card-nested">
                <CardHeader>
                    <CardTitle>{ex.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{ex.text}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-tertiary-accent">
         Real-World Scenario
        </h2>
         <div className="mt-6 p-4 rounded-xl bg-card-nested border-l-4 border-l-yellow-400">
            <p className="flex items-start gap-4">
                <Lightbulb className="text-yellow-400 size-6 mt-1 flex-shrink-0"/>
                <span className="text-muted-foreground">{concept.realWorld}</span>
            </p>
        </div>
      </section>
    </div>
    </div>
  );
}
