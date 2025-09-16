
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, GitCommit, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const commitHistory = [
    { hash: 'a8b3c1d', author: 'Alice', date: '3 hours ago', message: '✨ Add user authentication' },
    { hash: 'f4e5d6c', author: 'Bob', date: '5 hours ago', message: '🎨 Refactor UI components' },
    { hash: 'b9c8d7e', author: 'Alice', date: '1 day ago', message: '🐛 Fix critical login bug' },
    { hash: 'e2f1a0b', author: 'Charlie', date: '2 days ago', message: '📝 Update project README' },
    { hash: 'd7c6b5a', author: 'Bob', date: '3 days ago', message: '🚀 Initial project setup' },
];

export function GitLogGame() {
    const [logOutput, setLogOutput] = useState<any[]>([]);
    const [showGraph, setShowGraph] = useState(false);
    const [oneLine, setOneLine] = useState(false);

    const runLog = () => {
        let output = [...commitHistory];
        
        if (oneLine) {
            output = output.map(commit => ({
                ...commit,
                isOneLine: true,
            }));
        }

        setLogOutput(output);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
            {/* Controls */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-pink" />
                    <h2 className="text-xl font-bold">Command Input</h2>
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-gray-300">Customize your `git log` command:</p>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="oneline" checked={oneLine} onCheckedChange={(checked) => setOneLine(Boolean(checked))} />
                        <Label htmlFor="oneline" className="text-white">--oneline</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="graph" checked={showGraph} onCheckedChange={(checked) => setShowGraph(Boolean(checked))} />
                        <Label htmlFor="graph" className="text-white">--graph (visual only)</Label>
                    </div>
                    <Button onClick={runLog} className="w-full bg-neon-green text-black hover:bg-white">
                        Run git log
                    </Button>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <GitCommit className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Commit History</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[400px] text-sm font-mono overflow-y-auto">
                    <AnimatePresence>
                        {logOutput.map((commit, index) => (
                            <motion.div
                                key={commit.hash}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="mb-4 relative"
                            >
                                {showGraph && <div className="absolute left-2 top-5 h-full border-l-2 border-white/20"></div>}
                                {showGraph && <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-neon-blue/50"></div>}
                                
                                {commit.isOneLine ? (
                                    <div className={`flex items-center gap-2 ${showGraph ? 'pl-8' : ''}`}>
                                        <p className="text-amber-400">{commit.hash}</p>
                                        <p className="text-white">{commit.message}</p>
                                    </div>
                                ) : (
                                    <div className={showGraph ? 'pl-8' : ''}>
                                        <p className="text-amber-400">commit {commit.hash}</p>
                                        <p className="text-gray-300">Author: {commit.author}</p>
                                        <p className="text-gray-400 text-xs flex items-center gap-2"><Clock className="h-3 w-3" /> {commit.date}</p>
                                        <p className="text-white mt-2">{commit.message}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                     {logOutput.length === 0 && <p className="text-gray-500">Run `git log` to see the commit history.</p>}
                </div>
            </div>
        </div>
    );
}
