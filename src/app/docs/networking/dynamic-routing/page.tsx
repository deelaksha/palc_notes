
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, BookOpen, Bot, Route } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DynamicRoutingGame } from '@/components/networking/DynamicRoutingGame';

export default function DynamicRoutingPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/networking">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Networking
          </Link>
        </Button>
        <header className="text-center mb-12">
          <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
            <Bot className="size-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Dynamic Routing
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn how routers automatically adapt to network changes, keeping the internet connected and resilient.
          </p>
        </header>

        <div className="space-y-10">
          <Card>
            <CardHeader>
              <CardTitle>What is Dynamic Routing?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Dynamic routing is the process where routers automatically learn about available routes from their neighbors. Instead of manually configuring every path (static routing), routers running a dynamic routing protocol share information to build and update their own routing tables. This allows the network to automatically adapt to changes, such as a link failure or the addition of a new router, without human intervention.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Route/> Interactive Demo: Adapting to Failure</CardTitle>
                <CardDescription>Click "Simulate Link Failure" to see how the network automatically finds a new path.</CardDescription>
            </CardHeader>
            <CardContent>
                <DynamicRoutingGame />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Concepts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground">Convergence</h4>
                <p className="text-muted-foreground">This is the state where all routers in the network have the same, up-to-date routing information. When a network change occurs, it takes time for the routers to communicate and "converge" on the new best paths. Fast convergence is a key goal of dynamic routing protocols.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Routing Metrics</h4>
                <p className="text-muted-foreground">How does a router decide which path is "best"? It uses a metric. Different protocols use different metrics, such as hop count (the number of routers a packet must cross), bandwidth, delay, or a combination of factors (called a composite metric).</p>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Types of Dynamic Routing Protocols</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold text-lg text-primary-accent mb-2">1. Distance-Vector Protocols (Routing by Rumor)</h4>
                    <p className="text-muted-foreground">These protocols work by having each router tell its direct neighbors about the networks it knows how to reach and its distance (metric) to them. It's like telling your neighbor, "I can get to the grocery store in 5 minutes." Your neighbor then tells their other neighbors, "I can get to the grocery store through Bob in 6 minutes."</p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 pl-4">
                        <li><strong>Example:</strong> RIP (Routing Information Protocol)</li>
                        <li><strong>Pro:</strong> Simple to configure and understand.</li>
                        <li><strong>Con:</strong> Slower to converge and can create routing loops.</li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-lg text-primary-accent mb-2">2. Link-State Protocols (Everyone has a Full Map)</h4>
                    <p className="text-muted-foreground">In a link-state protocol, every router builds a complete map of the entire network's topology. When a change occurs, the router that noticed the change sends a small update to every other router in the network. Each router then independently recalculates the best path to every destination. It's more complex but much faster and more reliable.</p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 pl-4">
                        <li><strong>Example:</strong> OSPF (Open Shortest Path First)</li>
                        <li><strong>Pro:</strong> Fast convergence, less prone to routing loops, and very scalable.</li>
                        <li><strong>Con:</strong> More complex and requires more CPU and memory on the routers.</li>
                    </ul>
                </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  );
}
