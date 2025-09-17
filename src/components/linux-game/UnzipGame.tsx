
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileArchive, Folder, File, Zap, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const archiveContents = [
    { name: 'document.txt', type: 'file' },
    { name: 'image.png', type: 'file' },
];

const UnzipGame = () => {
    const { toast } = useToast();
    const [extractedFiles, setExtractedFiles] = useState<any[]>([]);
    
    const handleUnzip = () => {
        if (extractedFiles.length > 0) {
            toast({title: "Already unzipped!", variant: 'destructive'});
            return;
        }
        setExtractedFiles(archiveContents);
        toast({title: 'Archive extracted!'});
    }

    const reset = () => {
        setExtractedFiles([]);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto items-start">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 text-center flex flex-col items-center gap-4">
                 <h2 className="text-xl font-bold text-neon-blue">project.zip</h2>
                <FileArchive className="w-24 h-24 text-amber-400" />
                <Button onClick={handleUnzip} className="w-full bg-neon-green text-black hover:bg-white">
                    unzip project.zip
                </Button>
                 <Button onClick={reset} variant="outline" className="w-full">Reset</Button>
            </div>
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">Extracted Files</h2>
                <div className="space-y-3 min-h-[150px]">
                    <AnimatePresence>
                        {extractedFiles.map(file => (
                            <motion.div
                                key={file.name}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 p-3 bg-dark-secondary rounded-lg"
                            >
                                <File className="w-5 h-5 text-neon-blue"/>
                                <span className="font-mono">{file.name}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { UnzipGame };
