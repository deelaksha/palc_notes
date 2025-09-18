
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const NsPingTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise4/ns-ping-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-ping.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `ns-ping.sh` Script (Exercise 4)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This is the most advanced `ping` script, designed for the dual-router topology. It allows you to test connectivity between any two of the four hosts, intelligently determines the route the packet will take, and even predicts the TTL (Time-To-Live) value, which confirms the number of router hops.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Key Features & Logic
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Flexible Argument Parsing:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script accepts arguments for `SUFFIX`, `SOURCE_HOST`, `DESTINATION_HOST`, and `COUNT`, with sensible defaults.</li>
                        <li>It includes extensive validation to ensure the hosts are valid (`h1`-`h4`) and that the source and destination are not the same.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Associative Arrays for Mapping:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword">`declare -A HOST_IPS`</b>: Creates a map to easily find a host's IP address by its name (e.g., `h1` -> `192.168.1.10`).</li>
                        <li><b className="font-mono text-keyword">`declare -A HOST_ROUTERS`</b>: A second map that links each host to its default gateway router (`h1` -> `r1`, `h4` -> `r2`). This is the key to predicting the route.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Route Path Prediction:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword">`if [[ "$SRC_ROUTER" == "$DST_ROUTER" ]]`</b>: By comparing the source and destination routers from the `HOST_ROUTERS` map, the script can determine if the communication will happen through a single router (1 hop) or if it needs to cross both routers (2 hops).</li>
                        <li>It prints a predicted route path and the expected TTL value. TTL starts at 64 and is decremented by 1 at each router, so a TTL of 62 confirms a 2-hop path.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Final Execution and User Guidance:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>The script confirms that the source namespace exists before attempting the `ping`.</li>
                        <li>It executes the `ping` from within the correct source namespace, targeting the correct destination IP.</li>
                        <li>Finally, it provides helpful suggestions on how to use the `ns-capture.sh` script to watch the traffic on the relevant routers during the ping.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# Ping from one host to another via one or more routers

# ... (defaults and argument parsing) ...

# Map host names to IPs and their parent routers
declare -A HOST_IPS
HOST_IPS["h1"]="192.168.1.10" # ... and so on
declare -A HOST_ROUTERS
HOST_ROUTERS["h1"]="r1" # ... and so on

# Determine routing path
if [[ "$SRC_ROUTER" == "$DST_ROUTER" ]]; then
    ROUTE_PATH="$SRC_HOST → $SRC_ROUTER → $DST_HOST (1 hop, expected TTL=63)"
else
    ROUTE_PATH="$SRC_HOST → $SRC_ROUTER → $DST_ROUTER → $DST_HOST (2 hops, expected TTL=62)"
fi

echo "Route: $ROUTE_PATH"

# Execute ping
sudo ip netns exec "$SRC_NS" ping -c "$COUNT" "$DST_IP"

# ... (Show TTL interpretation and guidance)
`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsPingTheoryPage;
