
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Computer, Server, Send, Route, Rss, ArrowLeft, Terminal } from 'lucide-react';
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
  h1: { x: '15%', y: '15%', ip: '192.168.1.10' },
  h2: { x: '50%', y: '15%', ip: '192.168.2.10' },
  h3: { x: '85%', y: '15%', ip: '192.168.3.10' },
  router: { x: '50%', y: '75%', ip: '192.168.1.1, ...' },
};

const Node = ({ id, name, ip }: { id: string; name: string; ip: string }) => (
    <div className="absolute text-center" style={{ left: nodes[id as keyof typeof nodes].x, top: nodes[id as keyof typeof nodes].y, transform: 'translate(-50%, -50%)' }}>
        {id.startsWith('h') ? <Computer className="w-10 h-10 mx-auto text-neon-blue"/> : <Route className="w-12 h-12 mx-auto text-neon-green"/>}
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs font-mono text-gray-400">{ip}</p>
    </div>
);

const PingPacket = ({ from, to }: { from: string, to: string }) => {
    const fromPos = nodes[from as keyof typeof nodes];
    const toPos = nodes[to as keyof typeof nodes];
    const routerPos = nodes.router;

    return (
        <motion.div
            className="absolute z-10"
            initial={{ left: fromPos.x, top: fromPos.y }}
            animate={[
                { left: routerPos.x, top: routerPos.y, transition: { duration: 0.8 } },
                { left: toPos.x, top: toPos.y, transition: { duration: 0.8, delay: 0.2 } },
                { left: routerPos.x, top: routerPos.y, transition: { duration: 0.8, delay: 0.4 } },
                { left: fromPos.x, top: fromPos.y, transition: { duration: 0.8, delay: 0.6 } },
            ]}
        >
            <Send className="w-6 h-6 text-neon-pink"/>
        </motion.div>
    )
}

const NsPingPracticalPage = () => {
    const { toast } = useToast();
    const [source, setSource] = useState('h1');
    const [destination, setDestination] = useState('h2');
    const [isPinging, setIsPinging] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    
    const handlePing = async () => {
        if (source === destination) {
            toast({ title: 'Invalid', description: 'Source and destination cannot be the same.', variant: 'destructive'});
            return;
        }
        setIsPinging(true);
        setTerminalOutput([`Pinging from ${source} to ${destination}...`]);
        
        await new Promise(res => setTimeout(res, 3500)); 

        setTerminalOutput(prev => [...prev, `64 bytes from ${nodes[destination as keyof typeof nodes].ip}: icmp_seq=1 ttl=63 time=0.2ms`]);
        setIsPinging(false);
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise3/ns-ping-sh">
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
                                <SelectContent><SelectItem value="h1">h1</SelectItem><SelectItem value="h2">h2</SelectItem><SelectItem value="h3">h3</SelectItem></SelectContent>
                            </Select>
                        </div>
                         <div>
                            <Label htmlFor="dest-select">To:</Label>
                            <Select value={destination} onValueChange={setDestination}><SelectTrigger id="dest-select"><SelectValue/></SelectTrigger>
                                <SelectContent><SelectItem value="h1">h1</SelectItem><SelectItem value="h2">h2</SelectItem><SelectItem value="h3">h3</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button onClick={handlePing} disabled={isPinging} className="w-full bg-neon-green text-black hover:bg-white">
                        {isPinging ? 'Pinging...' : 'Send Ping'}
                    </Button>
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
                        {isPinging && <PingPacket from={source} to={destination} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NsPingPracticalPage;
