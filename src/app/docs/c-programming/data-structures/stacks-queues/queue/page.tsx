
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, List, CircleDot, Star, ArrowLeftRight } from 'lucide-react';
import Link from 'next/link';

export default function QueuesHubPage() {
    const topics = [
        {
            name: 'Simple Queue',
            description: 'A basic FIFO (First-In, First-Out) data structure.',
            href: '/docs/c-programming/data-structures/stacks-queues/queue/simple',
            icon: <List className="size-8" />,
        },
        {
            name: 'Circular Queue',
            description: 'An efficient queue implementation that reuses space.',
            href: '/docs/c-programming/data-structures/stacks-queues/queue/circular',
            icon: <CircleDot className="size-8" />,
        },
        {
            name: 'Priority Queue',
            description: 'A queue where elements are served based on priority.',
            href: '/docs/c-programming/data-structures/stacks-queues/queue/priority',
            icon: <Star className="size-8" />,
        },
        {
            name: 'Deque (Double-Ended Queue)',
            description: 'A queue that allows insertion and deletion from both ends.',
            href: '/docs/c-programming/data-structures/stacks-queues/queue/deque',
            icon: <ArrowLeftRight className="size-8" />,
        },
    ];

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Queues
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore different implementations of the FIFO (First-In, First-Out) data structure.
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
