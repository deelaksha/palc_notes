
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const NsRouteTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise3/ns-route-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-route.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `ns-route.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is a powerful diagnostic tool for analyzing the routing logic in the multi-subnet topology. It displays the routing tables for the router and each host, and then performs a step-by-step analysis of how a packet would travel between any two hosts.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Key Sections & Logic
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Router Routing Table:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script begins by displaying the routing table of the central router (`router-arms`).</li>
                        <li>This table is simple: it lists the three subnets (`192.168.1.0/24`, etc.) that are "directly connected" to its interfaces. This means the router knows it can reach any IP in these subnets without needing another gateway.</li>
                        <li>It also checks and displays whether IP forwarding is enabled, which is the crucial setting that allows the router to do its job.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Host Routing Tables:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Next, it loops through each host (`h1`, `h2`, `h3`).</li>
                        <li>Each host's table has two main entries: a route for its own local subnet (e.g., `192.168.1.0/24`) and a **default route** (`default via 192.168.1.1`).</li>
                        <li>This default route is the key: it tells the host to send any packet destined for an unknown network to its gateway (the router).</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Route Path Analysis:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>This section uses nested loops to simulate a packet's journey from every host to every other host.</li>
                        <li>For each pair (e.g., h1 to h2), it uses the command <b className="font-mono text-keyword"><code>ip route get {'<destination-ip>'}</code></b>. This is a powerful diagnostic command that asks the kernel, "How would you route a packet to this address?"</li>
                        <li>The script parses the output of this command to explain the steps:
                            <ol className="list-decimal list-inside ml-4">
                                <li>The source host sends the packet to its gateway.</li>
                                <li>The router receives it and forwards it.</li>
                                <li>The packet arrives at the destination.</li>
                            </ol>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# Show routing tables and path analysis for router topology

# ... (Get suffix logic) ...

# Show router routing table
echo "=== Router Routing Table ($ROUTER_NS) ==="
sudo ip -n "$ROUTER_NS" route show

# Check IP forwarding
IP_FORWARD=$(sudo ip netns exec "$ROUTER_NS" sysctl -n net.ipv4.ip_forward)
echo "IP Forwarding: $IP_FORWARD"

# Loop through hosts and show their routing tables
echo ""
echo "=== Host Routing Tables ==="
for i in 1 2 3; do
    NS="h$i-$SUFFIX"
    echo "--- $NS Routing Table ---"
    sudo ip -n "$NS" route show
done

# Analyze path between hosts
echo ""
echo "=== Route Path Analysis ==="
for src in h1 h2 h3; do
    for dst in h1 h2 h3; do
        if [[ "$src" != "$dst" ]]; then
            SRC_NS="$src-$SUFFIX"
            DST_IP="..." # Logic to get destination IP
            
            echo "$src → $dst:"
            # Use 'ip route get' to simulate the path
            ROUTE_INFO=$(sudo ip -n "$SRC_NS" route get "$DST_IP")
            echo "  $ROUTE_INFO"
        fi
    done
done
`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsRouteTheoryPage;
