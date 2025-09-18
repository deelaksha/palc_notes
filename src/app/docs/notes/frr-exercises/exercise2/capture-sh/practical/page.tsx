
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Ear, Mail, Server, Laptop, Bridge, Terminal, Radio } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// New themed component based on user's provided HTML
const PacketCaptureVisualizer = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [explanation, setExplanation] = useState("Select an interface to listen on, then send a ping.");
  const [capturedPackets, setCapturedPackets] = useState<string[]>([]);
  const [listeningOn, setListeningOn] = useState('bridge');
  const [isAnimating, setIsAnimating] = useState(false);

  const scenarioText = [
    "Ready. Select an interface and click 'Send Ping'.",
    "H1 sends an ICMP Echo Request to H2...",
    "Packet crosses the network to the bridge...",
    "Bridge forwards packet...",
    `'tcpdump' on ${listeningOn} captures the incoming packet.`,
    "H2 receives ping and sends an Echo Reply...",
    "Reply crosses the network to the bridge...",
    "Bridge forwards reply...",
    `'tcpdump' on ${listeningOn} captures the outgoing reply.`,
    "Animation Complete."
  ];

  const runAnimation = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCapturedPackets([]);
    toast({ title: "Starting Ping", description: `Capturing on ${listeningOn}` });

    // Ping out
    setStep(1); setExplanation(scenarioText[1]); await new Promise(r => setTimeout(r, 500));
    setStep(2); setExplanation(scenarioText[2]); await new Promise(r => setTimeout(r, 1000));
    setStep(3); setExplanation(scenarioText[3]); await new Promise(r => setTimeout(r, 1000));
    setStep(4); setExplanation(scenarioText[4]);
    if (listeningOn === 'h1' || listeningOn === 'bridge') {
      setCapturedPackets(prev => [...prev, `${new Date().toLocaleTimeString()}: IP 10.0.0.1 > 10.0.0.2: ICMP echo request`]);
    }
    await new Promise(r => setTimeout(r, 1000));

    // Ping back
    setStep(5); setExplanation(scenarioText[5]); await new Promise(r => setTimeout(r, 500));
    setStep(6); setExplanation(scenarioText[6]); await new Promise(r => setTimeout(r, 1000));
    setStep(7); setExplanation(scenarioText[7]); await new Promise(r => setTimeout(r, 1000));
    setStep(8); setExplanation(scenarioText[8]);
    if (listeningOn === 'h2' || listeningOn === 'bridge') {
        setCapturedPackets(prev => [...prev, `${new Date().toLocaleTimeString()}: IP 10.0.0.2 > 10.0.0.1: ICMP echo reply`]);
    }
    await new Promise(r => setTimeout(r, 1000));

    setStep(9); setExplanation(scenarioText[9]);
    setIsAnimating(false);
  };
    
  const resetAnimation = () => {
    setStep(0);
    setExplanation(scenarioText[0]);
    setCapturedPackets([]);
    setIsAnimating(false);
  };

  const getPacketPosition = () => {
    if (step === 0 || step === 9) return { opacity: 0, x: '15%', y: '50%' };
    if (step === 1) return { opacity: 1, x: '15%', y: '50%', transition: { duration: 0 } };
    if (step === 2) return { opacity: 1, x: '50%', y: '50%', transition: { duration: 1 } };
    if (step === 3) return { opacity: 1, x: '85%', y: '50%', transition: { duration: 1 } };
    if (step === 4) return { opacity: 0, x: '85%', y: '50%', scale: 1.5, transition: { duration: 0.5 }};
    if (step === 5) return { opacity: 1, x: '85%', y: '50%', transition: { duration: 0 } };
    if (step === 6) return { opacity: 1, x: '50%', y: '50%', transition: { duration: 1 } };
    if (step === 7) return { opacity: 1, x: '15%', y: '50%', transition: { duration: 1 } };
    if (step === 8) return { opacity: 0, x: '15%', y: '50%', scale: 1.5, transition: { duration: 0.5 }};
    return { opacity: 0 };
  }

  const getReplyPacketPosition = () => {
      if (step < 5) return { opacity: 0 };
      return getPacketPosition();
  }


  return (
    <div className="p-6">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/docs/notes/frr-exercises/exercise2/capture-sh">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to capture.sh
        </Link>
      </Button>
      <div className="max-w-4xl mx-auto bg-[#2d2d2d] rounded-2xl shadow-lg border-2 border-[#555] p-6 space-y-6">
          <h1 className="font-['Press_Start_2P',_cursive] text-[#ff00ff] text-center text-xl">Packet Capture Visualizer</h1>
          
          <div id="animationCanvas" className="relative w-full h-[300px] bg-[#1e1e1e] border-2 border-[#00ffff] rounded-lg overflow-hidden">
            {/* Devices */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[15%] -translate-x-1/2 text-center text-white">
              <Laptop className="mx-auto w-10 h-10"/>
              <p className="text-xs font-mono mt-1">h1 (10.0.0.1)</p>
              {listeningOn === 'h1' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[50%] -translate-x-1/2 text-center text-white">
              <Bridge className="mx-auto w-10 h-10"/>
              <p className="text-xs font-mono mt-1">bridge</p>
              {listeningOn === 'bridge' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[85%] -translate-x-1/2 text-center text-white">
              <Server className="mx-auto w-10 h-10"/>
              <p className="text-xs font-mono mt-1">h2 (10.0.0.2)</p>
              {listeningOn === 'h2' && <Ear className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2"/>}
            </div>
            {/* Links */}
            <div className="absolute top-1/2 left-[15%] w-[70%] h-0.5 bg-white/20" />

            {/* Packets */}
            <AnimatePresence>
              <motion.div className="absolute top-0 left-0" initial={false} animate={getPacketPosition()}>
                <Mail className="w-8 h-8 text-neon-pink" />
              </motion.div>
            </AnimatePresence>
          </div>

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
            <div className="flex gap-4">
                <Button onClick={runAnimation} disabled={isAnimating} className="w-full bg-[#00ffff] text-black font-bold uppercase tracking-wider shadow-[0_4px_#00ffff] hover:translate-y-[-2px] hover:shadow-[0_6px_#00ffff] transition-all">Send Ping</Button>
                <Button onClick={resetAnimation} disabled={isAnimating} className="w-full bg-[#ff00ff] text-black font-bold uppercase tracking-wider shadow-[0_4px_#ff00ff] hover:translate-y-[-2px] hover:shadow-[0_6px_#ff00ff] transition-all">Reset</Button>
            </div>
          </div>
          
          <div id="explanation" className="bg-[#1a1a1a] text-[#4CAF50] font-['Press_Start_2P',_cursive] p-4 rounded-md border border-[#ff00ff] text-center min-h-[4rem] flex items-center justify-center text-xs">
            {explanation}
          </div>
          
          <div id="command" className="bg-[#1a1a1a] text-[#ffc107] font-mono p-4 rounded-md border border-[#00ffff] min-h-[6rem]">
             <p className="text-gray-400">$ sudo tcpdump -i {listeningOn === 'h1' ? 'v1-arms' : listeningOn === 'h2' ? 'v2-arms' : 'br0-arms'} -n</p>
             <AnimatePresence>
                {capturedPackets.map((packet, index) => (
                  <motion.p key={index} initial={{opacity:0, y:5}} animate={{opacity:1, y:0}}>{packet}</motion.p>
                ))}
              </AnimatePresence>
          </div>
      </div>
    </div>
  );
};

export default PacketCaptureVisualizer;
