
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
                    <Link href="/docs/notes/frr-exercises/exercise3/capture-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to capture.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `capture.sh` Script (Exercise 3)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This is an advanced version of the capture script, designed for the multi-subnet router topology. It allows you to precisely target which network traffic you want to see, whether it's on a specific host or on all interfaces of the central router simultaneously.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Key Features & Logic
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Flexible Targeting:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script takes a `TARGET` argument which can be `router`, `h1`, `h2`, or `h3`.</li>
                        <li>Based on this target, it determines which namespace to run `tcpdump` in (`router-arms`, `h1-arms`, etc.).</li>
                        <li>It also determines the correct interface names (e.g., `h1-r-arms` for a host, or all three `r-hX-arms` interfaces for the router).</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Advanced Router Capture:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The most complex feature is capturing traffic on the router. Since a ping from `h1` to `h2` goes *in* one router interface and *out* another, you need to listen on multiple interfaces at once to see the whole conversation.</li>
                        <li>The script achieves this using a clever trick with **named pipes** (FIFOs).</li>
                        <li>It creates three pipes, starts a `tcpdump` process for each router interface in the background, and directs each process's output to one of the pipes.</li>
                         <li>Finally, it reads from all three pipes simultaneously, adding a label (`[r-h1-arms]`) to each line of output so you know which interface the packet was seen on.</li>
                         <li>A `trap` command ensures that if you press `Ctrl-C`, all background processes are cleaned up properly.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Live vs. Write Mode:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Just like before, it supports a `live` mode to print to the screen and a `write` mode to save the capture to a `.pcap` file for analysis in Wireshark.</li>
                         <li>When capturing from the router in `write` mode, it defaults to only capturing on the first interface (`r-h1-arms`) for simplicity, as capturing multiple interfaces to a single file requires more advanced tools.</li>
                    </ul>


                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# Capture network traffic on router or host interfaces

# ... (argument parsing and validation logic) ...

# Determine the namespace and interfaces to capture
if [[ "$TARGET" == "router" ]]; then
    TARGET_NS="router-$SUFFIX"
    INTERFACES="r-h1-$SUFFIX r-h2-$SUFFIX r-h3-$SUFFIX"
else
    TARGET_NS="$TARGET-$SUFFIX"
    INTERFACES="$TARGET-r-$SUFFIX"
fi

# Build and execute tcpdump command
if [[ "$TARGET" == "router" && "$MODE" == "live" ]]; then
    # Create named pipes for each interface
    PIPE1="/tmp/pipe1_$$"; PIPE2="/tmp/pipe2_$$"; PIPE3="/tmp/pipe3_$$"
    mkfifo "$PIPE1" "$PIPE2" "$PIPE3"
    
    # Start tcpdump on each interface in the background
    sudo ip netns exec "$TARGET_NS" tcpdump -i r-h1-$SUFFIX -n -l > "$PIPE1" &
    sudo ip netns exec "$TARGET_NS" tcpdump -i r-h2-$SUFFIX -n -l > "$PIPE2" &
    sudo ip netns exec "$TARGET_NS" tcpdump -i r-h3-$SUFFIX -n -l > "$PIPE3" &
    
    # Read from pipes and label output
    (while read line; do echo "[r-h1-$SUFFIX] $line"; done < "$PIPE1") &
    (while read line; do echo "[r-h2-$SUFFIX] $line"; done < "$PIPE2") &
    (while read line; do echo "[r-h3-$SUFFIX] $line"; done < "$PIPE3") &
    
    # Wait for user to stop
    wait
else
    # Simpler case for single interface capture (hosts or router write mode)
    INTERFACE=\${INTERFACES%% *} # Use first interface if multiple
    if [[ "$MODE" == "live" ]]; then
        sudo ip netns exec "$TARGET_NS" tcpdump -i "$INTERFACE" -n -e -l
    else
        sudo ip netns exec "$TARGET_NS" tcpdump -i "$INTERFACE" -n -w "$OUTPUT_FILE"
    fi
fi
`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default CaptureTheoryPage;
