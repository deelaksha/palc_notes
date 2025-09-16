
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge as GitMergeIcon, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Commit = ({ commit, isHead }: { commit: any; isHead?: boolean }) => (
    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${isHead ? 'border-neon-green' : 'border-white/30'} bg-dark-secondary`} title={commit.id}>
        <GitCommit className="w-5 h-5 text-white/70" />
    </div>
);

const BranchLine = ({ commits, name, isMerged, isActive, onCommit, isFeature }: { commits: any[], name: string, isMerged: boolean, isActive: boolean, onCommit: () => void, isFeature?: boolean }) => {
    return (
        <div className={`mb-8 ${isFeature ? 'pl-16' : ''}`}>
            <div className="flex items-center gap-4 mb-2">
                <GitBranch className={`w-6 h-6 ${isActive ? 'text-neon-green' : 'text-white/50'}`} />
                <h3 className={`text-lg font-bold ${isActive ? 'text-neon-green' : 'text-white/50'}`}>{name}</h3>
                {isActive && !isMerged && <Button size="sm" onClick={onCommit} className="bg-neon-blue text-black h-7">New Commit</Button>}
            </div>
            <div className="flex items-center gap-2">
                {commits.map((c, i) => (
                    <React.Fragment key={c.id}>
                        {i > 0 && <div className="w-8 h-0.5 bg-white/30" />}
                        <Commit commit={c} isHead={isActive && i === commits.length - 1} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};


export function GitMergeGame() {
    const { toast } = useToast();
    const [mainCommits, setMainCommits] = useState([{ id: 'C1' }, { id: 'C2' }]);
    const [featureCommits, setFeatureCommits] = useState([{ id: 'C3' }]);
    const [isMerged, setIsMerged] = useState(false);
    const [activeBranch, setActiveBranch] = useState('feature');
    const [commitCounter, setCommitCounter] = useState(4);

    const handleCommit = () => {
        if (isMerged) return;
        const newCommit = { id: `C${commitCounter}` };
        setCommitCounter(prev => prev + 1);

        if (activeBranch === 'main') {
            setMainCommits(prev => [...prev, newCommit]);
        } else {
            setFeatureCommits(prev => [...prev, newCommit]);
        }
    };

    const handleMerge = () => {
        if(isMerged) return;
        
        setActiveBranch('main');
        
        // Simple merge conflict simulation
        const mainHasC3 = mainCommits.some(c => c.id === 'C3');
        if(!mainHasC3 && featureCommits.length > 0) {
            // No conflict
            const mergeCommit = { id: `M${commitCounter}`};
            setCommitCounter(prev => prev +1);
            setMainCommits(prev => [...prev, ...featureCommits, mergeCommit]);
            setIsMerged(true);
            toast({ title: "Merge Successful!", description: "The feature branch was merged into main." });
        } else {
            // This is a simplified view. Real merge conflicts are more complex.
            toast({ title: "Merge Conflict!", description: "Automatic merge failed. This is a simplified demo.", variant: "destructive" });
        }
    };
    
    const handleReset = () => {
        setMainCommits([{ id: 'C1' }, { id: 'C2' }]);
        setFeatureCommits([{ id: 'C3' }]);
        setIsMerged(false);
        setActiveBranch('feature');
        setCommitCounter(4);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 border-2 border-neon-blue/50 w-full">
                <div className="relative">
                    <BranchLine
                        name="main"
                        commits={mainCommits}
                        isMerged={isMerged}
                        isActive={activeBranch === 'main'}
                        onCommit={handleCommit}
                    />
                    {!isMerged && (
                         <BranchLine
                            name="feature"
                            commits={featureCommits}
                            isMerged={isMerged}
                            isActive={activeBranch === 'feature'}
                            onCommit={handleCommit}
                            isFeature
                        />
                    )}
                    {isMerged && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center text-neon-green font-bold p-4 border-2 border-dashed border-neon-green/50 rounded-lg">
                           Feature branch merged into main!
                        </motion.div>
                    )}
                </div>
            </div>
            <div className="flex gap-4">
                <Button onClick={() => setActiveBranch('main')} disabled={activeBranch==='main'} variant="ghost">Switch to Main</Button>
                <Button onClick={() => setActiveBranch('feature')} disabled={isMerged || activeBranch==='feature'} variant="ghost">Switch to Feature</Button>
                <Button
                    onClick={handleMerge}
                    disabled={isMerged || activeBranch !== 'main'}
                    className="bg-neon-green text-black hover:bg-white w-48"
                >
                    <GitMergeIcon className="mr-2 h-4 w-4" />
                    git merge feature
                </Button>
                 <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}
