
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Network, Fingerprint, Anchor, Waypoints, Route } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const topics = [
   {
    title: 'IP Address',
    description: 'The mailing address of your computer on the internet.',
    href: '/docs/networking/ip-address',
    icon: <Network className="size-8" />,
  },
  {
    title: 'MAC Address',
    description: 'The unique hardware fingerprint of your device.',
    href: '/docs/networking/mac-address',
    icon: <Fingerprint className="size-8" />,
  },
  {
    title: 'Port Number',
    description: 'The apartment number that directs data to the right application.',
    href: '/docs/networking/port-number',
    icon: <Anchor className="size-8" />,
  },
  {
    title: 'Network Bridge',
    description: 'A device that connects and filters traffic between network segments.',
    href: '/docs/networking/network-bridge',
    icon: <Waypoints className="size-8" />,
  },
  {
    title: 'Routing',
    description: 'The process of selecting a path for data to travel across networks.',
    href: '/docs/networking/routing',
    icon: <Route className="size-8" />,
  },
];

export default function CoreConceptsPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/docs/networking">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Networking
            </Link>
        </Button>
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
          Core Networking Concepts
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the fundamental building blocks of network communication.
        </p>
      </header>

      <section className="w-full">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {topics.map((topic) => (
              <Link key={topic.title} href={topic.href} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-md text-foreground">
                          {topic.icon}
                        </div>
                        <div>
                          <CardTitle className="font-headline">
                            {topic.title}
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
        </div>
      </section>
    </main>
  );
}
