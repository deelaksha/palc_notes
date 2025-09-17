
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Server, Mail, Waypoints, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const hosts = [
    { id: 'A1', name: 'Host A1', mac: 'AA:..:A1', segment: 'A', top: '20%', left: '10%' },
    { id: 'A2', name: 'Host A2', mac: 'AA:..:A2', segment: 'A', top: '60%', left: '10%' },
    { id: 'B1', name: 'Host B1', mac: 'BB:..:B1', segment: 'B', top: '20%', left: '80%' },
    { id: 'B2', name: 'Host B2', mac: 'BB:..:B2', segment: 'B', top: '60%', left: '80%' },
];

const scenarios = [
    { from: 'A1', to: 'A2', description: 'Host A1 sends to Host A2 (same segment). Bridge learns A1, then correctly filters the frame.' },
    { from: 'A2', to: 'B1', description: 'Host A2 sends to Host B1 (different segment). Bridge learns A2, then forwards the frame to Segment B.' },
    { from: 'B1', to: 'A1', description: 'Host B1 sends to Host A1. Bridge already knows both locations, so it forwards efficiently.' },
    { from: 'A1', to: 'B2', description: 'Host A1 sends to Host B2 (unknown). Bridge learns A1, but must flood the frame to Segment B.' },
];

export function BridgeGame() {
    const { toast } = useToast();
    const [currentScenario, setCurrentScenario] = useState(0);
    const [macTable, setMacTable] = useState<{ [key: string]: string }>({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [frameState, setFrameState] = useState({ visible: false, from: 'A1', to: 'A2', at: 'start' });

    const runScenario = async () => {
        setIsAnimating(true);
        const scenario = scenarios[currentScenario];
        const fromHost = hosts.find(h => h.id === scenario.from)!;
        const toHost = hosts.find(h => h.id === scenario.to)!;
        
        // Initial state
        setFrameState({ visible: true, from: fromHost.id, to: toHost.id, at: 'start' });
        await new Promise(r => setTimeout(r, 500));

        // Move to bridge
        setFrameState(s => ({ ...s, at: 'bridge' }));
        toast({ title: 'Frame sent to Bridge', description: `Source: ${fromHost.mac}`});
        await new Promise(r => setTimeout(r, 1000));
        
        // Bridge learns source MAC
        if (!macTable[fromHost.mac]) {
            setMacTable(t => ({...t, [fromHost.mac]: fromHost.segment }));
            toast({ title: 'Bridge Learns!', description: `MAC Table updated: ${fromHost.mac} is on Segment ${fromHost.segment}`});
            await new Promise(r => setTimeout(r, 1000));
        }

        const destinationSegment = macTable[toHost.mac];
        if (destinationSegment) {
            if (destinationSegment === fromHost.segment) {
                toast({ title: 'Bridge Filters!', description: 'Destination is on the same segment. Frame is dropped.'});
                setFrameState(s => ({ ...s, at: 'filtered' }));
            } else {
                toast({ title: 'Bridge Forwards!', description: `Destination known on Segment ${destinationSegment}. Forwarding...`});
                setFrameState(s => ({ ...s, at: 'end' }));
            }
        } else {
            toast({ title: 'Bridge Floods!', description: 'Destination unknown. Forwarding to all other segments.'});
            setFrameState(s => ({ ...s, at: 'end' }));
        }

        await new Promise(r => setTimeout(r, 1500));
        setFrameState(s => ({ ...s, visible: false }));
        setIsAnimating(false);
        setCurrentScenario(s => (s + 1) % scenarios.length);
    };
    
    const resetGame = () => {
        setMacTable({});
        setCurrentScenario(0);
        setIsAnimating(false);
        setFrameState({ visible: false, from: 'A1', to: 'A2', at: 'start' });
        toast({title: "Game Reset"});
    }
    
    const getFramePosition = () => {
        if (!frameState.visible) return { opacity: 0 };
        const fromHost = hosts.find(h => h.id === frameState.from)!;
        const toHost = hosts.find(h => h.id === frameState.to)!;

        switch (frameState.at) {
            case 'start':
                return { top: fromHost.top, left: fromHost.left, opacity: 1, transition: { duration: 0 } };
            case 'bridge':
                return { top: '40%', left: '45%', opacity: 1, transition: { duration: 1 } };
            case 'filtered':
                 return { top: '40%', left: '45%', opacity: 0, scale: 0, transition: { duration: 0.5 } };
            case 'end':
                return { top: toHost.top, left: toHost.left, opacity: 1, transition: { duration: 1 } };
            default:
                return { opacity: 0 };
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 relative min-h-[300px]">
                {/* Segments */}
                <div className="absolute top-4 left-4 text-gray-400 text-sm font-bold">Segment A</div>
                <div className="absolute top-4 right-4 text-gray-400 text-sm font-bold">Segment B</div>
                <div className="absolute top-12 bottom-4 left-1/2 -translate-x-1/2 w-px bg-white/20"></div>
                
                {/* Hosts */}
                {hosts.map(host => (
                    <div key={host.id} className="absolute flex flex-col items-center" style={{ top: host.top, left: host.left }}>
                        {host.name.includes("Server") ? <Server className="w-8 h-8"/> : <Laptop className="w-8 h-8"/>}
                        <p className="text-xs font-mono">{host.mac}</p>
                    </div>
                ))}
                
                {/* Bridge */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <Waypoints className="w-10 h-10 text-neon-green" />
                    <p className="text-sm font-bold">Bridge</p>
                </div>
                
                 {/* Frame Animation */}
                <AnimatePresence>
                {frameState.visible && (
                    <motion.div className="absolute" initial={false} animate={getFramePosition()}>
                        <Mail className="w-6 h-6 text-neon-pink" />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-neon-pink">Bridge MAC Table</h3>
                    <div className="bg-dark-primary rounded-lg mt-2 text-sm h-32 overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>MAC Address</TableHead>
                                    <TableHead>Segment</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(macTable).map(([mac, segment]) => (
                                    <TableRow key={mac}>
                                        <TableCell className="font-mono">{mac}</TableCell>
                                        <TableCell>{segment}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {Object.keys(macTable).length === 0 && <p className="p-4 text-center text-gray-500 text-xs">Table is empty. Bridge will learn as frames pass through.</p>}
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-bold text-neon-pink flex items-center gap-2">Scenario <HelpCircle className="w-4 h-4" title={scenarios[currentScenario].description}/></h3>
                     <p className="text-xs text-gray-300 mt-1">{scenarios[currentScenario].description}</p>
                    <Button onClick={runScenario} disabled={isAnimating} className="w-full mt-4 bg-neon-green text-black hover:bg-white">
                        Run Next Step
                    </Button>
                    <Button onClick={resetGame} disabled={isAnimating} variant="outline" className="w-full mt-2">
                        Reset Game
                    </Button>
                </div>
            </div>
        </div>
    );
}
