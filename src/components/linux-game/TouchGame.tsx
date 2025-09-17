
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePlus, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const initialFiles = [
    { name: 'existing_file.txt', lastModified: new Date(Date.now() - 600000) },
];

const FileItem = ({ file }: { file: any }) => {
    return (
        <motion.div
            layout
            key={file.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-between p-3 bg-dark-secondary rounded-lg border border-neon-blue/50"
        >
            <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-neon-blue" />
                <span className="font-mono">{file.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
                <Timer className="w-4 h-4"/>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={file.lastModified.toISOString()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {file.lastModified.toLocaleTimeString()}
                    </motion.span>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export function TouchGame() {
    const { toast } = useToast();
    const [files, setFiles] = useState(initialFiles);
    const [fileName, setFileName] = useState('');

    const handleTouch = () => {
        if (!fileName) {
            toast({ title: "File name required", variant: 'destructive' });
            return;
        }

        const existingFileIndex = files.findIndex(f => f.name === fileName);
        if (existingFileIndex > -1) {
            const updatedFiles = [...files];
            updatedFiles[existingFileIndex] = { ...updatedFiles[existingFileIndex], lastModified: new Date() };
            setFiles(updatedFiles);
            toast({ title: 'Timestamp Updated', description: `Updated modification time for '${fileName}'.` });
        } else {
            const newFile = { name: fileName, lastModified: new Date() };
            setFiles(prev => [...prev, newFile]);
            toast({ title: 'File Created', description: `Created new empty file '${fileName}'.` });
        }
        setFileName('');
    };
    
    const resetGame = () => {
        setFiles(initialFiles);
        setFileName('');
        toast({title: 'Game Reset'});
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
             {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink mb-4">Command: touch</h2>
                 <p className="text-xs text-gray-400">Creates a new file or updates the timestamp of an existing one.</p>
                 <div className="space-y-2">
                    <label className="text-sm font-mono" htmlFor="fileName">File Name:</label>
                    <Input
                        id="fileName"
                        placeholder="new_file.log"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTouch()}
                        className="bg-dark-primary border-white/20"
                    />
                </div>
                <Button onClick={handleTouch} className="w-full bg-neon-green text-black hover:bg-white">
                    touch {fileName || '<name>'}
                </Button>
                <Button onClick={resetGame} variant="outline" className="w-full !mt-8">Reset</Button>
            </div>

            {/* File System View */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">Current Directory</h2>
                <div className="space-y-3 min-h-[200px]">
                    <AnimatePresence>
                        {files.map(file => <FileItem key={file.name} file={file} />)}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
