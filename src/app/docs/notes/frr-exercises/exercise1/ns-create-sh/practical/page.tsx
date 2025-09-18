'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileCode, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const NamespaceVisual = ({ name, ip, isActive, hasIp }: { name: string; ip: string; isActive: boolean; hasIp: boolean; }) => (
    <AnimatePresence>
        {isActive && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-1"
            >
                <div className="w-24 h-24 rounded-lg border-2 border-neon-blue/50 bg-dark-secondary flex flex-col items-center justify-center p-2">
                    <span className="text-lg font-bold font-mono text-neon-blue">{name}</span>
                    <AnimatePresence>
                    {hasIp && (
                        <motion.span 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}}
                            className="text-xs font-mono text-amber-400 mt-1"
                        >
                            {ip}
                        </motion.span>
                    )}
                    </AnimatePresence>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

const VethVisual = ({ isActive }: { isActive: boolean }) => (
    <AnimatePresence>
        {isActive && (
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                className="w-32 h-1 bg-neon-green rounded-full origin-center"
            />
        )}
    </AnimatePresence>
);

const PingVisual = ({ isActive }: { isActive: boolean }) => (
     <AnimatePresence>
        {isActive && (
            <motion.div
                className="absolute w-6 h-6 bg-neon-pink rounded-full"
                initial={{ left: '25%', opacity: 0 }}
                animate={{ left: '75%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1, ease: 'linear' }}
             />
        )}
    </AnimatePresence>
);

const ReplyVisual = ({ isActive }: { isActive: boolean }) => (
     <AnimatePresence>
        {isActive && (
             <motion.div
                className="absolute w-6 h-6 bg-blue-500 rounded-full"
                initial={{ left: '75%', opacity: 0 }}
                animate={{ left: '25%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1, ease: 'linear' }}
             />
        )}
    </AnimatePresence>
);

const NetworkNamespaceVisualizer = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { exp: "Ready to begin! The script will create two isolated 'virtual computers' and connect them.", code: "" },
        { exp: "Two network namespaces, h1 and h2, are created. They are currently isolated.", code: "sudo ip netns add h1-arms\nsudo ip netns add h2-arms" },
        { exp: "A virtual 'ethernet cable' (veth pair) is created to connect them.", code: "sudo ip link add v1-arms type veth peer name v2-arms" },
        { exp: "Each end of the 'cable' is moved into one of the namespaces.", code: "sudo ip link set v1-arms netns h1-arms\nsudo ip link set v2-arms netns h2-arms" },
        { exp: "IP addresses are assigned to the interfaces inside each namespace.", code: "sudo ip -n h1-arms addr add 10.0.0.1/24 dev v1-arms" },
        { exp: "The interfaces are activated, bringing the link online.", code: "sudo ip -n h1-arms link set v1-arms up" },
        { exp: "A ping is sent from h1 to h2 to test connectivity.", code: "./ns-ping.sh" },
        { exp: "H2 receives the ping and sends a reply back.", code: "(Ping reply)" },
        { exp: "Success! The two namespaces can communicate.", code: "Done." }
    ];
    
    const runAnimationStep = () => {
        setStep(s => (s + 1) % steps.length);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/ns-create-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">Network Namespace Visualizer</h1>
                
                <div className="relative w-full h-48 bg-dark-primary rounded-lg border-2 border-primary/50 flex justify-center items-center gap-8">
                    <NamespaceVisual name="h1" ip="10.0.0.1" isActive={step >= 1} hasIp={step >= 4} />
                    <div className="relative">
                        <VethVisual isActive={step >= 2} />
                        <PingVisual isActive={step === 6} />
                        <ReplyVisual isActive={step === 7} />
                    </div>
                    <NamespaceVisual name="h2" ip="10.0.0.2" isActive={step >= 1} hasIp={step >= 4} />
                </div>
                
                <div className="flex justify-center gap-4">
                    <Button onClick={runAnimationStep} className="bg-primary hover:bg-primary/90">
                       {step === 0 ? "Start" : step === steps.length - 1 ? "Reset" : "Next Step"}
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

export default NetworkNamespaceVisualizer;
