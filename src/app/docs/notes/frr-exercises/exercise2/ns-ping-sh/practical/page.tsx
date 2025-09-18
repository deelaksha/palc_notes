'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Computer, Server, Send, Waypoints, Rss, ArrowLeft, Terminal, Code } from 'lucide-react';
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

const scriptContent = `#!/bin/bash
# ... (defaults and usage)

# Parse arguments
SUFFIX="\${1:-\$USERNAME}"
SRC_HOST="\${2:-h1}"
DST_HOST="\${3:-h2}"
COUNT="\${4:-5}"

# Validate hosts
if [[ ! "$SRC_HOST" =~ ^h[1-3]$ ]]; then
    echo "Error: Source host must be h1, h2, or h3"
    exit 1
fi
# ... (more validation)

# Map host names to IP addresses
declare -A HOST_IPS
HOST_IPS["h1"]="10.0.0.1"
HOST_IPS["h2"]="10.0.0.2"
HOST_IPS["h3"]="10.0.0.3"

SRC_NS="$SRC_HOST-$SUFFIX"
DST_IP="\${HOST_IPS[$DST_HOST]}"

echo "Pinging from $SRC_NS to $DST_HOST..."

# Execute ping
sudo ip netns exec "$SRC_NS" ping -c "$COUNT" "$DST_IP"
`;

const lineHighlights = {
    start: [4, 5, 6, 7],
    validate: [10, 11, 12, 13],
    map: [17, 18, 19, 20],
    execute: [26, 27],
};


const nodes = {
  h1: { x: '15%', y: '25%' },
  h2: { x: '50%', y: '25%' },
  h3: { x: '85%', y: '25%' },
  bridge: { x: '50%', y: '75%' },
};

const Node = ({ id, name, ip }: { id: string; name: string; ip: string }) => (
    <div className="absolute text-center" style={{ left: nodes[id as keyof typeof nodes].x, top: nodes[id as keyof typeof nodes].y, transform: 'translate(-50%, -50%)' }}>
        <Computer className="w-10 h-10 mx-auto text-neon-blue"/>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs font-mono text-gray-400">{ip}</p>
    </div>
);

const Bridge = () => (
    <div className="absolute text-center" style={{ left: nodes.bridge.x, top: nodes.bridge.y, transform: 'translate(-50%, -50%)' }}>
        <Waypoints className="w-12 h-12 mx-auto text-neon-green"/>
        <p className="text-sm font-bold">Bridge</p>
    </div>
);

const PingPacket = ({ from, to }: { from: string, to: string }) => {
    const fromPos = nodes[from as keyof typeof nodes];
    const toPos = nodes[to as keyof typeof nodes];
    const bridgePos = nodes.bridge;

    return (
        <motion.div
            className="absolute z-10"
            initial={{ left: fromPos.x, top: fromPos.y }}
            animate={[
                { left: bridgePos.x, top: bridgePos.y, transition: { duration: 0.8 } },
                { left: toPos.x, top: toPos.y, transition: { duration: 0.8, delay: 0.2 } },
                { left: bridgePos.x, top: bridgePos.y, transition: { duration: 0.8, delay: 0.4 } },
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
    const [highlightedLines, setHighlightedLines] = useState<number[]>([]);
    
    const handlePing = async () => {
        if (source === destination) {
            toast({ title: 'Invalid', description: 'Source and destination cannot be the same.', variant: 'destructive'});
            return;
        }
        setIsPinging(true);
        setTerminalOutput([`Pinging from ${source} to ${destination}...`]);
        
        setHighlightedLines(lineHighlights.start);
        await new Promise(res => setTimeout(res, 800));

        setHighlightedLines(lineHighlights.validate);
        await new Promise(res => setTimeout(res, 800));
        
        setHighlightedLines(lineHighlights.map);
        await new Promise(res => setTimeout(res, 800));

        setHighlightedLines(lineHighlights.execute);
        await new Promise(res => setTimeout(res, 2500)); 

        setTerminalOutput(prev => [...prev, `64 bytes from 10.0.0.${destination[1]}: icmp_seq=1 ttl=64 time=0.1ms`]);
        setIsPinging(false);
        setHighlightedLines([]);
    }

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise2/ns-ping-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Controls */}
                <div className="lg:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4 self-start">
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

                {/* Visualization and Code */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                        <h2 className="text-xl font-bold text-neon-blue mb-4">Network Topology</h2>
                        <div className="relative w-full h-64 bg-dark-primary rounded-lg">
                            <Node id="h1" name="h1" ip="10.0.0.1" />
                            <Node id="h2" name="h2" ip="10.0.0.2" />
                            <Node id="h3" name="h3" ip="10.0.0.3" />
                            <Bridge />
                            {isPinging && <PingPacket from={source} to={destination} />}
                        </div>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border-2 border-purple-500/50">
                         <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2 mb-4"><Code/> Script Execution</h2>
                        <pre className="bg-dark-primary p-4 rounded-lg text-xs font-mono overflow-x-auto">
                            {scriptContent.split('\n').map((line, i) => (
                                <motion.div 
                                    key={i} 
                                    animate={{ backgroundColor: highlightedLines.includes(i) ? 'rgba(139, 92, 246, 0.3)' : 'transparent' }}
                                    className="transition-colors duration-300"
                                >
                                    {line}
                                </motion.div>
                            ))}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NsPingPracticalPage;
