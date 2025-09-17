
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhoamiGame = () => {
    const [user, setUser] = useState('myuser');
    const [output, setOutput] = useState('');

    const runWhoami = () => {
        setOutput(user);
    };
    
    const runSudoWhoami = () => {
        setOutput('root');
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 text-center">
                <div className="flex justify-center items-center gap-4 mb-4">
                    <User className="w-10 h-10 text-neon-green" />
                    <div>
                        <p className="text-xs text-gray-400">Logged in as:</p>
                        <p className="text-2xl font-bold">{user}</p>
                    </div>
                </div>
                
                <div className="flex gap-4 justify-center mb-6">
                    <Button onClick={runWhoami}>Run `whoami`</Button>
                    <Button onClick={runSudoWhoami}>Run `sudo whoami`</Button>
                </div>
                
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-sm text-left">
                    <p className="text-gray-400">$ {output === 'root' ? 'sudo whoami' : 'whoami'}</p>
                     <AnimatePresence>
                        {output && (
                            <motion.p 
                                key={output}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-neon-green text-lg mt-2"
                            >
                                {output}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { WhoamiGame };
