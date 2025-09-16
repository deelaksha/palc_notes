
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardDrive, Server, File, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const remoteFiles = [
    { id: 'f1', name: 'README.md' },
    { id: 'f2', name: 'index.html' },
    { id: 'f3', name: 'style.css' },
];

export function GitCloneGame() {
    const [clonedFiles, setClonedFiles] = useState<any[]>([]);
    const [isCloning, setIsCloning] = useState(false);

    const handleClone = async () => {
        if (clonedFiles.length > 0) return;
        setIsCloning(true);
        for (const file of remoteFiles) {
            await new Promise(resolve => setTimeout(resolve, 300));
            setClonedFiles(prev => [...prev, file]);
        }
        setIsCloning(false);
    };
    
    const handleReset = () => {
        setClonedFiles([]);
        setIsCloning(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center w-full">
            {/* Remote Repository */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <Server className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Remote Repository</h2>
                </div>
                <div className="space-y-2">
                    {remoteFiles.map(file => (
                        <div key={file.id} className="flex items-center gap-2 p-2 rounded-md bg-white/5">
                            <File className="h-4 w-4 text-neon-blue" />
                            <span>{file.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action */}
            <div className="flex flex-col items-center justify-center text-center gap-4">
                <Button
                    onClick={handleClone}
                    disabled={isCloning || clonedFiles.length > 0}
                    className="bg-neon-green text-black hover:bg-white w-48 text-base"
                >
                    <Play className="mr-2 h-4 w-4" />
                    git clone
                </Button>
                <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
                >
                    Reset
                </Button>
            </div>

            {/* Local Machine */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50 min-h-[250px]">
                <div className="flex items-center gap-3 mb-4">
                    <HardDrive className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Local Machine</h2>
                </div>
                <div className="space-y-2">
                    <AnimatePresence>
                        {clonedFiles.map((file, index) => (
                            <motion.div
                                key={file.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 p-2 rounded-md bg-green-500/10"
                            >
                                <File className="h-4 w-4 text-neon-green" />
                                <span>{file.name}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {clonedFiles.length === 0 && !isCloning && <p className="text-center text-gray-500 text-sm py-10">Your local machine is empty.</p>}
                     {isCloning && <p className="text-center text-neon-blue text-sm py-10 animate-pulse">Cloning...</p>}
                </div>
            </div>
        </div>
    );
}
