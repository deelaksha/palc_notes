
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Shield, Terminal, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const initialProcesses = [
    { pid: 101, name: 'chrome' },
    { pid: 205, name: 'vscode' },
    { pid: 310, name: 'spotify' },
    { pid: 450, name: 'game.exe (frozen)' },
];

const ProcessItem = ({ process, onKill }: { process: any, onKill: (pid: number) => void }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
        className="flex items-center justify-between p-2 bg-dark-secondary rounded-lg"
    >
        <div className="flex items-center gap-4">
            <span className="font-mono text-amber-400 w-12">{process.pid}</span>
            <span>{process.name}</span>
        </div>
        <Button size="icon" variant="ghost" onClick={() => onKill(process.pid)} className="h-7 w-7 text-red-500 hover:bg-red-500/20">
            <XCircle className="w-5 h-5"/>
        </Button>
    </motion.div>
);

const KillGame = () => {
    const { toast } = useToast();
    const [processes, setProcesses] = useState(initialProcesses);
    const [pidToKill, setPidToKill] = useState('');

    const handleKill = () => {
        const pid = parseInt(pidToKill);
        if (isNaN(pid)) {
            toast({ title: 'Invalid PID', description: 'Please enter a number.', variant: 'destructive'});
            return;
        }

        const processExists = processes.some(p => p.pid === pid);
        if (!processExists) {
            toast({ title: 'No Such Process', description: `No process with PID ${pid} found.`, variant: 'destructive'});
            return;
        }

        setProcesses(prev => prev.filter(p => p.pid !== pid));
        toast({ title: 'Process Terminated', description: `Sent kill signal to PID ${pid}.`});
        setPidToKill('');
    };

    const resetGame = () => {
        setProcesses(initialProcesses);
        setPidToKill('');
        toast({ title: 'Game Reset'});
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Skull /> `kill` Controls</h2>
                <p className="text-xs text-gray-400">Enter a Process ID (PID) from the list on the right and click 'kill'. Or, click the `X` icon next to a process.</p>
                <div className="flex gap-2">
                    <Input 
                        placeholder="PID to kill" 
                        value={pidToKill}
                        onChange={e => setPidToKill(e.target.value)}
                        className="bg-dark-primary font-mono"
                    />
                    <Button onClick={handleKill} className="bg-red-600 hover:bg-red-700">Kill</Button>
                </div>
                 <div className="text-xs text-gray-400 p-2 border border-dashed border-gray-600 rounded-lg">
                    <p><span className="font-bold text-red-400">kill -9 &lt;PID&gt;</span> (Force Kill): A more forceful signal that can't be ignored. Useful for unresponsive programs.</p>
                </div>
                <Button onClick={resetGame} variant="outline" className="w-full !mt-6">Reset</Button>
            </div>
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">Running Processes</h2>
                <div className="space-y-2">
                    <div className="flex text-xs font-bold text-gray-400 px-2">
                        <span className="w-12">PID</span>
                        <span>Process Name</span>
                    </div>
                    <AnimatePresence>
                        {processes.map(p => <ProcessItem key={p.pid} process={p} onKill={() => setPidToKill(p.pid.toString())}/>)}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { KillGame };
