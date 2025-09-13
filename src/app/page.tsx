import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BookOpen, Code, Terminal } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'Vim',
    description: 'Master the powerful Vim editor.',
    href: '/vim',
    icon: <Code className="size-8" />,
  },
  {
    name: 'Linux',
    description: 'Essential commands and concepts.',
    href: '/linux',
    icon: <Terminal className="size-8" />,
  },
  {
    name: 'Notes',
    description: 'Miscellaneous tech notes.',
    href: '/notes',
    icon: <BookOpen className="size-8" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  NoteMark
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A modern, elegant, and minimal home for your technical notes
                  and commands.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pb-20 md:pb-32 lg:pb-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} className="group">
                  <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/10 group-hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-accent/10 p-3 rounded-md text-accent">
                            {category.icon}
                          </div>
                          <div>
                            <CardTitle className="font-headline">
                              {category.name}
                            </CardTitle>
                            <CardDescription>
                              {category.description}
                            </CardDescription>
                          </div>
                        </div>
                        <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center py-6 border-t">
        <p className="text-sm text-muted-foreground">© 2024 NoteMark. All rights reserved.</p>
      </footer>
    </div>
  );
}
