
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
                    <Link href="/docs/notes/frr-exercises/exercise2/ns-ping-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ns-ping.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the Advanced `ns-ping.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is a flexible tool to test connectivity between any of the three hosts (`h1`, `h2`, `h3`) in the bridge topology. It allows you to specify the source, destination, and number of ping packets, making it great for testing specific network paths.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Defaults and Usage:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>It sets default values: ping from `h1` to `h2` with 5 packets.</li>
                        <li>The `usage()` function provides detailed help on how to run the script with different arguments, including examples.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Argument Parsing:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The script intelligently checks for up to four arguments: `SUFFIX`, `SOURCE_HOST`, `DESTINATION_HOST`, and `COUNT`.</li>
                        <li>If an argument isn't provided, it falls back to the default value (e.g., `h1` for the source host).</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Input Validation:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>The script includes several safety checks to prevent errors:</li>
                        <li>It ensures the host names are valid (`h1`, `h2`, or `h3`).</li>
                        <li>It prevents you from pinging a host from itself.</li>
                        <li>It checks that the `COUNT` is a valid number.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. IP Address Mapping:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>declare -A HOST_IPS</code></b>: This creates a special type of variable called an 'associative array' or a 'map'. It's used to link the hostnames (`h1`) to their corresponding IP addresses (`10.0.0.1`).</li>
                        <li><b className="font-mono text-keyword"><code>DST_IP="${'${HOST_IPS[$DST_HOST]}'}$"</code></b>: This looks up the destination IP address from the map based on the chosen destination host.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">5. Execution:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>The script prints a helpful message explaining what it's about to do.</li>
                        <li>It checks if the source namespace exists before trying to run a command inside it.</li>
                        <li><b className="font-mono text-keyword"><code>sudo ip netns exec "$SRC_NS" ping ...</code></b>: This is the final command. It enters the correct source namespace and executes the `ping` command from there, targeting the destination IP address.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# Ping from one host to another in the bridge topology

# Default values
DEFAULT_SUFFIX="arms"
DEFAULT_SRC="h1"
DEFAULT_DST="h2"
DEFAULT_COUNT=5

# Usage function
usage() {
    echo "Usage: $0 [SUFFIX] [SOURCE] [DEST] [COUNT]"
    # ... (usage text)
}

# Parse arguments
# ... (argument parsing logic)

# Validate hosts
# ... (validation logic)

# Map host names to IP addresses
declare -A HOST_IPS
HOST_IPS["h1"]="10.0.0.1"
HOST_IPS["h2"]="10.0.0.2"
HOST_IPS["h3"]="10.0.0.3"

SRC_NS="$SRC_HOST-$SUFFIX"
DST_IP="\${HOST_IPS[$DST_HOST]}"

echo "Pinging from $SRC_NS to $DST_HOST ($DST_IP)..."

# Execute ping
sudo ip netns exec "$SRC_NS" ping -c "$COUNT" "$DST_IP"
`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default NsPingTheoryPage;
