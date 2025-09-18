'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Route, FileText, FileCode } from 'lucide-react';
import Link from 'next/link';

const RCreatePracticalPage = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { exp: "Ready to begin. This script creates 1 router and 3 hosts in separate networks.", code: "" },
        { exp: "Create four isolated network namespaces (router, h1, h2, h3).", code: "sudo ip netns add router-arms\nsudo ip netns add h1-arms\n..." },
        { exp: "Create three virtual cable pairs (veth pairs) to connect each host to the router.", code: "sudo ip link add h1-r-arms type veth peer name r-h1-arms\n..." },
        { exp: "Move one end of each cable into the corresponding host namespace and the other end into the router namespace.", code: "sudo ip link set h1-r-arms netns h1-arms\nsudo ip link set r-h1-arms netns router-arms" },
        { exp: "Configure IP addresses. Each host/router link forms its own subnet (e.g., 192.168.1.0/24).", code: "sudo ip -n h1-arms addr add 192.168.1.10/24 dev h1-r-arms\nsudo ip -n router-arms addr add 192.168.1.1/24 dev r-h1-arms" },
        { exp: "Add a default route on each host, telling it to send all non-local traffic to the router.", code: "sudo ip -n h1-arms route add default via 192.168.1.1" },
        { exp: "Enable IP forwarding on the router, allowing it to pass traffic between its interfaces.", code: "sudo ip netns exec router-arms sysctl -w net.ipv4.ip_forward=1" },
        { exp: "Animation Complete! You've built a multi-subnet network.", code: "Done." }
    ];
    
    const handleNextStep = () => {
        setStep(s => (s + 1) % steps.length);
    };
    
    const Node = ({ name, ip, isActive, type }: { name: string; ip?: string; isActive: boolean, type: 'host' | 'router' }) => (
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

    const Connection = ({ isActive, rotation }: {isActive: boolean, rotation: number}) => (
        <motion.div 
            className="absolute h-16 w-0.5 bg-white/50 origin-bottom"
            style={{ transform: `rotate(${rotation}deg)` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        />
    )

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise3/r-create-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                 <h1 className="text-2xl font-bold text-center text-primary font-mono">Router Creation Visualizer</h1>

                <div className="w-full h-72 bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-between items-center p-4 relative">
                    {/* Hosts */}
                    <div className="flex justify-around items-center w-full">
                        <Node name="h1" ip={step >= 4 ? "192.168.1.10" : ""} isActive={step >= 1} type="host" />
                        <Node name="h2" ip={step >= 4 ? "192.168.2.10" : ""} isActive={step >= 1} type="host" />
                        <Node name="h3" ip={step >= 4 ? "192.168.3.10" : ""} isActive={step >= 1} type="host" />
                    </div>
                     
                     {/* Router */}
                    <div className="relative">
                        <Node name="router" isActive={step >= 1} type="router" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2">
                            <Connection isActive={step >= 2} rotation={-45} />
                            <Connection isActive={step >= 2} rotation={0} />
                            <Connection isActive={step >= 2} rotation={45} />
                        </div>
                    </div>
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

export default RCreatePracticalPage;
