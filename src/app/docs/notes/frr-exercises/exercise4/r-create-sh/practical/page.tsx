
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Route, FileText } from 'lucide-react';
import Link from 'next/link';

const RCreatePracticalPage = () => {
    const [step, setStep] = useState(0);

    const steps = [
        "Ready to begin. This script creates a dual-router topology.",
        "Step 1: Create all namespaces (r1, r2, h1, h2, h3, h4).",
        "Step 2: Create veth pairs to link hosts to their respective routers.",
        "Step 3: Create the special veth pair to link the two routers.",
        "Step 4: Configure IP addresses on all interfaces across all namespaces.",
        "Step 5: Add default routes on each host pointing to its local router.",
        "Step 6: Add static routes on each router to teach them how to reach networks connected to the other router.",
        "Step 7: Enable IP forwarding on both routers, allowing them to pass traffic.",
        "Animation Complete! You've built a multi-router, multi-hop network."
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
            <div className={`w-16 h-14 rounded-lg border-2 flex items-center justify-center ${type === 'host' ? 'border-neon-blue/50' : 'border-neon-green/50'}`}>
                {type === 'host' ? <FileText className="w-6 h-6 text-neon-blue"/> : <Route className="w-8 h-8 text-neon-green"/>}
            </div>
            <span className="text-xs font-mono">{name}</span>
            {ip && <span className="text-xs font-mono text-amber-400">{ip}</span>}
        </motion.div>
    );

    const Connection = ({ isActive, x1, y1, x2, y2 }: {isActive: boolean, x1:string, y1:string, x2:string, y2:string}) => (
        <motion.svg className="absolute w-full h-full" style={{top: 0, left: 0, pointerEvents: 'none'}}>
            <motion.line
                x1={x1} y1={y1} x2={x2} y2={y2}
                className="stroke-white/50"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />
        </motion.svg>
    )

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise4/r-create-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                 <h1 className="text-2xl font-bold text-center text-primary font-mono">Dual-Router Creation</h1>

                <div className="w-full h-80 bg-dark-primary rounded-lg border-2 border-primary/50 relative p-4">
                    {/* Nodes */}
                    <div className="absolute top-[10%] left-[10%]"><Node name="h1" ip={step >= 4 ? "192.168.1.10" : ""} isActive={step >= 1} type="host" /></div>
                    <div className="absolute top-[10%] left-[35%]"><Node name="h2" ip={step >= 4 ? "192.168.2.10" : ""} isActive={step >= 1} type="host" /></div>
                    <div className="absolute top-[10%] left-[65%]"><Node name="h3" ip={step >= 4 ? "192.168.3.10" : ""} isActive={step >= 1} type="host" /></div>
                    <div className="absolute top-[10%] left-[90%]"><Node name="h4" ip={step >= 4 ? "192.168.4.10" : ""} isActive={step >= 1} type="host" /></div>
                    
                    <div className="absolute top-[70%] left-[22.5%]"><Node name="r1" ip={step >= 4 ? "10.0.0.1" : ""} isActive={step >= 1} type="router" /></div>
                    <div className="absolute top-[70%] left-[77.5%]"><Node name="r2" ip={step >= 4 ? "10.0.0.2" : ""} isActive={step >= 1} type="router" /></div>

                    {/* Connections */}
                    <Connection isActive={step >=2} x1="14%" y1="20%" x2="25.5%" y2="70%" />
                    <Connection isActive={step >=2} x1="39%" y1="20%" x2="25.5%" y2="70%" />
                    <Connection isActive={step >=2} x1="69%" y1="20%" x2="80.5%" y2="70%" />
                    <Connection isActive={step >=2} x1="94%" y1="20%" x2="80.5%" y2="70%" />
                    <Connection isActive={step >=3} x1="28.5%" y1="80%" x2="77.5%" y2="80%" />
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
