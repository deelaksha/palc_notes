
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, GitBranch, Waypoints, Weight, CircleDashed, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const topics = [
    {
        name: 'Graph Representations',
        description: 'Learn about Adjacency Matrices and Adjacency Lists.',
        href: '/docs/c-programming/data-structures/graphs/representations',
        icon: <GitBranch className="size-8" />,
    },
    {
        name: 'Directed vs. Undirected Graphs',
        description: 'Understand the difference between one-way and two-way edges.',
        href: '#',
        icon: <Waypoints className="size-8" />,
    },
    {
        name: 'Weighted vs. Unweighted Graphs',
        description: 'Explore graphs where edges have costs or lengths.',
        href: '#',
        icon: <Weight className="size-8" />,
    },
    {
        name: 'Cyclic vs. Acyclic Graphs',
        description: 'Learn about graphs with and without cycles (e.g., DAGs).',
        href: '#',
        icon: <CircleDashed className="size-8" />,
    },
    {
        name: 'Graph Traversal Algorithms',
        description: 'Study Breadth-First Search (BFS) and Depth-First Search (DFS).',
        href: '#',
        icon: <CheckCircle className="size-8" />,
    },
];

export default function GraphsHubPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Graphs in C
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A guide to the versatile data structure for representing networks.
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
