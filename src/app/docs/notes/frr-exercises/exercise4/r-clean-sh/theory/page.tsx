
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
                    <Link href="/docs/notes/frr-exercises/exercise4/r-clean-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-clean.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-clean.sh` Script (Exercise 4)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is the essential cleanup tool for the advanced dual-router topology. It systematically removes all six network namespaces (`r1`, `r2`, `h1`-`h4`) and ensures any leftover virtual network interfaces are deleted, returning the system to a clean state.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Suffix Handling and Loop:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>It determines the unique `SUFFIX` for all network components, just like the creation script.</li>
                        <li><b className="font-mono text-keyword"><code>for ns in r1 r2 h1 h2 h3 h4; do...</code></b>: This is a `for` loop that iterates through a list of all namespace prefixes. This makes the script efficient and avoids repeating the same command six times.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Deleting All Namespaces:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip netns del $ns-$SUFFIX</code></b>: Inside the loop, this command deletes each namespace (e.g., `r1-arms`, `h1-arms`, etc.).</li>
                         <li>As a key feature of Linux networking, when a namespace is deleted, all virtual interfaces that were moved inside it are automatically destroyed as well. This handles most of the cleanup.</li>
                         <li>The `2>/dev/null && ... || ...` provides clean, user-friendly feedback, confirming what was deleted and what wasn't found, without showing scary error messages.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Deleting Leftover Interfaces:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>This final section is a safety net. It explicitly tries to delete any `veth` interfaces that might have been left in the main operating system's namespace.</li>
                        <li>The `|| true` part is important error handling that prevents the script from stopping if an interface has already been correctly deleted (which it usually has been).</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Verification:</h3>
                     <ul className="list-disc list-inside space-y-2">
                         <li>The script ends by running `ip netns list` and `ip link show` and filtering the output. If the cleanup was successful, it will report "None found (good)" for both namespaces and interfaces, confirming the system is clean.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
                        <span className="text-muted-foreground">#!/bin/bash</span><br/>
                        <span className="text-muted-foreground"># Clean up dual-router topology</span><br/><br/>
                        <span className="text-muted-foreground"># ... (Get suffix logic) ...</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Cleaning up dual-router network topology with suffix: $SUFFIX"</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Deleting namespaces..."</span><br/>
                        <span className="command-text">for</span> ns <span className="command-text">in</span> r1 r2 h1 h2 h3 h4; <span className="command-text">do</span><br/>
                        {"    "}<span className="command-text">sudo</span> ip netns del $ns-$SUFFIX 2&gt;/dev/null && <span className="command-text">echo</span> <span className="text-tips">"  Deleted $ns-$SUFFIX"</span> || <span className="command-text">echo</span> <span className="text-tips">"  $ns-$SUFFIX not found"</span><br/>
                        <span className="command-text">done</span><br/><br/>
                        <span className="command-text">echo</span> <span className="text-tips">"Cleaning up any leftover veth interfaces..."</span><br/>
                        <span className="text-muted-foreground"># ... (list of ip link del commands) ...</span><br/>
                        <span className="command-text">sudo</span> ip link del r2-r1-$SUFFIX 2&gt;/dev/null || <span className="keyword-text">true</span><br/><br/>
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
