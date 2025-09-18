'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

const NodeVisual = ({ name, exists, type }: { name: string; exists: boolean; type: 'host' | 'bridge' }) => (
  <AnimatePresence>
    {exists && (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
        className="flex flex-col items-center gap-1"
      >
        <div className={`w-20 h-16 rounded-lg border-2 flex items-center justify-center ${type === 'host' ? 'border-neon-blue/50 bg-dark-secondary' : 'border-neon-green/50 bg-dark-secondary'}`}>
            <span className={`text-lg font-bold font-mono ${type === 'host' ? 'text-neon-blue' : 'text-neon-green'}`}>{name}</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const RCleanupVisualizer = () => {
    const [step, setStep] = useState(0);

    const steps = [
        "Ready to begin. The 3-host and 1-bridge environment is active.",
        "Running `sudo ip netns del h1-arms`...",
        "Running `sudo ip netns del h2-arms`...",
        "Running `sudo ip netns del h3-arms`...",
        "Running `sudo ip link del br0-arms`...",
        "Cleanup complete! All virtual components have been removed."
    ];
    
    const runStep = () => {
        setStep(s => (s + 1) % steps.length);
    };

    const isHost1 = step < 2;
    const isHost2 = step < 3;
    const isHost3 = step < 4;
    const isBridge = step < 5;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise2/r-clean-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">r-clean.sh Visualizer</h1>

                <div className="w-full min-h-[250px] bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-center items-center gap-8 p-8">
                    <div className="flex justify-center items-center gap-8">
                         <NodeVisual name="h1" exists={isHost1} type="host" />
                         <NodeVisual name="h2" exists={isHost2} type="host" />
                         <NodeVisual name="h3" exists={isHost3} type="host" />
                    </div>
                     <NodeVisual name="br0" exists={isBridge} type="bridge" />
                </div>
                
                <div className="flex justify-center gap-4">
                     <Button onClick={runStep} className="bg-destructive hover:bg-destructive/90">
                        {step === 0 ? "Start Cleanup" : step === steps.length - 1 ? "Reset" : "Next Step"}
                    </Button>
                </div>

                <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                   {steps[step]}
                </div>
            </div>
        </div>
    );
};

export default RCleanupVisualizer;
