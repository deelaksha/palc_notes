
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { gitCommandsData } from '@/lib/git-commands';
import { GitAddGame } from '@/components/git-game/GitAddGame';
import { GitCommitGame } from '@/components/git-game/GitCommitGame';
import { GitBranchGame } from '@/components/git-game/GitBranchGame';
import { GitConfigGame } from '@/components/git-game/GitConfigGame';
import { GitInitGame } from '@/components/git-game/GitInitGame';
import { GitCloneGame } from '@/components/git-game/GitCloneGame';
import { GitStatusGame } from '@/components/git-game/GitStatusGame';
import { GitMergeGame } from '@/components/git-game/GitMergeGame';

export function generateStaticParams() {
  return gitCommandsData.map((command) => ({
    command: command.name.replace(/\s+/g, '-'),
  }));
}

function renderGameForCommand(commandName: string | undefined) {
    switch (commandName) {
        case 'git add':
            return <GitAddGame />;
        case 'git commit':
            return <GitCommitGame />;
        case 'git branch':
            return <GitBranchGame />;
        case 'git config':
            return <GitConfigGame />;
        case 'git init':
            return <GitInitGame />;
        case 'git clone':
            return <GitCloneGame />;
        case 'git status':
            return <GitStatusGame />;
        case 'git merge':
            return <GitMergeGame />;
        default:
            return (
                <div className="text-center text-white glass-effect p-12 rounded-2xl">
                    <Construction className="mx-auto h-16 w-16 mb-4 text-amber-400" />
                    <h2 className="text-3xl font-bold mb-2">Practical Coming Soon!</h2>
                    <p className="text-gray-300">An interactive exercise for <code className="font-bold text-neon-blue">git {commandName || 'this command'}</code> is under construction.</p>
                </div>
            );
    }
}

export default function CommandPracticalPage({
  params,
}: {
  params: { command: string };
}) {
    const command = gitCommandsData.find((cmd) => cmd.name.replace(/\s+/g, '-') === params.command);

  return (
    <div className="flex flex-col min-h-screen font-mono bg-gradient-to-br from-dark-primary via-dark-secondary to-blue-900 text-white overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 animated-bg animate-float -z-10"></div>
        
        <header className="p-4 md:p-8 z-20">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800 hover:text-white">
                <Link href={`/docs/github/${params.command}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Command Hub
                </Link>
            </Button>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 drop-shadow-2xl">
                    Practical: git {command?.name}
                </h1>
                <p className="text-lg text-gray-300 font-light max-w-3xl mx-auto">
                    {command?.description}
                </p>
            </div>
            <div className="w-full max-w-7xl">
                {renderGameForCommand(command?.name)}
            </div>
        </main>
    </div>
  );
}
