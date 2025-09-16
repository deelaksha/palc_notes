
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, HardDrive, GitMerge, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Commit = ({ commit, isNew }: { commit: any, isNew?: boolean }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className={`flex items-center gap-2 p-2 rounded-md ${isNew ? 'bg-green-500/20' : 'bg-white/5'}`}
    >
        <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
        <span className="font-mono text-xs">{commit.id.slice(0,7)}</span>
        <span className="text-gray-300 text-xs truncate">{commit.message}</span>
    </motion.div>
);

export function GitPullGame() {
    const { toast } = useToast();
    const initialRemoteCommits = [
        { id: 'c1a2b3c', message: 'Initial commit' },
        { id: 'd4e5f6g', message: 'Add feature X' },
    ];
    const initialLocalCommits = [
        { id: 'c1a2b3c', message: 'Initial commit' },
    ];
    
    const [remoteCommits, setRemoteCommits] = useState(initialRemoteCommits);
    const [localCommits, setLocalCommits] = useState(initialLocalCommits);
    const [isPulling, setIsPulling] = useState(false);

    const handlePull = async () => {
        setIsPulling(true);
        toast({ title: 'Pulling from origin...' });

        const newCommits = remoteCommits.filter(rc => !localCommits.some(lc => lc.id === rc.id));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({ title: 'Fetching...', description: `Found ${newCommits.length} new commit(s).` });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({ title: 'Merging...', description: `Merging origin/main into main.` });

        setLocalCommits(prev => [...prev, ...newCommits]);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        toast({ title: 'Pull complete!', description: `Local branch is up-to-date.` });
        setIsPulling(false);
    };

    const handleReset = () => {
        setLocalCommits(initialLocalCommits);
        setRemoteCommits(initialRemoteCommits);
        setIsPulling(false);
    };
    
    const isSynced = localCommits.length === remoteCommits.length;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full max-w-6xl mx-auto">
            {/* Remote Repository */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <Server className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Remote (origin)</h2>
                </div>
                <div className="space-y-2">
                    <AnimatePresence>
                        {remoteCommits.map(c => <Commit key={c.id} commit={c} />)}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Local Repository */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <HardDrive className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Local Machine (main)</h2>
                </div>
                <div className="space-y-2 min-h-[100px]">
                    <AnimatePresence>
                        {localCommits.map(c => <Commit key={c.id} commit={c} isNew={initialLocalCommits.every(ic => ic.id !== c.id)} />)}
                    </AnimatePresence>
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col items-center justify-center gap-4">
                 <Button onClick={handlePull} disabled={isPulling || isSynced} className="bg-neon-green text-black hover:bg-white w-48">
                    <Download className="mr-2" /> git pull
                </Button>
                {isSynced && <p className="text-neon-green">Your local branch is up-to-date!</p>}
                <Button onClick={handleReset} variant="outline" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white">
                    Reset
                </Button>
            </div>
        </div>
    );
}
