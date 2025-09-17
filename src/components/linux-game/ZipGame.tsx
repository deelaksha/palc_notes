
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, Folder, FileArchive, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';


const ZipGame = () => {
    const { toast } = useToast();
    const initialFiles = [
        { name: 'notes.txt', type: 'file', selected: false },
        { name: 'images/', type: 'folder', selected: false },
        { name: 'index.html', type: 'file', selected: false },
    ];
    const [files, setFiles] = useState(initialFiles);
    const [archive, setArchive] = useState<any[] | null>(null);

     const handleFileSelect = (name: string) => {
        setFiles(files.map(f => f.name === name ? { ...f, selected: !f.selected } : f));
    };

    const handleZip = () => {
        const selectedFiles = files.filter(f => f.selected);
        if (selectedFiles.length === 0) {
            toast({title: 'No files selected!', variant: 'destructive'});
            return;
        }
        if (selectedFiles.some(f => f.type === 'folder')) {
            toast({title: 'Zipping folder...', description: 'Note: The -r flag is needed for directories!'});
        }
        setArchive(selectedFiles);
    }
    
    const reset = () => {
        setFiles(initialFiles);
        setArchive(null);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto items-start">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-blue">Files to Zip</h2>
                 <div className="space-y-2">
                    {files.map(file => (
                        <div key={file.name} className="flex items-center space-x-2 bg-dark-secondary p-2 rounded">
                            <Checkbox id={file.name} checked={file.selected} onCheckedChange={() => handleFileSelect(file.name)} />
                            <Label htmlFor={file.name} className="flex items-center gap-2">
                                {file.type === 'file' ? <File className="w-4 h-4"/> : <Folder className="w-4 h-4 text-amber-400"/>}
                                {file.name}
                            </Label>
                        </div>
                    ))}
                </div>
                <Button onClick={handleZip} className="w-full bg-neon-green text-black hover:bg-white">Create Zip</Button>
                <Button onClick={reset} variant="outline" className="w-full">Reset</Button>
            </div>
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">archive.zip</h2>
                <div className="flex flex-col items-center text-center">
                    <FileArchive className="w-24 h-24 text-amber-400"/>
                    <div className="mt-4 space-y-2 text-xs font-mono">
                        <AnimatePresence>
                        {archive?.map(item => (
                             <motion.p
                                key={item.name}
                                initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}}
                             >
                                 {item.name}
                             </motion.p>
                        ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ZipGame };
