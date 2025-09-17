
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, FileArchive, Zap, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const GzipGame = () => {
    const { toast } = useToast();
    const [file, setFile] = useState({ name: 'large_log.txt', isCompressed: false });

    const handleGzip = () => {
        if (file.isCompressed) {
            toast({ title: 'Already compressed!', variant: 'destructive'});
            return;
        }
        setFile({ name: 'large_log.txt.gz', isCompressed: true });
        toast({ title: 'File compressed!'});
    };
    
    const reset = () => {
         setFile({ name: 'large_log.txt', isCompressed: false });
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={file.name}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="glass-effect rounded-2xl p-8 border-2 border-neon-blue/50 flex flex-col items-center text-center w-64 h-48 justify-center"
                >
                    {file.isCompressed ? (
                        <FileArchive className="w-16 h-16 text-amber-400" />
                    ) : (
                        <File className="w-16 h-16 text-neon-blue" />
                    )}
                    <p className="font-mono mt-2 break-all">{file.name}</p>
                </motion.div>
            </AnimatePresence>
            <div className="flex gap-4">
                <Button onClick={handleGzip} disabled={file.isCompressed} className="w-40 bg-neon-green text-black hover:bg-white">
                    <Zap className="mr-2"/> gzip {file.name}
                </Button>
                 <Button onClick={reset} variant="outline"><RotateCw className="mr-2"/> Reset</Button>
            </div>
        </div>
    );
};

export { GzipGame };
