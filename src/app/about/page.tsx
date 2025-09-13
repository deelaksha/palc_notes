import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AboutPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <Card className="m-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src="https://picsum.photos/seed/notemark-dev/200" alt="User Avatar" />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="font-headline text-3xl">About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            This is NoteMark, a personal project to organize and display my learning notes. The site is built with Next.js, Tailwind CSS, and a touch of AI for content generation.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
