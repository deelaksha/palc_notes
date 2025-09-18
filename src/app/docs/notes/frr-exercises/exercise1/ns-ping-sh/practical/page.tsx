'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Terminal, Send, Server } from 'lucide-react';
import Link from 'next/link';

const PingVisualizer = () => {
    const [step, setStep] = useState(0);
    const [output, setOutput] = useState<string[]>([]);
    const [explanation, setExplanation] = useState("Click 'Start' to begin the simulation.");

    const steps = [
        "Click 'Start' to begin the simulation.",
        "First, the ARP cache in `h1` is flushed. This means `h1` forgets the MAC address of `h2`.",
        "Now, `h1` sends the first `ping` request to `10.0.0.2`.",
        "Since `h1` doesn't know `h2`'s MAC, it first sends an ARP request: 'Who has 10.0.0.2?'",
        "`h2` replies to the ARP request: 'I have 10.0.0.2, my MAC is ...'. `h1` caches this.",
        "The ping packet is delivered. `h2` sends a reply back to `h1`.",
        "The first reply is received. The connection is confirmed!",
        "Subsequent pings are sent and received without needing ARP.",
        "Simulation complete."
    ];

    const runStep = async () => {
        if (step < steps.length - 1) {
            const nextStep = step + 1;
            setStep(nextStep);
            setExplanation(steps[nextStep]);

            if (nextStep === 6) {
                setOutput(prev => [...prev, `64 bytes from 10.0.0.2: icmp_seq=1 ttl=64 time=0.1ms`]);
            }
            if (nextStep === 7) {
                setOutput(prev => [...prev, `64 bytes from 10.0.0.2: icmp_seq=2 ttl=64 time=0.05ms`]);
                setOutput(prev => [...prev, `64 bytes from 10.0.0.2: icmp_seq=3 ttl=64 time=0.05ms`]);
            }
        } else {
            setStep(0);
            setExplanation(steps[0]);
            setOutput([]);
        }
    };
    
    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/ns-ping-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
             <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">Ping Visualizer</h1>
                {/* Animation Canvas */}
                <div className="relative flex justify-between items-center h-24 bg-dark-primary p-4 rounded-lg">
                    <div className="text-center">
                        <Send className="w-10 h-10 mx-auto text-neon-blue"/>
                        <p className="text-xs font-mono">h1-arms</p>
                    </div>
                    <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-white/20">
                         <AnimatePresence>
                         {(step >= 2 && step < 7) && (
                            <motion.div 
                                className="w-4 h-4 bg-neon-pink rounded-full absolute -top-1.5"
                                initial={{ left: (step === 4 || step === 5) ? '100%' : '0%' }}
                                animate={{ left: (step === 2 || step === 5) ? '100%' : '0%' }}
                                transition={{ duration: 0.8, ease: 'linear' }}
                            >
                                <span className="absolute -top-5 text-xs">{step === 3 ? "ARP?" : step === 4 ? "ARP!" : "ICMP"}</span>
                            </motion.div>
                         )}
                        </AnimatePresence>
                    </div>
                     <div className="text-center">
                        <Server className="w-10 h-10 mx-auto text-neon-blue"/>
                        <p className="text-xs font-mono">h2-arms</p>
                    </div>
                </div>

                 {/* Controls and Log */}
                <div className="flex justify-center">
                    <Button onClick={runStep} className="bg-primary hover:bg-primary/90">
                         {step === 0 ? "Start" : step === steps.length - 1 ? "Reset" : "Next Step"}
                    </Button>
                </div>
                 <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                   {explanation}
                </div>
                {/* Terminal */}
                 <div className="bg-dark-primary p-4 rounded-lg min-h-[150px] text-xs font-mono overflow-y-auto">
                    <p className="text-gray-400">$ ./ns-ping.sh</p>
                    {step > 1 && <p>Clearing ARP cache in h1-arms...</p>}
                    {step > 1 && <p>Pinging from h1-arms to 10.0.0.2...</p>}
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
    );
};

export default PingVisualizer;
