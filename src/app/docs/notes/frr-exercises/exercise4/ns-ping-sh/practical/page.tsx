'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Computer, Server, Send, Route, Rss, ArrowLeft, Terminal, FileCode } from 'lucide-react';
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
  h1: { x: '10%', y: '15%', ip: '192.168.1.10' },
  h2: { x: '35%', y: '15%', ip: '192.168.2.10' },
  r1: { x: '22.5%', y: '75%', ip: '10.0.0.1' },
  r2: { x: '77.5%', y: '75%', ip: '10.0.0.2' },
  h3: { x: '65%', y: '15%', ip: '192.168.3.10' },
  h4: { x: '90%', y: '15%', ip: '192.168.4.10' },
};

const Node = ({ id, name, ip }: { id: string; name: string; ip: string }) => (
    <div className="absolute text-center" style={{ left: nodes[id as keyof typeof nodes].x, top: nodes[id as keyof typeof nodes].y, transform: 'translate(-50%, -50%)' }}>
        {id.startsWith('h') ? <Computer className="w-10 h-10 mx-auto text-neon-blue"/> : <Route className="w-12 h-12 mx-auto text-neon-green"/>}
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs font-mono text-gray-400">{ip}</p>
    </div>
);

const PingPacket = ({ path }: { path: string[] }) => {
    if (path.length < 2) return null;

    const sequence = path.map(nodeId => ({
        ...nodes[nodeId as keyof typeof nodes],
        transition: { duration: 0.8 },
    }));

    return (
         <motion.div
            className="absolute z-10"
            initial={{ left: sequence[0].x, top: sequence[0].y }}
            animate={sequence}
        >
            <Send className="w-6 h-6 text-neon-pink"/>
        </motion.div>
    )
}

const NsPingPracticalPage = () => {
    const { toast } = useToast();
    const [source, setSource] = useState('h1');
    const [destination, setDestination] = useState('h4');
    const [isPinging, setIsPinging] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    
    const getPath = (src: string, dest: string) => {
        const path = [src];
        const sourceRouter = src === 'h1' || src === 'h2' ? 'r1' : 'r2';
        const destRouter = dest === 'h1' || dest === 'h2' ? 'r1' : 'r2';

        path.push(sourceRouter);
        if(sourceRouter !== destRouter) path.push(destRouter);
        path.push(dest);
        return path;
    };
    
    const path = getPath(source, destination);

    const steps = [
        { exp: "Select source and destination, then click 'Send Ping'.", code: "" },
        { exp: "The script determines the routing path and expected TTL based on the hosts' parent routers.", code: "SRC_ROUTER=\"${HOST_ROUTERS[$SRC_HOST]}\"\nDST_ROUTER=\"${HOST_ROUTERS[$DST_HOST]}\"" },
        { exp: `The ping command is executed from ${source}'s namespace.`, code: `sudo ip netns exec ${source}-arms ping ...`},
        { exp: `Packet travels the path: ${path.join(' -> ')}`, code: "(ICMP echo request)"},
        { exp: `A successful reply with a TTL of ${path.length === 3 ? 63 : 62} confirms the path.`, code: `(ICMP echo reply)` }
    ];

    const handlePing = async () => {
        if (source === destination) {
            toast({ title: 'Invalid', description: 'Source and destination cannot be the same.', variant: 'destructive'});
            return;
        }
        setIsPinging(true);
        setCurrentStep(1);
        setTerminalOutput([`Pinging from ${source} to ${destination}...`]);
        await new Promise(res => setTimeout(res, 1000));
        
        setCurrentStep(2);
        await new Promise(res => setTimeout(res, 1000));

        setCurrentStep(3);
        const animationDuration = (path.length - 1) * 800 + (path.length - 2) * 200 + 400;
        await new Promise(res => setTimeout(res, animationDuration));
        
        setCurrentStep(4);
        const destIp = nodes[destination as keyof typeof nodes].ip;
        const ttl = 64 - (path.length - 1);
        setTerminalOutput(prev => [...prev, `64 bytes from ${destIp}: icmp_seq=1 ttl=${ttl} time=0.3ms`]);
        
        setTimeout(() => {
            setIsPinging(false);
            setCurrentStep(0);
        }, 2000);
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise4/ns-ping-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4 self-start">
                     <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Rss/> Ping Controls</h2>
                    <div className="flex gap-4">
                        <div>
                            <Label htmlFor="source-select">From:</Label>
                            <Select value={source} onValueChange={setSource}><SelectTrigger id="source-select"><SelectValue/></SelectTrigger>
                                <SelectContent>{Object.keys(nodes).filter(k => k.startsWith('h')).map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                         <div>
                            <Label htmlFor="dest-select">To:</Label>
                            <Select value={destination} onValueChange={setDestination}><SelectTrigger id="dest-select"><SelectValue/></SelectTrigger>
                                 <SelectContent>{Object.keys(nodes).filter(k => k.startsWith('h')).map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button onClick={handlePing} disabled={isPinging} className="w-full bg-neon-green text-black hover:bg-white">
                        {isPinging ? 'Pinging...' : 'Send Ping'}
                    </Button>
                     <div className="bg-card-nested p-4 rounded-lg border border-secondary text-center space-y-2">
                       <p className="font-semibold text-accent min-h-[1rem] flex items-center justify-center">{steps[currentStep].exp}</p>
                       {steps[currentStep].code && (
                           <code className="text-xs text-amber-400 bg-black/30 p-2 rounded-md inline-block whitespace-pre-wrap"><FileCode className="inline-block mr-2 h-4 w-4"/>{steps[currentStep].code}</code>
                       )}
                    </div>
                     <div className="bg-dark-primary p-4 rounded-lg font-mono text-xs min-h-[100px]">
                        <p className="text-gray-400">$ ./ns-ping.sh arms {source} {destination}</p>
                        <AnimatePresence>
                        {terminalOutput.map((line, i) => (
                            <motion.p key={i} initial={{opacity:0}} animate={{opacity:1}}>{line}</motion.p>
                        ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">Network Topology</h2>
                    <div className="relative w-full h-64 bg-dark-primary rounded-lg">
                        {Object.keys(nodes).map(key => <Node key={key} id={key} name={key} ip={nodes[key as keyof typeof nodes].ip} />)}
                        <AnimatePresence>{isPinging && <PingPacket path={path} />}</AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NsPingPracticalPage;
