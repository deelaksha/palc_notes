
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';

export default function NsCreatePracticalPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/docs/notes/frr-exercises/exercise1/ns-create-sh">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to ns-create.sh
          </Link>
        </Button>
        <div className="text-center text-white glass-effect p-12 rounded-2xl bg-card">
            <Construction className="mx-auto h-16 w-16 mb-4 text-amber-400" />
            <h2 className="text-3xl font-bold mb-2">Practical Coming Soon!</h2>
            <p className="text-muted-foreground">An interactive exercise for this script is under construction.</p>
        </div>
      </div>
    </main>
  );
}
