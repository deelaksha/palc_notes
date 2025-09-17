
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardDrive, Database, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const filesystems = [
    { name: '/dev/sda1', size: '100G', used: '45G', avail: '55G', use: '45%', mount: '/' },
    { name: 'tmpfs', size: '7.8G', used: '1.2G', avail: '6.6G', use: '16%', mount: '/run' },
    { name: '/dev/sdb1', size: '500G', used: '480G', avail: '20G', use: '96%', mount: '/data' },
    { name: '/dev/sdc1', size: '2.0T', used: '500G', avail: '1.5T', use: '25%', mount: '/backups' },
];

const formatBytes = (bytes: string) => {
    // This is a simplified formatter for the game, not a real byte converter
    return bytes;
}

const DfGame = () => {
    const [humanReadable, setHumanReadable] = useState(false);

    const getCommand = () => `df ${humanReadable ? '-h' : ''}`;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <HardDrive className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">`df` (Disk Free)</h2>
                </div>
                 <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="human-readable" checked={humanReadable} onCheckedChange={(c) => setHumanReadable(Boolean(c))} />
                    <Label htmlFor="human-readable">-h (Human-Readable)</Label>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-sm">
                    <p className="text-gray-400">$ {getCommand()}</p>
                    <AnimatePresence>
                    <table className="w-full mt-2">
                        <thead>
                            <tr className="text-left text-neon-green">
                                <th className="p-1">Filesystem</th>
                                <th className="p-1 text-right">Size</th>
                                <th className="p-1 text-right">Used</th>
                                <th className="p-1 text-right">Avail</th>
                                <th className="p-1 text-right">Use%</th>
                                <th className="p-1">Mounted on</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filesystems.map(fs => (
                            <motion.tr 
                                key={fs.name}
                                layout
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                            >
                                <td className="p-1 font-semibold">{fs.name}</td>
                                <td className="p-1 text-right">{humanReadable ? fs.size : parseInt(fs.size) * 1024 * 1024}</td>
                                <td className="p-1 text-right">{humanReadable ? fs.used : parseInt(fs.used) * 1024 * 1024}</td>
                                <td className="p-1 text-right">{humanReadable ? fs.avail : parseInt(fs.avail) * 1024 * 1024}</td>
                                <td className={`p-1 text-right font-bold ${parseInt(fs.use) > 90 ? 'text-red-500' : 'text-green-400'}`}>{fs.use}</td>
                                <td className="p-1 text-amber-400">{fs.mount}</td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { DfGame };
