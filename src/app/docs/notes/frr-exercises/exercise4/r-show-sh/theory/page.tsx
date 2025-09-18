
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const RShowTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise4/r-show-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-show.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-show.sh` Script (Exercise 4)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This is a comprehensive health check and diagnostic tool for the advanced dual-router topology. It provides a detailed, well-formatted report on the status of both routers, each host's network configuration, and performs a full connectivity test, including TTL analysis to verify the number of hops.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Router Information Loop:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script iterates through `r1` and `r2`, providing a detailed report for each.</li>
                        <li>It verifies IP forwarding is enabled, lists all interfaces with their state and IP addresses, and prints the full routing table for each router.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Host Information Loop:</h3>
                     <p className="text-muted-foreground">The script then loops through each host (`h1`-`h4`) and performs a series of checks inside each namespace:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>It reports which router each host is connected to.</li>
                        <li>It shows the status of network interfaces, IP addresses, and the local routing table (which should contain a default route).</li>
                        <li>It performs a loopback ping (`ping 127.0.0.1`) to confirm the internal networking stack is functional.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Advanced Connectivity Matrix:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>The script builds a connectivity matrix for all four hosts.</li>
                        <li>When it runs the `ping`, it captures the output to check the TTL (Time-To-Live) value from the reply.</li>
                        <li>It then prints not only "OK" or "FAIL" but also the expected TTL based on the known path (e.g., TTL 63 for 1 hop, TTL 62 for 2 hops). This is a professional way to verify that a packet is taking the expected route.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Summary and Next Steps:</h3>
                     <ul className="list-disc list-inside space-y-2">
                         <li>The script concludes with a clear summary of the entire topology, outlining which hosts connect to which routers and the expected traffic flow.</li>
                         <li>It provides helpful suggestions for using `ns-ping.sh`, `ns-capture.sh`, and `ns-route.sh` for more specific troubleshooting.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# ... (script setup)

echo "=== Router Information ==="
for r in r1 r2; do
    # ... (Checks router namespace, IP forwarding, interfaces, and routes)
done

echo "=== Host Information ==="
for i in 1 2 3 4; do
    # ... (Checks interfaces, IPs, routes, and loopback for each host)
done

echo "=== Cross-Network Connectivity Test Matrix ==="
# ... (Nested loops to ping from each host to every other host) ...
for src in h1 h2 h3 h4; do
    printf "%-8s" "$src"
    for dst in h1 h2 h3 h4; do
        if [[ "$src" == "$dst" ]]; then
            printf "%-8s" "-"
        else
            PING_RESULT=$(sudo ip netns exec "$src-$SUFFIX" ping -c 1 -W 2 "$DST_IP" 2>&1)
            if echo "$PING_RESULT" | grep -q "1 received"; then
                printf "%-8s" "OK"
            else
                printf "%-8s" "FAIL"
            fi
        fi
    done
    echo ""
done

echo "=== Summary ==="
# ... (Prints summary of topology and next steps)
`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default RShowTheoryPage;
