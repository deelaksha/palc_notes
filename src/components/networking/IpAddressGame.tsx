
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, User, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Packet = ({ isVisible, animate }: { isVisible: boolean; animate: any; }) => (
    <motion.div
        initial={false}
        animate={animate}
        className={`absolute top-1/2 -translate-y-1/2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ left: '10%' }}
    >
        <Mail className="w-8 h-8 text-neon-pink" />
        <div className="absolute top-8 text-center w-24 -ml-8 bg-black/50 p-1 rounded-md text-xs">
            <p>To: 203.0.113.10</p>
            <p>From: 192.168.1.5</p>
        </div>
    </motion.div>
);

export function IpAddressGame() {
    const [step, setStep] = useState(0);

    const states = [
        { left: '10%' }, // Start at User
        { left: '50%' }, // Move to Router
        { left: '90%' }  // Move to Server
    ];

    const handleClick = () => {
        setStep(prev => (prev + 1) % states.length);
    };

    return (
        <div className="w-full h-64 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 flex flex-col justify-between">
            <div className="relative flex justify-between items-center h-24">
                {/* User */}
                <div className="flex flex-col items-center">
                    <User className="w-10 h-10 text-neon-blue" />
                    <p className="font-mono text-xs mt-1">192.168.1.5</p>
                </div>
                {/* Router */}
                <div className="flex flex-col items-center">
                    <Globe className="w-10 h-10 text-neon-green" />
                    <p className="font-mono text-xs mt-1">Router</p>
                </div>
                {/* Server */}
                <div className="flex flex-col items-center">
                    <Server className="w-10 h-10 text-neon-blue" />
                    <p className="font-mono text-xs mt-1">203.0.113.10</p>
                </div>

                <div className="absolute w-full h-0.5 bg-white/20 top-1/2 -translate-y-1/2 -z-10" />

                <Packet isVisible={step > -1} animate={states[step]} />
            </div>

            <Button onClick={handleClick} className="w-full md:w-1/2 mx-auto bg-neon-blue text-black hover:bg-white">
                {step === 0 && 'Send Packet'}
                {step === 1 && 'Forward to Internet'}
                {step === 2 && 'Reset'}
            </Button>
        </div>
    );
}
