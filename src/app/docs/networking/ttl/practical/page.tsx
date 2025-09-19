
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TtlGame } from '@/components/networking/TtlGame';
import { networkingConceptsData } from '@/lib/networking-concepts';

export default function ConceptPracticalPage() {
    const concept = networkingConceptsData.find((cmd) => cmd.slug === 'ttl');

  return (
    <div className="flex flex-col min-h-screen font-mono bg-gradient-to-br from-dark-primary via-dark-secondary to-blue-900 text-white overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 animated-bg animate-float -z-10"></div>
        
        <header className="p-4 md:p-8 z-20">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800 hover:text-white">
                <Link href={`/docs/networking/ttl`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Concept Hub
                </Link>
            </Button>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 drop-shadow-2xl">
                    Practical: {concept?.name}
                </h1>
                <p className="text-lg text-gray-300 font-light max-w-3xl mx-auto">
                    {concept?.description}
                </p>
            </div>
            <div className="w-full max-w-4xl">
                <TtlGame />
            </div>
        </main>
    </div>
  );
}
