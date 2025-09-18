
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Ear, Mail, Terminal, Wifi, Laptop, Server } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast';

const nodes = {
    h1: { x: '15%', y: '50%' },
    br0: { x: '50%', y: '50%' },
    h2: { x: '85%', y: '25%' },
    h3: { x: '85%', y: '75%' },
};

const PacketCaptureVisualizer = () => {
    const { toast } = useToast();
    const [isAnimating, setIsAnimating] = useState(false);
    const [capturedPackets, setCapturedPackets] = useState<string[]>([]);
    const [interfaceToWatch, setInterfaceToWatch] = useState('br0-arms');
    const [packetState, setPacketState] = useState({ from: 'h1', to: 'h2', step: 0 });

    const explanationText = [
        "Ready to begin. Select an interface to listen on with 'tcpdump', then click 'Send Packet'.",
        "Step 1: H1 sends a packet to H2.",
        "Step 2: The packet travels across the virtual link to the bridge.",
        "Step 3: The bridge forwards the packet to H2.",
        "Animation Complete! The packet reached its destination."
    ];

    const runAnimation = async () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        setCapturedPackets([]);
        
        const path = ['h1', 'br0', 'h2'];
        
        for (let i = 0; i < path.length - 1; i++) {
            const fromNode = path[i];
            const toNode = path[i+1];
            
            setPacketState({ from: fromNode, to: toNode, step: i + 1 });
            
            const currentInterfaceName = `v${fromNode.replace('h', '')}-${SUFFIX}`;
            const isListening = interfaceToWatch === 'br0-arms' || interfaceToWatch === currentInterfaceName;

            if (isListening) {
                 toast({title: `Packet seen on ${interfaceToWatch}!`});
                 setCapturedPackets(prev => [...prev, `IP 10.0.1.1 > 10.0.1.2: ICMP echo request`]);
            }
            
            await new Promise(r => setTimeout(r, 1200));
        }

        setPacketState(s => ({...s, step: 0})); // Hide packet
        setIsAnimating(false);
    };
    
    const resetAnimation = () => {
        setIsAnimating(false);
        setCapturedPackets([]);
        setPacketState({ from: 'h1', to: 'h2', step: 0 });
    };

    const getPacketPosition = () => {
        if (packetState.step === 0) return { opacity: 0 };
        const fromPos = nodes[packetState.from as keyof typeof nodes];
        const toPos = nodes[packetState.to as keyof typeof nodes];
        
        return {
            left: [fromPos.x, toPos.x],
            top: [fromPos.y, toPos.y],
            opacity: 1,
            transition: { duration: 1, ease: 'linear' }
        };
    }

    const SUFFIX = 'arms';

    return (
        <div className="container mx-auto p-6 max-w-5xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/capture.sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl shadow-lg border border-border">
                    <h1 className="text-2xl font-bold text-center text-primary font-mono mb-4">Packet Capture Visualizer</h1>
                    {/* Animation Canvas */}
                    <div className="relative w-full h-80 bg-dark-primary rounded-lg border-2 border-primary/50 overflow-hidden">
                        {/* Devices */}
                        {Object.entries(nodes).map(([id, pos]) => (
                            <div key={id} className="absolute text-center -translate-x-1/2 -translate-y-1/2" style={{left: pos.x, top: pos.y}}>
                                {id.startsWith('h') ? <Laptop className="w-8 h-8"/> : <Wifi className="w-10 h-10 text-neon-green"/>}
                                <span className="font-mono text-xs">{id}-{SUFFIX}</span>
                                {interfaceToWatch === `${id}-${SUFFIX}` && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
                            </div>
                        ))}
                         {/* Links */}
                        <svg className="absolute w-full h-full top-0 left-0" style={{pointerEvents: 'none'}}>
                            <line x1={nodes.h1.x} y1={nodes.h1.y} x2={nodes.br0.x} y2={nodes.br0.y} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                            <line x1={nodes.br0.x} y1={nodes.br0.y} x2={nodes.h2.x} y2={nodes.h2.y} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                            <line x1={nodes.br0.x} y1={nodes.br0.y} x2={nodes.h3.x} y2={nodes.h3.y} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                        </svg>

                        {/* Packet */}
                        <AnimatePresence>
                        {isAnimating && (
                             <motion.div className="absolute" initial={{opacity: 0}} animate={getPacketPosition()}>
                                <Mail className="w-8 h-8 text-neon-pink" />
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </div>
                 {/* Controls and Log */}
                <div className="space-y-4">
                    <div className="bg-card p-4 rounded-2xl border border-border h-full flex flex-col gap-4">
                        <div>
                             <label className="text-sm font-bold">Interface to watch:</label>
                             <Select value={interfaceToWatch} onValueChange={setInterfaceToWatch}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={`br0-${SUFFIX}`}>br0-{SUFFIX} (Bridge)</SelectItem>
                                    <SelectItem value={`h1-${SUFFIX}`}>v1-{SUFFIX} (in h1)</SelectItem>
                                     <SelectItem value={`h2-${SUFFIX}`}>v2-{SUFFIX} (in h2)</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                        <div className="flex justify-center gap-4">
                            <Button onClick={runAnimation} disabled={isAnimating} className="bg-primary hover:bg-primary/90">Send Packet</Button>
                            <Button onClick={resetAnimation} variant="outline">Reset</Button>
                        </div>
                         <div className="bg-dark-primary text-amber-400 font-mono p-4 mt-4 rounded-lg border border-secondary text-xs min-h-[6rem] flex-grow">
                           <p className="text-gray-400 mb-2">$ sudo tcpdump -i {interfaceToWatch} -n</p>
                           <AnimatePresence>
                           {capturedPackets.map((packet, index) => (
                               <motion.p key={index} initial={{opacity:0, y:5}} animate={{opacity:1, y:0}}>
                                   {packet}
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

    