
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dumbbell, PlayCircle } from 'lucide-react';
import Link from 'next/link';

const exercises = [
  { name: 'Exercise 1', href: '#' },
  { name: 'Exercise 2', href: '#' },
  { name: 'Exercise 3', href: '#' },
  { name: 'Exercise 4', href: '#' },
  { name: 'FRR Exercise', href: '#' },
];

export default function ExercisePage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/notes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notes
          </Link>
        </Button>
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Dumbbell className="size-12 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl">Practice Exercises</CardTitle>
             <p className="text-center text-muted-foreground pt-2">
              Select an exercise to begin.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercises.map((exercise) => (
                <Button key={exercise.name} asChild variant="outline" size="lg" className="justify-start">
                  <Link href={exercise.href}>
                    <PlayCircle className="mr-3 h-5 w-5" />
                    {exercise.name}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
