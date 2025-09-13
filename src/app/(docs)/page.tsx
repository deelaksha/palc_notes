
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BookOpen, Code, FileCode, GitBranchPlus, Github, Info, Terminal } from 'lucide-react';
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
    description: 'A reference for fundamental Git commands for version control.',
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
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Welcome to NoteMark
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your personal knowledge base for modern development. Explore guides and references for the tools you use every day.
          </p>
        </header>

        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((tool) => (
                <Link key={tool.name} href={tool.href} className="group">
                  <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-muted p-3 rounded-md text-foreground">
                            {tool.icon}
                          </div>
                          <div>
                            <CardTitle className="font-headline">
                              {tool.name}
                            </CardTitle>
                            <CardDescription>
                              {tool.description}
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
