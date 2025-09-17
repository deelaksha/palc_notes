
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, MemoryStick } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialProcesses = [
    { PID: 1234, USER: 'myuser', CPU: 5.8, MEM: 10.2, COMMAND: 'chrome' },
    { PID: 808, USER: 'www-data', CPU: 2.5, MEM: 5.1, COMMAND: 'nginx' },
    { PID: 1256, USER: 'myuser', CPU: 0.5, MEM: 2.3, COMMAND: 'bash' },
    { PID: 1, USER: 'root', CPU: 0.1, MEM: 0.2, COMMAND: 'systemd' },
    { PID: 1300, USER: 'root', CPU: 0.0, MEM: 0.1, COMMAND: 'cron' },
];

const TopGame = () => {
    const [processes, setProcesses] = useState(initialProcesses);
    const [sortBy, setSortBy] = useState<'CPU' | 'MEM'>('CPU');

    useEffect(() => {
        const interval = setInterval(() => {
            setProcesses(prev => 
                prev.map(p => ({
                    ...p,
                    CPU: Math.max(0, p.CPU + (Math.random() - 0.5)),
                    MEM: Math.max(0, p.MEM + (Math.random() - 0.45) * 0.1),
                })).sort((a, b) => b[sortBy] - a[sortBy])
            );
        }, 2000);
        return () => clearInterval(interval);
    }, [sortBy]);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                 <div className="flex items-center justify-between mb-4">
                     <h2 className="text-xl font-bold text-neon-blue flex items-center gap-2"><Activity /> `top` Simulator</h2>
                    <div className="flex gap-2">
                        <Button onClick={() => setSortBy('CPU')} variant={sortBy === 'CPU' ? 'default' : 'secondary'} size="sm"><Cpu className="w-4 h-4 mr-2"/> Sort by CPU</Button>
                        <Button onClick={() => setSortBy('MEM')} variant={sortBy === 'MEM' ? 'default' : 'secondary'} size="sm"><MemoryStick className="w-4 h-4 mr-2"/> Sort by MEM</Button>
                    </div>
                </div>
                
                 <div className="bg-dark-primary p-4 rounded-lg font-mono text-xs">
                     <div className="flex font-bold text-neon-green mb-2">
                        <span className="w-16">PID</span>
                        <span className="w-24">USER</span>
                        <span className="w-20">%CPU</span>
                        <span className="w-20">%MEM</span>
                        <span>COMMAND</span>
                    </div>
                    <div className="relative h-64">
                    <AnimatePresence>
                    {processes.map((p, index) => (
                        <motion.div
                            key={p.PID}
                            layout
                            initial={{ y: index * 24, opacity: 0 }}
                            animate={{ y: index * 24, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute flex w-full items-center"
                        >
                            <span className="w-16">{p.PID}</span>
                            <span className="w-24">{p.USER}</span>
                            <span className="w-20">{p.CPU.toFixed(1)}</span>
                            <span className="w-20">{p.MEM.toFixed(1)}</span>
                            <span className="truncate">{p.COMMAND}</span>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                    </div>
                </div>
                 <p className="text-xs text-center mt-4 text-gray-400">Process list updates every 2 seconds. Press `q` to quit (in a real terminal).</p>
            </div>
        </div>
    );
};

export { TopGame };
