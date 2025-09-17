
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Trash2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const initialFolders = [
    { name: 'empty_folder', files: [] },
    { name: 'project_files', files: ['file1.txt', 'file2.txt'] },
    { name: 'logs', files: [] },
];

const FolderItem = ({ folder, onRemove }: { folder: any, onRemove: (name: string) => void }) => {
    const isEmpty = folder.files.length === 0;
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
            className="flex items-center justify-between p-3 bg-dark-secondary rounded-lg border border-neon-blue/50"
        >
            <div className="flex items-center gap-2">
                <Folder className={`w-5 h-5 ${isEmpty ? 'text-neon-green' : 'text-amber-400'}`} />
                <span className="font-mono">{folder.name}</span>
                 {!isEmpty && <span className="text-xs text-amber-400">({folder.files.length} files)</span>}
            </div>
            <Button size="icon" variant="ghost" onClick={() => onRemove(folder.name)} className="h-8 w-8 text-neon-pink hover:bg-neon-pink/20">
                <Trash2 className="w-5 h-5"/>
            </Button>
        </motion.div>
    );
}

export function RmdirGame() {
    const { toast } = useToast();
    const [folders, setFolders] = useState(initialFolders);

    const handleRemove = (name: string) => {
        const folder = folders.find(f => f.name === name);
        if (!folder) return;

        if (folder.files.length === 0) {
            setFolders(prev => prev.filter(f => f.name !== name));
            toast({ title: 'Success!', description: `rmdir: removed directory '${name}'` });
        } else {
            toast({
                title: 'Failed!',
                description: `rmdir: failed to remove '${name}': Directory not empty`,
                variant: 'destructive'
            });
        }
    };
    
    const resetGame = () => {
        setFolders(initialFolders);
        toast({title: 'Game Reset'});
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Folder View */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">Current Directory</h2>
                <p className="text-xs text-gray-400 mb-4">Click the trash icon to attempt to `rmdir` a folder. The command only works on empty folders.</p>
                <div className="space-y-3 min-h-[200px]">
                    <AnimatePresence>
                        {folders.map(folder => (
                            <FolderItem key={folder.name} folder={folder} onRemove={handleRemove} />
                        ))}
                    </AnimatePresence>
                     {folders.length === 0 && <p className="text-center text-gray-400 pt-16">All folders removed!</p>}
                </div>
                 <Button onClick={resetGame} variant="outline" className="w-full mt-6">Reset Game</Button>
            </div>
        </div>
    );
}
