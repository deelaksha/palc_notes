

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BookOpen, Code, FileCode, GitBranchPlus, Github, Info, Terminal, Search } from 'lucide-react';
import Link from 'next/link';

const categories = [
    {
        name: 'Vim',
        description: 'Master the powerful and efficient Vim text editor.',
        href: '/vim',
        icon: <Code className="size-8" />,
    },
    {
        name: 'Linux',
        description: 'Explore essential commands and concepts for the Linux terminal.',
        href: '/linux',
        icon: <Terminal className="size-8" />,
    },
    {
        name: 'GitHub',
        description: 'A comprehensive reference for core Git commands.',
        href: '/github',
        icon: <Github className="size-8" />,
    },
    {
        name: 'Git Advanced',
        description: 'Unlock the next level of Git mastery with advanced commands.',
        href: '/git-advanced',
        icon: <GitBranchPlus className="size-8" />,
    },
    {
        name: 'Code Navigation',
        description: 'Tools to search, understand, and navigate large codebases.',
        href: '/code-navigation',
        icon: <FileCode className="size-8" />,
    },
    {
        name: 'Notes',
        description: 'A collection of miscellaneous tech notes and thoughts.',
        href: '/notes',
        icon: <BookOpen className="size-8" />,
    },
];

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <main className="flex-1">
        <section id="categories" className="w-full py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <header className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-headline">
                Explore Categories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                Dive into detailed guides and references for your favorite developer tools.
              </p>
            </header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {categories.map((category) => (
                <Link key={category.name} href={category.href} className="group">
                  <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
                    <CardHeader className="p-6">
                      <div className="flex items-start justify-between">
                          <div className="flex flex-col gap-4">
                              <div className="bg-muted p-3 rounded-lg text-primary w-fit">
                                  {category.icon}
                              </div>
                              <div>
                                  <CardTitle className="font-headline text-xl">
                                      {category.name}
                                  </CardTitle>
                                  <CardDescription className="mt-1">
                                      {category.description}
                                  </CardDescription>
                              </div>
                          </div>
                          <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary mt-1" />
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
