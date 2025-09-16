
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, FileTerminal, Network } from 'lucide-react';
import Link from 'next/link';

const notes = [
  {
    title: 'ns-fiels.sh Analysis',
    description: 'AI-Generated Breakdown for a shell script executed on 09-16-2025.',
    href: '/docs/notes/ns-fiels-sh-09-16-2025',
    icon: <FileTerminal className="size-8" />,
  },
  {
    title: 'Network Simulation Guide',
    description: 'Guide to network simulation, added on 09-16-2025.',
    href: '/docs/notes/network-simulation',
    icon: <Network className="size-8" />,
  },
];

export default function NotesPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
          Miscellaneous Notes
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A collection of AI-generated notes, script analyses, and other thoughts.
        </p>
      </header>

      <section className="w-full">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Link key={note.title} href={note.href} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-md text-foreground">
                          {note.icon}
                        </div>
                        <div>
                          <CardTitle className="font-headline">
                            {note.title}
                          </CardTitle>
                          <CardDescription>
                            {note.description}
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
        </div>
      </section>
    </main>
  );
}
