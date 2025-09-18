
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
                    <Link href="/docs/notes/frr-exercises/exercise2/r-show-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-show.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-show.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is a comprehensive diagnostic tool for the 3-host bridge topology. It provides a detailed report on the status of the bridge, each host's network configuration, and performs a full connectivity test between all hosts.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Bridge Information:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script first checks if the bridge (`br0-arms`) exists.</li>
                        <li>It prints the bridge's status (e.g., `UP`, `DOWN`).</li>
                        <li>It then uses the `bridge link show` command to list all the virtual interfaces that are connected to the bridge as ports.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Host Information Loop:</h3>
                     <p className="text-muted-foreground">The script loops through each host (`h1`, `h2`, `h3`) and performs the following checks inside each one's namespace:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>**Interfaces**: Shows the status of its network interfaces (`lo`, `vX-arms`).</li>
                        <li>**IP Addresses**: Displays the IP address configured on each interface.</li>
                        <li>**Routes**: Prints the host's routing table, which is usually very simple in this setup.</li>
                        <li>**Loopback Test**: Pings its own loopback address (`127.0.0.1`) to ensure the internal networking stack is working.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Connectivity Test Matrix:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>This is the most powerful part. It creates a grid to test the connection from every host to every other host.</li>
                        <li>It uses nested loops to iterate through all possible source-destination pairs.</li>
                        <li>For each pair, it executes `ping -c 1 -W 1` to send a single packet with a 1-second timeout.</li>
                         <li>It then prints "OK" if the ping succeeds and "FAIL" if it doesn't, giving you a quick overview of the entire network's health.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Summary and Next Steps:</h3>
                     <ul className="list-disc list-inside space-y-2">
                         <li>Finally, it provides a quick summary of the network's configuration and suggests useful commands for further testing, like `ns-ping.sh` and `ns-capture.sh`.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># ... (script setup) ...</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Bridge Information ==="</span><br/>
                        <span className="command-text">bridge</span> link show<br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Host Information ==="</span><br/>
                        <span className="command-text">for</span> i <span className="command-text">in</span> 1 2 3; <span className="command-text">do</span><br/>
                        {"    "}<span className="text-label">NS</span>=<span className="text-tips">"h$i-$SUFFIX"</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"--- Host $i ($NS) ---"</span><br/>
                        {"    "}<span className="command-text">sudo</span> ip -n <span className="text-tips">"$NS"</span> link show<br/>
                        {"    "}<span className="command-text">sudo</span> ip -n <span className="text-tips">"$NS"</span> addr show<br/>
                        {"    "}<span className="command-text">sudo</span> ip -n <span className="text-tips">"$NS"</span> route show<br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"=== Connectivity Test Matrix ==="</span><br/>
                        <span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">""</span><br/>
                        <span className="command-text">for</span> dst <span className="command-text">in</span> h1 h2 h3; <span className="command-text">do</span> <span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">"$dst"</span>; <span className="command-text">done</span><br/>
                        <span className="command-text">echo</span> <span className="text-tips">""</span><br/>
                        <span className="command-text">for</span> src <span className="command-text">in</span> h1 h2 h3; <span className="command-text">do</span><br/>
                        {"    "}<span className="command-text">printf</span> <span className="text-tips">"%-8s"</span> <span className="text-tips">"$src"</span><br/>
                        {"    "}<span className="command-text">for</span> dst <span className="command-text">in</span> h1 h2 h3; <span className="command-text">do</span><br/>
                        {"        "}<span className="text-muted-foreground"># ... (ping logic) ...</span><br/>
                        {"    "}<span className="command-text">done</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">""</span><br/>
                        <span className="command-text">done</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default RShowTheoryPage;
