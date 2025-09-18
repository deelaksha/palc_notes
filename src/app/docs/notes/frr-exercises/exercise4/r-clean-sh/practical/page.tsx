'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Route, FileText, FileCode } from 'lucide-react';
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
        <div className={`w-16 h-14 rounded-lg border-2 flex items-center justify-center ${type === 'host' ? 'border-neon-blue/50 bg-dark-secondary' : 'border-neon-green/50 bg-dark-secondary'}`}>
            {type === 'host' ? <FileText className="w-6 h-6 text-neon-blue"/> : <Route className="w-8 h-8 text-neon-green"/>}
        </div>
        <p className="text-sm font-mono">{name}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

const RCleanupPracticalPage = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { exp: "Ready to begin. The full dual-router topology is active.", code: "(Initial State)"},
        { exp: "The script begins by deleting the router namespaces. This also removes the interfaces inside them.", code: "sudo ip netns del r1-arms\nsudo ip netns del r2-arms" },
        { exp: "Next, the host namespaces are deleted one by one.", code: "sudo ip netns del h1-arms\nsudo ip netns del h2-arms\n..." },
        { exp: "Final cleanup commands remove any lingering veth pairs from the default namespace.", code: "sudo ip link del h1-r1-arms" },
        { exp: "Cleanup complete! All virtual components have been removed.", code: "Done." }
    ];
    
    const runStep = () => {
        setStep(s => (s + 1) % steps.length);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise4/r-clean-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">r-clean.sh Visualizer</h1>

                <div className="w-full min-h-[300px] bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-center items-center gap-8 p-8">
                    <div className="flex justify-center items-center gap-4">
                        <NodeVisual name="h1" exists={step < 2} type="host" />
                        <NodeVisual name="h2" exists={step < 2} type="host" />
                        <NodeVisual name="h3" exists={step < 2} type="host" />
                        <NodeVisual name="h4" exists={step < 2} type="host" />
                    </div>
                     <div className="flex justify-center items-center gap-20">
                        <NodeVisual name="r1" exists={step < 1} type="router" />
                        <NodeVisual name="r2" exists={step < 1} type="router" />
                    </div>
                </div>
                
                <div className="flex justify-center gap-4">
                     <Button onClick={runStep} className="bg-destructive hover:bg-destructive/90">
                        {step === 0 ? "Start Cleanup" : step === steps.length - 1 ? "Reset" : "Next Step"}
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

export default RCleanupPracticalPage;
