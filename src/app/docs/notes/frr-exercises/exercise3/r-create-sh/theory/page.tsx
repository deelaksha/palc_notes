
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const RCreateTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise3/r-create-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-create.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-create.sh` Script (Exercise 3)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script sets up a classic "router-on-a-stick" topology. It creates four virtual computers (namespaces): one acting as a central router, and three hosts (`h1`, `h2`, `h3`), each in its own separate network (subnet). This is fundamental for understanding how routing between different networks works.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Key Concepts & Logic
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Separate Networks (Subnets):</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script creates three distinct IP subnets: `192.168.1.0/24`, `192.168.2.0/24`, and `192.168.3.0/24`.</li>
                        <li>Host `h1` is in the first subnet, `h2` in the second, and `h3` in the third. Devices in different subnets cannot talk to each other directly; they must go through a router.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. The Central Router:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>A special namespace `router-arms` is created to act as the router.</li>
                        <li>It has three virtual interfaces, one for each subnet (`r-h1-arms`, `r-h2-arms`, `r-h3-arms`).</li>
                        <li>The router is given an IP address in each subnet (e.g., `192.168.1.1`, `192.168.2.1`, `192.168.3.1`), which will serve as the "gateway" for the hosts.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Routing Configuration:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip -n h1-arms route add default via 192.168.1.1</code></b>: This is a crucial step. For each host, it sets a 'default route'. This tells the host, "For any IP address you don't know how to reach directly, send the packet to the router at this address."</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip netns exec router-arms sysctl -w net.ipv4.ip_forward=1</code></b>: This command "turns on" the router's core function. It enables IP forwarding, allowing the router to pass packets between its different network interfaces. Without this, the router would just drop packets not meant for it.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># Create router topology with 3 hosts in different subnets</span><br/><br/>
                        <span className="text-muted-foreground"># ... (Get suffix logic & cleanup) ...</span><br/><br/>
                        <span className="text-muted-foreground"># Create namespaces for router and 3 hosts</span><br/>
                        <span className="command-text">sudo</span> ip netns add router-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip netns add h1-$SUFFIX<br/>
                        <span className="text-muted-foreground"># ... (h2, h3)</span><br/><br/>
                        <span className="text-muted-foreground"># Create veth pairs (e.g., h1-r &lt;=&gt; r-h1)</span><br/>
                        <span className="command-text">sudo</span> ip link add h1-r-$SUFFIX type veth peer name r-h1-$SUFFIX<br/>
                        <span className="text-muted-foreground"># ... (for h2, h3)</span><br/><br/>
                        <span className="text-muted-foreground"># ... (move interfaces to namespaces) ...</span><br/><br/>
                        <span className="text-muted-foreground"># Assign IP addresses</span><br/>
                        <span className="text-muted-foreground"># Host 1 (Subnet 1)</span><br/>
                        <span className="command-text">sudo</span> ip -n h1-$SUFFIX addr add 192.168.1.10/24 dev h1-r-$SUFFIX<br/>
                        <span className="text-muted-foreground"># Router on Subnet 1</span><br/>
                        <span className="command-text">sudo</span> ip -n router-$SUFFIX addr add 192.168.1.1/24 dev r-h1-$SUFFIX<br/>
                        <span className="text-muted-foreground"># ... (repeat for h2/Subnet 2 and h3/Subnet 3)</span><br/><br/>
                        <span className="text-muted-foreground"># ... (bring interfaces up) ...</span><br/><br/>
                        <span className="text-muted-foreground"># Configure HOST default routes</span><br/>
                        <span className="command-text">sudo</span> ip -n h1-$SUFFIX route add default via 192.168.1.1<br/>
                        <span className="text-muted-foreground"># ... (for h2, h3)</span><br/><br/>
                        <span className="text-muted-foreground"># Enable IP forwarding on the router</span><br/>
                        <span className="command-text">sudo</span> ip netns exec router-$SUFFIX sysctl -w net.ipv4.ip_forward=1<br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Setup complete!"</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default RCreateTheoryPage;
