
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Terminal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const memoryData = {
    total: 16384, // in MB
    used: 4096,
    free: 2048,
    shared: 1024,
    buff_cache: 10240,
    available: 12288
};

const formatMegabytes = (mb: number) => {
    if (mb < 1024) return `${mb}M`;
    return `${(mb/1024).toFixed(1)}G`;
};

const FreeGame = () => {
    const [humanReadable, setHumanReadable] = useState(true);

    const getCommand = () => `free ${humanReadable ? '-h' : ''}`;
    
    const displayData = humanReadable 
        ? {
            total: formatMegabytes(memoryData.total),
            used: formatMegabytes(memoryData.used),
            free: formatMegabytes(memoryData.free),
            shared: formatMegabytes(memoryData.shared),
            buff_cache: formatMegabytes(memoryData.buff_cache),
            available: formatMegabytes(memoryData.available)
        }
        : {
            total: memoryData.total * 1024,
            used: memoryData.used * 1024,
            free: memoryData.free * 1024,
            shared: memoryData.shared * 1024,
            buff_cache: memoryData.buff_cache * 1024,
            available: memoryData.available * 1024
        };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <Cpu className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">`free` (Memory Usage)</h2>
                </div>
                 <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="human-readable" checked={humanReadable} onCheckedChange={(c) => setHumanReadable(Boolean(c))} />
                    <Label htmlFor="human-readable">-h (Human-Readable)</Label>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-xs md:text-sm">
                    <p className="text-gray-400">$ {getCommand()}</p>
                    <motion.div key={humanReadable.toString()} initial={{opacity:0}} animate={{opacity:1}} className="mt-2">
                         <table className="w-full">
                            <thead>
                                <tr className="text-left text-neon-green">
                                    <th></th>
                                    <th>total</th>
                                    <th>used</th>
                                    <th>free</th>
                                    <th>shared</th>
                                    <th>buff/cache</th>
                                    <th>available</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Mem:</td>
                                    <td>{displayData.total}</td>
                                    <td>{displayData.used}</td>
                                    <td>{displayData.free}</td>
                                    <td>{displayData.shared}</td>
                                    <td>{displayData.buff_cache}</td>
                                    <td>{displayData.available}</td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export { FreeGame };
