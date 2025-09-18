
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, ArrowLeft, Ear, Route, FileText } from 'lucide-react';
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

const nodes = {
  h1: { x: '10%', y: '15%' },
  h2: { x: '35%', y: '15%' },
  r1: { x: '22.5%', y: '65%' },
  r2: { x: '77.5%', y: '65%' },
  h3: { x: '65%', y: '15%' },
  h4: { x: '90%', y: '15%' },
};

const CapturePracticalPage = () => {
    const { toast } = useToast();
    const [isAnimating, setIsAnimating] = useState(false);
    const [listeningOn, setListeningOn] = useState('r1');
    const [capturedPackets, setCapturedPackets] = useState<string[]>([]);
    const [packetPath, setPacketPath] = useState<string[]>([]);
    
    const runAnimation = async () => {
        setIsAnimating(true);
        setCapturedPackets([]);
        
        const path = ['h1', 'r1', 'r2', 'h3'];
        setPacketPath(path);
        
        const descriptions = [
            "Ping from h1 to h3 initiated.",
            "Packet arrives at r1. r1 forwards it to r2.",
            "Packet arrives at r2. r2 forwards it to h3.",
            "Packet arrives at h3.",
        ];
        const packets = [
            "h1 > h3: ICMP echo request",
            "h1 > h3: ICMP echo request",
            "h1 > h3: ICMP echo request",
        ];

        for (let i = 0; i < path.length - 1; i++) {
            toast({ title: "Packet Sent!", description: descriptions[i] });
            
            const fromNode = path[i];
            const toNode = path[i+1];

            if (listeningOn === fromNode || listeningOn === toNode) {
                 setTimeout(() => {
                    const intf = fromNode.startsWith('r') ? `${fromNode}-${toNode}-arms` : `${fromNode}-${toNode}-arms`;
                    setCapturedPackets(prev => [...prev, `[${intf}] ${packets[i]}`]);
                }, 500);
            }
            
             await new Promise(r => setTimeout(r, 1500));
        }

        setIsAnimating(false);
        setPacketPath([]);
    };
    
    const getPacketPosition = (step: number) => {
        if (!isAnimating || step >= packetPath.length) return { opacity: 0 };
        const node = nodes[packetPath[step] as keyof typeof nodes];
        return { ...node, opacity: 1, transition: { duration: 1.2 } };
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise4/capture-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="glass-effect rounded-2xl p-6 border-2 border-border space-y-6">
                 <h1 className="text-2xl font-bold text-center text-primary font-mono">Dual-Router Packet Capture</h1>
                <div id="animationCanvas" className="relative w-full h-64 bg-dark-primary rounded-lg border-2 border-primary/50 overflow-hidden">
                    {Object.keys(nodes).map(key => {
                        const node = nodes[key as keyof typeof nodes];
                        const isRouter = key.startsWith('r');
                        return (
                             <div key={key} className="absolute text-center" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}>
                                 {listeningOn === key && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
                                {isRouter ? <Route className="w-12 h-12 mx-auto text-neon-green"/> : <FileText className="w-10 h-10 mx-auto text-neon-blue"/>}
                                <p>{key}</p>
                            </div>
                        )
                    })}
                    <svg className="absolute w-full h-full" style={{top: 0, left: 0}}><line x1="10%" y1="15%" x2="22.5%" y2="65%" stroke="white" strokeOpacity="0.2" /><line x1="35%" y1="15%" x2="22.5%" y2="65%" stroke="white" strokeOpacity="0.2" /><line x1="65%" y1="15%" x2="77.5%" y2="65%" stroke="white" strokeOpacity="0.2" /><line x1="90%" y1="15%" x2="77.5%" y2="65%" stroke="white" strokeOpacity="0.2" /><line x1="22.5%" y1="65%" x2="77.5%" y2="65%" stroke="white" strokeOpacity="0.2" /></svg>
                    <AnimatePresence>
                        {packetPath.map((_, i) => (
                           i < packetPath.length -1 &&
                           <motion.div key={i} className="absolute" initial={getPacketPosition(i)} animate={getPacketPosition(i+1)}>
                               <Send className="w-6 h-6 text-yellow-400"/>
                           </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                        <Label htmlFor="listener-select">Listen on:</Label>
                        <Select value={listeningOn} onValueChange={setListeningOn} disabled={isAnimating}>
                            <SelectTrigger id="listener-select"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="r1">r1</SelectItem><SelectItem value="r2">r2</SelectItem><SelectItem value="h1">h1</SelectItem><SelectItem value="h2">h2</SelectItem><SelectItem value="h3">h3</SelectItem><SelectItem value="h4">h4</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <Button onClick={runAnimation} disabled={isAnimating} className="w-full bg-primary mt-6">Ping h1 to h3</Button>
                </div>
                <div id="command" className="mt-4">
                    <h3 className="font-semibold flex items-center gap-2"><Terminal className="w-5 h-5 text-yellow-400"/>tcpdump on {listeningOn}:</h3>
                     <div className="bg-dark-primary p-4 rounded-md min-h-[100px] text-xs font-mono mt-2">
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

export default CapturePracticalPage;
