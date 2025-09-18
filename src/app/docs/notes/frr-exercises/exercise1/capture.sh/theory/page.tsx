
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const NsCaptureTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise1/capture.sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-capture.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `ns-capture.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is a tool for capturing network traffic inside one of our virtual computers (network namespaces). It uses a powerful command-line tool called <code>tcpdump</code> to listen to network activity and show us the packets.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Setup and Tool Check:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>SUFFIX="..."</code></b>: Just like our previous script, this sets up a unique name for our namespaces.</li>
                        <li><b className="font-mono text-keyword"><code>if ! command -v tcpdump ...</code></b>: This is a safety check. It looks to see if the <code>tcpdump</code> tool is installed. If not, it automatically installs it for you. This makes the script more reliable.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Two Modes of Operation:</h3>
                    <p className="text-muted-foreground">The script can run in two different modes, decided by the second argument you give it when you run it.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>if [ "$2" = "write" ]</code></b>: This checks if the second argument is the word "write". If it is, it enters "Write Mode".</li>
                        <li>
                            <b>Write Mode</b>: In this mode, it saves the captured network packets to a file (a <code>.pcap</code> file).
                            <ul className="list-disc list-inside ml-6 mt-2">
                                <li><code>PCAP_FILE=...</code>: It defines the name of the file where the capture will be saved.</li>
                                <li><code>tcpdump -w ${'${PCAP_FILE}'}</code>: The <code>-w</code> flag tells <code>tcpdump</code> to <b>w</b>rite the packets to the specified file instead of printing them on the screen. This file can be opened later in tools like Wireshark for deep analysis.</li>
                            </ul>
                        </li>
                        <li><b className="font-mono text-keyword"><code>else</code></b>: If the second argument is not "write", it runs in "Live Mode".</li>
                        <li>
                            <b>Live Mode</b>: This is the default mode. It prints the packet information directly to your terminal as it's captured.
                             <ul className="list-disc list-inside ml-6 mt-2">
                                <li><code>-n</code>: Don't resolve hostnames (faster).</li>
                                <li><code>-e</code>: Print the link-level (MAC address) header.</li>
                                 <li><code>-l</code>: Make output line-buffered, so you see packets immediately.</li>
                            </ul>
                        </li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. The Core Command:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip netns exec h2-${'${SUFFIX}'} ...</code></b>: This is the key part. It tells the computer: "As a superuser, go inside the virtual computer <code>h2-arms</code> and execute the following command there."</li>
                        <li><b className="font-mono text-keyword"><code>tcpdump -i v2-${'${SUFFIX}'}</code></b>: This is the command that runs inside the namespace. It tells <code>tcpdump</code> to listen on the specific virtual network cable end (<code>v2-arms</code>) that is inside the <code>h2</code> namespace.</li>
                    </ul>


                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/><br/>
                        <span className="text-muted-foreground"># Get suffix from argument 1 or USERNAME env var, default to 'arms'</span><br/>
                        <span className="text-label">SUFFIX</span>=<span className="text-tips">"${'${1:-${USERNAME:-arms}}'}"</span><br/><br/>
                        <span className="text-muted-foreground"># Check if tcpdump is installed, install if not</span><br/>
                        <span className="command-text">if</span> ! <span className="keyword-text">command</span> -v tcpdump &> /dev/null; <span className="command-text">then</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"tcpdump not found. Installing..."</span><br/>
                        {"    "}<span className="command-text">sudo</span> apt-get update && <span className="command-text">sudo</span> apt-get -y install tcpdump<br/>
                        <span className="command-text">fi</span><br/><br/>
                        <span className="text-muted-foreground"># Check for 'write' mode</span><br/>
                        <span className="command-text">if</span> [ <span className="text-tips">"$2"</span> = <span className="text-tips">"write"</span> ]; <span className="command-text">then</span><br/>
                        {"    "}<span className="text-muted-foreground"># Write mode - save to pcap file</span><br/>
                        {"    "}<span className="text-label">PCAP_FILE</span>=<span className="text-tips">"${'${3:-/tmp/capture-${SUFFIX}}'}.pcap"</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"Capturing all packets on h2-${'${SUFFIX}'} to file: ${'${PCAP_FILE}'}"</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"Press Ctrl-C to stop capture..."</span><br/>
                        {"    "}<span className="command-text">sudo</span> <span className="keyword-text">ip netns exec</span> h2-${'${SUFFIX}'} tcpdump -i v2-${'${SUFFIX}'} -n -w <span className="text-label">${'${PCAP_FILE}'}</span><br/>
                        <span className="command-text">else</span><br/>
                        {"    "}<span className="text-muted-foreground"># Live mode - output to stdout</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"Capturing all packets on h2-${'${SUFFIX}'} (live mode)"</span><br/>
                        {"    "}<span className="command-text">echo</span> <span className="text-tips">"Press Ctrl-C to stop..."</span><br/>
                        {"    "}<span className="command-text">sudo</span> <span className="keyword-text">ip netns exec</span> h2-${'${SUFFIX}'} tcpdump -i v2-${'${SUFFIX}'} -n -e -l<br/>
                        <span className="command-text">fi</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsCaptureTheoryPage;
