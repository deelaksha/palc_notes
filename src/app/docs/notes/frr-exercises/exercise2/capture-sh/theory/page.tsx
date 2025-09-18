
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
                    <Link href="/docs/notes/frr-exercises/exercise2/capture-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to capture.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the Advanced `capture.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is a more advanced tool for capturing network traffic within our virtual environments. It can listen on different interfaces (`h1`, `h2`, `bridge`) and can either show traffic live or save it to a file for later analysis with tools like Wireshark.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Usage and Argument Parsing:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>usage()</code></b>: A help function that explains how to use the script and shows examples.</li>
                        <li><b className="font-mono text-keyword"><code>if [[ "$1" == "-h" ...</code></b>: A check to see if the user asked for help.</li>
                        <li>The script then carefully parses up to four arguments: a suffix for the namespace, a mode (`live` or `write`), an output file path, and the interface to listen on. It sets sensible defaults if they aren't provided.</li>
                        <li>It includes validation to make sure the arguments make sense (e.g., you must provide a filename in 'write' mode).</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Determining the Capture Context:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script cleverly determines *where* and *how* to run `tcpdump`.</li>
                        <li><b className="font-mono text-keyword"><code>if [[ "$INTERFACE" == "bridge" ]]</code></b>: If you want to listen on the bridge (`br0-arms`), it runs `tcpdump` directly in the main OS.</li>
                        <li><b className="font-mono text-keyword"><code>else ...</code></b>: If you want to listen on a host's interface (e.g., `h1`), it sets up an `EXEC_CONTEXT`.</li>
                        <li><b className="font-mono text-keyword"><code>EXEC_CONTEXT="sudo ip netns exec $HOST_NS"</code></b>: This variable stores the command needed to run something *inside* the correct network namespace (e.g., `h1-arms`).</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Building and Executing the Command:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>Based on the 'mode', it builds the final `tcpdump` command string (`TCPDUMP_CMD`).</li>
                        <li>For 'live' mode, it uses flags for immediate, readable output.</li>
                        <li>For 'write' mode, it uses the `-w` flag to save raw packet data to a `.pcap` file.</li>
                        <li><b className="font-mono text-keyword"><code>if [[ -n "$EXEC_CONTEXT" ]] ...</code></b>: This final block executes the command, either inside a namespace (if `EXEC_CONTEXT` is set) or in the main OS.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># Capture network traffic on the bridge or host interfaces</span><br/><br/>
                        
                        <span className="text-muted-foreground"># Default values</span><br/>
                        <span className="text-label">DEFAULT_SUFFIX</span>=<span className="text-tips">"arms"</span><br/>
                        <span className="text-label">DEFAULT_INTERFACE</span>=<span className="text-tips">"bridge"</span><br/><br/>
                        
                        <span className="text-muted-foreground"># Usage function</span><br/>
                        <span className="keyword-text">usage</span>() {'{'}<br/>
                        {'    '}<span className="command-text">echo</span> <span className="text-tips">"..."</span><br/>
                        {'}'}<br/><br/>

                        <span className="text-muted-foreground"># Parse arguments... (code omitted for brevity)</span><br/><br/>

                        <span className="text-muted-foreground"># Install tcpdump if not available</span><br/>
                        <span className="command-text">if</span> ! <span className="keyword-text">command</span> -v tcpdump &> /dev/null; <span className="command-text">then</span><br/>
                        {'    '}<span className="command-text">echo</span> <span className="text-tips">"tcpdump not found, installing..."</span><br/>
                        {'    '}<span className="command-text">sudo</span> apt-get update && <span className="command-text">sudo</span> apt-get install -y tcpdump<br/>
                        <span className="command-text">fi</span><br/><br/>

                        <span className="text-muted-foreground"># Determine the actual interface name and execution context</span><br/>
                        <span className="command-text">if</span> [[ <span className="text-tips">"$INTERFACE"</span> == <span className="text-tips">"bridge"</span> ]]; <span className="command-text">then</span><br/>
                        {'    '}<span className="text-label">ACTUAL_INTERFACE</span>=<span className="text-tips">"br0-${'${SUFFIX}'}"</span><br/>
                        {'    '}<span className="text-label">EXEC_CONTEXT</span>=<span className="text-tips">""</span><br/>
                        <span className="command-text">else</span><br/>
                        {'    '}<span className="text-label">HOST_NS</span>=<span className="text-tips">"$INTERFACE-${'${SUFFIX}'}"</span><br/>
                        {'    '}<span className="text-label">ACTUAL_INTERFACE</span>=<span className="text-tips">"v${'${INTERFACE:1}'}-${'${SUFFIX}'}"</span><br/>
                        {'    '}<span className="text-label">EXEC_CONTEXT</span>=<span className="text-tips">"sudo ip netns exec $HOST_NS"</span><br/>
                        <span className="command-text">fi</span><br/><br/>

                        <span className="text-muted-foreground"># Build tcpdump command</span><br/>
                        <span className="command-text">if</span> [[ <span className="text-tips">"$MODE"</span> == <span className="text-tips">"live"</span> ]]; <span className="command-text">then</span><br/>
                        {'    '}<span className="text-label">TCPDUMP_CMD</span>=<span className="text-tips">"tcpdump -i $ACTUAL_INTERFACE -n -e"</span><br/>
                        <span className="command-text">else</span><br/>
                        {'    '}<span className="text-label">TCPDUMP_CMD</span>=<span className="text-tips">"tcpdump -i $ACTUAL_INTERFACE -n -w $OUTPUT_FILE"</span><br/>
                        <span className="command-text">fi</span><br/><br/>

                        <span className="text-muted-foreground"># Execute tcpdump</span><br/>
                        <span className="command-text">if</span> [[ -n <span className="text-tips">"$EXEC_CONTEXT"</span> ]]; <span className="command-text">then</span><br/>
                        {'    '}<span className="command-text">$EXEC_CONTEXT</span> $TCPDUMP_CMD<br/>
                        <span className="command-text">else</span><br/>
                        {'    '}<span className="command-text">sudo</span> $TCPDUMP_CMD<br/>
                        <span className="command-text">fi</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsCaptureTheoryPage;
