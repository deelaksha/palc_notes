
import { gitCommandsData } from '@/lib/git-commands';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
        <header className="p-4 md:p-8">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800 hover:text-white">
                <Link href={`/docs/github/${params.command}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Command Hub
                </Link>
            </Button>
        </header>
        <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Practical Session</h1>
                <p className="text-muted-foreground">This space is for hands-on practice.</p>
            </div>
        </main>
    </div>
  );
}
