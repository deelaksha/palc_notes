
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, BookOpen, Code } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NsRouteHubPage() {
  const options = [
    {
      name: 'Theory',
      description: 'An explanation of how the routing script works.',
      href: '/docs/notes/frr-exercises/exercise4/ns-route-sh/theory',
      icon: <BookOpen className="size-8" />,
    },
    {
      name: 'Practical',
      description: 'A hands-on animation showing the routing tables.',
      href: '/docs/notes/frr-exercises/exercise4/ns-route-sh/practical',
      icon: <Code className="size-8" />,
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
         <Button asChild variant="ghost" className="mb-8">
            <Link href="/docs/notes/frr-exercises/exercise4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Exercise 4
            </Link>
        </Button>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            ns-route.sh
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose your learning path for this script.
          </p>
        </header>

        <section className="w-full max-w-3xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {options.map((option) => (
              <Link key={option.name} href={option.href} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-md text-foreground">
                          {option.icon}
                        </div>
                        <div>
                          <CardTitle className="font-headline">
                            {option.name}
                          </CardTitle>
                          <CardDescription>
                            {option.description}
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
    </div>
  );
}
