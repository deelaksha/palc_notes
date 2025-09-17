
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const allProcesses = [
    { USER: 'root', PID: 1, CPU: '0.1', MEM: '0.2', COMMAND: 'systemd' },
    { USER: 'www-data', PID: 808, CPU: '2.5', MEM: '5.1', COMMAND: 'nginx' },
    { USER: 'myuser', PID: 1234, CPU: '5.8', MEM: '10.2', COMMAND: 'chrome' },
    { USER: 'myuser', PID: 1256, CPU: '0.5', MEM: '2.3', COMMAND: 'bash' },
    { USER: 'root', PID: 1300, CPU: '0.0', MEM: '0.1', COMMAND: 'cron' },
];

const PsGame = () => {
    const [output, setOutput] = useState<any[]>([]);

    const runPs = (flag: 'aux' | 'ef') => {
        let headers: string[] = [];
        let data: any[] = [];
        
        if (flag === 'aux') {
            headers = ['USER', 'PID', '%CPU', '%MEM', 'COMMAND'];
            data = allProcesses.map(p => [p.USER, p.PID, p.CPU, p.MEM, p.COMMAND]);
        } else { // -ef
            headers = ['UID', 'PID', 'PPID', 'C', 'STIME', 'TTY', 'TIME', 'CMD'];
             data = allProcesses.map(p => [p.USER, p.PID, p.PID -1, 0, '10:00', '?', '00:00:05', p.COMMAND]);
        }
        
        setOutput([headers, ...data]);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 mb-6 flex gap-4 justify-center">
                <Button onClick={() => runPs('aux')} className="bg-neon-blue text-black hover:bg-white">ps aux</Button>
                <Button onClick={() => runPs('ef')} className="bg-neon-blue text-black hover:bg-white">ps -ef</Button>
            </div>
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] font-mono text-xs">
                     <AnimatePresence>
                        {output.length > 0 && (
                            <motion.table 
                                key={output[0].join('-')}
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                className="w-full"
                            >
                                <thead>
                                    <tr className="text-left text-neon-green">
                                        {output[0].map((h: string) => <th key={h} className="pr-2">{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                {output.slice(1).map((row: any[], rowIndex: number) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="pr-2 truncate">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </motion.table>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { PsGame };
