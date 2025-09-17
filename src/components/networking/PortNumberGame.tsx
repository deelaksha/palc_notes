
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HardDrive, Mail, Globe, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const apps = [
    { name: 'Web Browser', port: 443, icon: <Globe />, pos: '25%' },
    { name: 'Chat App', port: 5222, icon: <MessageSquare />, pos: '75%' },
];

const Packet = ({ animate, port, isVisible }: { animate: any, port: number, isVisible: boolean }) => (
    <motion.div
        initial={{ top: '-20%', left: '50%', x: '-50%' }}
        animate={animate}
        className={`absolute ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
        <Mail className="w-8 h-8 text-neon-pink" />
        <div className="absolute top-8 text-center w-24 -ml-8 bg-black/50 p-1 rounded-md text-xs">
            <p>To Port: {port}</p>
        </div>
    </motion.div>
);

export function PortNumberGame() {
    const [targetPort, setTargetPort] = useState(443);
    const [isSending, setIsSending] = useState(false);

    const finalPosition = apps.find(app => app.port === targetPort)!.pos;
    
    const animation = isSending
        ? { top: '50%', left: finalPosition, transition: { duration: 1.5, type: 'spring' } }
        : { top: '-20%', left: '50%', transition: { duration: 0.5 } };
        
    const handleSend = (port: number) => {
        setTargetPort(port);
        setIsSending(true);
    };

    const handleReset = () => setIsSending(false);

    return (
        <div className="w-full h-72 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 flex flex-col justify-between">
            <div className="relative flex-1">
                {/* Computer */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-dark-primary/50 rounded-lg p-4 flex flex-col items-center">
                    <HardDrive className="w-8 h-8 text-neon-blue mb-2" />
                    <p className="font-mono text-xs">Your Computer (IP: 192.168.1.5)</p>
                     {/* Applications */}
                    <div className="absolute inset-0 flex justify-around items-center">
                       {apps.map(app => (
                           <div key={app.port} className="flex flex-col items-center gap-1 text-center">
                               <div className="text-neon-green">{app.icon}</div>
                               <p className="text-xs">{app.name}</p>
                               <p className="font-mono text-xs bg-green-500/20 px-2 rounded-full">Port {app.port}</p>
                           </div>
                       ))}
                    </div>
                </div>

                <Packet isVisible={true} animate={animation} port={targetPort} />
            </div>

             <div className="flex gap-2 justify-center mt-4">
                <Button size="sm" onClick={() => handleSend(443)} disabled={isSending}>Send to Web Browser (443)</Button>
                <Button size="sm" onClick={() => handleSend(5222)} disabled={isSending}>Send to Chat App (5222)</Button>
                <Button size="sm" onClick={handleReset} variant="outline" disabled={!isSending}>Reset</Button>
            </div>
        </div>
    );
}
