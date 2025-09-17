
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsDown, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const initialLogLines = Array.from({ length: 20 }, (_, i) => `Line ${i + 1}: Log entry...`);

const TailGame = () => {
    const [lineCount, setLineCount] = useState(10);
    const [logLines, setLogLines] = useState(initialLogLines);
    const [output, setOutput] = useState<string[]>([]);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (follow) {
            interval = setInterval(() => {
                setLogLines(prev => [...prev, `Line ${prev.length + 1}: New event at ${new Date().toLocaleTimeString()}`]);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [follow]);

    useEffect(() => {
        const lines = logLines.slice(-lineCount);
        setOutput(lines);
    }, [logLines, lineCount]);

    const handleTail = () => {
        const lines = logLines.slice(-lineCount);
        setOutput(lines);
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
             {/* Controls & File Content */}
            <div className="space-y-6">
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><ChevronsDown /> `tail` Controls</h2>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="line-count" className="font-mono">-n</Label>
                        <Input 
                            id="line-count"
                            type="number"
                            value={lineCount}
                            onChange={e => setLineCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="bg-dark-primary w-24"
                        />
                         <Button onClick={handleTail} className="bg-neon-green text-black hover:bg-white">Run tail</Button>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Switch id="follow-mode" checked={follow} onCheckedChange={setFollow} />
                        <Label htmlFor="follow-mode">-f (Follow)</Label>
                    </div>
                </div>
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">app.log</h2>
                    <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono whitespace-pre-wrap h-64 overflow-y-auto">
                        {logLines.join('\n')}
                    </pre>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[360px] font-mono text-sm">
                    <p className="text-gray-400">$ tail -n {lineCount} {follow ? '-f' : ''} app.log</p>
                    <div className="mt-2 space-y-1">
                        <AnimatePresence>
                        {output.map((line, index) => (
                            <motion.p
                                key={line}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{duration: 0.5}}
                            >
                                {line}
                            </motion.p>
                        ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TailGame };
