
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import Link from 'next/link';

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
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              This section is ready for you to add practice problems, quizzes, and other exercises.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
