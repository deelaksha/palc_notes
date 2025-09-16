import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileCode } from 'lucide-react';
import Link from 'next/link';

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
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            This section contains AI-generated notes and script analyses.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button asChild className="w-full max-w-xs">
              <Link href="/docs/notes/ns-fiels-sh-09-16-2025">
                <FileCode className="mr-2 h-4 w-4" />
                ns-fiels.sh 09-16-2025
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
