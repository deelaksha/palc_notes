
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Server, Mail, Route, XCircle, Play, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const nodes = [
    { id: 'user', name: 'You', ip: '192.168.1.10', x: '10%', y: '50%' },
    { id: 'router1', name: 'Router 1', ip: '192.168.1.1', x: '30%', y: '50%' },
    { id: 'router2', name: 'Router 2', ip: '203.0.113.1', x: '50%', y: '50%' },
    { id: 'router3', name: 'Router 3', ip: '8.8.8.1', x: '70%', y: '50%' },
    { id: 'server', name: 'Server', ip: '8.8.8.8', x: '90%', y: '50%' },
];

const Packet = ({ animate, ttl, isDropped, isVisible }: { animate: any; ttl: number; isDropped: boolean; isVisible: boolean }) => (
    <motion.div
        initial={{ left: '10%', top: '50%', opacity: 0 }}
        animate={animate}
        className="absolute z-10"
    >
        {isVisible && (
            <div className="relative">
                <motion.div
                    key={ttl}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15}}
                >
                    <Mail className={`w-8 h-8 ${isDropped ? 'text-red-500' : 'text-neon-pink'}`} />
                </motion.div>
                <div className={`absolute -top-6 text-center w-24 -ml-8 bg-black/50 p-1 rounded-md text-xs font-mono ${isDropped ? 'text-red-500 font-bold' : ''}`}>
                    TTL: {ttl}
                </div>
            </div>
        )}
    </motion.div>
);

export function TtlGame() {
    const { toast } = useToast();
    const [initialTtl, setInitialTtl] = useState(4);
    const [currentTtl, setCurrentTtl] = useState(initialTtl);
    const [step, setStep] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDropped, setIsDropped] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    
    const path = ['user', 'router1', 'router2', 'router3', 'server'];

    const resetGame = () => {
        setStep(-1);
        setCurrentTtl(initialTtl);
        setIsDropped(false);
        setIsAnimating(false);
        setLogs([]);
    };

    const runAnimation = async () => {
        resetGame();
        setIsAnimating(true);
        
        let ttl = initialTtl;
        setLogs([`Packet sent from 'You' with initial TTL of ${ttl}`]);
        
        for (let i = 0; i < path.length; i++) {
            setStep(i);
            await new Promise(r => setTimeout(r, 1200));

            // Decrement TTL at each router
            if (i > 0 && i < path.length - 1) { // is a router
                ttl--;
                setCurrentTtl(ttl);
                const currentNode = nodes[i];
                setLogs(prev => [...prev, `${currentNode.name} received packet, decremented TTL to ${ttl}.`]);
                await new Promise(r => setTimeout(r, 800));

                if (ttl <= 0) {
                    setIsDropped(true);
                    setLogs(prev => [...prev, `TTL is 0! ${currentNode.name} is dropping the packet.`]);
                    toast({ title: 'Packet Dropped!', description: `TTL reached zero at ${currentNode.name}.`, variant: 'destructive' });
                    setIsAnimating(false);
                    return;
                }
            }
        }
        
        setLogs(prev => [...prev, "Packet successfully reached the server!"]);
        toast({ title: 'Success!', description: 'Packet arrived at its destination.' });
        setIsAnimating(false);
    };

    const getPacketAnimation = () => {
        if (step === -1) return { opacity: 0 };
        const currentNode = nodes[step];
        const baseAnimation = {
            left: currentNode.x,
            top: currentNode.y,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 20 },
        };
        if(isDropped) {
            return {
                ...baseAnimation,
                scale: 0,
                opacity: 0,
                transition: { ...baseAnimation.transition, delay: 0.5, duration: 0.5 }
            }
        }
        return baseAnimation;
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
                 <Packet animate={getPacketAnimation()} ttl={currentTtl} isDropped={isDropped} isVisible={step > -1} />
                 {isDropped && 
                    <motion.div 
                        className="absolute text-red-500" 
                        style={{ left: nodes[step].x, top: '20%'}}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                    >
                        <XCircle className="w-8 h-8"/>
                    </motion.div>
                }
            </div>

            <div className="text-center space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-dark-secondary p-4 rounded-lg">
                    <div className="space-y-2 text-left">
                        <Label htmlFor="ttl-slider">Initial TTL: {initialTtl}</Label>
                        <Slider
                            id="ttl-slider"
                            min={1}
                            max={5}
                            step={1}
                            value={[initialTtl]}
                            onValueChange={(value) => setInitialTtl(value[0])}
                            disabled={isAnimating}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={runAnimation} disabled={isAnimating} className="w-full bg-neon-green text-black hover:bg-white"><Play className="mr-2"/> Send Packet</Button>
                        <Button onClick={resetGame} variant="outline" className="w-full"><RefreshCw className="mr-2"/> Reset</Button>
                    </div>
                </div>

                <div className="bg-dark-primary p-3 rounded-lg text-xs font-mono text-left h-32 overflow-y-auto">
                    {logs.map((log, i) => (
                         <motion.p key={i} initial={{opacity:0}} animate={{opacity:1}} className="whitespace-pre-wrap">{`[${i+1}] ${log}`}</motion.p>
                    ))}
                </div>
            </div>
        </div>
    );
}
