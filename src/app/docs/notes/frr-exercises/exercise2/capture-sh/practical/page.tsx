
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Send, ArrowLeft, Waypoints } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const PacketCaptureVisualizer = () => {
    const { toast } = useToast();
    const [isAnimating, setIsAnimating] = useState(false);
    const [listeningOn, setListeningOn] = useState('h1');
    const [capturedPackets, setCapturedPackets] = useState<string[]>([]);
    const [step, setStep] = useState(0); // 0: idle, 1: H1->Bridge, 2: Bridge->H2, 3: H2->Bridge, 4: Bridge->H1

    const explanationText = [
        "Ready to begin. Choose an interface to listen on and press 'Send Ping'.",
        "H1 sends an ICMP Echo Request to H2.",
        "The bridge receives the frame and forwards it to the segment H2 is on.",
        "H2 receives the ping and prepares an Echo Reply.",
        "H2 sends the ICMP Echo Reply back to H1.",
        "The bridge forwards the reply frame back to H1's segment.",
        "H1 receives the reply. Capture complete!"
    ];

    const runAnimation = async () => {
        setIsAnimating(true);
        setCapturedPackets([]);
        setStep(1);

        const checkCapture = (stepNum: number, packetDesc: string) => {
            if (
                (listeningOn === 'h1' && (stepNum === 1 || stepNum === 4)) ||
                (listeningOn === 'h2' && (stepNum === 2 || stepNum === 3)) ||
                (listeningOn === 'bridge' && stepNum >= 1 && stepNum <= 4)
            ) {
                 setTimeout(() => {
                    setCapturedPackets(prev => [...prev, packetDesc]);
                    toast({ title: 'Packet Captured!', description: packetDesc });
                }, 500);
            }
        };

        checkCapture(1, "H1 -> H2 (Request)");
        await new Promise(r => setTimeout(r, 1000));
        setStep(2);
        
        checkCapture(2, "H1 -> H2 (Request)");
        await new Promise(r => setTimeout(r, 1000));
        setStep(3);

        checkCapture(3, "H2 -> H1 (Reply)");
        await new Promise(r => setTimeout(r, 1000));
        setStep(4);
        
        checkCapture(4, "H2 -> H1 (Reply)");
        await new Promise(r => setTimeout(r, 1000));
        
        setStep(0);
        setIsAnimating(false);
    };
    
    const reset = () => {
        setIsAnimating(false);
        setStep(0);
        setCapturedPackets([]);
    }

    const getPacketPosition = () => {
        if (step === 1) return { left: '10%', top: '50%', opacity: 1, transition: { duration: 0 } };
        if (step === 2) return { left: '48%', top: '50%', opacity: 1, transition: { duration: 1 } };
        if (step === 3) return { left: '85%', top: '50%', opacity: 1, transition: { duration: 1 } };
        if (step === 4) return { left: '48%', top: '50%', opacity: 1, transition: { duration: 1 } };
        return { opacity: 0 };
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <Button asChild variant="ghost" className="mb-8 font-['Inter',_sans-serif]">
                <Link href="/docs/notes/frr-exercises/exercise2/capture-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="container" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div className="title-text" style={{ fontFamily: "'Press Start 2P', cursive" }}>Packet Capture Visualizer</div>
                <div id="animationCanvas" className="relative w-full h-64 bg-[#1e1e1e] border-2 border-[#00ffff] rounded-md my-6 overflow-hidden">
                    {/* Hosts and Bridge */}
                    <div className="absolute left-[10%] top-1/2 -translate-y-1/2 text-center">
                        <FileText className="w-10 h-10 mx-auto text-[#ff00ff]"/>
                        <p>h1</p>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <Waypoints className="w-10 h-10 mx-auto text-[#00ffff]"/>
                        <p>bridge</p>
                    </div>
                    <div className="absolute left-[90%] top-1/2 -translate-y-1/2 text-center">
                        <FileText className="w-10 h-10 mx-auto text-[#ff00ff]"/>
                        <p>h2</p>
                    </div>
                     <div className="absolute w-[80%] h-0.5 bg-white/30 top-1/2 left-[10%]"/>
                     <AnimatePresence>
                        {step > 0 && (
                            <motion.div className="absolute" initial={{left: '10%', top: '50%', opacity: 0}} animate={getPacketPosition()}>
                                <Send className="w-6 h-6 text-yellow-400"/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                 <div className="controls flex-col md:flex-row gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div className="space-y-2">
                            <Label htmlFor="listener-select" className="text-sm font-semibold">Listening Interface:</Label>
                            <Select value={listeningOn} onValueChange={setListeningOn} disabled={isAnimating}>
                                <SelectTrigger id="listener-select" className="bg-[#1e1e1e] border-[#555]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="h1">h1</SelectItem>
                                    <SelectItem value="bridge">bridge</SelectItem>
                                    <SelectItem value="h2">h2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={runAnimation} disabled={isAnimating} className="btn-start flex-1">Send Ping</Button>
                            <Button onClick={reset} className="btn-reset flex-1">Reset</Button>
                        </div>
                    </div>
                </div>
                <div id="command" className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-5 h-5 text-yellow-400"/>
                        <h3 className="font-semibold">Captured Packets on {listeningOn}:</h3>
                    </div>
                     <div className="bg-[#1e1e1e] border border-[#00ffff] p-4 rounded-md min-h-[100px] text-xs font-mono">
                         <AnimatePresence>
                        {capturedPackets.map((packet, i) => (
                            <motion.p key={i} initial={{opacity:0, y:5}} animate={{opacity:1, y:0}}>{new Date().toLocaleTimeString()}: {packet}</motion.p>
                        ))}
                        </AnimatePresence>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default PacketCaptureVisualizer;
