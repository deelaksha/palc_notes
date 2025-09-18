
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
                    <Link href="/docs/notes/frr-exercises/exercise1/ns-ping-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-ping.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `ns-ping.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is a utility to test the connection between the two virtual computers (`h1` and `h2`) we created. It first clears any old network pathway memory (the ARP cache) and then sends a specific number of 'ping' packets to confirm they can communicate.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Setup and Configuration:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>SUFFIX="..."</code></b>: Just like our other scripts, this ensures we are targeting the correctly named namespaces.</li>
                        <li><b className="font-mono text-keyword"><code>COUNT="${'${2:-5}'}"</code></b>: This is a new feature. It checks if you provided a second argument when running the script. If you did, it uses that number as the ping count. If not, it defaults to sending `5` packets.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Clearing the ARP Cache:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>echo "Clearing ARP cache..."</code></b>: A message to inform the user what's happening.</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip netns exec h1-${'${SUFFIX}'} ip neigh flush all</code></b>: This is an interesting command. Before `h1` can ping `h2`'s IP address, it needs to know its physical (MAC) address. It finds this using the Address Resolution Protocol (ARP). This command 'flushes' or clears the ARP memory, forcing `h1` to re-discover `h2`'s MAC address on the first ping. This is useful for debugging network connection issues.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Running the Ping:</h3>
                    <ul className="list-disc list-inside space-y-2">
                         <li><b className="font-mono text-keyword"><code>echo "Pinging..."</code></b>: Another helpful message.</li>
                         <li><b className="font-mono text-keyword"><code>sudo ip netns exec h1-${'${SUFFIX}'} ping -c ${'${COUNT}'} 10.0.0.2</code></b>: This is the main action.
                            <ul>
                                <li>It executes the `ping` command *inside* the `h1` namespace.</li>
                                <li>The `-c ${'${COUNT}'}` flag tells ping to send exactly the number of packets we defined earlier.</li>
                                <li>`10.0.0.2` is the hardcoded IP address of our `h2` virtual computer.</li>
                            </ul>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/><br/>
                        <span className="text-muted-foreground"># Get suffix from argument 1 or USERNAME env var, default to 'arms'</span><br/>
                        <span className="text-label">SUFFIX</span>=<span className="text-tips">"${'${1:-${USERNAME:-arms}}'}"</span><br/><br/>
                        <span className="text-muted-foreground"># Get packet count from argument 2, default to 5</span><br/>
                        <span className="text-label">COUNT</span>=<span className="text-tips">"${'${2:-5}'}"</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Clearing ARP cache in h1-${'${SUFFIX}'}..."</span><br/>
                        <span className="command-text">sudo</span> <span className="keyword-text">ip netns exec</span> h1-${'${SUFFIX}'} ip neigh flush all<br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Pinging from h1-${'${SUFFIX}'} to 10.0.0.2 (h2-${'${SUFFIX}'}) with ${'${COUNT}'} packets..."</span><br/><br/>
                        <span className="text-muted-foreground"># Execute ping from h1 namespace</span><br/>
                        <span className="command-text">sudo</span> <span className="keyword-text">ip netns exec</span> h1-${'${SUFFIX}'} ping -c ${'${COUNT}'} 10.0.0.2
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsPingTheoryPage;
