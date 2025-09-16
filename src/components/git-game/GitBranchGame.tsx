
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, Plus, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Commit = ({ commit, isHead }: { commit: any, isHead: boolean }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${isHead ? 'border-neon-green shadow-lg shadow-neon-green/30' : 'border-white/30'} bg-dark-secondary`}
        title={`Commit: ${commit.id.slice(0, 7)}`}
    >
        <GitCommit className="w-6 h-6 text-white/70" />
        {isHead && <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon-green rounded-full" />}
    </motion.div>
);

const Branch = ({ branch, commits, activeBranch, onSwitch }: { branch: any, commits: any[], activeBranch: string, onSwitch: (name: string) => void }) => {
    const isHeadOfBranch = commits.length > 0 && branch.head === commits[commits.length - 1].id;
    const isCurrentBranch = branch.name === activeBranch;

    return (
        <motion.div layout className="mb-6">
            <div className="flex items-center gap-4 mb-4">
                <Button variant="ghost" onClick={() => onSwitch(branch.name)} className={`flex items-center gap-2 text-xl font-bold ${isCurrentBranch ? 'text-neon-green' : 'text-white/70'}`}>
                    <GitBranch className="w-6 h-6" />
                    {branch.name}
                    {isCurrentBranch && <span className="text-xs px-2 py-1 bg-neon-green/20 rounded-full">HEAD</span>}
                </Button>
            </div>
            <div className="flex items-center gap-2 pl-4">
                {commits.map((commit, index) => (
                    <React.Fragment key={commit.id}>
                        <Commit commit={commit} isHead={isCurrentBranch && index === commits.length - 1} />
                        {index < commits.length - 1 && <div className="w-8 h-0.5 bg-white/30" />}
                    </React.Fragment>
                ))}
            </div>
        </motion.div>
    );
};

export function GitBranchGame() {
    const [branches, setBranches] = useState({
        main: { name: 'main', parent: null, commits: ['c1'] }
    });
    const [commits, setCommits] = useState({
        c1: { id: 'c1', parent: null, message: 'Initial commit' }
    });
    const [activeBranch, setActiveBranch] = useState('main');
    const [newBranchName, setNewBranchName] = useState('');

    const getBranchCommits = (branchName: string) => {
        const branch = branches[branchName];
        if (!branch) return [];
        
        let currentCommits = [];
        let commitId = branch.commits[branch.commits.length - 1];
        
        const commitMap = new Map();
        branch.commits.forEach(id => commitMap.set(id, true));

        while(commitId && commitMap.has(commitId)) {
            const commit = commits[commitId];
            if(commit) {
                currentCommits.unshift(commit);
                commitId = commit.parent;
            } else {
                break;
            }
        }
        
        let parentBranchName = branch.parent;
        if (parentBranchName) {
            const parentBranch = branches[parentBranchName];
            let parentCommitId = parentBranch.commits[parentBranch.commits.length - 1];
            const parentCommits = [];
            while (parentCommitId) {
                const commit = commits[parentCommitId];
                if (commit && !commitMap.has(commit.id)) {
                    parentCommits.unshift(commit);
                    parentCommitId = commit.parent;
                } else {
                    break;
                }
            }
            return [...parentCommits, ...currentCommits];
        }

        return currentCommits;
    };
    
    const handleNewBranch = () => {
        if (!newBranchName || branches[newBranchName] || !/^[a-zA-Z0-9_-]+$/.test(newBranchName)) {
            // Add some user feedback here
            return;
        }
        
        const parentBranch = branches[activeBranch];
        
        setBranches(prev => ({
            ...prev,
            [newBranchName]: {
                name: newBranchName,
                parent: activeBranch,
                commits: [...parentBranch.commits]
            }
        }));
        
        setActiveBranch(newBranchName);
        setNewBranchName('');
    };

    const handleNewCommit = () => {
        const newCommitId = `c${Object.keys(commits).length + 1}`;
        const parentBranch = branches[activeBranch];
        const headCommitId = parentBranch.commits[parentBranch.commits.length - 1];
        
        setCommits(prev => ({
            ...prev,
            [newCommitId]: { id: newCommitId, parent: headCommitId, message: `Commit on ${activeBranch}` }
        }));
        
        setBranches(prev => ({
            ...prev,
            [activeBranch]: {
                ...prev[activeBranch],
                commits: [...prev[activeBranch].commits, newCommitId]
            }
        }));
    };

    const handleSwitchBranch = (branchName: string) => {
        setActiveBranch(branchName);
    };

    return (
        <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Controls */}
                <div className="md:col-span-1 p-4 rounded-lg border border-white/20">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Terminal /> Controls</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-300">Create New Branch</label>
                            <div className="flex gap-2 mt-1">
                                <Input 
                                    type="text"
                                    placeholder="new-feature"
                                    value={newBranchName}
                                    onChange={(e) => setNewBranchName(e.target.value)}
                                    className="bg-dark-primary border-white/20"
                                />
                                <Button onClick={handleNewBranch} size="icon" className="bg-neon-blue text-black hover:bg-white">
                                    <Plus />
                                </Button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-300">On branch: <span className="font-bold text-neon-green">{activeBranch}</span></label>
                            <Button onClick={handleNewCommit} className="w-full mt-1 bg-neon-green text-black hover:bg-white">
                                Make New Commit
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Visualization */}
                <div className="md:col-span-2">
                    <h3 className="text-lg font-bold mb-4">Repository History</h3>
                    <div className="p-4 rounded-lg bg-dark-primary min-h-[300px] overflow-x-auto">
                        {Object.values(branches).map(branch => (
                            <Branch 
                                key={branch.name}
                                branch={branch}
                                commits={getBranchCommits(branch.name)}
                                activeBranch={activeBranch}
                                onSwitch={handleSwitchBranch}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

