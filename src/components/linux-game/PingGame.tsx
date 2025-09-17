
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Server, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PingGame = () => {
    const [destination, setDestination] = useState('google.com');
    const [pings, setPings] = useState<any[]>([]);
    const [isPinging, setIsPinging] = useState(false);

    const handlePing = async () => {
        if (!destination || isPinging) return;
        setIsPinging(true);
        setPings([]);

        for (let i = 0; i < 4; i++) {
            const time = (20 + Math.random() * 30).toFixed(2);
            await new Promise(r => setTimeout(r, 500));
            setPings(prev => [...prev, {
                seq: i,
                time: time,
                status: 'reply'
            }]);
        }
        setIsPinging(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Rss/> `ping` Controls</h2>
                <Input
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="e.g., google.com or 8.8.8.8"
                    className="bg-dark-primary"
                />
                <Button onClick={handlePing} disabled={isPinging} className="w-full bg-neon-green text-black hover:bg-white">
                    Ping {destination}
                </Button>
                 <div className="flex justify-between items-center h-24 text-center">
                    <Wifi className="w-12 h-12 text-neon-blue" />
                     <AnimatePresence>
                        {isPinging && (
                             <motion.div 
                                initial={{x: 0, opacity: 0}}
                                animate={{x: 100, opacity: [0, 1, 1, 0]}}
                                exit={{x: 200, opacity: 0}}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 bg-neon-pink rounded-full"
                            />
                        )}
                    </AnimatePresence>
                    <Server className="w-12 h-12 text-neon-blue" />
                </div>
            </div>
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">Terminal Output</h2>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[200px] font-mono text-xs">
                    <p className="text-gray-400">$ ping -c 4 {destination}</p>
                    <AnimatePresence>
                        {pings.map(p => (
                            <motion.p
                                key={p.seq}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                64 bytes from {destination}: icmp_seq={p.seq} ttl=55 time=<span className="text-amber-400">{p.time}</span> ms
                            </motion.p>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { PingGame };
