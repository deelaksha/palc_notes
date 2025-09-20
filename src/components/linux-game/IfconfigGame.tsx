
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardDrive, Globe, Server, Laptop, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

const interfaces = [
    { 
        name: 'lo', 
        type: 'Loopback', 
        ip: '127.0.0.1',
        mac: '00:00:00:00:00:00',
        rx: '12345',
        tx: '12345'
    },
    { 
        name: 'eth0', 
        type: 'Ethernet', 
        ip: '192.168.1.102',
        mac: '00:1A:2B:3C:4D:5E',
        rx: '987654',
        tx: '543210'
    },
    { 
        name: 'wlan0', 
        type: 'Wi-Fi', 
        ip: '192.168.1.103',
        mac: 'F0:9F:C2:1A:B3:CD',
        rx: '12345678',
        tx: '87654321'
    },
];

const InterfaceCard = ({ iface }: { iface: any }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-dark-primary p-4 rounded-lg border border-neon-blue/30"
    >
        <p className="font-bold text-neon-green">{iface.name}: <span className="text-gray-400 text-xs">flags=... mtu 1500</span></p>
        <p className="pl-4">inet <span className="font-semibold text-amber-400">{iface.ip}</span> netmask 255.255.255.0</p>
        <p className="pl-4">ether <span className="font-semibold">{iface.mac}</span></p>
        <div className="pl-4 text-xs text-gray-500">
            <p>RX packets {iface.rx}  TX packets {iface.tx}</p>
        </div>
    </motion.div>
);

export function IfconfigGame() {
    const [selectedInterface, setSelectedInterface] = useState<string | null>(null);

    const interfacesToShow = selectedInterface 
        ? interfaces.filter(i => i.name === selectedInterface)
        : interfaces;

    const getCommand = () => `ifconfig ${selectedInterface || ''}`;

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6">
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50">
                <h2 className="text-xl font-bold text-neon-pink mb-4">`ifconfig` Controls</h2>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setSelectedInterface(null)} className="flex-1">Show All</Button>
                    <Button onClick={() => setSelectedInterface('eth0')} className="flex-1">Show eth0</Button>
                    <Button onClick={() => setSelectedInterface('wlan0')} className="flex-1">Show wlan0</Button>
                </div>
            </div>
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-sm">
                    <p className="text-gray-400">$ {getCommand()}</p>
                    <div className="mt-4 space-y-4">
                        <AnimatePresence>
                        {interfacesToShow.map(iface => (
                            <InterfaceCard key={iface.name} iface={iface} />
                        ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
