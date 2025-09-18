
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
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># ... (script setup) ...</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Router Information ==="</span><br/>
                        <span className="command-text">for</span> r <span className="command-text">in</span> r1 r2; <span className="command-text">do</span><br/>
                        {"    "}<span className="text-muted-foreground"># ... (Checks router namespace, IP forwarding, interfaces, and routes)</span><br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Host Information ==="</span><br/>
                        <span className="command-text">for</span> i <span className="command-text">in</span> 1 2 3 4; <span className="command-text">do</span><br/>
                        {"    "}<span className="text-muted-foreground"># ... (Checks interfaces, IPs, routes, and loopback for each host)</span><br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Cross-Network Connectivity Test Matrix ==="</span><br/>
                        <span className="text-muted-foreground"># ... (Nested loops to ping from each host to every other host) ...</span><br/>
                        <span className="command-text">for</span> src <span className="command-text">in</span> h1 h2 h3 h4; <span className="command-text">do</span><br/>
                        {"    "}<span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">"$src"</span><br/>
                        {"    "}<span className="command-text">for</span> dst <span className="command-text">in</span> h1 h2 h3 h4; <span className="command-text">do</span><br/>
                        {"        "}<span className="command-text">if</span> [[ <span className="text-tips">"$src"</span> == <span className="text-tips">"$dst"</span> ]]; <span className="command-text">then</span><br/>
                        {"            "}<span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">"-"</span><br/>
                        {"        "}<span className="command-text">else</span><br/>
                        {"            "}<span className="text-label">PING_RESULT</span>=$(<span className="command-text">sudo</span> ip netns exec <span className="text-tips">"$src-$SUFFIX"</span> ping -c 1 -W 2 <span className="text-tips">"$DST_IP"</span> 2&gt;&amp;1)<br/>
                        {"            "}<span className="command-text">if</span> <span className="command-text">echo</span> <span className="text-tips">"$PING_RESULT"</span> | <span className="command-text">grep</span> -q <span className="text-tips">"1 received"</span>; <span className="command-text">then</span><br/>
                        {"                "}<span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">"OK"</span><br/>
                        {"            "}<span className="command-text">else</span><br/>
                        {"                "}<span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">"FAIL"</span><br/>
                        {"            "}<span className="command-text">fi</span><br/>
                        {"        "}<span className="command-text">fi</span><br/>
                        {"    "}<span className="command-text">done</span><br/>
                        {"    "}<span className="command-text">echo</span><br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Summary ==="</span><br/>
                        <span className="text-muted-foreground"># ... (Prints summary of topology and next steps)</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default RShowTheoryPage;
