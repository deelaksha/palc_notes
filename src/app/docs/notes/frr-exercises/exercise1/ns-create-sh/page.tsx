
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const scriptContent = `
#!/bin/bash
# Description: Creates network namespaces for the exercise.

echo "Creating network namespaces..."
# Add script logic here
`;

export default function NsCreateShPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/notes/frr-exercises/exercise1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exercise 1
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-code mb-4">ns-create.sh</h1>
        <p className="text-muted-foreground mb-6">This script is responsible for creating the network namespaces required for the FRR routing exercise.</p>
        <CodeBlock>{scriptContent.trim()}</CodeBlock>
      </div>
    </main>
  );
}
