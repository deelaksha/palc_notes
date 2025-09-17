
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderOpen } from 'lucide-react';
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
                 <AnimatePresence>
                    {node.children.map((child: any) => (
                        <FolderTree key={child.path} node={child} currentPath={currentPath} onNavigate={onNavigate} />
                    ))}
                 </AnimatePresence>
            )}
        </motion.div>
    );
};

export function CdGame() {
    const [currentPath, setCurrentPath] = useState('~');

    const handleNavigate = (path: string) => {
        setCurrentPath(path);
    };
    
    const handleGoUp = () => {
        if (currentPath === '~') return;
        const newPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        setCurrentPath(newPath || '~');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* File System */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <h2 className="text-xl font-bold text-neon-blue mb-4">File System</h2>
                <div className="font-mono">
                    <FolderTree node={fileSystem} currentPath={currentPath} onNavigate={handleNavigate} />
                </div>
            </div>
            
            {/* Controls */}
             <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink mb-4">Navigation</h2>
                 <p className="text-xs text-gray-400">Your current directory is:</p>
                <div className="bg-dark-primary p-3 rounded-md text-neon-green font-bold text-lg text-center break-words">
                    {currentPath}
                </div>
                <p className="text-xs text-gray-400 pt-4">Click a folder to `cd` into it, or use the buttons below.</p>
                <Button onClick={handleGoUp} className="w-full">cd ..</Button>
                <Button onClick={() => handleNavigate('~')} variant="outline" className="w-full">cd ~ (Go Home)</Button>
            </div>
        </div>
    );
}
