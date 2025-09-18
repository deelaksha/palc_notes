'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const RCreateVisualizer = () => {
    const [step, setStep] = useState(0);

    const explanationText = [
        "Ready to begin! This script creates 3 hosts connected to a central bridge.",
        "Step 1: Create three isolated network namespaces (h1, h2, h3).",
        "Step 2: Create a virtual network switch, called a 'bridge', and activate it.",
        "Step 3: Create a virtual cable for Host 1 and connect one end to h1 and the other to the bridge.",
        "Step 4: Create a second virtual cable for Host 2 and connect it.",
        "Step 5: Create a third virtual cable for Host 3 and connect it.",
        "Step 6: Assign IP addresses to each host so they can communicate over the bridge.",
        "Animation Complete! You've built a virtual LAN."
    ];

    const commandText = [
        "",
        "sudo ip netns add h1-arms\nsudo ip netns add h2-arms\nsudo ip netns add h3-arms",
        "sudo ip link add br0-arms type bridge\nsudo ip link set br0-arms up",
        "sudo ip link add v1 type veth peer name v1p\nsudo ip link set v1 netns h1-arms\nsudo ip link set v1p master br0-arms",
        "sudo ip link add v2 type veth peer name v2p\nsudo ip link set v2 netns h2-arms\nsudo ip link set v2p master br0-arms",
        "sudo ip link add v3 type veth peer name v3p\nsudo ip link set v3 netns h3-arms\nsudo ip link set v3p master br0-arms",
        "sudo ip -n h1-arms addr add 10.0.0.1/24 dev v1\nsudo ip -n h2-arms addr add 10.0.0.2/24 dev v2\nsudo ip -n h3-arms addr add 10.0.0.3/24 dev v3",
        ""
    ];

    const handleNextStep = () => {
        if (step < explanationText.length - 1) {
            setStep(s => s + 1);
        }
    };
    
    const resetAnimation = () => {
        setStep(0);
    };
    
    const Node = ({ name, ip, isActive, type }: { name: string; ip?: string; isActive: boolean, type: 'host' | 'bridge' }) => (
        <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
        >
            <div className={`w-20 h-16 rounded-lg border-2 flex items-center justify-center ${type === 'host' ? 'border-neon-blue/50' : 'border-neon-green/50'}`}>
                <span className={`text-lg font-bold font-mono ${type === 'host' ? 'text-neon-blue' : 'text-neon-green'}`}>{name}</span>
            </div>
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
                    <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90" disabled={step >= explanationText.length -1}>
                        Start/Next
                    </Button>
                    <Button onClick={resetAnimation} variant="outline">Reset</Button>
                </div>
                 <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                    {explanationText[step]}
                </div>
                <div className="bg-dark-primary text-yellow-400 font-mono p-4 rounded-lg border border-secondary min-h-[4rem] flex items-center justify-center whitespace-pre-wrap text-xs">
                    {commandText[step]}
                </div>
            </div>
        </div>
    );
};

export default RCreateVisualizer;
