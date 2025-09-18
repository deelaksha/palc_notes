
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Ear, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const PacketCaptureVisualizer = () => {
    const [step, setStep] = useState(0);
    const [explanation, setExplanation] = useState("Press 'Send Ping' to see tcpdump in action.");
    const [capturedPackets, setCapturedPackets] = useState<string[]>([]);
    
    const explanationText = [
        "Ready to begin. H2 has a 'tcpdump' listener running. Click 'Send Ping' to send a packet from H1.",
        "Step 1: H1 sends an ICMP Echo Request (a 'ping') to H2's IP address.",
        "Step 2: The packet travels across the virtual link.",
        "Step 3: The 'tcpdump' process on H2 captures a copy of the packet as it arrives.",
        "Step 4: H2's network stack processes the ping and sends an ICMP Echo Reply.",
        "Step 5: 'tcpdump' captures the reply packet as it leaves H2.",
        "Animation Complete! You've captured both the request and reply."
    ];

    const runAnimation = async () => {
        if (step !== 0) return;
        
        for (let i = 1; i <= 5; i++) {
            setStep(i);
            setExplanation(explanationText[i]);
            if (i === 3) {
                 setCapturedPackets(prev => [...prev, "ICMP echo request, from 10.0.0.1"]);
            }
            if (i === 5) {
                 setCapturedPackets(prev => [...prev, "ICMP echo reply, from 10.0.0.2"]);
            }
            await new Promise(r => setTimeout(r, 1200));
        }
        setStep(6);
        setExplanation(explanationText[6]);
    };
    
    const resetAnimation = () => {
        setStep(0);
        setExplanation(explanationText[0]);
        setCapturedPackets([]);
    };

    const getPacketPosition = () => {
        if (step === 1) return { left: '10%', opacity: 1, transition: { duration: 0 }};
        if (step === 2) return { left: '80%', opacity: 1, transition: { duration: 1 }};
        if (step === 3) return { left: '80%', opacity: 0, scale: 1.5, transition: { duration: 0.5 }};
        if (step === 4) return { left: '80%', opacity: 1, transition: { duration: 0 }};
        if (step === 5) return { left: '10%', opacity: 1, transition: { duration: 1 }};
        return { opacity: 0 };
    }

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/ns-capture-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl shadow-lg border border-border">
                    <h1 className="text-2xl font-bold text-center text-primary font-mono mb-4">Packet Capture Visualizer</h1>
                    {/* Animation Canvas */}
                    <div className="relative w-full h-64 bg-dark-primary rounded-lg border-2 border-primary/50 overflow-hidden">
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
                        {step > 0 && step < 6 && (
                             <motion.div className="absolute top-1/2 -mt-4" initial={{left: '10%', opacity: 0}} animate={getPacketPosition()}>
                                <Mail className="w-8 h-8 text-neon-pink" />
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </div>
                 {/* Controls and Log */}
                <div className="space-y-4">
                    <div className="bg-card p-4 rounded-2xl border border-border h-full flex flex-col">
                        <div className="flex justify-center gap-4 mb-4">
                            <Button onClick={runAnimation} disabled={step > 0 && step < 6} className="bg-primary hover:bg-primary/90">Send Ping</Button>
                            <Button onClick={resetAnimation} variant="outline">Reset</Button>
                        </div>
                        <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center text-xs min-h-[4rem] flex-grow flex items-center justify-center">
                           {explanation}
                        </div>
                         <div className="bg-dark-primary text-amber-400 font-mono p-4 mt-4 rounded-lg border border-secondary text-xs min-h-[6rem]">
                           <p className="text-gray-400 mb-2">$ sudo tcpdump -i v2-arms -n</p>
                           <AnimatePresence>
                           {capturedPackets.map((packet, index) => (
                               <motion.p key={index} initial={{opacity:0, y:5}} animate={{opacity:1, y:0}}>
                                   {new Date().toLocaleTimeString()}: IP 10.0.0.1 > 10.0.0.2: {packet}
                               </motion.p>
                           ))}
                           </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PacketCaptureVisualizer;

    