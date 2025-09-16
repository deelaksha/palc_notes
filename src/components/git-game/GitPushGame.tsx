
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, HardDrive, Upload, Plus } from 'lucide-react';
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

export function GitPushGame() {
    const { toast } = useToast();
    const initialCommits = [{ id: 'c1a2b3c', message: 'Initial commit' }];

    const [remoteCommits, setRemoteCommits] = useState(initialCommits);
    const [localCommits, setLocalCommits] = useState(initialCommits);
    const [isPushing, setIsPushing] = useState(false);
    const [commitCounter, setCommitCounter] = useState(1);

    const handleAddCommit = () => {
        const newCommit = { id: `d${commitCounter}e${commitCounter+1}f`, message: `Commit #${commitCounter}` };
        setLocalCommits(prev => [...prev, newCommit]);
        setCommitCounter(prev => prev + 1);
    };

    const handlePush = async () => {
        const newCommits = localCommits.filter(lc => !remoteCommits.some(rc => rc.id === lc.id));
        if (newCommits.length === 0) return;

        setIsPushing(true);
        toast({ title: 'Pushing to origin...' });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setRemoteCommits(localCommits);
        
        toast({ title: 'Push successful!', description: `${newCommits.length} commit(s) pushed.` });
        setIsPushing(false);
    };

    const handleReset = () => {
        setLocalCommits(initialCommits);
        setRemoteCommits(initialCommits);
        setCommitCounter(1);
        setIsPushing(false);
    };

    const isSynced = localCommits.length === remoteCommits.length;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full max-w-6xl mx-auto">
            {/* Local Repository */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <HardDrive className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Local Machine</h2>
                </div>
                 <Button onClick={handleAddCommit} size="sm" className="mb-4 w-full" disabled={isPushing}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Local Commit
                </Button>
                <div className="space-y-2 min-h-[150px]">
                     <AnimatePresence>
                        {localCommits.map((c, i) => <Commit key={c.id} commit={c} isNew={i >= initialCommits.length} />)}
                    </AnimatePresence>
                </div>
            </div>

            {/* Remote Repository */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <Server className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Remote (origin)</h2>
                </div>
                <div className="space-y-2 min-h-[150px]">
                     {isPushing && <p className="animate-pulse">Pushing...</p>}
                     <AnimatePresence>
                        {!isPushing && remoteCommits.map(c => <Commit key={c.id} commit={c} isNew={true} />)}
                    </AnimatePresence>
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-col items-center justify-center gap-4">
                 <Button onClick={handlePush} disabled={isPushing || isSynced} className="bg-neon-green text-black hover:bg-white w-48">
                    <Upload className="mr-2" /> git push
                </Button>
                 {isSynced && <p className="text-neon-green">Your branch is up-to-date with origin.</p>}
                <Button onClick={handleReset} variant="outline" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white">
                    Reset
                </Button>
            </div>
        </div>
    );
}
