
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dumbbell, PlayCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const exercises = [
  { name: 'Exercise 1', description: 'Practice with basic FRR setup.', href: '/docs/notes/frr-exercises/exercise1' },
  { name: 'Exercise 2', description: 'Configure OSPF routing protocols.', href: '/docs/notes/frr-exercises/exercise2' },
  { name: 'Exercise 3', description: 'Explore a multi-subnet router topology.', href: '/docs/notes/frr-exercises/exercise3' },
  { name: 'Exercise 4', description: 'Troubleshoot common routing issues.', href: '#' },
];

export default function FrrExercisesPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/notes/exercise">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exercises
          </Link>
        </Button>
        <header className="text-center mb-12">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <Dumbbell className="size-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                FRR Exercises
            </h1>
             <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Select an exercise to begin.
            </p>
        </header>
        <section className="w-full">
            <div className="grid gap-6 md:grid-cols-2">
              {exercises.map((exercise) => (
                <Link key={exercise.name} href={exercise.href} className="group">
                  <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="bg-muted p-3 rounded-md text-foreground">
                                <PlayCircle className="size-8" />
                           </div>
                          <div>
                            <CardTitle className="font-headline">
                              {exercise.name}
                            </CardTitle>
                            <CardDescription>
                              {exercise.description}
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
