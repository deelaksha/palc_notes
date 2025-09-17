
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Server, Mail, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from '@/hooks/use-toast';

const nodes = {
    'user': { id: 'user', name: 'You', ip: '192.168.1.10', x: '10%', y: '50%', table: { '0.0.0.0/0': 'router1' } },
    'router1': { id: 'router1', name: 'Home Router', ip: '192.168.1.1', x: '30%', y: '50%', table: { '0.0.0.0/0': 'router2' } },
    'router2': { id: 'router2', name: 'ISP Router', ip: '203.0.113.1', x: '50%', y: '50%', table: { '8.8.8.0/24': 'router3' } },
    'router3': { id: 'router3', name: 'Google Router', ip: '8.8.8.1', x: '70%', y: '50%', table: { '8.8.8.8/32': 'server' } },
    'server': { id: 'server', name: 'Google DNS', ip: '8.8.8.8', x: '90%', y: '50%', table: {} },
};

const Packet = ({ animate, isVisible }: { animate: any; isVisible: boolean }) => (
    <motion.div
        initial={{ left: '10%', top: '50%', opacity: 0 }}
        animate={animate}
        className="absolute z-10"
    >
        {isVisible && <Mail className="w-8 h-8 text-neon-pink" />}
    </motion.div>
);

export function RoutingGame() {
    const { toast } = useToast();
    const [step, setStep] = useState(0);
    const path = ['user', 'router1', 'router2', 'router3', 'server'];
    const currentNode = nodes[path[step] as keyof typeof nodes];

    const handleNextHop = () => {
        if (step < path.length - 1) {
            const nextNodeKey = path[step + 1];
            const nextNode = nodes[nextNodeKey as keyof typeof nodes];
            const rule = currentNode.table ? Object.keys(currentNode.table)[0] : "N/A";
            const decision = currentNode.table ? `Found rule '${rule}', forwarding to ${nextNode.name}` : 'Destination reached!';
            
            toast({
                title: `Packet at ${currentNode.name}`,
                description: `Looking for 8.8.8.8... ${decision}`
            });
            setStep(s => s + 1);
        } else {
            toast({ title: 'Success!', description: 'Packet arrived at the destination.' });
        }
    };
    
    const handleReset = () => {
        setStep(0);
        toast({title: 'Reset'});
    }

    const packetAnimation = {
        left: currentNode.x,
        top: currentNode.y,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100, damping: 20 },
    };

    return (
        <div className="w-full glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 flex flex-col md:flex-row gap-6">
            <div className="flex-grow relative h-64 md:h-auto">
                {Object.values(nodes).map(node => (
                    <div key={node.id} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center" style={{ left: node.x, top: node.y, width: '80px' }}>
                        {node.id.includes('router') ? <Route className="w-10 h-10 text-neon-green" /> : node.id === 'user' ? <Laptop className="w-10 h-10 text-neon-blue"/> : <Server className="w-10 h-10 text-neon-blue"/>}
                        <p className="text-xs font-bold">{node.name}</p>
                        <p className="text-xs font-mono text-gray-400">{node.ip}</p>
                    </div>
                ))}
                 <div className="absolute w-[80%] h-0.5 bg-white/20 top-1/2 left-[10%] -translate-y-1/2 -z-10" />
                 <Packet animate={packetAnimation} isVisible={step >= 0} />
            </div>

            <div className="md:w-96 space-y-4">
                 <div>
                    <h3 className="text-lg font-bold text-neon-pink">Controls</h3>
                    <div className="flex flex-col gap-2 mt-2">
                        <Button onClick={handleNextHop} disabled={step === path.length - 1}>Next Hop</Button>
                        <Button onClick={handleReset} variant="outline">Reset</Button>
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-bold">Current Routing Table: <span className="text-amber-400">{currentNode.name}</span></h3>
                    <div className="bg-dark-primary p-2 rounded-lg mt-2 text-xs">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Destination</TableHead>
                                    <TableHead>Next Hop</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {currentNode.table && Object.keys(currentNode.table).length > 0 ? Object.entries(currentNode.table).map(([dest, hop]) => (
                                    <TableRow key={dest}>
                                        <TableCell className="font-mono">{dest}</TableCell>
                                        <TableCell className="font-mono">{nodes[hop as keyof typeof nodes].name}</TableCell>
                                    </TableRow>
                                )) : <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground h-16">End of the line!</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
