
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, FileTerminal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const scripts = [
  {
    name: 'ns-create.sh',
    description: 'Creates network namespaces for the exercise.',
    href: '/docs/notes/frr-exercises/exercise1/ns-create-sh',
  },
   {
    name: 'capture.sh',
    description: 'Captures network traffic for analysis.',
    href: '/docs/notes/frr-exercises/exercise1/capture.sh',
  },
  {
    name: 'ns-ping.sh',
    description: 'Pings devices within the network namespaces.',
    href: '/docs/notes/frr-exercises/exercise1/ns-ping-sh',
  },
  {
    name: 'ns-show.sh',
    description: 'Shows details about the virtual network environment.',
    href: '/docs/notes/frr-exercises/exercise1/ns-show-sh',
  },
  {
    name: 'ns-clean.sh',
    description: 'Cleans up the network namespaces.',
    href: '/docs/notes/frr-exercises/exercise1/ns-clean-sh',
  },
];

export default function Exercise1HubPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/notes/frr-exercises">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to FRR Exercises
          </Link>
        </Button>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Exercise 1: Script Viewer
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select a script to view its contents.
          </p>
        </header>

        <section className="w-full">
          <div className="grid gap-6 md:grid-cols-1">
            {scripts.sort((a, b) => a.name.localeCompare(b.name)).map((script) => (
              <Link key={script.name} href={script.href} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-md text-foreground">
                           <FileTerminal className="size-8" />
                        </div>
                        <div>
                          <CardTitle className="font-code">
                            {script.name}
                          </CardTitle>
                          <CardDescription>
                            {script.description}
                          </CardDescription>
                        </div>
                      </div>
                      <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

    