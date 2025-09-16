
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BookOpen, Code, FileCode } from 'lucide-react';
import Link from 'next/link';

const categories = [
    {
        name: 'Vim Basics',
        description: 'Understand the core concepts of Vim, including modes, movement, and basic commands.',
        href: '/docs/vim/basics',
        icon: <BookOpen className="size-8" />,
    },
    {
        name: 'Ctags',
        description: 'Use Ctags for lightning-fast "Go to Definition" functionality.',
        href: '/docs/code-navigation/ctags',
        icon: <FileCode className="size-8" />,
    },
    {
        name: 'Cscope',
        description: 'Use Cscope for powerful "Find References" and contextual code queries.',
        href: '/docs/code-navigation/cscope',
        icon: <Code className="size-8" />,
    },
];

export default function VimHubPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Vim Mastery
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your guide to mastering the Vim editor. From basic movement to advanced code navigation.
          </p>
        </header>

        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} className="group">
                  <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-muted p-3 rounded-md text-foreground">
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
    </div>
  );
}
