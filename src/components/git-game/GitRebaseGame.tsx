
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Commit = ({ commit, isHead, isGhost }: { commit: any; isHead?: boolean; isGhost?: boolean }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isGhost ? 0.3 : 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${isHead ? 'border-neon-green' : 'border-white/30'} ${isGhost ? 'border-dashed' : 'border-solid'} bg-dark-secondary`}
        title={commit.id}
    >
        <GitCommit className="w-5 h-5 text-white/70" />
    </motion.div>
);

const BranchLine = ({ commits, name, isActive, isRebasing }: { commits: any[], name: string, isActive: boolean, isRebasing?: boolean }) => {
    return (
        <div className={`mb-8 transition-opacity duration-500 ${isRebasing ? 'opacity-30' : 'opacity-100'}`}>
            <div className="flex items-center gap-4 mb-2">
                <GitBranch className={`w-6 h-6 ${isActive ? 'text-neon-green' : 'text-white/50'}`} />
                <h3 className={`text-lg font-bold ${isActive ? 'text-neon-green' : 'text-white/50'}`}>{name}</h3>
            </div>
            <div className="flex items-center gap-2">
                {commits.map((c, i) => (
                    <React.Fragment key={c.id}>
                        {i > 0 && <div className="w-8 h-0.5 bg-white/30" />}
                        <Commit commit={c} isHead={isActive && i === commits.length - 1} isGhost={c.isGhost} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};


export function GitRebaseGame() {
    const { toast } = useToast();
    const initialMainCommits = [{ id: 'C1' }, { id: 'C2' }];
    const initialFeatureCommits = [{ id: 'C1' }, { id: 'C3' }, { id: 'C4' }];

    const [mainCommits, setMainCommits] = useState(initialMainCommits);
    const [featureCommits, setFeatureCommits] = useState(initialFeatureCommits);
    const [isRebasing, setIsRebasing] = useState(false);
    const [rebaseStep, setRebaseStep] = useState(0);

    const handleRebase = async () => {
        if (isRebasing) return;
        setIsRebasing(true);
        toast({ title: "Rebasing feature onto main..." });

        // Step 1: "Rewind" feature branch
        setRebaseStep(1);
        const originalFeatureOnlyCommits = featureCommits.slice(mainCommits.length);
        const ghostCommits = originalFeatureOnlyCommits.map(c => ({...c, isGhost: true}));
        setFeatureCommits([...mainCommits, ...ghostCommits]);
        await new Promise(res => setTimeout(res, 1500));
        
        // Step 2: Move feature branch pointer to main's HEAD
        setRebaseStep(2);
        setFeatureCommits([...mainCommits]);
        await new Promise(res => setTimeout(res, 1500));

        // Step 3: Replay commits one by one
        let currentCommits = [...mainCommits];
        for (let i = 0; i < originalFeatureOnlyCommits.length; i++) {
            setRebaseStep(3 + i);
            const commitToReplay = originalFeatureOnlyCommits[i];
            const rebasedCommit = { ...commitToReplay, id: `${commitToReplay.id}'`, isGhost: false };
            currentCommits.push(rebasedCommit);
            setFeatureCommits([...currentCommits]);
            await new Promise(res => setTimeout(res, 1500));
        }

        toast({ title: "Rebase complete!", description: "History is now linear." });
        setIsRebasing(false);
        setRebaseStep(0);
    };

    const handleReset = () => {
        if(isRebasing) return;
        setMainCommits(initialMainCommits);
        setFeatureCommits(initialFeatureCommits);
        setIsRebasing(false);
        setRebaseStep(0);
    };
    
    const getRebaseStatusText = () => {
        switch(rebaseStep) {
            case 1: return "1. Rewinding feature branch...";
            case 2: return "2. Moving feature branch to main's HEAD...";
            case 3: return "3. Replaying commit C3 as C3'";
            case 4: return "4. Replaying commit C4 as C4'";
            default: return "Ready to rebase.";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 border-2 border-neon-blue/50 w-full">
                <BranchLine name="main" commits={mainCommits} isActive={false} isRebasing={isRebasing && rebaseStep > 1} />
                <BranchLine name="feature" commits={featureCommits} isActive={true} isRebasing={isRebasing && rebaseStep <=1} />
                <div className="text-center mt-4 text-amber-400 h-6">{getRebaseStatusText()}</div>
            </div>
            <div className="flex gap-4">
                <Button
                    onClick={handleRebase}
                    disabled={isRebasing || JSON.stringify(mainCommits) === JSON.stringify(featureCommits.slice(0, mainCommits.length))}
                    className="bg-neon-green text-black hover:bg-white w-48"
                >
                    <GitPullRequest className="mr-2 h-4 w-4" />
                    git rebase main
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
