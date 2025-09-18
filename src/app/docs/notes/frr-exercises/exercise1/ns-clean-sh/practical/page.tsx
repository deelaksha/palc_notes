'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const NamespaceVisual = ({ name, exists }: { name: string; exists: boolean }) => (
  <AnimatePresence>
    {exists && (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-24 h-24 rounded-lg border-2 border-neon-blue/50 bg-dark-secondary flex items-center justify-center">
            <span className="text-lg font-bold font-mono text-neon-blue">{name}</span>
        </div>
        <p className="text-sm">{name}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

const VethVisual = ({ exists }: { exists: boolean }) => (
    <AnimatePresence>
        {exists && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="w-32 h-1 bg-neon-green rounded-full"
             />
        )}
    </AnimatePresence>
)

const CleanupVisualizer = () => {
    const { toast } = useToast();
    const [step, setStep] = useState(0);

    const steps = [
        "Ready to begin. The environment created by `ns-create.sh` is active.",
        "Running `sudo ip netns del h1-arms`... This destroys the first namespace.",
        "The `veth` pair connected to `h1` is automatically destroyed with it.",
        "Running `sudo ip netns del h2-arms`... This destroys the second namespace.",
        "Cleanup complete! The virtual environment has been removed."
    ];

    const namespaces = {
        h1: step < 2,
        h2: step < 4,
    };
    const veth = step < 3;
    
    const runStep = () => {
        if (step < steps.length - 1) {
            setStep(s => s + 1);
        } else {
            setStep(0);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/ns-clean-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">Cleanup Visualizer</h1>

                {/* Animation Canvas */}
                <div className="w-full h-48 bg-dark-primary rounded-lg border-2 border-primary/50 flex justify-center items-center gap-8">
                    <NamespaceVisual name="h1-arms" exists={namespaces.h1} />
                    <VethVisual exists={veth} />
                    <NamespaceVisual name="h2-arms" exists={namespaces.h2} />
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

export default CleanupVisualizer;
