
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, User, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SshGame = () => {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                 <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                        <User className="w-12 h-12 mx-auto text-neon-blue"/>
                        <p>Your Computer</p>
                    </div>
                     <motion.div 
                        className="flex-1 h-1 mx-4 rounded-full"
                        animate={{
                            background: isConnected
                                ? 'linear-gradient(90deg, #00f3ff, #00ff41)'
                                : 'linear-gradient(90deg, #333, #555)'
                        }}
                    />
                    <div className="text-center">
                        <Server className="w-12 h-12 mx-auto text-neon-blue"/>
                        <p>Remote Server</p>
                    </div>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-sm min-h-[150px]">
                     <p className="text-gray-400">$ ssh user@remote-server</p>
                     <AnimatePresence>
                     {isConnected && (
                         <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-2">
                            <p>user@remote-server's password: ********</p>
                            <p>Welcome to Ubuntu 22.04 LTS</p>
                            <p className="text-neon-green">user@remote-server:~$ <span className="animate-ping">_</span></p>
                        </motion.div>
                     )}
                     </AnimatePresence>
                </div>
                <div className="flex gap-4 mt-4">
                    <Button onClick={() => setIsConnected(true)} disabled={isConnected} className="w-full">Connect</Button>
                    <Button onClick={() => setIsConnected(false)} disabled={!isConnected} variant="destructive" className="w-full">Disconnect</Button>
                </div>
            </div>
        </div>
    );
};

export { SshGame };
