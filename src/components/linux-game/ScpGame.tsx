
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardDrive, Server, File, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ScpGame = () => {
    const { toast } = useToast();
    const [localFiles, setLocalFiles] = useState([{name: 'report.pdf'}]);
    const [remoteFiles, setRemoteFiles] = useState([{name: 'backup.sql'}]);

    const handleScp = (direction: 'upload' | 'download') => {
        if (direction === 'upload') {
            setRemoteFiles(prev => [...prev, ...localFiles]);
            toast({title: "File Uploaded!", description: "scp report.pdf user@remote:/home/user/"});
        } else {
            setLocalFiles(prev => [...prev, {name: 'backup.sql'}]);
             toast({title: "File Downloaded!", description: "scp user@remote:/backups/backup.sql ."});
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto items-center">
            {/* Local Machine */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <h2 className="text-xl font-bold text-neon-blue flex items-center gap-2 mb-4"><HardDrive/> Local</h2>
                <div className="space-y-2">
                    <AnimatePresence>
                    {localFiles.map(f => (
                        <motion.div key={f.name} layout className="flex items-center gap-2 p-2 bg-dark-secondary rounded-lg">
                            <File className="w-4 h-4"/>
                            <span>{f.name}</span>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4">
                <Button onClick={() => handleScp('upload')} className="bg-neon-green text-black hover:bg-white"><Copy className="mr-2"/> Upload to Remote</Button>
                <Button onClick={() => handleScp('download')} className="bg-neon-pink text-white hover:bg-white hover:text-black"><Copy className="mr-2"/> Download from Remote</Button>
            </div>
            
            {/* Remote Machine */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green flex items-center gap-2 mb-4"><Server/> Remote</h2>
                <div className="space-y-2">
                    <AnimatePresence>
                    {remoteFiles.map(f => (
                         <motion.div key={f.name} layout className="flex items-center gap-2 p-2 bg-dark-secondary rounded-lg">
                            <File className="w-4 h-4"/>
                            <span>{f.name}</span>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { ScpGame };
