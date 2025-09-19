
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Server, Mail, Route, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const nodes = [
    { id: 'user', name: 'You', ip: '192.168.1.10', x: '10%', y: '50%' },
    { id: 'router1', name: 'Router 1', ip: '192.168.1.1', x: '30%', y: '50%' },
    { id: 'router2', name: 'Router 2', ip: '203.0.113.1', x: '50%', y: '50%' },
    { id: 'router3', name: 'Router 3', ip: '8.8.8.1', x: '70%', y: '50%' },
    { id: 'server', name: 'Server', ip: '8.8.8.8', x: '90%', y: '50%' },
];

const Packet = ({ animate, ttl, isVisible }: { animate: any; ttl: number; isVisible: boolean }) => (
    <motion.div
        initial={{ left: '10%', top: '50%', opacity: 0 }}
        animate={animate}
        className="absolute z-10"
    >
        {isVisible && (
            <>
                <Mail className={`w-8 h-8 ${ttl > 0 ? 'text-neon-pink' : 'text-red-500'}`} />
                <div className={`absolute top-8 text-center w-24 -ml-8 bg-black/50 p-1 rounded-md text-xs ${ttl === 0 ? 'text-red-500 font-bold' : ''}`}>
                    <p>TTL: {ttl}</p>
                </div>
            </>
        )}
    </motion.div>
);

export function TtlGame() {
    const { toast } = useToast();
    const [step, setStep] = useState(0);
    const [ttl, setTtl] = useState(3);
    const [isDropped, setIsDropped] = useState(false);

    const path = ['user', 'router1', 'router2', 'router3', 'server'];
    const currentNode = nodes[step];

    const handleNextHop = () => {
        if (isDropped || step >= path.length - 1) return;

        const currentRouterName = nodes[step].name;
        
        const newTtl = ttl - 1;
        setTtl(newTtl);

        if (newTtl === 0) {
            setIsDropped(true);
            toast({ title: 'Packet Dropped!', description: `${currentRouterName} dropped the packet because TTL reached zero.`, variant: 'destructive'});
            setStep(step); // Packet stops here
        } else {
             toast({ title: `Hop to ${nodes[step + 1].name}!`, description: `${currentRouterName} decremented TTL to ${newTtl} and forwarded the packet.`});
            setStep(s => s + 1);
        }
    };
    
    const handleReset = () => {
        setStep(0);
        setTtl(3);
        setIsDropped(false);
        toast({title: 'Reset'});
    }

    const packetAnimation = {
        left: currentNode.x,
        top: currentNode.y,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100, damping: 20 },
    };

    return (
        <div className="w-full glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 flex flex-col gap-6">
            <div className="relative h-48">
                {nodes.map(node => (
                    <div key={node.id} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center" style={{ left: node.x, top: node.y, width: '80px' }}>
                        {node.id.includes('router') ? <Route className="w-10 h-10 text-neon-green" /> : node.id === 'user' ? <Laptop className="w-10 h-10 text-neon-blue"/> : <Server className="w-10 h-10 text-neon-blue"/>}
                        <p className="text-xs font-bold">{node.name}</p>
                    </div>
                ))}
                 <div className="absolute w-[80%] h-0.5 bg-white/20 top-1/2 left-[10%] -translate-y-1/2 -z-10" />
                 <Packet animate={packetAnimation} ttl={ttl} isVisible={step >= 0} />
                 {isDropped && 
                    <motion.div 
                        className="absolute text-red-500" 
                        style={{ left: currentNode.x, top: '20%'}}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                    >
                        <XCircle className="w-8 h-8"/>
                    </motion.div>
                }
            </div>

            <div className="text-center space-y-2">
                 <h3 className="text-lg font-bold">Packet Journey</h3>
                 <p className="text-xs text-gray-400">Initial TTL is 3. Each router hop decrements the TTL by 1. If TTL hits 0, the packet is dropped.</p>
                <div className="flex justify-center gap-2">
                    <Button onClick={handleNextHop} disabled={step === path.length - 1 || isDropped}>Next Hop</Button>
                    <Button onClick={handleReset} variant="outline">Reset</Button>
                </div>
            </div>
        </div>
    );
}
