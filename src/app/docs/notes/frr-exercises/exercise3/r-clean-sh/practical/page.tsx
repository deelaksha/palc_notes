
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Route, FileText } from 'lucide-react';
import Link from 'next/link';

const NodeVisual = ({ name, exists, type }: { name: string; exists: boolean; type: 'host' | 'router' }) => (
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
            {type === 'host' ? <FileText className="w-8 h-8 text-neon-blue"/> : <Route className="w-10 h-10 text-neon-green"/>}
        </div>
        <p className="text-sm font-mono">{name}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

const RCleanupPracticalPage = () => {
    const [step, setStep] = useState(0);

    const steps = [
        "Ready to begin. The full router topology is active.",
        "Running `sudo ip netns del router-arms`... The central router is destroyed.",
        "Running `sudo ip netns del h1-arms`...",
        "Running `sudo ip netns del h2-arms`...",
        "Running `sudo ip netns del h3-arms`...",
        "Running final link cleanup... The `veth` pairs are automatically removed when their namespaces are deleted.",
        "Cleanup complete! All virtual components have been removed."
    ];
    
    const runStep = () => {
        setStep(s => (s + 1) % steps.length);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise3/r-clean-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">r-clean.sh Visualizer</h1>

                <div className="w-full min-h-[300px] bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-center items-center gap-8 p-8">
                    <div className="flex justify-center items-center gap-8">
                         <NodeVisual name="h1" exists={step < 3} type="host" />
                         <NodeVisual name="h2" exists={step < 4} type="host" />
                         <NodeVisual name="h3" exists={step < 5} type="host" />
                    </div>
                     <NodeVisual name="router" exists={step < 2} type="router" />
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

export default RCleanupPracticalPage;
