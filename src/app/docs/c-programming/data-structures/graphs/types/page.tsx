
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, GitCommit, GitPullRequest, GitMerge, Settings, Route, Waypoints, Workflow } from 'lucide-react';
import Link from 'next/link';

const graphTypes = [
    {
        name: 'Directed & Undirected Graphs',
        description: 'Graphs where edges have a direction versus those that do not.',
        href: '/docs/c-programming/data-structures/graphs/directed-undirected',
        icon: <GitCommit className="size-8" />,
    },
    {
        name: 'Weighted & Unweighted Graphs',
        description: 'Graphs where edges have an associated weight or cost.',
        href: '/docs/c-programming/data-structures/graphs/directed-undirected#weighted-unweighted',
        icon: <Settings className="size-8" />,
    },
    {
        name: 'Cyclic & Acyclic Graphs',
        description: 'Graphs that contain cycles versus those that are cycle-free.',
        href: '/docs/c-programming/data-structures/graphs/cyclic-acyclic',
        icon: <Workflow className="size-8" />,
    },
     {
        name: 'Special Graph Types',
        description: 'Explore trees, Directed Acyclic Graphs (DAGs), and Bipartite Graphs.',
        href: '#', // Placeholder link
        icon: <Waypoints className="size-8" />,
    },
];

export default function GraphTypesHubPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Types of Graphs
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the different ways graphs can be classified based on their properties and behavior.
          </p>
        </header>

        <section className="w-full max-w-2xl mx-auto">
          <div className="grid gap-6 md:grid-cols-1">
            {graphTypes.map((topic) => (
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
