

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { commandsData } from '@/lib/linux-commands';
import { LsGame } from '@/components/linux-game/LsGame';
import { CdGame } from '@/components/linux-game/CdGame';
import { MkdirGame } from '@/components/linux-game/MkdirGame';
import { PwdGame } from '@/components/linux-game/PwdGame';
import { RmdirGame } from '@/components/linux-game/RmdirGame';
import { TouchGame } from '@/components/linux-game/TouchGame';
import { CpGame } from '@/components/linux-game/CpGame';
import { MvGame } from '@/components/linux-game/MvGame';
import { RmGame } from '@/components/linux-game/RmGame';
import { FindGame } from '@/components/linux-game/FindGame';
import { GrepGame } from '@/components/linux-game/GrepGame';
import { HeadGame } from '@/components/linux-game/HeadGame';
import { TailGame } from '@/components/linux-game/TailGame';
import { WcGame } from '@/components/linux-game/WcGame';
import { CatGame } from '@/components/linux-game/CatGame';
import { LessGame } from '@/components/linux-game/LessGame';
import { ChmodGame } from '@/components/linux-game/ChmodGame';
import { ChownGame } from '@/components/linux-game/ChownGame';
import { UmaskGame } from '@/components/linux-game/UmaskGame';
import { PsGame } from '@/components/linux-game/PsGame';
import { TopGame } from '@/components/linux-game/TopGame';
import { KillGame } from '@/components/linux-game/KillGame';
import { UptimeGame } from '@/components/linux-game/UptimeGame';
import { DfGame } from '@/components/linux-game/DfGame';
import { DuGame } from '@/components/linux-game/DuGame';
import { FreeGame } from '@/components/linux-game/FreeGame';
import { PingGame } from '@/components/linux-game/PingGame';
import { IpAddrGame } from '@/components/linux-game/IpAddrGame';
import { NetstatGame } from '@/components/linux-game/NetstatGame';
import { ScpGame } from '@/components/linux-game/ScpGame';
import { SshGame } from '@/components/linux-game/SshGame';
import { WgetGame } from '@/components/linux-game/WgetGame';
import { CurlGame } from '@/components/linux-game/CurlGame';
import { TarGame } from '@/components/linux-game/TarGame';
import { GzipGame } from '@/components/linux-game/GzipGame';
import { GunzipGame } from '@/components/linux-game/GunzipGame';
import { ZipGame } from '@/components/linux-game/ZipGame';
import { UnzipGame } from '@/components/linux-game/UnzipGame';

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
        case 'rmdir':
            return <RmdirGame />;
        case 'touch':
            return <TouchGame />;
        case 'cp':
            return <CpGame />;
        case 'mv':
            return <MvGame />;
        case 'rm':
            return <RmGame />;
        case 'find':
            return <FindGame />;
        case 'grep':
            return <GrepGame />;
        case 'head':
            return <HeadGame />;
        case 'tail':
            return <TailGame />;
        case 'wc':
            return <WcGame />;
        case 'cat':
            return <CatGame />;
        case 'less':
            return <LessGame />;
        case 'chmod':
            return <ChmodGame />;
        case 'chown':
            return <ChownGame />;
        case 'umask':
            return <UmaskGame />;
        case 'ps':
            return <PsGame />;
        case 'top':
            return <TopGame />;
        case 'kill':
            return <KillGame />;
        case 'uptime':
            return <UptimeGame />;
        case 'df':
            return <DfGame />;
        case 'du':
            return <DuGame />;
        case 'free':
            return <FreeGame />;
        case 'ping':
            return <PingGame />;
        case 'ip addr':
            return <IpAddrGame />;
        case 'netstat':
            return <NetstatGame />;
        case 'scp':
            return <ScpGame />;
        case 'ssh':
            return <SshGame />;
        case 'wget':
            return <WgetGame />;
        case 'curl':
            return <CurlGame />;
        case 'tar':
            return <TarGame />;
        case 'gzip':
            return <GzipGame />;
        case 'gunzip':
            return <GunzipGame />;
        case 'zip':
            return <ZipGame />;
        case 'unzip':
            return <UnzipGame />;
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
