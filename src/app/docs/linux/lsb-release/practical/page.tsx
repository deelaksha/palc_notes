
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { commandsData } from '@/lib/linux-commands';
import { LsbReleaseGame } from '@/components/linux-game/LsbReleaseGame';

export default function CommandPracticalPage() {
    const command = commandsData.find((cmd) => cmd.name === 'lsb_release');

  return (
    <div className="flex flex-col min-h-screen font-mono bg-gradient-to-br from-dark-primary via-dark-secondary to-blue-900 text-white overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 animated-bg animate-float -z-10"></div>
        
        <header className="p-4 md:p-8 z-20">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800 hover:text-white">
                <Link href={`/docs/linux/lsb-release`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Command Hub
                </Link>
            </Button>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 drop-shadow-2xl">
                    Practical: {command?.name}
                </h1>
                <p className="text-lg text-gray-300 font-light max-w-3xl mx-auto">
                    {command?.description}
                </p>
            </div>
            <div className="w-full max-w-4xl">
                <LsbReleaseGame />
            </div>
        </main>
    </div>
  );
}
