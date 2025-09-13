
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
        href: 'code-navigation',
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
        {/* Hero Section */}
        <section className="relative w-full pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-background to-background -z-10 animate-gradient-xy"></div>
            <div className="container px-4 md:px-6 z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-sm mb-4">
                        Your Knowledge, Organized
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground font-headline tracking-tighter mb-4 animate-fade-in-up">
                        The Ultimate Developer Cheatsheet
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
                        A curated collection of notes, commands, and guides for the tools you use every day. Fast, searchable, and always at your fingertips.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
                        <Button asChild size="lg">
                            <Link href="/code-navigation">
                                Get Started <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/about">
                                <Info className="mr-2" /> About NoteMark
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>


        {/* Categories Section */}
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