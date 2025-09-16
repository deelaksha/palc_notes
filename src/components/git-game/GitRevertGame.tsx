
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, GitBranch, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const initialCommits = [
    { id: 'C1', msg: 'Initial commit' },
    { id: 'C2', msg: 'Add user authentication' },
    { id: 'C3', msg: 'Introduce a bug' },
];

const Commit = ({ commit, isNew }: { commit: any; isNew?: boolean }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-3 p-3 rounded-lg border ${isNew ? 'bg-red-500/20 border-red-500' : 'bg-white/5 border-white/10'}`}
    >
        <GitCommit className={`w-5 h-5 ${isNew ? 'text-red-400' : 'text-neon-blue'}`} />
        <div>
            <p className="font-mono text-xs text-amber-400">{commit.id}</p>
            <p className="text-sm text-gray-200">{commit.msg}</p>
        </div>
    </motion.div>
);

export function GitRevertGame() {
    const { toast } = useToast();
    const [commits, setCommits] = useState(initialCommits);
    const [commitToRevert, setCommitToRevert] = useState<string | null>(null);
    const [commitCounter, setCommitCounter] = useState(4);

    const handleRevert = () => {
        if (!commitToRevert) {
            toast({ title: "Select a commit", description: "You need to choose a commit to revert.", variant: "destructive" });
            return;
        }

        const commitExists = commits.find(c => c.id === commitToRevert);
        if (!commitExists) {
            toast({ title: "Commit not found", variant: "destructive"});
            return;
        }
        
        const alreadyReverted = commits.some(c => c.msg.includes(`Revert "${commitExists.msg}"`));
        if (alreadyReverted) {
            toast({ title: "Already Reverted", description: "This commit has already been reverted.", variant: "destructive"});
            return;
        }

        const newCommit = {
            id: `C${commitCounter}`,
            msg: `Revert "${commitExists.msg}"`,
            isNew: true
        };
        
        setCommits(prev => [...prev, newCommit]);
        setCommitCounter(prev => prev + 1);
        toast({ title: 'Revert Successful!', description: `Created a new commit to undo the changes from ${commitToRevert}.` });
    };

    const resetGame = () => {
        setCommits(initialCommits);
        setCommitCounter(4);
        setCommitToRevert(null);
        toast({title: 'Game Reset'});
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                 <h2 className="text-xl font-bold text-neon-pink mb-4">Revert Controls</h2>
                <p className="text-xs text-gray-400">Revert creates a new commit that undoes the changes of a previous commit.</p>
                <div>
                    <label className="text-sm mb-2 block">Commit to Revert:</label>
                    <Select onValueChange={setCommitToRevert} value={commitToRevert || undefined}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a commit..." />
                        </SelectTrigger>
                        <SelectContent>
                            {commits.filter(c => !c.isNew).map(commit => (
                                <SelectItem key={commit.id} value={commit.id}>
                                    {commit.id}: {commit.msg}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleRevert} disabled={!commitToRevert} className="w-full bg-neon-green text-black hover:bg-white">
                    <RefreshCcw className="mr-2" /> Revert Commit
                </Button>
                 <Button onClick={resetGame} variant="outline" className="w-full mt-8">
                    Reset Game
                </Button>
            </div>
            
             {/* Visualization */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                 <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><GitBranch className="text-neon-blue"/> Commit History</h2>
                 <div className="space-y-3">
                     <AnimatePresence>
                         {commits.map(c => <Commit key={c.id} commit={c} isNew={c.isNew} />)}
                    </AnimatePresence>
                 </div>
            </div>
        </div>
    );
}
