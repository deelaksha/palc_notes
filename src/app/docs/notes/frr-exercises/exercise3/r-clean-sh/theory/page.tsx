
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const RCleanTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise3/r-clean-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-clean.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-clean.sh` Script (Exercise 3)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is the cleanup tool for the advanced router topology created in Exercise 3. It systematically removes all network namespaces (the router and hosts) and any lingering virtual interfaces to ensure the system is returned to a clean state.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Suffix Handling:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>It determines a unique `SUFFIX` for the network components, defaulting to 'arms', which ensures it cleans up the correct set of virtual devices.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Deleting All Namespaces:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip netns del router-${'${SUFFIX}'}</code></b>: This command deletes the central router namespace.</li>
                         <li>It then proceeds to delete the namespaces for `h1`, `h2`, and `h3` in the same way.</li>
                         <li>When a namespace is deleted, any virtual interfaces that have been moved *inside* it (like `h1-r-arms` or `r-h1-arms`) are automatically destroyed, which simplifies the cleanup.</li>
                          <li><b className="font-mono text-keyword"><code>2>/dev/null && ... || ...</code></b>: This is robust error handling. It silences errors if a namespace doesn't exist and prints a user-friendly message, preventing script failure on subsequent runs.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Deleting Leftover Interfaces:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>Although deleting a namespace usually cleans up its internal interfaces, the other end of a `veth` pair might be left in the main OS namespace if not handled correctly.</li>
                        <li>This section of the script explicitly tries to delete all `veth` interfaces by name as a safety measure to ensure no virtual devices are left behind.</li>
                        <li>The `|| true` part ensures the script doesn't stop with an error if the interface has already been correctly deleted.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Verification:</h3>
                     <ul className="list-disc list-inside space-y-2">
                         <li>Finally, the script runs `ip netns list` and `ip link show` with `grep` to check for any remaining components with the specified suffix. If the cleanup was successful, it will report "None found (good)".</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># Clean up router topology</span><br/><br/>
                        <span className="text-muted-foreground"># ... (Get suffix logic) ...</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Cleaning up router network topology with suffix: $SUFFIX"</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Deleting namespaces..."</span><br/>
                        <span className="command-text">sudo</span> ip netns del router-$SUFFIX 2&gt;/dev/null && <span className="command-text">echo</span> <span className="text-tips">"  Deleted router-$SUFFIX"</span> || <span className="command-text">echo</span> <span className="text-tips">"  router-$SUFFIX not found"</span><br/>
                        <span className="command-text">sudo</span> ip netns del h1-$SUFFIX 2&gt;/dev/null && <span className="command-text">echo</span> <span className="text-tips">"  Deleted h1-$SUFFIX"</span> || <span className="command-text">echo</span> <span className="text-tips">"  h1-$SUFFIX not found"</span><br/>
                        <span className="text-muted-foreground"># ... (deletes h2, h3)</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Cleaning up any leftover veth interfaces..."</span><br/>
                        <span className="command-text">sudo</span> ip link del h1-r-$SUFFIX 2&gt;/dev/null || <span className="keyword-text">true</span><br/>
                        <span className="text-muted-foreground"># ... (cleans up other veth pairs)</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Cleanup complete!"</span><br/>
                        <span className="command-text">echo</span> <span className="text-tips">""</span><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Verification:"</span><br/>
                        <span className="text-muted-foreground"># ... (verification logic) ...</span>
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default RCleanTheoryPage;
