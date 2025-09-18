
'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Layers, Library, Route, Bot, Dumbbell } from 'lucide-react';
import Link from 'next/link';

const topics = [
  {
    title: 'OSI Model Explained',
    description: 'A deep dive into the 7 layers of the OSI model with animations.',
    href: '/docs/networking/osi-model',
    icon: <Layers className="size-10" />,
  },
   {
    title: 'Core Networking Concepts',
    description: 'Explore IP addresses, MAC addresses, and Port numbers.',
    href: '/docs/networking/core-concepts',
    icon: <Library className="size-10" />,
  },
  {
    title: 'Routing',
    description: 'A deep dive into how routers send packets across networks.',
    href: '/docs/networking/routing',
    icon: <Route className="size-10" />,
  },
  {
    title: 'Dynamic Routing',
    description: 'Learn how routers automatically adapt to network changes.',
    href: '/docs/networking/dynamic-routing',
    icon: <Bot className="size-10" />,
  },
  {
    title: 'Exercises',
    description: 'Practice your networking knowledge with interactive exercises.',
    href: '/docs/networking/exercises',
    icon: <Dumbbell className="size-10" />,
  },
];

export default function NetworkingPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
          Networking Concepts
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore fundamental networking protocols, models, and concepts.
        </p>
      </header>

      <section className="w-full max-w-2xl mx-auto space-y-6">
        {topics.map((topic) => (
          <Link key={topic.title} href={topic.href} className="group">
            <Card className="transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="bg-muted p-4 rounded-lg text-foreground">
                      {topic.icon}
                    </div>
                    <div>
                      <CardTitle className="font-headline text-xl">
                        {topic.title}
                      </CardTitle>
                      <CardDescription>
                        {topic.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="size-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
