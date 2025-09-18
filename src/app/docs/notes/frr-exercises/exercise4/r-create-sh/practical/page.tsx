'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Route, FileText, FileCode } from 'lucide-react';
import Link from 'next/link';

const RCreatePracticalPage = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { exp: "Ready to begin. This script creates a dual-router topology.", code: "" },
        { exp: "Step 1: Create all namespaces (r1, r2, h1, h2, h3, h4).", code: "sudo ip netns add r1-arms\nsudo ip netns add h1-arms\n..." },
        { exp: "Step 2: Create veth pairs to link hosts to their respective routers.", code: "sudo ip link add h1-r1-arms type veth peer name r1-h1-arms\n..." },
        { exp: "Step 3: Create the special veth pair to link the two routers.", code: "sudo ip link add r1-r2-arms type veth peer name r2-r1-arms" },
        { exp: "Step 4: Configure IP addresses on all interfaces across all namespaces.", code: "sudo ip -n r1-arms addr add 192.168.1.1/24 dev r1-h1-arms\n..." },
        { exp: "Step 5: Add default routes on each host pointing to its local router.", code: "sudo ip -n h1-arms route add default via 192.168.1.1" },
        { exp: "Step 6: Add static routes on each router to teach them how to reach networks connected to the other router.", code: "sudo ip -n r1-arms route add 192.168.3.0/24 via 10.0.0.2" },
        { exp: "Step 7: Enable IP forwarding on both routers, allowing them to pass traffic.", code: "sudo ip netns exec r1-arms sysctl -w net.ipv4.ip_forward=1" },
        { exp: "Animation Complete! You've built a multi-router, multi-hop network.", code: "Done." }
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
