import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function NotesPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <Card className="m-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="size-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Miscellaneous Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            This section is under construction. Come back soon for a collection of miscellaneous tech notes!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
