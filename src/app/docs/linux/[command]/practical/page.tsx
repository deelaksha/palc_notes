
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { commandsData } from '@/lib/linux-commands';
import { LsGame } from '@/components/linux-game/LsGame';
import { CdGame } from '@/components/linux-game/CdGame';
import { MkdirGame } from '@/components/linux-game/MkdirGame';
import { PwdGame } from '@/components/linux-game/PwdGame';

export function generateStaticParams() {
  return commandsData.map((command) => ({
    command: command.name,
  }));
}

function renderGameForCommand(commandName: string | undefined) {
    switch (commandName) {
        case 'ls':
            return <LsGame />;
        case 'cd':
            return <CdGame />;
        case 'mkdir':
            return <MkdirGame />;
        case 'pwd':
            return <PwdGame />;
        default:
            return (
                <div className="text-center text-white glass-effect p-12 rounded-2xl">
                    <Construction className="mx-auto h-16 w-16 mb-4 text-amber-400" />
                    <h2 className="text-3xl font-bold mb-2">Practical Coming Soon!</h2>
                    <p className="text-gray-300">An interactive exercise for <code className="font-bold text-neon-blue">{commandName || 'this command'}</code> is under construction.</p>
                </div>
            );
    }
}

export default function CommandPracticalPage({
  params,
}: {
  params: { command: string };
}) {
    const command = commandsData.find((cmd) => cmd.name === params.command);

  return (
    <div className="flex flex-col min-h-screen font-mono bg-gradient-to-br from-dark-primary via-dark-secondary to-blue-900 text-white overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 animated-bg animate-float -z-10"></div>
        
        <header className="p-4 md:p-8 z-20">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800 hover:text-white">
                <Link href={`/docs/linux/${params.command}`}>
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
                {renderGameForCommand(command?.name)}
            </div>
        </main>
    </div>
  );
}
