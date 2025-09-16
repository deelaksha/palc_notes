
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Commit = ({ commit, isHead, isCherryPicked }: { commit: any; isHead?: boolean; isCherryPicked?: boolean }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${isHead ? 'border-neon-green' : 'border-white/30'} ${isCherryPicked ? 'bg-purple-500/30' : 'bg-dark-secondary'}`}
        title={commit.id}
    >
        <GitCommit className="w-5 h-5 text-white/70" />
    </motion.div>
);

const BranchLine = ({ commits, name, isActive, isRebasing }: { commits: any[], name: string, isActive: boolean, isRebasing?: boolean }) => {
    return (
        <div className={`mb-8`}>
            <div className="flex items-center gap-4 mb-2">
                <GitBranch className={`w-6 h-6 ${isActive ? 'text-neon-green' : 'text-white/50'}`} />
                <h3 className={`text-lg font-bold ${isActive ? 'text-neon-green' : 'text-white/50'}`}>{name}</h3>
            </div>
            <div className="flex items-center gap-2">
                <AnimatePresence>
                    {commits.map((c, i) => (
                        <React.Fragment key={c.id}>
                            {i > 0 && <div className="w-8 h-0.5 bg-white/30" />}
                            <Commit commit={c} isHead={isActive && i === commits.length - 1} isCherryPicked={c.isCherryPicked} />
                        </React.Fragment>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};


export function GitCherryPickGame() {
    const { toast } = useToast();
    const initialMainCommits = [{ id: 'C1' }, { id: 'C2' }];
    const initialFeatureCommits = [{ id: 'C1' }, { id: 'F1', msg: 'Add new login button' }, { id: 'F2', msg: 'Fix critical security bug' }];

    const [mainCommits, setMainCommits] = useState(initialMainCommits);
    const [featureCommits, setFeatureCommits] = useState(initialFeatureCommits);
    const [commitToPick, setCommitToPick] = useState<string | null>(null);

    const handleCherryPick = () => {
        if (!commitToPick) {
            toast({ title: 'Select a commit', description: 'You need to choose a commit to cherry-pick.', variant: 'destructive' });
            return;
        }

        const commit = featureCommits.find(c => c.id === commitToPick);
        if (!commit) return;

        if (mainCommits.some(c => c.id === `${commitToPick}'`)) {
            toast({ title: 'Already Picked', description: 'This commit has already been cherry-picked.', variant: 'destructive'});
            return;
        }

        const newCommit = {
            ...commit,
            id: `${commit.id}'`, // Show it's a copy
            isCherryPicked: true
        };

        setMainCommits(prev => [...prev, newCommit]);
        toast({ title: 'Cherry-pick Successful!', description: `Copied commit ${commitToPick} to main branch.` });
    };
    
    const handleReset = () => {
        setMainCommits(initialMainCommits);
        setFeatureCommits(initialFeatureCommits);
        setCommitToPick(null);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 border-2 border-neon-blue/50 w-full">
                <BranchLine name="main" commits={mainCommits} isActive={true} />
                <BranchLine name="feature" commits={featureCommits} isActive={false} />
            </div>
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 w-full md:w-1/2 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-neon-pink">Cherry-Pick Controls</h2>
                <p className="text-xs text-gray-400">Pick a single commit from the 'feature' branch and apply it to 'main'.</p>
                <div>
                     <Select onValueChange={setCommitToPick} value={commitToPick || undefined}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a commit from feature..." />
                        </SelectTrigger>
                        <SelectContent>
                            {featureCommits.filter(c => !initialMainCommits.some(mc => mc.id === c.id)).map(commit => (
                                <SelectItem key={commit.id} value={commit.id}>
                                    {commit.id}: {commit.msg}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleCherryPick} disabled={!commitToPick}>
                    git cherry-pick {commitToPick}
                </Button>
                <Button onClick={handleReset} variant="outline">Reset</Button>
            </div>
        </div>
    );
}
