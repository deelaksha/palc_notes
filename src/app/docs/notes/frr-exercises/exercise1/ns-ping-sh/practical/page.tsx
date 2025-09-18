'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Terminal, Send, Server, FileCode } from 'lucide-react';
import Link from 'next/link';

const PingVisualizer = () => {
    const [step, setStep] = useState(0);
    const [output, setOutput] = useState<string[]>([]);

    const steps = [
        { exp: "Click 'Start' to simulate pinging h2 from h1.", code: "" },
        { exp: "First, the ARP cache in `h1` is flushed. This means `h1` forgets the MAC address of `h2`.", code: "sudo ip netns exec h1-arms ip neigh flush all" },
        { exp: "Now, `h1` sends the first `ping` request to `10.0.0.2`.", code: "sudo ip netns exec h1-arms ping -c 3 10.0.0.2" },
        { exp: "Since `h1` doesn't know `h2`'s MAC, it first sends an ARP request: 'Who has 10.0.0.2?'", code: "(ARP broadcast)" },
        { exp: "`h2` replies to the ARP request: 'I have 10.0.0.2, my MAC is ...'. `h1` caches this.", code: "(ARP reply)" },
        { exp: "The actual ICMP ping packet is delivered. `h2` sends an ICMP reply back to `h1`.", code: "(ICMP echo request/reply)" },
        { exp: "The first reply is received. The connection is confirmed!", code: "64 bytes from 10.0.0.2: ..." },
        { exp: "Subsequent pings are sent and received without needing ARP.", code: "(ICMP echo request/reply)" },
        { exp: "Simulation complete.", code: "Done." }
    ];

    const runStep = async () => {
        const nextStep = (step + 1) % steps.length;
        setStep(nextStep);

        if (nextStep === 6) {
            setOutput(prev => [...prev, `64 bytes from 10.0.0.2: icmp_seq=1 ttl=64 time=0.1ms`]);
        }
        if (nextStep === 7) {
            setOutput(prev => [...prev, `64 bytes from 10.0.0.2: icmp_seq=2 ttl=64 time=0.05ms`]);
            setOutput(prev => [...prev, `64 bytes from 10.0.0.2: icmp_seq=3 ttl=64 time=0.05ms`]);
        }
        if (nextStep === 0) { // Reset
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
                         {(step >= 2 && step < 8) && (
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
                 <div className="bg-card-nested p-4 rounded-lg border border-secondary text-center space-y-2">
                   <p className="font-semibold text-accent">{steps[step].exp}</p>
                   <code className="text-xs text-amber-400 bg-black/30 p-1 rounded-md inline-block"><FileCode className="inline-block mr-2 h-4 w-4"/>{steps[step].code}</code>
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
