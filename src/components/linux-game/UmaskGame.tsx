
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, Folder, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const getPermissions = (base: number[], mask: number[]) => {
    let result = '';
    const symbolic = ['r', 'w', 'x'];
    for(let i=0; i<3; i++) {
        if(base[i] - mask[i] < 0) { // This condition is simplified, real umask is bitwise
            result += '-';
        } else {
            result += symbolic[i];
        }
    }
    return result;
}

const octalToSymbolic = (octalStr: string) => {
    return octalStr.split('').map(digit => {
        const d = parseInt(digit);
        let str = '';
        str += (d & 4) ? 'r' : '-';
        str += (d & 2) ? 'w' : '-';
        str += (d & 1) ? 'x' : '-';
        return str;
    }).join('');
};

const subtractUmask = (baseOctal: string, umaskOctal: string) => {
    const base = parseInt(baseOctal, 8);
    const mask = parseInt(umaskOctal, 8);
    const result = base & ~mask;
    return result.toString(8).padStart(3, '0');
};

export function UmaskGame() {
    const [umask, setUmask] = useState('022');
    const [newItems, setNewItems] = useState<{name: string, type: 'file' | 'dir', perms: string}[]>([]);

    const newFilePerms = subtractUmask('666', umask);
    const newDirPerms = subtractUmask('777', umask);

    const handleCreateFile = () => {
        const name = `new_file_${newItems.length}.txt`;
        setNewItems(prev => [...prev, { name, type: 'file', perms: newFilePerms }]);
    };

    const handleCreateDir = () => {
        const name = `new_dir_${newItems.length}`;
        setNewItems(prev => [...prev, { name, type: 'dir', perms: newDirPerms }]);
    };
    
    const handleReset = () => {
        setNewItems([]);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Controls */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                 <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Shield /> `umask` Controls</h2>
                <div>
                    <label htmlFor="umask-input">Set Umask Value:</label>
                    <Input id="umask-input" value={umask} onChange={(e) => setUmask(e.target.value.replace(/[^0-7]/g, '').slice(0,3))} maxLength={3} className="font-mono mt-1 bg-dark-primary" />
                </div>
                <div className="text-center p-4 bg-dark-secondary rounded-lg">
                    <p className="text-sm">New Directory Permissions: 777 - {umask} = <span className="font-bold text-neon-green">{newDirPerms}</span></p>
                    <p className="text-sm">New File Permissions: 666 - {umask} = <span className="font-bold text-neon-green">{newFilePerms}</span></p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleCreateFile} className="w-full">Create New File</Button>
                    <Button onClick={handleCreateDir} className="w-full">Create New Directory</Button>
                </div>
                <Button onClick={handleReset} variant="outline" className="w-full">Reset Created Items</Button>
            </div>

            {/* New Items */}
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                 <h2 className="text-xl font-bold text-neon-green mb-4">Newly Created Items</h2>
                 <div className="space-y-2 min-h-[300px]">
                    <AnimatePresence>
                    {newItems.map(item => (
                        <motion.div
                            key={item.name}
                            layout
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            className="flex items-center gap-4 p-2 bg-dark-secondary rounded-lg"
                        >
                            {item.type === 'file' ? <File className="w-5 h-5 text-neon-blue"/> : <Folder className="w-5 h-5 text-amber-400"/>}
                            <span className="font-mono text-sm flex-1">{item.name}</span>
                            <span className="font-mono text-xs text-amber-400 bg-black/30 px-2 py-1 rounded">
                                {item.type === 'dir' ? 'd' : '-'}{octalToSymbolic(item.perms)}
                            </span>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                 </div>
            </div>
        </div>
    );
}
