
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const UptimeGame = () => {
    const [showPretty, setShowPretty] = useState(false);
    const [seconds, setSeconds] = useState(123456); // Start at some value

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getUptimeString = () => {
        if (showPretty) {
            const d = Math.floor(seconds / (3600*24));
            const h = Math.floor(seconds % (3600*24) / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            const s = Math.floor(seconds % 60);
            return `up ${d} days, ${h} hours, ${m} minutes, ${s} seconds`;
        }
        
        const load = (Math.random() * 2).toFixed(2);
        const currentTime = new Date().toLocaleTimeString('en-GB');
        const days = Math.floor(seconds / (3600*24));
        return `${currentTime} up ${days} days, ${new Date(seconds * 1000).toISOString().substr(11, 8)}, 1 user, load average: ${load}, ${load}, ${load}`;
    };

    const getCommand = () => `uptime ${showPretty ? '-p' : ''}`;

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <Timer className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">`uptime`</h2>
                </div>
                 <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="pretty" checked={showPretty} onCheckedChange={(c) => setShowPretty(Boolean(c))} />
                    <Label htmlFor="pretty">-p (Pretty Format)</Label>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-sm">
                    <p className="text-gray-400">$ {getCommand()}</p>
                    <motion.p 
                        key={getUptimeString()}
                        initial={{opacity: 0.5}}
                        animate={{opacity: 1}}
                        className="mt-2 text-neon-green text-base"
                    >
                       {getUptimeString()}
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

export { UptimeGame };
