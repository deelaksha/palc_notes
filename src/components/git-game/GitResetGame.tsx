
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Inbox, CheckCircle, AlertTriangle, RefreshCw, Layers, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const initialState = {
    commits: [{ id: 'C1', msg: 'Initial commit' }, { id: 'C2', msg: 'Add styles' }, { id: 'C3', msg: 'Implement feature' }],
    staged: [{ id: 'F4', name: 'new-feature.js' }],
    working: [{ id: 'F5', name: 'index.html (modified)' }]
};

const Commit = ({ commit }: { commit: any }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
    >
        <GitCommit className="w-5 h-5 text-neon-blue" />
        <span className="font-mono text-xs text-amber-400">{commit.id}</span>
        <span className="text-sm text-gray-300">{commit.msg}</span>
    </motion.div>
);

const FileItem = ({ file, area }: { file: any, area: 'staged' | 'working' }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
        className={`flex items-center gap-2 p-2 rounded-lg ${area === 'staged' ? 'bg-green-500/10' : 'bg-amber-500/10'}`}
    >
        <span className="font-mono text-xs">{file.name}</span>
    </motion.div>
);

export function GitResetGame() {
    const { toast } = useToast();
    const [gameState, setGameState] = useState(initialState);
    const [headPosition, setHeadPosition] = useState(initialState.commits.length -1);

    const handleReset = (mode: 'soft' | 'mixed' | 'hard') => {
        if (headPosition <= 0) {
            toast({ title: 'Cannot reset further', description: 'Already at the initial commit.', variant: 'destructive'});
            return;
        }

        const lastCommit = gameState.commits[headPosition];
        const changesFromCommit = [{ id: `F${lastCommit.id}`, name: `${lastCommit.msg.split(' ')[1]}.js` }];

        let newStaged = [...gameState.staged];
        let newWorking = [...gameState.working];
        let newCommits = gameState.commits.slice(0, headPosition);
        
        toast({title: `Running git reset --${mode} HEAD~1`});

        switch (mode) {
            case 'soft':
                newStaged = [...changesFromCommit, ...newStaged];
                break;
            case 'mixed':
                newWorking = [...changesFromCommit, ...newWorking];
                break;
            case 'hard':
                // All changes from the commit are discarded
                break;
        }

        setGameState({
            commits: newCommits,
            staged: newStaged,
            working: newWorking
        });
        setHeadPosition(headPosition - 1);
    };
    
    const resetGame = () => {
        setGameState(JSON.parse(JSON.stringify(initialState)));
        setHeadPosition(initialState.commits.length - 1);
        toast({ title: 'Game Reset', description: 'The repository state has been restored.'});
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink mb-4">Reset Controls</h2>
                <p className="text-xs text-gray-400">Reset moves the HEAD pointer and optionally changes the staging area and working directory.</p>
                <Button onClick={() => handleReset('soft')} className="w-full bg-blue-500 hover:bg-blue-600"><Layers className="mr-2"/> Soft Reset</Button>
                <Button onClick={() => handleReset('mixed')} className="w-full bg-green-500 hover:bg-green-600"><Inbox className="mr-2"/> Mixed Reset (Default)</Button>
                
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full"><AlertTriangle className="mr-2"/> Hard Reset</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            A hard reset is destructive. It will discard the last commit AND all changes in the staging area and working directory from that commit.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleReset('hard')}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                
                <Button onClick={resetGame} variant="outline" className="w-full mt-8"><RefreshCw className="mr-2"/> Reset Game</Button>
            </div>

            {/* Visualization */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 space-y-6">
                <div>
                    <h3 className="text-lg font-bold mb-2">Commit History (HEAD -> {gameState.commits[headPosition]?.id})</h3>
                    <div className="space-y-2 bg-dark-primary p-4 rounded-lg">
                        <AnimatePresence>
                           {gameState.commits.map(c => <Commit key={c.id} commit={c} />)}
                        </AnimatePresence>
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><CheckCircle className="text-neon-green"/> Staging Area</h3>
                    <div className="space-y-2 bg-dark-primary p-4 rounded-lg min-h-[50px]">
                         <AnimatePresence>
                            {gameState.staged.map(f => <FileItem key={f.id} file={f} area="staged" />)}
                        </AnimatePresence>
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Inbox className="text-amber-400"/> Working Directory</h3>
                    <div className="space-y-2 bg-dark-primary p-4 rounded-lg min-h-[50px]">
                        <AnimatePresence>
                           {gameState.working.map(f => <FileItem key={f.id} file={f} area="working" />)}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
