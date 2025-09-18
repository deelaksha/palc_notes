
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const scriptContent = `
#!/bin/bash
# Description: Captures network traffic for analysis.

echo "Starting traffic capture..."
# Add script logic here, e.g., using tcpdump
`;

export default function NsCaptureShPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/notes/frr-exercises/exercise1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exercise 1
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-code mb-4">ns-capture.sh</h1>
        <p className="text-muted-foreground mb-6">This script utilizes tools like \`tcpdump\` to capture network traffic on specific interfaces within the namespaces for later analysis in tools like Wireshark.</p>
        <CodeBlock>{scriptContent.trim()}</CodeBlock>
      </div>
    </main>
  );
}
