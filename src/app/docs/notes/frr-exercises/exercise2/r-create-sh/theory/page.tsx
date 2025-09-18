
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
                    <Link href="/docs/notes/frr-exercises/exercise2/r-create-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-create.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-create.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script sets up a more complex virtual network than the previous exercise. It creates three isolated "hosts" (network namespaces) and connects them all to a single virtual "bridge," effectively creating a small, virtual local area network (LAN).
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Cleanup First:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script begins by proactively running a cleanup, deleting any old namespaces or bridges with the same name. This ensures a fresh start every time.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Creating the Components:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip netns add hX-${'${SUFFIX}'}</code></b>: It creates three separate network namespaces, `h1`, `h2`, and `h3`.</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip link add br0-${'${SUFFIX}'} type bridge</code></b>: It creates a new special device called a 'bridge'. Think of this as a virtual network switch.</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip link set br0-${'${SUFFIX}'} up</code></b>: It activates the bridge.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Connecting the Hosts:</h3>
                     <p className="text-muted-foreground">This is the most complex part. For each host (h1, h2, h3), it does the following:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip link add vX-${'${SUFFIX}'} type veth peer name vXp-${'${SUFFIX}'}</code></b>: It creates a virtual ethernet cable pair (e.g., `v1-arms` and `v1p-arms`).</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip link set vX-${'${SUFFIX}'} netns hX-${'${SUFFIX}'}</code></b>: It moves one end of the cable (`v1-arms`) inside the host's namespace.</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip link set vXp-${'${SUFFIX}'} master br0-${'${SUFFIX}'}</code></b>: It connects the other end of the cable (`v1p-arms`) to the central bridge, like plugging a cable into a switch.</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip link set vXp-${'${SUFFIX}'} up</code></b>: It activates the bridge-side end of the cable.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Configuration:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Finally, it goes into each namespace to assign an IP address (like `10.0.0.1/24`) to the virtual interface and activates it, bringing the whole network online.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># Create 3 hosts connected via a bridge</span><br/><br/>
                        <span className="command-text">if</span> [[ -n <span className="text-tips">"$1"</span> ]]; <span className="command-text">then</span><br/>
                        {"    "}<span className="text-label">SUFFIX</span>=<span className="text-tips">"$1"</span><br/>
                        <span className="command-text">elif</span> [[ -n <span className="text-tips">"$USERNAME"</span> ]]; <span className="command-text">then</span><br/>
                        {"    "}<span className="text-label">SUFFIX</span>=<span className="text-tips">"$USERNAME"</span><br/>
                        <span className="command-text">else</span><br/>
                        {"    "}<span className="text-label">SUFFIX</span>=<span className="text-tips">"arms"</span><br/>
                        <span className="command-text">fi</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Creating network namespaces and bridge with suffix: $SUFFIX"</span><br/><br/>
                        <span className="text-muted-foreground"># ... (cleanup logic omitted) ...</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Creating namespaces..."</span><br/>
                        <span className="command-text">sudo</span> ip netns add h1-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip netns add h2-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip netns add h3-$SUFFIX<br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Creating bridge br0-$SUFFIX..."</span><br/>
                        <span className="command-text">sudo</span> ip link add br0-$SUFFIX type bridge<br/>
                        <span className="command-text">sudo</span> ip link set br0-$SUFFIX up<br/><br/>
                        <span className="text-muted-foreground"># --- Connect Host 1 ---</span><br/>
                        <span className="command-text">sudo</span> ip link add v1-$SUFFIX type veth peer name v1p-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip link set v1-$SUFFIX netns h1-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip link set v1p-$SUFFIX master br0-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip link set v1p-$SUFFIX up<br/><br/>
                        <span className="text-muted-foreground"># --- Connect Host 2 & 3 (similar steps) ---</span><br/><br/>
                        <span className="text-muted-foreground"># --- Configure IPs ---</span><br/>
                        <span className="command-text">sudo</span> ip -n h1-$SUFFIX addr add 10.0.0.1/24 dev v1-$SUFFIX<br/>
                        <span className="command-text">sudo</span> ip -n h1-$SUFFIX link set v1-$SUFFIX up<br/>
                        <span className="text-muted-foreground"># ... (similar steps for h2 and h3)</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Setup complete!"</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default RCreateTheoryPage;
