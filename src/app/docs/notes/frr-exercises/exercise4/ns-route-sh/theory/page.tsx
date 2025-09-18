
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
                    <Link href="/docs/notes/frr-exercises/exercise4/ns-route-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-route.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `ns-route.sh` Script (Exercise 4)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This is the most advanced diagnostic script, designed specifically for the dual-router topology. It provides a comprehensive analysis of all routing tables, IP forwarding status, and a detailed, step-by-step breakdown of how packets travel between different hosts, including multi-hop scenarios.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Key Features & Logic
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Complete Routing Table Dumps:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script begins by displaying the full routing tables for both `r1` and `r2`, and then for each of the four hosts.</li>
                        <li>It intelligently formats the output into clean columns for `Destination`, `Gateway`, `Interface`, and `Type` (direct, static, default), making it much easier to read than the raw `ip route` output.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. IP Forwarding Verification:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>It explicitly checks and reports whether IP forwarding is enabled on both routers. This is a critical debugging step, as routing will fail if this is set to `0`.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Multi-Hop Path Analysis:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>This section explains the theoretical path for both a single-hop (e.g., `h1` to `h2`, via `r1`) and a multi-hop (e.g., `h1` to `h4`, via `r1` then `r2`) communication.</li>
                        <li>It clearly outlines the step-by-step decision process, from a host sending a packet to its default gateway, to the routers forwarding it based on their static routes.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Interface and Routing Metrics:</h3>
                     <ul className="list-disc list-inside space-y-2">
                         <li>The script includes sections to show packet statistics (`RX packets`, `TX packets`) for each router interface, helping to visualize traffic flow.</li>
                         <li>It ends with a helpful troubleshooting guide and summary, explaining key concepts like TTL and how to debug common routing issues in this specific topology.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># Show routing tables and multi-hop path analysis</span><br/><br/>
                        <span className="text-muted-foreground"># ... (setup logic) ...</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Router Routing Tables ==="</span><br/>
                        <span className="command-text">for</span> r <span className="command-text">in</span> r1 r2; <span className="command-text">do</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"--- $r Routing Table ---"</span><br/>
                        {"    "}<span className="command-text">sudo</span> ip -n <span className="text-tips">"$r-$SUFFIX"</span> route show | <span className="text-muted-foreground">#... formatting logic ...</span><br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Host Routing Tables ==="</span><br/>
                        <span className="command-text">for</span> i <span className="command-text">in</span> 1 2 3 4; <span className="command-text">do</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"--- h$i Routing Table ---"</span><br/>
                        {"    "}<span className="command-text">sudo</span> ip -n <span className="text-tips">"h$i-$SUFFIX"</span> route show | <span className="text-muted-foreground">#... formatting logic ...</span><br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Multi-Hop Route Path Analysis ==="</span><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"h1 → h4:"</span><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"  Step 1: h1 sends to default gateway (r1)"</span><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"  Step 2: r1 forwards via static route to r2"</span><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"  Step 3: r2 forwards directly to h4"</span><br/>
                        <span className="text-muted-foreground"># ...</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsRouteTheoryPage;
