
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, ArchiveRestore, Inbox, File, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const initialWorkingFiles = [
    { id: 'f1', name: 'style.css (modified)' },
    { id: 'f2', name: 'index.html (modified)' },
];

const FileItem = ({ file, isStashed }: { file: any, isStashed?: boolean }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: isStashed ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isStashed ? -20 : 20, transition: {duration: 0.3} }}
        className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10"
    >
        <File className="h-5 w-5 text-amber-400" />
        <span className="font-mono text-sm">{file.name}</span>
    </motion.div>
);

export function GitStashGame() {
    const { toast } = useToast();
    const [workingFiles, setWorkingFiles] = useState(initialWorkingFiles);
    const [stashedItems, setStashedItems] = useState<any[]>([]);

    const handleStash = () => {
        if (workingFiles.length === 0) {
            toast({ title: 'Nothing to stash', description: 'Your working directory is clean.', variant: 'destructive'});
            return;
        }
        setStashedItems(prev => [[...workingFiles], ...prev]);
        setWorkingFiles([]);
        toast({ title: 'Changes stashed!', description: 'Your working directory is now clean.' });
    };

    const handlePop = () => {
        if (stashedItems.length === 0) {
            toast({ title: 'No stashes to apply', variant: 'destructive' });
            return;
        }
        const [lastStash, ...rest] = stashedItems;
        setWorkingFiles(prev => [...prev, ...lastStash]);
        setStashedItems(rest);
        toast({ title: 'Stash popped!', description: 'The most recent stash has been applied and removed.' });
    };

    const handleAddFile = () => {
        const newFile = { id: `f${Date.now()}`, name: `new-file-${Math.floor(Math.random() * 100)}.js`};
        setWorkingFiles(prev => [...prev, newFile]);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
            {/* Working Directory */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <Inbox className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Working Directory</h2>
                </div>
                <div className="space-y-3 min-h-[200px]">
                    <AnimatePresence>
                        {workingFiles.map(file => <FileItem key={file.id} file={file} />)}
                    </AnimatePresence>
                    {workingFiles.length === 0 && <p className="text-center text-gray-500 text-sm py-16">Working directory is clean.</p>}
                </div>
                 <Button onClick={handleAddFile} size="sm" variant="outline" className="w-full mt-4"><Plus className="mr-2 h-4 w-4"/>Add New Change</Button>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8 lg:py-0">
                 <Button onClick={handleStash} className="w-full bg-neon-green text-black hover:bg-white" disabled={workingFiles.length === 0}>
                    <Archive className="mr-2"/> git stash
                </Button>
                <Button onClick={handlePop} className="w-full" disabled={stashedItems.length === 0}>
                     <ArchiveRestore className="mr-2"/> git stash pop
                </Button>
            </div>

            {/* Stash List */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50">
                <div className="flex items-center gap-3 mb-4">
                    <Archive className="h-6 w-6 text-neon-pink" />
                    <h2 className="text-xl font-bold">Stash List</h2>
                </div>
                <div className="space-y-3 min-h-[200px]">
                    <AnimatePresence>
                    {stashedItems.map((stash, index) => (
                         <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="p-3 bg-white/5 rounded-lg border-l-4 border-neon-pink"
                        >
                            <p className="font-bold font-mono">stash@&#123;{index}&#125;</p>
                            <div className="text-xs text-gray-400 ml-4">
                                {stash.map((f:any) => f.name).join(', ')}
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                    {stashedItems.length === 0 && <p className="text-center text-gray-500 text-sm py-16">Stash is empty.</p>}
                </div>
            </div>
        </div>
    );
}
