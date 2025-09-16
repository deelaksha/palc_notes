
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, GitBranch, Inbox, CheckCircle, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialStagedFiles = [
  { id: 1, name: 'index.html' },
  { id: 2, name: 'styles.css' },
];

const CommitItem = ({ commit }: { commit: any }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-start gap-3 p-3 rounded-lg glass-effect border border-white/10"
    >
        <div className="p-2 bg-accent-purple/50 rounded-md">
            <GitBranch className="h-5 w-5 text-neon-blue" />
        </div>
        <div>
            <p className="font-mono text-xs text-neon-blue">{commit.hash}</p>
            <p className="font-semibold text-sm">{commit.message}</p>
            <div className="flex gap-2 mt-2">
                {commit.files.map((file: any) => (
                    <span key={file.id} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {file.name}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);


export function GitCommitGame() {
    const [stagedFiles, setStagedFiles] = useState(initialStagedFiles);
    const [commitMessage, setCommitMessage] = useState('');
    const [commits, setCommits] = useState<any[]>([]);

    const handleCommit = () => {
        if (stagedFiles.length === 0 || !commitMessage.trim()) return;

        const newCommit = {
            hash: `c${Math.random().toString(16).slice(2, 9)}`,
            message: commitMessage,
            files: [...stagedFiles],
        };

        setCommits(prev => [newCommit, ...prev]);
        setStagedFiles([]);
        setCommitMessage('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
            {/* Staging Area */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Staging Area</h2>
                </div>
                <p className="text-xs text-gray-400 mb-4">Files ready to be committed.</p>
                <div className="space-y-3 min-h-[150px]">
                    <AnimatePresence>
                        {stagedFiles.map(file => (
                            <motion.div
                                key={file.id}
                                layout
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10"
                            >
                                <File className="h-5 w-5 text-neon-green" />
                                <span className="font-mono text-sm">{file.name}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {stagedFiles.length === 0 && <p className="text-center text-gray-500 text-sm py-10">Staging area is empty.</p>}
                </div>
            </div>

            {/* Action */}
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8 lg:py-0">
                <div className="w-full space-y-3">
                     <Input 
                        type="text"
                        placeholder="Your commit message..."
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                        className="bg-black/30 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <Button 
                        onClick={handleCommit} 
                        disabled={stagedFiles.length === 0 || !commitMessage.trim()}
                        className="w-full bg-neon-green text-black hover:bg-white disabled:opacity-50"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        git commit -m "{commitMessage || '...'}"
                    </Button>
                </div>
                <ArrowRight className="h-12 w-12 text-white/50 mt-4" />
            </div>

            {/* Local Repository */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <GitBranch className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Local Repository</h2>
                </div>
                <p className="text-xs text-gray-400 mb-4">Your project's version history.</p>
                <div className="space-y-3 min-h-[200px] max-h-[400px] overflow-y-auto pr-2">
                     <AnimatePresence>
                        {commits.map(commit => (
                          <CommitItem key={commit.hash} commit={commit} />
                        ))}
                    </AnimatePresence>
                    {commits.length === 0 && <p className="text-center text-gray-500 text-sm py-16">No commits yet.</p>}
                </div>
            </div>
        </div>
    );
}
