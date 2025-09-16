import { GitSyncGame } from '@/components/git-game/GitSyncGame';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { gitCommandsData } from '@/lib/git-commands';

export function generateStaticParams() {
  return gitCommandsData.map((command) => ({
    command: command.name.replace(/\s+/g, '-'),
  }));
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
        <main className="flex-1 flex items-center justify-center -mt-16">
            <GitSyncGame commandName={command?.name || 'Git'} />
        </main>
    </div>
  );
}
