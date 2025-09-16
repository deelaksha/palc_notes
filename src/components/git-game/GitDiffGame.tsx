
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, GitCommit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const originalFile = `function hello() {
  console.log("Hello, World!");
}`;

const modifiedFile = `function hello() {
  // A new comment
  console.log("Hello, Universe!");
  // This function is now more universal.
}`;

const diffLines = [
    { type: 'context', text: ' function hello() {' },
    { type: 'removed', text: '-   console.log("Hello, World!");' },
    { type: 'added', text: '+   // A new comment' },
    { type: 'added', text: '+   console.log("Hello, Universe!");' },
    { type: 'added', text: '+   // This function is now more universal.' },
    { type: 'context', text: ' }' },
];

const FileView = ({ title, content, icon }: { title: string, content: string, icon: React.ReactNode }) => (
    <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 h-full">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono overflow-x-auto">
            <code>{content}</code>
        </pre>
    </div>
);


export function GitDiffGame() {
    const [showDiff, setShowDiff] = useState(false);

    const runDiff = () => {
        setShowDiff(true);
    };
    
    const resetDiff = () => {
        setShowDiff(false);
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <FileView title="Original File (HEAD)" content={originalFile} icon={<GitCommit className="h-6 w-6 text-neon-blue" />} />
                <FileView title="Modified File" content={modifiedFile} icon={<FileText className="h-6 w-6 text-neon-blue" />} />
            </div>

            <div className="flex justify-center gap-4 mb-8">
                 <Button onClick={runDiff} className="bg-neon-green text-black hover:bg-white" disabled={showDiff}>
                    Run git diff
                </Button>
                <Button onClick={resetDiff} variant="outline" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white" disabled={!showDiff}>
                    Reset
                </Button>
            </div>
            
            <AnimatePresence>
            {showDiff && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50 overflow-hidden"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="h-6 w-6 text-neon-green" />
                        <h2 className="text-xl font-bold">Diff Output</h2>
                    </div>
                    <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono overflow-x-auto">
                        <p className="text-gray-400">diff --git a/hello.js b/hello.js</p>
                        <p className="text-gray-400">--- a/hello.js</p>
                        <p className="text-gray-400">+++ b/hello.js</p>
                        {diffLines.map((line, index) => {
                            let colorClass = 'text-white';
                            if (line.type === 'added') colorClass = 'text-green-400';
                            if (line.type === 'removed') colorClass = 'text-red-400';
                            return <p key={index} className={colorClass}>{line.text}</p>;
                        })}
                    </pre>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
}

