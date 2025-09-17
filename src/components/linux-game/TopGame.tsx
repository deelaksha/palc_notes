
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, MemoryStick, Skull, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const initialProcesses = [
    { PID: 1234, USER: 'myuser', CPU: 5.8, MEM: 10.2, COMMAND: 'chrome' },
    { PID: 808, USER: 'www-data', CPU: 2.5, MEM: 5.1, COMMAND: 'nginx' },
    { PID: 1256, USER: 'myuser', CPU: 0.5, MEM: 2.3, COMMAND: 'bash' },
    { PID: 1, USER: 'root', CPU: 0.1, MEM: 0.2, COMMAND: 'systemd' },
    { PID: 1300, USER: 'root', CPU: 0.0, MEM: 0.1, COMMAND: 'cron' },
];

const TopGame = () => {
    const { toast } = useToast();
    const [processes, setProcesses] = useState(initialProcesses);
    const [sortBy, setSortBy] = useState<'CPU' | 'MEM'>('CPU');
    const [isExited, setIsExited] = useState(false);
    const [isKilling, setIsKilling] = useState(false);
    const [pidToKill, setPidToKill] = useState('');

    const resetGame = () => {
        setProcesses(initialProcesses);
        setIsExited(false);
        setSortBy('CPU');
        setIsKilling(false);
    }

    const handleKill = useCallback(() => {
        if (!pidToKill) {
            setIsKilling(false);
            return;
        }
        const pidNum = parseInt(pidToKill);
        if (processes.some(p => p.PID === pidNum)) {
            setProcesses(prev => prev.filter(p => p.PID !== pidNum));
            toast({ title: "Process Terminated", description: `Killed process ${pidNum}`});
        } else {
            toast({ title: "Process not found", description: `No process with PID ${pidNum}`, variant: "destructive" });
        }
        setIsKilling(false);
        setPidToKill('');
    }, [pidToKill, processes, toast]);

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (isKilling) {
            if (e.key === 'Enter') {
                handleKill();
            }
            return;
        }

        const key = e.key.toUpperCase();
        if (key === 'P') setSortBy('CPU');
        if (key === 'M') setSortBy('MEM');
        if (key === 'Q') setIsExited(true);
        if (key === 'K') setIsKilling(true);
    }, [isKilling, handleKill]);

    useEffect(() => {
        if (isExited || isKilling) return;
        
        window.addEventListener('keydown', handleKeyPress);
        const interval = setInterval(() => {
            setProcesses(prev => 
                prev.map(p => ({
                    ...p,
                    CPU: Math.max(0, p.CPU + (Math.random() - 0.5)),
                    MEM: Math.max(0, p.MEM + (Math.random() - 0.45) * 0.1),
                })).sort((a, b) => b[sortBy] - a[sortBy])
            );
        }, 2000);
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            clearInterval(interval);
        };
    }, [sortBy, isExited, isKilling, handleKeyPress]);

    if (isExited) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-gray-400">`top` program exited.</p>
                <button onClick={resetGame} className="text-neon-green font-bold">Restart</button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                 <div className="flex items-center justify-between mb-2">
                     <h2 className="text-xl font-bold text-neon-blue flex items-center gap-2"><Activity /> `top` Simulator</h2>
                     <div className="text-xs text-gray-400 font-mono flex gap-4">
                        <span>[<b className="text-white">P</b>] CPU Sort</span>
                        <span>[<b className="text-white">M</b>] Mem Sort</span>
                        <span>[<b className="text-white">k</b>] Kill</span>
                        <span>[<b className="text-white">q</b>] Quit</span>
                     </div>
                </div>
                
                 <div className="bg-dark-primary p-4 rounded-lg font-mono text-xs">
                     <div className="flex font-bold text-neon-green mb-2">
                        <span className="w-16">PID</span>
                        <span className="w-24">USER</span>
                        <span className={`w-20 cursor-pointer ${sortBy === 'CPU' ? 'underline' : ''}`} onClick={() => setSortBy('CPU')}>%CPU</span>
                        <span className={`w-20 cursor-pointer ${sortBy === 'MEM' ? 'underline' : ''}`} onClick={() => setSortBy('MEM')}>%MEM</span>
                        <span>COMMAND</span>
                    </div>
                    {isKilling && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                            <div className="flex gap-2 items-center">
                                <label>PID to kill:</label>
                                <Input 
                                    autoFocus
                                    value={pidToKill} 
                                    onChange={e => setPidToKill(e.target.value)} 
                                    onKeyDown={handleKeyPress}
                                    onBlur={() => { if(!pidToKill) setIsKilling(false); }}
                                    className="w-24 bg-dark-secondary"
                                />
                                <button onClick={handleKill} className="text-neon-green">Kill</button>
                            </div>
                        </div>
                    )}
                    <div className="relative h-64">
                    <AnimatePresence>
                    {processes.map((p, index) => (
                        <motion.div
                            key={p.PID}
                            layout
                            initial={{ y: index * 24, opacity: 0 }}
                            animate={{ y: index * 24, opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
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
            </div>
        </div>
    );
};

export { TopGame };
