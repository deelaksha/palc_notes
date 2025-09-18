
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const NsPingTheoryPage = () => {
    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise3/ns-ping-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-ping.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `ns-ping.sh` Script (Exercise 3)
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This is a flexible script for testing connectivity between any two hosts in the router topology. It demonstrates how hosts in different subnets communicate through a default gateway.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Argument Parsing and Defaults:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script is designed to be highly configurable. It accepts arguments for the `SUFFIX`, `SOURCE_HOST`, `DESTINATION_HOST`, and ping `COUNT`.</li>
                        <li>If arguments are not provided, it uses sensible defaults (e.g., ping from `h1` to `h2`).</li>
                        <li>It includes a `usage()` function and a check for `--help` to guide the user.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Input Validation:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script contains several validation checks to prevent errors.</li>
                         <li>It ensures the host names are valid (`h1`, `h2`, or `h3`).</li>
                        <li>It stops if the source and destination are the same.</li>
                        <li>It verifies that the `COUNT` is a valid number.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. IP Address Mapping:</h3>
                     <ul className="list-disc list-inside space-y-2">
                         <li><b className="font-mono text-keyword"><code>declare -A HOST_IPS</code></b>: This creates a special 'map' variable. It's used to easily look up the IP address for a given hostname (e.g., `h1` maps to `192.168.1.10`).</li>
                        <li>This makes the script cleaner than having a long `if/else` block to determine the IP address.</li>
                    </ul>

                     <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Execution:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>if ! sudo ip netns list...</code></b>: Before running the ping, it checks if the source namespace actually exists, providing a helpful error if it doesn't.</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip netns exec "$SRC_NS" ping...</code></b>: This is the core command. It enters the specified source namespace and executes the `ping` command, targeting the destination IP that was looked up from the map.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# Ping from one host to another in the router topology

# ... (defaults and usage function) ...

# ... (argument parsing and validation) ...

# Map host names to IP addresses
declare -A HOST_IPS
HOST_IPS["h1"]="192.168.1.10"
HOST_IPS["h2"]="192.168.2.10"
HOST_IPS["h3"]="192.168.3.10"

SRC_NS="$SRC_HOST-$SUFFIX"
DST_IP="\${HOST_IPS[$DST_HOST]}"

echo "Pinging from $SRC_NS to $DST_HOST ($DST_IP)..."

# Check if source namespace exists and execute ping
if ! sudo ip netns list | grep -q "^$SRC_NS "; then
    echo "Error: Namespace $SRC_NS not found."
    exit 1
fi
sudo ip netns exec "$SRC_NS" ping -c "$COUNT" "$DST_IP"
`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsPingTheoryPage;
