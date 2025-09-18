'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Ear, Mail, Terminal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PacketCaptureVisualizer = () => {
    const { toast } = useToast();
    const [step, setStep] = useState(0);
    const [explanation, setExplanation] = useState("Click 'Start' to begin the simulation.");
    const [capturedPackets, setCapturedPackets] = useState<string[]>([]);

    const steps = [
        { exp: "Click 'Start' to begin the simulation." },
        { exp: "H1 sends an ICMP Echo Request (a 'ping') to H2's IP address (10.0.0.2)." },
        { exp: "The packet travels across the virtual link between the two hosts." },
        { exp: "The `tcpdump` process running on H2's interface captures a copy of the packet as it arrives." },
        { exp: "H2's network stack processes the ping and prepares to send an ICMP Echo Reply." },
        { exp: "H2 sends the Echo Reply back to H1." },
        { exp: "`tcpdump` captures the outgoing reply packet as it leaves H2's interface." },
        { exp: "Animation complete! You've captured both the request and the reply." }
    ];

    const runAnimationStep = async () => {
        const nextStep = (step + 1) % steps.length;
        setStep(nextStep);
        setExplanation(steps[nextStep].exp);

        if (nextStep === 3) {
            toast({ title: "Packet Captured!", description: "Request packet from 10.0.0.1 -> 10.0.0.2" });
            setCapturedPackets(prev => [...prev, "ICMP echo request, from 10.0.0.1"]);
        }
        if (nextStep === 6) {
             toast({ title: "Packet Captured!", description: "Reply packet from 10.0.0.2 -> 10.0.0.1" });
             setCapturedPackets(prev => [...prev, "ICMP echo reply, from 10.0.0.2"]);
        }
        if (nextStep === 0) { // Reset
            setCapturedPackets([]);
        }
    };
    
    const getPacketPosition = () => {
        if (step === 1 || step === 2) return { left: '80%', opacity: 1, transition: { duration: 1 } };
        if (step === 3) return { left: '80%', opacity: 0, scale: 1.5, transition: { duration: 0.5 } };
        if (step === 4 || step === 5) return { left: '10%', opacity: 1, transition: { duration: 1 } };
        if (step === 6) return { left: '10%', opacity: 0, scale: 1.5, transition: { duration: 0.5 } };
        return { opacity: 0 };
    }
    
    const getPacketInitial = () => {
        if (step === 1) return { left: '10%', opacity: 1 };
        if (step === 4) return { left: '80%', opacity: 1 };
        return { opacity: 0 };
    }


    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/capture.sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">Packet Capture Visualizer</h1>
                
                {/* Animation Canvas */}
                <div className="relative w-full h-48 bg-dark-primary rounded-lg border-2 border-primary/50 overflow-hidden">
                    {/* H1 */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[10%] text-center">
                        <div className="text-4xl">💻</div>
                        <div className="font-mono text-xs">h1 (10.0.0.1)</div>
                    </div>
                    {/* H2 */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[80%] text-center">
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 text-xs text-amber-400">
                            <Ear className="w-4 h-4"/> tcpdump
                        </div>
                        <div className="text-4xl">🖥️</div>
                        <div className="font-mono text-xs">h2 (10.0.0.2)</div>
                    </div>
                     {/* Link */}
                    <div className="absolute top-1/2 left-[15%] w-[65%] h-0.5 bg-white/20" />
                    {/* Packet */}
                    <AnimatePresence>
                    {(step === 1 || step === 4) && (
                         <motion.div className="absolute top-1/2 -mt-4" initial={getPacketInitial()} animate={getPacketPosition()}>
                            <Mail className="w-8 h-8 text-neon-pink" />
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
                
                 {/* Controls and Log */}
                 <div className="flex justify-center gap-4">
                    <Button onClick={runAnimationStep} className="bg-primary hover:bg-primary/90">
                        {step === 0 ? "Start" : step === steps.length -1 ? "Reset" : "Next Step"}
                    </Button>
                </div>
                <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center text-xs min-h-[4rem] flex-grow flex items-center justify-center">
                   {explanation}
                </div>
                 <div className="bg-dark-primary text-amber-400 font-mono p-4 mt-4 rounded-lg border border-secondary text-xs min-h-[6rem]">
                   <p className="text-gray-400 mb-2">$ sudo tcpdump -i v2-arms -n</p>
                   <AnimatePresence>
                   {capturedPackets.map((packet, index) => (
                       <motion.p key={index} initial={{opacity:0, y:5}} animate={{opacity:1, y:0}}>
                           {new Date().toLocaleTimeString()}: IP {packet}
                       </motion.p>
                   ))}
                   </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PacketCaptureVisualizer;
