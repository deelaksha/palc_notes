
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CaptureTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise4/capture-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to capture.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `capture.sh` Script (Exercise 4)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This is the most advanced version of the capture script, designed for the dual-router topology. It allows you to target any host (`h1`-`h4`) or either router (`r1`, `r2`) and intelligently captures traffic on the correct interfaces.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Key Features & Logic
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Advanced Targeting:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script takes a `TARGET` argument which can be `r1`, `r2`, `h1`, `h2`, `h3`, or `h4`.</li>
                        <li>It uses `if` and `case` statements to determine the correct namespace to enter and the correct interface(s) to listen on.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Multi-Interface Router Capture:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script's most complex feature is capturing traffic on a router. To see the full path of a packet traversing a router, you must listen on all its interfaces at once.</li>
                        <li>It achieves this using **named pipes** (FIFOs). For `r1`, it starts three separate `tcpdump` processes in the background, each listening on a different interface (`r1-h1`, `r1-h2`, `r1-r2`).</li>
                        <li>Each `tcpdump` process writes its output to a unique named pipe.</li>
                         <li>The main script then reads from all these pipes simultaneously and prefixes each line of output with the interface name (e.g., `[r1-h1-arms]...`). This allows you to see traffic arriving on one interface and leaving on another.</li>
                         <li>A `trap` command is used to ensure all background processes and pipes are cleaned up neatly when you press `Ctrl-C`.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Write Mode Simplification:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>When capturing from a router in `write` mode (to a `.pcap` file), the script simplifies the process by only listening on the first interface (`r1-h1` or `r2-h3`).</li>
                         <li>This is because merging multiple live captures into a single, time-synchronized `.pcap` file is a very complex task that `tcpdump` alone cannot easily handle. For deep analysis, you would typically run separate captures.</li>
                    </ul>


                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# Capture network traffic on router or host interfaces

# ... (argument parsing and validation logic) ...

# Determine the namespace and interfaces to capture
if [[ "$TARGET" == "r1" ]]; then
    TARGET_NS="r1-$SUFFIX"
    INTERFACES="r1-h1-$SUFFIX r1-h2-$SUFFIX r1-r2-$SUFFIX"
elif [[ "$TARGET" == "r2" ]]; then
    # ... logic for r2
else
    # Logic for hosts h1-h4
fi

# Build and execute tcpdump command
if [[ "$TARGET" =~ ^r[12]$ && "$MODE" == "live" ]]; then
    # Create named pipes for each interface
    for iface in $INTERFACES; do
        PIPE="/tmp/tcpdump_\${iface}_\$\$"
        mkfifo "$PIPE"
        # Start tcpdump in background, redirecting to pipe
        sudo ip netns exec "$TARGET_NS" tcpdump -i "$iface" -n -e -l > "$PIPE" &
        # Read from pipe and label output
        (while read line; do echo "[$iface] $line"; done < "$PIPE") &
    done
    # Wait for user to stop
    trap "..." INT
    wait
else
    # Simpler case for single interface capture (hosts or router write mode)
    # ...
fi
`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default CaptureTheoryPage;
