
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
                    <Link href="/docs/notes/frr-exercises/exercise3/r-show-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-show.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-show.sh` Script (Exercise 3)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This is a comprehensive health check and diagnostic tool for the multi-subnet router topology. It provides a detailed, well-formatted report on the status of the router, each host's network configuration, and performs a full connectivity test.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Router Information:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script first checks if the `router` namespace exists.</li>
                        <li>It displays the router's interfaces and their IP addresses.</li>
                        <li>Crucially, it checks and reports on the status of `net.ipv4.ip_forward`, which must be `1` for the router to function.</li>
                        <li>It then prints the router's routing table, showing its direct connections to each subnet.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Host Information Loop:</h3>
                     <p className="text-muted-foreground">The script then loops through each host (`h1`, `h2`, `h3`) and performs a series of checks inside each namespace:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>**Interfaces & IPs**: Shows the status and IP address of its network interfaces.</li>
                        <li>**Routes**: Prints the host's routing table, which should show a `default` route pointing to the router's IP address on its subnet.</li>
                        <li>**Loopback Test**: Pings its own loopback address (`127.0.0.1`) to ensure the internal networking stack is working correctly.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Advanced Connectivity Matrix:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>This is the most powerful part of the script. It creates a grid to test connectivity from every host to every other host.</li>
                        <li>It uses nested loops to iterate through all possible source-destination pairs (`h1`->`h2`, `h1`->`h3`, etc.).</li>
                        <li>For each pair, it executes <b className="font-mono text-keyword">`ping -c 1 -W 2`</b> to send a single packet with a 2-second timeout.</li>
                         <li>It then prints "OK" or "FAIL" in the matrix, giving you a quick, at-a-glance overview of the entire network's health.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Summary and Next Steps:</h3>
                     <ul className="list-disc list-inside space-y-2">
                         <li>The script concludes with a clear summary of the entire topology, outlining which hosts connect to which router and the expected traffic flow.</li>
                         <li>It provides helpful suggestions for using `ns-ping.sh` and `ns-capture.sh` for more specific troubleshooting.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># ... (script setup) ...</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Router Information ==="</span><br/>
                        <span className="text-muted-foreground"># ... (Checks router namespace, IP forwarding, interfaces, and routes)</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Host Information ==="</span><br/>
                        <span className="command-text">for</span> i <span className="command-text">in</span> 1 2 3; <span className="command-text">do</span><br/>
                        {"    "}<span className="text-muted-foreground"># ... (Checks interfaces, IPs, routes, and loopback for each host)</span><br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Inter-Subnet Connectivity Test Matrix ==="</span><br/>
                        <span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">""</span><br/>
                        <span className="command-text">for</span> dst <span className="command-text">in</span> h1 h2 h3; <span className="command-text">do</span> <span className="command-text">printf</span> <span className="text-tips">"%-12s"</span> <span className="text-tips">"$dst"</span>; <span className="command-text">done</span>; <span className="command-text">echo</span> <span className="text-tips">""</span><br/>
                        <span className="command-text">for</span> src <span className="command-text">in</span> h1 h2 h3; <span className="command-text">do</span><br/>
                        {"    "}<span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">"$src"</span><br/>
                        {"    "}<span className="command-text">for</span> dst <span className="command-text">in</span> h1 h2 h3; <span className="command-text">do</span><br/>
                        {"        "}<span className="command-text">if</span> [[ <span className="text-tips">"$src"</span> == <span className="text-tips">"$dst"</span> ]]; <span className="command-text">then</span><br/>
                        {"            "}<span className="command-text">printf</span> <span className="text-tips">"%-12s"</span> <span className="text-tips">"-"</span><br/>
                        {"        "}<span className="command-text">else</span><br/>
                        {"            "}<span className="text-muted-foreground"># ... ping logic ...</span><br/>
                        {"            "}<span className="command-text">printf</span> <span className="text-tips">"%-12s"</span> <span className="text-tips">"OK"</span> <span className="text-muted-foreground"># or "FAIL"</span><br/>
                        {"        "}<span className="command-text">fi</span><br/>
                        {"    "}<span className="command-text">done</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">""</span><br/>
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
