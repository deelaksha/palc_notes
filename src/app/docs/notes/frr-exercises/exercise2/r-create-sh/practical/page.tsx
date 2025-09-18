'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Route, FileText, FileCode } from 'lucide-react';
import Link from 'next/link';

const RCreateVisualizer = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { exp: "Ready to begin! This script creates 3 hosts connected to a central bridge.", code: "" },
        { exp: "Create three isolated network namespaces (h1, h2, h3).", code: "sudo ip netns add h1-arms\nsudo ip netns add h2-arms\nsudo ip netns add h3-arms" },
        { exp: "Create a virtual network switch, called a 'bridge', and activate it.", code: "sudo ip link add br0-arms type bridge\nsudo ip link set br0-arms up" },
        { exp: "Create a virtual cable for Host 1 and connect one end to h1 and the other to the bridge.", code: "sudo ip link add v1 type veth peer name v1p\nsudo ip link set v1 netns h1-arms\nsudo ip link set v1p master br0-arms" },
        { exp: "Create a second virtual cable for Host 2 and connect it.", code: "sudo ip link add v2 type veth peer name v2p\n..." },
        { exp: "Create a third virtual cable for Host 3 and connect it.", code: "sudo ip link add v3 type veth peer name v3p\n..." },
        { exp: "Assign IP addresses to each host so they can communicate over the bridge.", code: "sudo ip -n h1-arms addr add 10.0.0.1/24 dev v1" },
        { exp: "Animation Complete! You've built a virtual LAN.", code: "Done." }
    ];

    const handleNextStep = () => {
        setStep(s => (s + 1) % steps.length);
    };
    
    const Node = ({ name, ip, isActive, type }: { name: string; ip?: string; isActive: boolean, type: 'host' | 'bridge' }) => (
        <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
        >
            <div className={`w-20 h-16 rounded-lg border-2 flex items-center justify-center ${type === 'host' ? 'border-neon-blue/50' : 'border-neon-green/50'}`}>
                {type === 'host' ? <FileText className="w-8 h-8 text-neon-blue"/> : <Route className="w-10 h-10 text-neon-green"/>}
            </div>
            <span className="text-sm font-mono">{name}</span>
            {ip && <span className="text-xs font-mono text-amber-400">{ip}</span>}
        </motion.div>
    );

    const Connection = ({ isActive }: {isActive: boolean}) => (
        <motion.div 
            className="h-16 w-0.5 bg-white/50" 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        />
    )

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise2/r-create-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                 <h1 className="text-2xl font-bold text-center text-primary font-mono">3-Host Bridge Visualizer</h1>

                <div className="w-full h-64 bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-center items-center gap-4 p-4">
                    <div className="flex justify-center items-center gap-8">
                        <Node name="h1" ip={step >= 6 ? "10.0.0.1" : ""} isActive={step >= 1} type="host" />
                        <Node name="h2" ip={step >= 6 ? "10.0.0.2" : ""} isActive={step >= 1} type="host" />
                        <Node name="h3" ip={step >= 6 ? "10.0.0.3" : ""} isActive={step >= 1} type="host" />
                    </div>
                     <div className="flex justify-center items-end gap-20 h-16">
                        <Connection isActive={step >= 3} />
                        <Connection isActive={step >= 4} />
                        <Connection isActive={step >= 5} />
                    </div>
                    <Node name="br0" isActive={step >= 2} type="bridge" />
                </div>
                
                <div className="flex justify-center gap-4">
                    <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90">
                        {step === 0 ? "Start" : step === steps.length - 1 ? "Reset" : "Next"}
                    </Button>
                </div>
                 <div className="bg-card-nested p-4 rounded-lg border border-secondary text-center space-y-2">
                   <p className="font-semibold text-accent min-h-[3rem] flex items-center justify-center">{steps[step].exp}</p>
                   {steps[step].code && (
                       <code className="text-xs text-amber-400 bg-black/30 p-2 rounded-md inline-block whitespace-pre-wrap"><FileCode className="inline-block mr-2 h-4 w-4"/>{steps[step].code}</code>
                   )}
                </div>
            </div>
        </div>
    );
};

export default RCreateVisualizer;
