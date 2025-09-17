
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const FolderItem = ({ name }: { name: string }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="flex items-center gap-2 p-3 bg-dark-secondary rounded-lg border border-neon-blue/50"
    >
        <FolderPlus className="w-5 h-5 text-neon-blue" />
        <span className="font-mono">{name}</span>
    </motion.div>
);

export function MkdirGame() {
    const { toast } = useToast();
    const [directories, setDirectories] = useState(['Documents', 'Downloads']);
    const [dirName, setDirName] = useState('');

    const handleMkdir = () => {
        if (!dirName) {
            toast({ title: "Directory name required", variant: 'destructive' });
            return;
        }
        if (directories.includes(dirName)) {
            toast({ title: "Directory exists", description: `A folder named '${dirName}' is already here.`, variant: 'destructive' });
            return;
        }

        setDirectories(prev => [...prev, dirName]);
        setDirName('');
        toast({ title: 'Success!', description: `Created directory '${dirName}'.` });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <Terminal className="h-6 w-6 text-neon-pink" />
                    <h2 className="text-xl font-bold">Command</h2>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-mono" htmlFor="dirName">Directory Name:</label>
                    <Input
                        id="dirName"
                        placeholder="new_folder"
                        value={dirName}
                        onChange={(e) => setDirName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleMkdir()}
                        className="bg-dark-primary border-white/20"
                    />
                </div>
                <Button onClick={handleMkdir} className="w-full bg-neon-green text-black hover:bg-white">
                    mkdir {dirName || '<name>'}
                </Button>
            </div>

            {/* File System View */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">Current Directory</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 min-h-[200px]">
                    <AnimatePresence>
                        {directories.map(dir => (
                            <FolderItem key={dir} name={dir} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
