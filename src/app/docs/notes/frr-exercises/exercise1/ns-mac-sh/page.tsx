
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const scriptContent = `
#!/bin/bash
# Description: Displays MAC addresses for devices.

echo "Displaying MAC addresses..."
# Add script logic here, e.g., using 'ip addr' or 'ip link'
`;

export default function NsMacShPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/notes/frr-exercises/exercise1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exercise 1
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-code mb-4">ns-mac.sh</h1>
        <p className="text-muted-foreground mb-6">This utility script displays the MAC (hardware) addresses of the network interfaces within the different namespaces, which is useful for debugging Layer 2 connectivity.</p>
        <CodeBlock>{scriptContent.trim()}</CodeBlock>
      </div>
    </main>
  );
}
