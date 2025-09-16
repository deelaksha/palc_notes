
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, HardDrive, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Commit = ({ commit, isNew }: { commit: any, isNew?: boolean }) => (
    <div className={`flex items-center gap-2 p-2 rounded-md ${isNew ? 'bg-green-500/20' : 'bg-white/5'}`}>
        <div className="w-2 h-2 rounded-full bg-neon-blue"></div>
        <span className="font-mono text-xs">{commit.id.slice(0,7)}</span>
        <span className="text-gray-300 text-xs truncate">{commit.message}</span>
    </div>
);

export function GitFetchGame() {
    const { toast } = useToast();
    const [remoteCommits, setRemoteCommits] = useState([
        { id: 'c1a2b3c', message: 'Initial commit' },
        { id: 'd4e5f6g', message: 'Add feature X' },
    ]);
     const [localCommits, setLocalCommits] = useState([
        { id: 'c1a2b3c', message: 'Initial commit' },
    ]);
    const [fetchedCommits, setFetchedCommits] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    const handleFetch = async () => {
        setIsFetching(true);
        toast({ title: 'Fetching from origin...' });

        const newCommits = remoteCommits.filter(rc => !localCommits.some(lc => lc.id === rc.id));
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        setFetchedCommits(newCommits);
        toast({ title: 'Fetch complete!', description: `Fetched ${newCommits.length} new commit(s). They are in origin/main.` });
        setIsFetching(false);
    };

    const handleReset = () => {
        setLocalCommits([{ id: 'c1a2b3c', message: 'Initial commit' }]);
        setFetchedCommits([]);
        setRemoteCommits([
            { id: 'c1a2b3c', message: 'Initial commit' },
            { id: 'd4e5f6g', message: 'Add feature X' },
        ]);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full max-w-6xl mx-auto">
            {/* Remote Repository */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <Server className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Remote (origin)</h2>
                </div>
                <div className="space-y-2">
                    {remoteCommits.map(c => <Commit key={c.id} commit={c} />)}
                </div>
            </div>
            
            {/* Local Repository */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <HardDrive className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Local Machine</h2>
                </div>
                
                <h3 className="text-sm font-bold mb-2">main branch:</h3>
                <div className="space-y-2">
                    {localCommits.map(c => <Commit key={c.id} commit={c} />)}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                    <h3 className="text-sm font-bold mb-2 text-amber-400">origin/main (remote-tracking):</h3>
                    <div className="space-y-2 min-h-[50px]">
                        {isFetching && <div className="text-center text-gray-400 animate-pulse">Fetching...</div>}
                        <AnimatePresence>
                        {fetchedCommits.map(c => (
                             <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                <Commit commit={c} isNew={true} />
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 flex justify-center gap-4">
                <Button onClick={handleFetch} disabled={isFetching || fetchedCommits.length > 0} className="bg-neon-green text-black hover:bg-white">
                    <Download className="mr-2" /> git fetch
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white">
                    Reset
                </Button>
            </div>
        </div>
    );
}
