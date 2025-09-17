
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardDrive, Globe, Server, Laptop, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

const interfaces = [
    { name: 'lo', type: 'Loopback', ip: '127.0.0.1/8' },
    { name: 'eth0', type: 'Ethernet', ip: '192.168.1.102/24' },
    { name: 'wlan0', type: 'Wi-Fi', ip: '192.168.1.103/24' },
];

const IpAddrGame = () => {
    const [showAll, setShowAll] = useState(false);
    const [selectedInterface, setSelectedInterface] = useState<string | null>(null);

    const getCommand = () => {
        if (selectedInterface) return `ip addr show ${selectedInterface}`;
        if (showAll) return `ip addr`;
        return `ip a`;
    };

    const interfacesToShow = selectedInterface
        ? interfaces.filter(i => i.name === selectedInterface)
        : interfaces;

    return (
        <div className="w-full max-w-3xl mx-auto">
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 mb-6">
                <h2 className="text-xl font-bold text-neon-pink mb-4">`ip addr` Controls</h2>
                <div className="flex gap-2">
                    <Button onClick={() => { setShowAll(true); setSelectedInterface(null); }} className="flex-1">Show All (`ip addr`)</Button>
                    <Button onClick={() => setSelectedInterface('eth0')} className="flex-1">Show eth0</Button>
                     <Button onClick={() => setSelectedInterface('wlan0')} className="flex-1">Show wlan0</Button>
                </div>
            </div>
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-xs">
                    <p className="text-gray-400">$ {getCommand()}</p>
                    <div className="mt-2 space-y-4">
                        <AnimatePresence>
                        {interfacesToShow.map((iface, i) => (
                             <motion.div 
                                key={iface.name}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: i * 0.1}}
                             >
                                <p><span className="text-amber-400">{i+1}: {iface.name}:</span> <span className="text-gray-400">&lt;{iface.type.toUpperCase()},UP&gt;</span></p>
                                <p className="pl-4">inet <span className="text-neon-green font-bold">{iface.ip}</span> scope host {iface.name}</p>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { IpAddrGame };
