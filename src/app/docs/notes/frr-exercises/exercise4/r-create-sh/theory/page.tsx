
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
                    <Link href="/docs/notes/frr-exercises/exercise4/r-create-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-create.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-create.sh` Script (Exercise 4)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This advanced script builds a dual-router topology. It creates two routers (`r1`, `r2`) and four hosts (`h1`-`h4`). Hosts `h1` and `h2` are connected to `r1`, while `h3` and `h4` are connected to `r2`. The two routers are then connected to each other, forcing traffic between the host groups to pass through both routers.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Key Concepts & Logic
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Four Subnets:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script creates four distinct host subnets: `192.168.1.0/24`, `192.168.2.0/24`, `192.168.3.0/24`, and `192.168.4.0/24`.</li>
                        <li>It also creates a special, small subnet (`10.0.0.0/30`) just for the link between the two routers. This is a common networking practice for point-to-point links.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Host and Router Connections:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>For each host, a `veth` pair is created to link it to its designated router (e.g., `h1` connects to `r1`).</li>
                        <li>A special `veth` pair (`r1-r2` and `r2-r1`) is created to link the two routers together.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Static Routing:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>This is the most important part of the script. The routers only know about the networks they are directly connected to. We must manually tell them how to reach the other networks.</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip -n r1-$SUFFIX route add 192.168.3.0/24 via 10.0.0.2</code></b>: This command tells router `r1`, "To reach the `192.168.3.0/24` network (where `h3` lives), send the packet to the next router at `10.0.0.2` (which is `r2`)."</li>
                        <li>Static routes are added to both routers so they know how to forward traffic to each other's networks.</li>
                        <li>Each host is also given a default route pointing to its local router as the gateway.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. IP Forwarding:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sysctl -w net.ipv4.ip_forward=1</code></b>: This command is run in *both* router namespaces. It's essential for allowing them to forward packets that aren't destined for the routers themselves.</li>
                     </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># Create dual-router topology</span><br/><br/>
                        <span className="text-muted-foreground"># ... (cleanup and namespace creation) ...</span><br/><br/>
                        <span className="text-muted-foreground"># Create veth pairs for hosts and inter-router link</span><br/>
                        <span className="command-text">sudo</span> ip link add h1-r1-$SUFFIX type veth peer name r1-h1-$SUFFIX<br/>
                        <span className="text-muted-foreground"># ... (for h2, h3, h4)</span><br/>
                        <span className="command-text">sudo</span> ip link add r1-r2-$SUFFIX type veth peer name r2-r1-$SUFFIX<br/><br/>
                        <span className="text-muted-foreground"># ... (move interfaces to namespaces) ...</span><br/><br/>
                        <span className="text-muted-foreground"># Configure IPs on all interfaces</span><br/>
                        <span className="text-muted-foreground"># R1</span><br/>
                        <span className="command-text">sudo</span> ip -n r1-$SUFFIX addr add 192.168.1.1/24 dev r1-h1-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip -n r1-$SUFFIX addr add 192.168.2.1/24 dev r1-h2-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip -n r1-$SUFFIX addr add 10.0.0.1/30 dev r1-r2-$SUFFIX<br/>
                        <span className="text-muted-foreground"># ... (IPs for R2 and Hosts) ...</span><br/><br/>
                        <span className="text-muted-foreground"># ... (bring interfaces up) ...</span><br/><br/>
                        <span className="text-muted-foreground"># Configure HOST default routes</span><br/>
                        <span className="command-text">sudo</span> ip -n h1-$SUFFIX route add default via 192.168.1.1<br/>
                        <span className="text-muted-foreground"># ... (for h2, h3, h4)</span><br/><br/>
                        <span className="text-muted-foreground"># Configure ROUTER static routes</span><br/>
                        <span className="text-muted-foreground"># R1 -> R2 networks</span><br/>
                        <span className="command-text">sudo</span> ip -n r1-$SUFFIX route add 192.168.3.0/24 via 10.0.0.2<br/>
                        <span className="command-text">sudo</span> ip -n r1-$SUFFIX route add 192.168.4.0/24 via 10.0.0.2<br/>
                        <span className="text-muted-foreground"># R2 -> R1 networks</span><br/>
                        <span className="command-text">sudo</span> ip -n r2-$SUFFIX route add 192.168.1.0/24 via 10.0.0.1<br/>
                        <span className="command-text">sudo</span> ip -n r2-$SUFFIX route add 192.168.2.0/24 via 10.0.0.1<br/><br/>
                        <span className="text-muted-foreground"># Enable IP forwarding on BOTH routers</span><br/>
                        <span className="command-text">sudo</span> ip netns exec r1-$SUFFIX sysctl -w net.ipv4.ip_forward=1<br/>
                        <span className="command-text">sudo</span> ip netns exec r2-$SUFFIX sysctl -w net.ipv4.ip_forward=1<br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Setup complete!"</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default RCreateTheoryPage;
