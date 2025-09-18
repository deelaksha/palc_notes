
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Terminal, Send, Server } from 'lucide-react';
import Link from 'next/link';

const PingVisualizer = () => {
    const [step, setStep] = useState(0);
    const [output, setOutput] = useState<string[]>([]);
    const [isPinging, setIsPinging] = useState(false);
    
    const runAnimation = async () => {
        if(isPinging) return;
        setIsPinging(true);
        setOutput([]);
        
        for (let i = 1; i <= 5; i++) {
            setStep(i); // Packet moves
            setOutput(prev => [...prev, `64 bytes from 10.0.0.2: icmp_seq=${i} ttl=64 time=${(Math.random() * 0.5 + 0.2).toFixed(3)} ms`]);
            await new Promise(r => setTimeout(r, 600));
            setStep(0); // Packet disappears/returns
            await new Promise(r => setTimeout(r, 400));
        }

        setOutput(prev => [...prev, `--- 10.0.0.2 ping statistics ---`, `5 packets transmitted, 5 received, 0% packet loss`]);
        setIsPinging(false);
    };
    
    const resetAnimation = () => {
        setStep(0);
        setOutput([]);
        setIsPinging(false);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/ns-ping-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Animation */}
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 flex flex-col justify-center">
                    <h1 className="text-xl font-bold text-center text-primary font-mono mb-4">Ping Visualizer</h1>
                    <div className="relative flex justify-between items-center h-24">
                        <div className="text-center">
                            <Send className="w-10 h-10 mx-auto text-neon-blue"/>
                            <p className="text-xs font-mono">h1-arms</p>
                            <p className="text-xs text-gray-400">10.0.0.1</p>
                        </div>
                        <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-white/20">
                             <AnimatePresence>
                             {step > 0 && (
                                <motion.div 
                                    className="w-4 h-4 bg-neon-pink rounded-full absolute -top-1.5"
                                    initial={{ left: 0 }}
                                    animate={{ left: '100%' }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'linear' }}
                                />
                             )}
                            </AnimatePresence>
                        </div>
                         <div className="text-center">
                            <Server className="w-10 h-10 mx-auto text-neon-blue"/>
                            <p className="text-xs font-mono">h2-arms</p>
                            <p className="text-xs text-gray-400">10.0.0.2</p>
                        </div>
                    </div>
                     <div className="flex justify-center gap-4 mt-6">
                        <Button onClick={runAnimation} disabled={isPinging}>Start Ping</Button>
                        <Button onClick={resetAnimation} variant="outline">Reset</Button>
                    </div>
                </div>

                {/* Terminal */}
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="h-6 w-6 text-neon-green" />
                        <h2 className="text-xl font-bold">Terminal Output</h2>
                    </div>
                     <div className="bg-dark-primary p-4 rounded-lg min-h-[200px] text-xs font-mono overflow-y-auto">
                        <p className="text-gray-400">$ ./ns-ping.sh</p>
                        <AnimatePresence>
                        {output.map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {line}
                            </motion.p>
                        ))}
                        </AnimatePresence>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default PingVisualizer;
