
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Ear, Mail, Server, Laptop, Bridge } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const PacketCaptureVisualizer = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState("Select an interface to listen on, then send a ping.");
  const [capturedPackets, setCapturedPackets] = useState<string[]>([]);
  const [listeningOn, setListeningOn] = useState('h1');

  const explanationText = [
    "Ready. Select an interface and send a ping.",
    "H1 sends an ICMP Echo Request to H2.",
    "Packet travels across the virtual link.",
    `The 'tcpdump' listener on ${listeningOn} captures the packet.`,
    "H2 replies to H1.",
    `Listener on ${listeningOn} captures the reply.`,
    "Animation Complete."
  ];

  const runAnimation = async () => {
    if (step !== 0) return;
    
    setCapturedPackets([]);
    toast({ title: "Starting Ping", description: `Capturing on ${listeningOn}`});

    for (let i = 1; i <= 5; i++) {
        setStep(i);
        setExplanation(explanationText[i]);
        
        if (i === 3) {
            setCapturedPackets(prev => [...prev, `${new Date().toLocaleTimeString()}: IP 10.0.0.1 > 10.0.0.2: ICMP echo request`]);
        }
        if (i === 5 && listeningOn !== 'h2') {
             setCapturedPackets(prev => [...prev, `${new Date().toLocaleTimeString()}: IP 10.0.0.2 > 10.0.0.1: ICMP echo reply`]);
        }
        await new Promise(r => setTimeout(r, 1000));
    }
    setStep(6);
    setExplanation(explanationText[6]);
  };
    
  const resetAnimation = () => {
    setStep(0);
    setExplanation(explanationText[0]);
    setCapturedPackets([]);
  };

  const getPacketPosition = (isReply = false) => {
    const from = isReply ? { left: '80%' } : { left: '10%' };
    const to = isReply ? { left: '10%' } : { left: '80%' };
    const capturePoint = { left: '45%' };

    if (step === 1 && !isReply) return { ...from, opacity: 1, transition: { duration: 0 }};
    if (step === 2 && !isReply) return { ...to, opacity: 1, transition: { duration: 1 }};
    if (step === 3 && !isReply) return { ...to, opacity: 0, scale: 1.5, transition: { duration: 0.5 }};
    if (step === 4 && isReply) return { ...from, opacity: 1, transition: { duration: 0 }};
    if (step === 5 && isReply) return { ...to, opacity: 1, transition: { duration: 1 }};

    return { opacity: 0 };
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/docs/notes/frr-exercises/exercise2/capture-sh">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card p-6 rounded-2xl shadow-lg border border-border">
          <h1 className="text-2xl font-bold text-center text-primary font-mono mb-4">Packet Capture Visualizer</h1>
          <div className="relative w-full h-64 bg-dark-primary rounded-lg border-2 border-primary/50 overflow-hidden">
            {/* Devices */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[10%] text-center">
              <Laptop className="mx-auto w-8 h-8"/>
              <div className="font-mono text-xs">h1 (10.0.0.1)</div>
              {listeningOn === 'h1' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[45%] text-center">
              <Bridge className="mx-auto w-8 h-8"/>
              <div className="font-mono text-xs">bridge</div>
              {listeningOn === 'bridge' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[80%] text-center">
              <Server className="mx-auto w-8 h-8"/>
              <div className="font-mono text-xs">h2 (10.0.0.2)</div>
              {listeningOn === 'h2' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
            </div>
            {/* Links */}
            <div className="absolute top-1/2 left-[15%] w-[65%] h-0.5 bg-white/20" />
            {/* Packets */}
            <AnimatePresence>
              {step > 0 && step < 4 && <motion.div className="absolute top-1/2 -mt-4" initial={{left: '10%', opacity: 0}} animate={getPacketPosition()}><Mail className="w-8 h-8 text-neon-pink" /></motion.div>}
              {step > 3 && <motion.div className="absolute top-1/2 -mt-4" initial={{left: '80%', opacity: 0}} animate={getPacketPosition(true)}><Mail className="w-8 h-8 text-neon-green" /></motion.div>}
            </AnimatePresence>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-2xl border border-border h-full flex flex-col">
            <div className="space-y-4 mb-4">
                <Select value={listeningOn} onValueChange={setListeningOn} disabled={step > 0 && step < 6}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select interface to listen on..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="h1">Listen on h1</SelectItem>
                        <SelectItem value="bridge">Listen on bridge</SelectItem>
                        <SelectItem value="h2">Listen on h2</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex justify-center gap-4">
                    <Button onClick={runAnimation} disabled={step > 0 && step < 6} className="bg-primary hover:bg-primary/90">Send Ping</Button>
                    <Button onClick={resetAnimation} variant="outline">Reset</Button>
                </div>
            </div>
            <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center text-xs min-h-[4rem] flex-grow flex items-center justify-center">
              {explanation}
            </div>
            <div className="bg-dark-primary text-amber-400 font-mono p-4 mt-4 rounded-lg border border-secondary text-xs min-h-[6rem]">
              <p className="text-gray-400 mb-2">$ sudo tcpdump -i {listeningOn === 'h1' ? 'v1-arms' : listeningOn === 'h2' ? 'v2-arms' : 'br0-arms'} -n</p>
              <AnimatePresence>
                {capturedPackets.map((packet, index) => (
                  <motion.p key={index} initial={{opacity:0, y:5}} animate={{opacity:1, y:0}}>{packet}</motion.p>
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
