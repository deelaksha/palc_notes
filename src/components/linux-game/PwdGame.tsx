
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, FolderOpen, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fileSystem = {
    name: '~',
    type: 'folder',
    path: '~',
    children: [
        { name: 'Documents', type: 'folder', path: '~/Documents', children: [
            { name: 'Work', type: 'folder', path: '~/Documents/Work', children: [] },
            { name: 'Personal', type: 'folder', path: '~/Documents/Personal', children: [] },
        ]},
        { name: 'Downloads', type: 'folder', path: '~/Downloads', children: [] },
        { name: 'Projects', type: 'folder', path: '~/Projects', children: [
             { name: 'website', type: 'folder', path: '~/Projects/website', children: [] },
        ]},
    ]
};

const FolderTree = ({ node, currentPath, onNavigate }: { node: any; currentPath: string; onNavigate: (path: string) => void }) => {
    const isCurrent = node.path === currentPath;
    
    return (
        <motion.div
            layout
            className="pl-4"
        >
            <button onClick={() => onNavigate(node.path)} className="flex items-center gap-2 p-1 rounded-md hover:bg-white/10 w-full text-left">
                {isCurrent ? <FolderOpen className="w-5 h-5 text-neon-green" /> : <Folder className="w-5 h-5 text-neon-blue" />}
                <span className={`${isCurrent ? 'font-bold text-neon-green' : ''}`}>{node.name}</span>
            </button>
            {node.children && (
                <div>
                    {node.children.map((child: any) => (
                        <FolderTree key={child.path} node={child} currentPath={currentPath} onNavigate={onNavigate} />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export function PwdGame() {
    const [currentPath, setCurrentPath] = useState('~');
    const [pwdOutput, setPwdOutput] = useState('');

    const handleNavigate = (path: string) => {
        setCurrentPath(path);
        // Clear pwd output when directory changes
        setPwdOutput(''); 
    };

    const runPwd = () => {
        setPwdOutput(currentPath);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* File System */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <h2 className="text-xl font-bold text-neon-blue mb-4">File System</h2>
                <p className="text-xs text-gray-400 mb-4">Click a folder to change your directory.</p>
                <div className="font-mono">
                    <FolderTree node={fileSystem} currentPath={currentPath} onNavigate={handleNavigate} />
                </div>
            </div>
            
            {/* Terminal Output */}
             <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4 flex flex-col">
                <div className="flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-neon-pink" />
                    <h2 className="text-xl font-bold">Terminal</h2>
                </div>
                <div className="flex-grow bg-dark-primary p-4 rounded-lg font-mono text-sm space-y-2">
                    <div className="flex gap-2">
                        <span className="text-gray-400">{currentPath} $</span>
                        <Button onClick={runPwd} variant="ghost" size="sm" className="h-6 p-1 text-white">pwd</Button>
                    </div>
                    {pwdOutput && (
                        <motion.p 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}}
                            className="text-neon-green font-bold text-lg break-words"
                        >
                            {pwdOutput}
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
}
