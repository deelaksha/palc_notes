
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const NsCleanTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise1/ns-clean-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-clean.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `ns-clean.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is the essential cleanup tool for our virtual network exercises. It safely and completely removes the network namespaces and virtual interfaces created by `ns-create.sh`, ensuring your system is returned to its original state.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Setup and Introduction:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>SUFFIX="..."</code></b>: Just like our create script, this ensures we are targeting the correctly named namespaces (e.g., `h1-arms`, `h2-arms`).</li>
                        <li><b className="font-mono text-keyword"><code>echo "Cleaning up..."</code></b>: A helpful message to let the user know the cleanup process has started.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Deleting the Namespaces:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip netns del h1-${'${SUFFIX}'}</code></b>: This is the core command. It tells the system to **del**ete the network namespace named `h1-arms`.</li>
                        <li>An important feature of Linux namespaces is that when you delete a namespace, any virtual interfaces (`veth` pairs) that were moved *inside* it are automatically destroyed as well. This makes cleanup very efficient.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Error Handling with `2>/dev/null || true`:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>This is a common and useful trick in shell scripting.</li>
                        <li><b className="font-mono text-keyword"><code>2>/dev/null</code></b>: This part redirects any error messages (which are on stream `2`) to `/dev/null`, a "black hole" that just discards them. If you try to delete a namespace that doesn't exist, this prevents an ugly error message from appearing.</li>
                        <li><b className="font-mono text-keyword"><code>|| true</code></b>: The `||` means "or". If the first command fails (for example, if the namespace was already deleted), this part runs the command `true`, which does nothing but successfully exits. This prevents the script from stopping with an error if you run it multiple times.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Final Confirmation:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>echo "Cleanup complete..."</code></b>: Lets the user know that the process has finished.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/><br/>
                        <span className="text-muted-foreground"># Get suffix from argument or USERNAME env var, default to 'arms'</span><br/>
                        <span className="text-label">SUFFIX</span>=<span className="text-tips">"${'${1:-${USERNAME:-arms}}'}"</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Cleaning up namespaces and interfaces for suffix '${'${SUFFIX}'}'..."</span><br/><br/>
                        <span className="text-muted-foreground"># Delete namespaces (this automatically removes veth interfaces inside them)</span><br/>
                        <span className="command-text">sudo</span> <span className="keyword-text">ip netns del</span> h1-${'${SUFFIX}'} 2&gt;/dev/null || <span className="keyword-text">true</span><br/>
                        <span className="command-text">sudo</span> <span className="keyword-text">ip netns del</span> h2-${'${SUFFIX}'} 2&gt;/dev/null || <span className="keyword-text">true</span><br/><br/>
                        <span className="text-muted-foreground"># Just in case veth devices exist in default namespace, try to delete them</span><br/>
                        <span className="command-text">sudo</span> <span className="keyword-text">ip link del</span> v1-${'${SUFFIX}'} 2&gt;/dev/null || <span className="keyword-text">true</span><br/>
                        <span className="command-text">sudo</span> <span className="keyword-text">ip link del</span> v2-${'${SUFFIX}'} 2&gt;/dev/null || <span className="keyword-text">true</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Cleanup complete for suffix '${'${SUFFIX}'}'"</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsCleanTheoryPage;
