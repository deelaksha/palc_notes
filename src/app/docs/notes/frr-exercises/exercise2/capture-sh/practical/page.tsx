'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Send, ArrowLeft, Waypoints, Ear } from 'lucide-react';
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
    const [step, setStep] = useState(0); 

    const runAnimation = async () => {
        setIsAnimating(true);
        setCapturedPackets([]);
        
        const path = ['h1', 'bridge', 'h2', 'bridge', 'h1'];
        const descriptions = [
            "H1 sends an ICMP Echo Request to H2.",
            "The bridge receives the frame and forwards it to the segment H2 is on.",
            "H2 receives the ping and sends an ICMP Echo Reply.",
            "The bridge forwards the reply frame back to H1's segment.",
            "H1 receives the reply. Capture complete!"
        ];
        const packets = [
            "H1 -> H2 (Request)", "H1 -> H2 (Request)", "H2 -> H1 (Reply)", "H2 -> H1 (Reply)"
        ];

        for(let i=0; i < path.length - 1; i++) {
            setStep(i + 1);
            toast({ title: "Packet Sent!", description: descriptions[i]});
            
            const checkCapture = () => {
                if (path[i] === listeningOn || path[i+1] === listeningOn || listeningOn === 'bridge' ) {
                     setTimeout(() => {
                        setCapturedPackets(prev => [...prev, packets[i]]);
                        toast({ title: 'Packet Captured!', description: packets[i] });
                    }, 500);
                }
            }
            checkCapture();
            await new Promise(r => setTimeout(r, 1500));
        }
        
        setStep(0);
        setIsAnimating(false);
    };
    
    const reset = () => {
        setIsAnimating(false);
        setStep(0);
        setCapturedPackets([]);
    }

    const getPacketPosition = () => {
        const positions = {
            h1: { left: '10%', top: '50%'},
            bridge: { left: '48%', top: '50%'},
            h2: { left: '85%', top: '50%'},
        };
        const path = ['h1', 'bridge', 'h2', 'bridge', 'h1'];
        if (step > 0 && step < path.length) {
            return { ...positions[path[step] as keyof typeof positions], opacity: 1, transition: { duration: 1.2 } };
        }
        return { opacity: 0 };
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise2/capture-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                 <h1 className="text-2xl font-bold text-center text-primary font-mono">Packet Capture Visualizer</h1>
                <div id="animationCanvas" className="relative w-full h-48 bg-dark-primary rounded-lg border-2 border-primary/50 overflow-hidden">
                    {/* Hosts and Bridge */}
                    <div className="absolute left-[10%] top-1/2 -translate-y-1/2 text-center">
                        {listeningOn === 'h1' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
                        <FileText className="w-10 h-10 mx-auto text-neon-blue"/>
                        <p>h1</p>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                         {listeningOn === 'bridge' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
                        <Waypoints className="w-10 h-10 mx-auto text-neon-green"/>
                        <p>bridge</p>
                    </div>
                    <div className="absolute left-[90%] top-1/2 -translate-y-1/2 text-center">
                         {listeningOn === 'h2' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
                        <FileText className="w-10 h-10 mx-auto text-neon-blue"/>
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
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                        <Label htmlFor="listener-select" className="text-sm font-semibold">Listen on:</Label>
                        <Select value={listeningOn} onValueChange={setListeningOn} disabled={isAnimating}>
                            <SelectTrigger id="listener-select" className="bg-card-nested border-border">
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
                        <Button onClick={runAnimation} disabled={isAnimating} className="w-full bg-primary">Send Ping</Button>
                        <Button onClick={reset} variant="outline" className="w-full">Reset</Button>
                    </div>
                </div>
                <div id="command" className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-5 h-5 text-yellow-400"/>
                        <h3 className="font-semibold">tcpdump on {listeningOn}:</h3>
                    </div>
                     <div className="bg-dark-primary p-4 rounded-md min-h-[100px] text-xs font-mono">
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
