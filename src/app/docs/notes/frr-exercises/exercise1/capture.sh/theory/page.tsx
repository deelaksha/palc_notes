
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
                        Back to capture.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `capture.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This is an advanced script for capturing network traffic from multiple points in our virtual network. It uses a powerful command-line tool called <code>tcpdump</code> to listen to network activity on different interfaces and can either show it live or save it to a file.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Usage and Help:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>usage() ...</code></b>: This function prints a help message explaining all the script's options and then exits. It's triggered by the `-h` or `--help` flags.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">2. Argument Parsing:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>SUFFIX="${'${1:-...}'}"</code></b>: Sets up the unique name for our namespaces, with a default value.</li>
                        <li><b className="font-mono text-keyword"><code>MODE="$2"</code></b>: Determines if the capture should be `live` or `write` to a file.</li>
                        <li><b className="font-mono text-keyword"><code>INTERFACE="$4"</code></b>: Allows the user to specify *where* to listen: on the `bridge`, or inside the `h1`, `h2`, or `h3` namespaces.</li>
                        <li>The script includes validation to ensure the user provides valid arguments for `MODE` and `INTERFACE`.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">3. Determining Execution Context:</h3>
                    <p className="text-muted-foreground">This is the clever part of the script. It figures out the exact command needed based on the chosen interface.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>if [[ "$INTERFACE" == "bridge" ]]</code></b>: If we're listening on the bridge (`br0-arms`), the command can be run directly.</li>
                        <li><b className="font-mono text-keyword"><code>else ... EXEC_CONTEXT="sudo ip netns exec $HOST_NS"</code></b>: If we want to listen inside a host (e.g., `h1`), the script builds an `ip netns exec` command. This variable will be placed *before* the `tcpdump` command to run it inside the correct namespace.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">4. Building and Running `tcpdump`:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>TCPDUMP_CMD="tcpdump -i $ACTUAL_INTERFACE ..."</code></b>: The script builds the final `tcpdump` command string with the correct flags based on whether the mode is `live` (`-n -e`) or `write` (`-n -w $OUTPUT_FILE`).</li>
                        <li><b className="font-mono text-keyword"><code>$EXEC_CONTEXT $TCPDUMP_CMD</code></b>: The script executes the command. If `$EXEC_CONTEXT` is empty (for the bridge), it just runs `sudo tcpdump...`. If it's not empty, it runs `sudo ip netns exec h1-arms tcpdump...`, correctly targeting the desired location.</li>
                    </ul>


                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# Capture network traffic on the bridge or host interfaces

# Default values
DEFAULT_SUFFIX="arms"
DEFAULT_INTERFACE="bridge"

# Usage function
usage() {
    echo "Usage: $0 [SUFFIX] [MODE] [OUTPUT_FILE] [INTERFACE]"
    exit 1
}

# Parse arguments
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    usage
fi

SUFFIX="\${1:-\${USERNAME:-\$DEFAULT_SUFFIX}}"
MODE="\${2:-live}"
OUTPUT_FILE="\${3:-}"
INTERFACE="\${4:-\$DEFAULT_INTERFACE}"

# Validate mode & interface
if [[ "$MODE" != "live" && "$MODE" != "write" ]]; then
    echo "Error: Mode must be 'live' or 'write'"
    exit 1
fi
if [[ ! "$INTERFACE" =~ ^(bridge|h1|h2|h3)$ ]]; then
    echo "Error: Interface must be 'bridge', 'h1', 'h2', or 'h3'"
    exit 1
fi
if [[ "$MODE" == "write" && -z "$OUTPUT_FILE" ]]; then
    echo "Error: Output file must be specified for write mode"
    exit 1
fi

# Install tcpdump if needed
if ! command -v tcpdump &> /dev/null; then
    echo "tcpdump not found, installing..."
    sudo apt-get update && sudo apt-get install -y tcpdump
fi

# Determine the actual interface name and execution context
if [[ "$INTERFACE" == "bridge" ]]; then
    ACTUAL_INTERFACE="br0-$SUFFIX"
    EXEC_CONTEXT=""
    if ! ip link show "$ACTUAL_INTERFACE" &> /dev/null; then
        echo "Error: Bridge $ACTUAL_INTERFACE not found."
        exit 1
    fi
else
    HOST_NS="$INTERFACE-$SUFFIX"
    ACTUAL_INTERFACE="v\${INTERFACE:1}-$SUFFIX"
    EXEC_CONTEXT="sudo ip netns exec $HOST_NS"
    if ! sudo ip netns list | grep -q "^$HOST_NS "; then
        echo "Error: Namespace $HOST_NS not found."
        exit 1
    fi
fi

# Build and execute tcpdump command
if [[ "$MODE" == "live" ]]; then
    TCPDUMP_CMD="tcpdump -i $ACTUAL_INTERFACE -n -e"
    echo "Starting live capture on $ACTUAL_INTERFACE..."
else
    TCPDUMP_CMD="tcpdump -i $ACTUAL_INTERFACE -n -w $OUTPUT_FILE"
    echo "Writing capture to $OUTPUT_FILE from $ACTUAL_INTERFACE..."
fi

echo "Press Ctrl-C to stop"
if [[ -n "$EXEC_CONTEXT" ]]; then
    $EXEC_CONTEXT $TCPDUMP_CMD
else
    sudo $TCPDUMP_CMD
fi
`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsCaptureTheoryPage;

    