
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, Folder, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const initialSourceFiles = [
    { name: 'report.pdf', type: 'file' },
    { name: 'project_data', type: 'folder', files: ['data1.csv', 'data2.csv'] },
    { name: 'image.jpg', type: 'file' },
];

const FileItem = ({ item, onCopy }: { item: any; onCopy: (item: any) => void; }) => {
    const isFolder = item.type === 'folder';
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between p-3 bg-dark-secondary rounded-lg border border-neon-blue/50"
        >
            <div className="flex items-center gap-2">
                {isFolder ? <Folder className="w-5 h-5 text-amber-400" /> : <File className="w-5 h-5 text-neon-blue" />}
                <span className="font-mono">{item.name}</span>
            </div>
            <Button size="icon" variant="ghost" onClick={() => onCopy(item)} className="h-8 w-8 text-neon-green hover:bg-neon-green/20">
                <Copy className="w-5 h-5"/>
            </Button>
        </motion.div>
    );
};

export function CpGame() {
    const { toast } = useToast();
    const [sourceFiles, setSourceFiles] = useState(initialSourceFiles);
    const [destFiles, setDestFiles] = useState<{name: string, type: string}[]>([]);

    const handleCopy = (item: any) => {
        if (destFiles.some(f => f.name === item.name)) {
            toast({ title: 'File exists', description: 'A file or folder with this name is already in the destination.', variant: 'destructive'});
            return;
        }

        if (item.type === 'folder') {
             toast({ title: 'Copying Folder', description: 'Remember to use the -r flag for folders!' });
        }

        setDestFiles(prev => [...prev, item]);
        toast({ title: 'Copied!', description: `Copied '${item.name}' to backups.` });
    };
    
    const resetGame = () => {
        setDestFiles([]);
        toast({title: 'Game Reset'});
    }

    return (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
             {/* Source Directory */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <h2 className="text-xl font-bold text-neon-blue mb-4">Source Directory (`./`)</h2>
                 <p className="text-xs text-gray-400 mb-4">Click the copy icon to run `cp {'<file>'} ../backups`.</p>
                <div className="space-y-3 min-h-[200px]">
                     <AnimatePresence>
                        {sourceFiles.map(item => <FileItem key={item.name} item={item} onCopy={handleCopy} />)}
                    </AnimatePresence>
                </div>
            </div>
            
             {/* Destination Directory */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">Destination (`../backups`)</h2>
                <p className="text-xs text-gray-400 mb-4">This folder contains the copied files.</p>
                <div className="space-y-3 min-h-[200px]">
                    <AnimatePresence>
                    {destFiles.map(item => (
                        <motion.div 
                            key={item.name}
                            layout
                            initial={{opacity: 0, scale: 0.8}} 
                            animate={{opacity: 1, scale: 1}}
                            className="flex items-center gap-2 p-3 bg-dark-primary rounded-lg"
                        >
                             {item.type === 'folder' ? <Folder className="w-5 h-5 text-amber-400" /> : <File className="w-5 h-5 text-neon-blue" />}
                            <span className="font-mono">{item.name}</span>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
                 <Button onClick={resetGame} variant="outline" className="w-full mt-6">Reset</Button>
            </div>
        </div>
    );
}
