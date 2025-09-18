
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Route, FileText } from 'lucide-react';
import Link from 'next/link';

const RCreatePracticalPage = () => {
    const [step, setStep] = useState(0);

    const steps = [
        "Ready to begin. This script creates 1 router and 3 hosts in separate networks.",
        "Step 1: Create four isolated network namespaces (router, h1, h2, h3).",
        "Step 2: Create three virtual cable pairs (veth pairs) to connect each host to the router.",
        "Step 3: Move one end of each cable into the corresponding host namespace and the other end into the router namespace.",
        "Step 4: Configure IP addresses. Each host/router link forms its own subnet (e.g., 192.168.1.0/24).",
        "Step 5: Add a default route on each host, telling it to send all non-local traffic to the router.",
        "Step 6: Enable IP forwarding on the router, allowing it to pass traffic between its interfaces.",
        "Animation Complete! You've built a multi-subnet network."
    ];
    
    const handleNextStep = () => {
        if (step < steps.length - 1) {
            setStep(s => s + 1);
        }
    };
    
    const resetAnimation = () => {
        setStep(0);
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

    const Connection = ({ isActive }: {isActive: boolean}) => (
        <motion.div 
            className="absolute h-16 w-0.5 bg-white/50" 
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

                <div className="w-full h-72 bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-center items-center gap-8 p-4 relative">
                    {/* Hosts */}
                    <div className="flex justify-around items-center w-full">
                        <Node name="h1" ip={step >= 4 ? "192.168.1.10" : ""} isActive={step >= 1} type="host" />
                        <Node name="h2" ip={step >= 4 ? "192.168.2.10" : ""} isActive={step >= 1} type="host" />
                        <Node name="h3" ip={step >= 4 ? "192.168.3.10" : ""} isActive={step >= 1} type="host" />
                    </div>
                     
                     {/* Router */}
                    <Node name="router" isActive={step >= 1} type="router" />
                    
                    {/* Connections */}
                    <div className="absolute top-[35%] left-[24%]" style={{transform: 'rotate(45deg)'}}><Connection isActive={step >= 2} /></div>
                    <div className="absolute top-[35%] left-[50%] -translate-x-1/2"><Connection isActive={step >= 2} /></div>
                    <div className="absolute top-[35%] right-[24%]" style={{transform: 'rotate(-45deg)'}}><Connection isActive={step >= 2} /></div>
                </div>
                
                <div className="flex justify-center gap-4">
                    <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90" disabled={step >= steps.length -1}>
                        Start/Next
                    </Button>
                    <Button onClick={resetAnimation} variant="outline">Reset</Button>
                </div>
                 <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                    {steps[step]}
                </div>
            </div>
        </div>
    );
};

export default RCreatePracticalPage;
