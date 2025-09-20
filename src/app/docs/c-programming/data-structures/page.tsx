
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, GitFork, GitMerge, Component, Binary, Waypoints } from 'lucide-react';
import Link from 'next/link';

const topics = [
    {
        name: 'Linked Lists',
        description: 'Explore singly, doubly, and circular linked lists.',
        href: '/docs/c-programming/data-structures/linked-lists',
        icon: <GitMerge className="size-8" />,
    },
    {
        name: 'Stacks & Queues',
        description: 'Understand LIFO (Stack) and FIFO (Queue) data structures.',
        href: '/docs/c-programming/data-structures/stacks-queues',
        icon: <Component className="size-8" />,
    },
    {
        name: 'Trees',
        description: 'Learn about binary trees, binary search trees, and traversals.',
        href: '/docs/c-programming/data-structures/trees',
        icon: <Binary className="size-8" />,
    },
    {
        name: 'Graphs',
        description: 'Dive into graph representation with adjacency lists and matrices.',
        href: '/docs/c-programming/data-structures/graphs',
        icon: <Waypoints className="size-8" />,
    },
];

export default function DataStructuresHubPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Data Structures in C
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A guide to fundamental data structures implemented in C.
          </p>
        </header>

        <section className="w-full max-w-2xl mx-auto">
          <div className="grid gap-6 md:grid-cols-1">
            {topics.map((topic) => (
              <Link key={topic.name} href={topic.href} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-md text-foreground">
                          {topic.icon}
                        </div>
                        <div>
                          <CardTitle className="font-headline">
                            {topic.name}
                          </CardTitle>
                          <CardDescription>
                            {topic.description}
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
        </section>
      </main>
    </div>
  );
}
