
'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, Folder, Move, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const initialFiles = {
    './': [
        { name: 'draft.txt', type: 'file' },
        { name: 'image.jpg', type: 'file' },
    ],
    './archive/': [
        { name: 'old_report.pdf', type: 'file' },
    ]
};

const FileItem = ({ item }: { item: any }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className="flex items-center gap-2 p-3 bg-dark-secondary rounded-lg border border-neon-blue/50"
    >
        {item.type === 'folder' ? <Folder className="w-5 h-5 text-amber-400" /> : <File className="w-5 h-5 text-neon-blue" />}
        <span className="font-mono">{item.name}</span>
    </motion.div>
);

export function MvGame() {
    const { toast } = useToast();
    const [files, setFiles] = useState(initialFiles);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [newName, setNewName] = useState('');

    const handleMove = (destination: string) => {
        if (!selectedFile) {
            toast({ title: 'No file selected', variant: 'destructive'});
            return;
        }
        
        const sourceDir = Object.keys(files).find(dir => files[dir as keyof typeof files].some(f => f.name === selectedFile))!;
        
        if (sourceDir === destination) {
            toast({ title: 'Source and destination are the same', variant: 'destructive' });
            return;
        }

        const fileToMove = files[sourceDir as keyof typeof files].find(f => f.name === selectedFile)!;
        
        setFiles(prev => {
            const newFiles = { ...prev };
            newFiles[sourceDir as keyof typeof files] = newFiles[sourceDir as keyof typeof files].filter(f => f.name !== selectedFile);
            newFiles[destination as keyof typeof files] = [...newFiles[destination as keyof typeof files], fileToMove];
            return newFiles;
        });

        toast({ title: 'Moved!', description: `mv ${selectedFile} ${destination}`});
        setSelectedFile(null);
    };

    const handleRename = () => {
         if (!selectedFile || !newName) {
            toast({ title: 'Select a file and enter a new name', variant: 'destructive'});
            return;
        }
         const sourceDir = Object.keys(files).find(dir => files[dir as keyof typeof files].some(f => f.name === selectedFile))!;
         
         setFiles(prev => {
            const newFiles = { ...prev };
            const fileIndex = newFiles[sourceDir as keyof typeof files].findIndex(f => f.name === selectedFile);
            newFiles[sourceDir as keyof typeof files][fileIndex].name = newName;
            return newFiles;
        });
        
        toast({ title: 'Renamed!', description: `mv ${selectedFile} ${newName}`});
        setSelectedFile(null);
        setNewName('');
    };
    
    const resetGame = () => {
        setFiles(JSON.parse(JSON.stringify(initialFiles)));
        setSelectedFile(null);
        setNewName('');
    }

    const availableFiles = Object.values(files).flat();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
             {/* Controls */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-6">
                <h2 className="text-xl font-bold text-neon-pink">`mv` Controls</h2>
                
                <div className="space-y-4 p-4 border border-white/10 rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2"><Type/> Rename a file</h3>
                    <Select onValueChange={setSelectedFile} value={selectedFile || undefined}>
                        <SelectTrigger><SelectValue placeholder="Select a file to act on..." /></SelectTrigger>
                        <SelectContent>
                            {availableFiles.map(f => <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     <Input
                        placeholder="Enter new name..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        disabled={!selectedFile}
                    />
                    <Button onClick={handleRename} className="w-full" disabled={!selectedFile || !newName}>Rename</Button>
                </div>
                
                <div className="space-y-4 p-4 border border-white/10 rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2"><Move/> Move a file</h3>
                    <p className="text-xs text-gray-400">Select a file using the dropdown above, then choose a destination.</p>
                    <Button onClick={() => handleMove('./archive/')} className="w-full" disabled={!selectedFile}>Move to ./archive/</Button>
                    <Button onClick={() => handleMove('./')} className="w-full" disabled={!selectedFile}>Move to ./</Button>
                </div>
                 <Button onClick={resetGame} variant="outline" className="w-full !mt-8">Reset Game</Button>
            </div>

             {/* File System */}
            <div className="space-y-6">
                {Object.keys(files).map(dir => (
                    <div key={dir} className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                        <h3 className="text-lg font-bold text-neon-green mb-4">Directory: <span className="font-mono">{dir}</span></h3>
                        <div className="grid grid-cols-2 gap-3 min-h-[80px]">
                            <AnimatePresence>
                                {files[dir as keyof typeof files].map(item => <FileItem key={item.name} item={item} />)}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
