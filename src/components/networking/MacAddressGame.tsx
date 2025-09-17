
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Router, Smartphone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const devices = [
    { id: 1, icon: <Laptop />, name: 'Laptop', mac: 'AA:..:01', pos: '15%' },
    { id: 2, icon: <Smartphone />, name: 'Phone', mac: 'BB:..:02', pos: '50%' },
    { id: 3, icon: <Router />, name: 'Server', mac: 'CC:..:03', pos: '85%' },
];

const Frame = ({ isVisible, animate }: { isVisible: boolean; animate: any; }) => (
    <motion.div
        initial={false}
        animate={animate}
        className={`absolute top-1/2 -translate-y-1/2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
        <Mail className="w-8 h-8 text-neon-pink" />
        <div className="absolute top-8 text-center w-28 -ml-10 bg-black/50 p-1 rounded-md text-xs">
            <p>To MAC: CC:..:03</p>
        </div>
    </motion.div>
);

export function MacAddressGame() {
    const [step, setStep] = useState(0);

    const states = [
        { left: '15%' },
        { left: '85%' },
    ];

    const handleClick = () => {
        setStep(prev => (prev + 1) % states.length);
    };

    return (
        <div className="w-full h-64 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 flex flex-col justify-between">
            <h3 className="text-center font-bold text-lg">Local Network (Ethernet/Wi-Fi)</h3>
            <div className="relative flex justify-between items-center h-24">
                {devices.map(device => (
                    <div key={device.id} className="flex flex-col items-center" style={{ position: 'absolute', left: device.pos, transform: 'translateX(-50%)' }}>
                        <div className="text-neon-blue">{device.icon}</div>
                        <p className="font-mono text-xs mt-1">{device.mac}</p>
                    </div>
                ))}
                
                <div className="absolute w-full h-0.5 bg-white/20 top-1/2 -translate-y-1/2 -z-10" />

                <Frame isVisible={step > -1} animate={states[step]} />
            </div>

            <Button onClick={handleClick} className="w-full md:w-1/2 mx-auto bg-neon-blue text-black hover:bg-white">
                {step === 0 ? 'Send Frame to Server' : 'Reset'}
            </Button>
        </div>
    );
}
