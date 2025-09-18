
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
                    <Link href="/docs/notes/frr-exercises/exercise2/r-clean-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to r-clean.sh
                    </Link>
                </Button>
            </div>

            <div className="max-w-4xl mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary">
                    Explaining the `r-clean.sh` Script
                </h1>

                <div className="prose dark:prose-invert prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                        This script is the cleanup tool for the 3-host bridge topology created in Exercise 2. It systematically removes all the network namespaces, the bridge, and any leftover virtual interfaces to ensure the system is returned to a clean state.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-primary-accent pb-2">
                        Line-by-Line Explanation
                    </h2>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">1. Suffix Handling:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>It determines a unique `SUFFIX` for the network components, defaulting to 'arms', which ensures it cleans up the correct set of virtual devices.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">2. Deleting Namespaces:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip netns del h1-${'${SUFFIX}'}</code></b>: This command deletes the network namespace for `h1`. A key feature is that any virtual interfaces moved *inside* this namespace are automatically destroyed with it.</li>
                         <li>The script does this for `h1`, `h2`, and `h3`.</li>
                         <li><b className="font-mono text-keyword"><code>2>/dev/null && echo ... || echo ...</code></b>: This is clever error handling. It tries to delete the namespace. If it succeeds (`&&`), it prints a success message. If it fails (`||`, e.g., the namespace doesn't exist), it prints a "not found" message, preventing scary error text.</li>
                    </ul>
                    
                     <h3 className="text-xl font-semibold mt-6 mb-2 text-secondary-accent">3. Deleting the Bridge:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip link del br0-${'${SUFFIX}'}</code></b>: After the namespaces are gone, this command deletes the central bridge device that connected them.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-2 text-primary-accent">4. Final Cleanup:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b className="font-mono text-keyword"><code>sudo ip link del v1-${'${SUFFIX}'} 2>/dev/null || true</code></b>: As a final safety measure, this tries to delete any `veth` interfaces that might have been left in the main OS namespace. The `|| true` ensures the script doesn't stop with an error if the interface is already gone.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 border-b-2 text-secondary-accent pb-2">
                        The Full Script
                    </h2>
                    <CodeBlock>
{`#!/bin/bash
# Clean up 3-host bridge topology

# Get suffix from argument or USERNAME environment variable
if [[ -n "$1" ]]; then
    SUFFIX="$1"
elif [[ -n "$USERNAME" ]]; then
    SUFFIX="$USERNAME"
else
    SUFFIX="arms"  # default suffix
fi

echo "Cleaning up network namespaces and bridge with suffix: $SUFFIX"

# Delete namespaces (this also removes interfaces inside them)
echo "Deleting namespaces..."
sudo ip netns del h1-$SUFFIX 2>/dev/null && echo "  Deleted h1-$SUFFIX" || echo "  h1-$SUFFIX not found"
sudo ip netns del h2-$SUFFIX 2>/dev/null && echo "  Deleted h2-$SUFFIX" || echo "  h2-$SUFFIX not found"
sudo ip netns del h3-$SUFFIX 2>/dev/null && echo "  Deleted h3-$SUFFIX" || echo "  h3-$SUFFIX not found"

# Delete bridge
echo "Deleting bridge..."
sudo ip link del br0-$SUFFIX 2>/dev/null && echo "  Deleted br0-$SUFFIX" || echo "  br0-$SUFFIX not found"

# Clean up any leftover veth interfaces
echo "Cleaning up any leftover veth interfaces..."
sudo ip link del v1-$SUFFIX 2>/dev/null || true
sudo ip link del v2-$SUFFIX 2>/dev/null || true
sudo ip link del v3-$SUFFIX 2>/dev/null || true
sudo ip link del v1p-$SUFFIX 2>/dev/null || true
sudo ip link del v2p-$SUFFIX 2>/dev/null || true
sudo ip link del v3p-$SUFFIX 2>/dev/null || true

echo "Cleanup complete!"
echo ""
echo "Verification:"
echo "  Namespaces with suffix '$SUFFIX':"
ip netns list | grep -E "h[1-3]-$SUFFIX" || echo "  None found (good)"
echo "  Bridge with suffix '$SUFFIX':"
ip link show | grep "br0-$SUFFIX" || echo "  None found (good)"`}
                    </CodeBlock>
                </div>
            </div>
        </main>
    );
};

export default RCleanTheoryPage;
