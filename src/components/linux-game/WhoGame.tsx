
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const loggedInUsers = [
    { name: 'root', terminal: 'tty1', time: '2023-10-27 08:30' },
    { name: 'alice', terminal: 'pts/0', time: '2023-10-27 09:15', ip: '(192.168.1.100)' },
    { name: 'bob', terminal: 'pts/1', time: '2023-10-27 10:05', ip: '(10.0.0.5)' },
];

const WhoGame = () => {
    const [showHeaders, setShowHeaders] = useState(false);
    const [output, setOutput] = useState<any[]>([]);

    const runWho = () => {
        setOutput(loggedInUsers);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 mb-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
                <div className="flex items-center space-x-2">
                    <Checkbox id="headers" checked={showHeaders} onCheckedChange={(c) => setShowHeaders(Boolean(c))} />
                    <Label htmlFor="headers">-H (Show Headers)</Label>
                </div>
                <Button onClick={runWho} className="bg-neon-green text-black hover:bg-white">Run `who`</Button>
            </div>
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                 <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-sm min-h-[200px]">
                    <AnimatePresence>
                        {output.length > 0 && (
                            <>
                                {showHeaders && (
                                     <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex font-bold text-neon-green">
                                        <span className="w-24">NAME</span>
                                        <span className="w-24">LINE</span>
                                        <span className="w-40">TIME</span>
                                        <span>COMMENT</span>
                                    </motion.div>
                                )}
                                {output.map((user, i) => (
                                     <motion.div 
                                        key={user.name} 
                                        initial={{opacity:0, x: -10}} 
                                        animate={{opacity:1, x: 0}}
                                        transition={{delay: i * 0.1}}
                                        className="flex"
                                    >
                                        <span className="w-24">{user.name}</span>
                                        <span className="w-24">{user.terminal}</span>
                                        <span className="w-40">{user.time}</span>
                                        <span>{user.ip}</span>
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { WhoGame };
