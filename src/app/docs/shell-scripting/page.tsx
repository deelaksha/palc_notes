
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';
import { shellScriptingData, slugify } from '@/lib/shell-scripting-data';

export default function ShellScriptingHubPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2 flex items-center justify-center gap-4">
          <Terminal className="size-10" /> Shell Scripting Roadmap
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          A beginner-to-advanced guide for learning shell scripting on Linux. Select a topic to begin.
        </p>
      </header>

      <section className="w-full max-w-2xl mx-auto">
        <div className="grid gap-6 md:grid-cols-1">
          {shellScriptingData.map((category) => (
            <Link key={category.title} href={`/docs/shell-scripting/${slugify(category.title)}`} className="group">
              <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="bg-muted p-3 rounded-md text-foreground">
                           <Terminal className="size-8" />
                        </div>
                        <div>
                            <CardTitle className="font-headline">
                                {category.title}
                            </CardTitle>
                             <CardDescription>
                                {category.description}
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
    </main>
  );
}
