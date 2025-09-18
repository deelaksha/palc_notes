
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Server, Waypoints, HardDrive } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const HostVisual = ({ name, exists, ip }: { name: string; exists: boolean, ip: string }) => (
  <AnimatePresence>
    {exists && (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
        className="flex flex-col items-center gap-1 text-center"
      >
        <HardDrive className="w-12 h-12 text-neon-blue"/>
        <p className="font-bold font-mono">{name}</p>
        <p className="text-xs text-gray-400">{ip}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

const BridgeVisual = ({ exists }: { exists: boolean }) => (
    <AnimatePresence>
        {exists && (
             <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
                className="flex flex-col items-center gap-2"
             >
                <Waypoints className="w-16 h-16 text-neon-green" />
                 <p className="font-bold font-mono">br0</p>
             </motion.div>
        )}
    </AnimatePresence>
)

const TopologyVisualizer = () => {
    const { toast } = useToast();
    const [step, setStep] = useState(0);
    const [explanation, setExplanation] = useState("Click 'Start' to build the network.");
    
    const steps = [
        "Start: Clean slate.",
        "Step 1: Create three host namespaces (h1, h2, h3).",
        "Step 2: Create a central bridge (br0).",
        "Step 3: Connect h1 to the bridge.",
        "Step 4: Connect h2 to the bridge.",
        "Step 5: Connect h3 to the bridge.",
        "Step 6: Assign IP addresses. Setup complete!"
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(s => s + 1);
            setExplanation(steps[step + 1]);
        }
    };

    const reset = () => {
        setStep(0);
        setExplanation(steps[0]);
    };

    const hosts = [
        { name: 'h1', ip: '10.0.0.1/24' },
        { name: 'h2', ip: '10.0.0.2/24' },
        { name: 'h3', ip: '10.0.0.3/24' },
    ];

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise2/r-create-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="glass-effect p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">3-Host Bridge Topology Visualizer</h1>

                {/* Animation Canvas */}
                <div className="w-full min-h-[300px] bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-center items-center gap-8 p-8 relative">
                    {/* Bridge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <BridgeVisual exists={step >= 2} />
                    </div>
                    {/* Hosts */}
                    <div className="absolute top-[15%] left-1/2 -translate-x-1/2">
                         <HostVisual name="h1" exists={step >= 1} ip={step >= 6 ? hosts[0].ip : ''} />
                    </div>
                    <div className="absolute bottom-[15%] left-[25%]">
                        <HostVisual name="h2" exists={step >= 1} ip={step >= 6 ? hosts[1].ip : ''}/>
                    </div>
                    <div className="absolute bottom-[15%] right-[25%]">
                        <HostVisual name="h3" exists={step >= 1} ip={step >= 6 ? hosts[2].ip : ''}/>
                    </div>
                    
                    {/* Connections */}
                    <svg className="absolute w-full h-full top-0 left-0 overflow-visible">
                        <AnimatePresence>
                            {step >= 3 && <motion.line x1="50%" y1="25%" x2="50%" y2="50%" stroke="white" initial={{pathLength:0}} animate={{pathLength:1}} />}
                            {step >= 4 && <motion.line x1="30%" y1="80%" x2="50%" y2="50%" stroke="white" initial={{pathLength:0}} animate={{pathLength:1}} />}
                            {step >= 5 && <motion.line x1="70%" y1="80%" x2="50%" y2="50%" stroke="white" initial={{pathLength:0}} animate={{pathLength:1}} />}
                        </AnimatePresence>
                    </svg>
                </div>
                
                <div className="flex justify-center gap-4">
                    <Button onClick={nextStep} disabled={step >= steps.length - 1}>
                        {step === 0 ? "Start" : "Next Step"}
                    </Button>
                    <Button onClick={reset} variant="outline">Reset</Button>
                </div>

                <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                   {explanation}
                </div>
            </div>
        </div>
    );
};

export default TopologyVisualizer;
