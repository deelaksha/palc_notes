
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
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-24 h-24 rounded-lg border-2 border-neon-blue/50 bg-dark-secondary flex items-center justify-center">
            <span className="text-lg font-bold font-mono text-neon-blue">{name}</span>
        </div>
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
                <div className="w-24 h-12 rounded-lg border-2 border-neon-green/50 bg-dark-secondary flex items-center justify-center">
                    <span className="font-bold font-mono text-neon-green">br0</span>
                </div>
             </motion.div>
        )}
    </AnimatePresence>
)

const CleanupVisualizer = () => {
    const { toast } = useToast();
    const [namespaces, setNamespaces] = useState({ h1: true, h2: true, h3: true });
    const [bridge, setBridge] = useState(true);

    const handleClean = () => {
        if (!namespaces.h1 && !namespaces.h2 && !namespaces.h3 && !bridge) return;
        
        toast({ title: 'Running r-clean.sh...', description: 'Deleting namespaces and bridge.'});
        
        // Stagger the animation
        setTimeout(() => setNamespaces(p => ({ ...p, h1: false })), 500);
        setTimeout(() => setNamespaces(p => ({ ...p, h2: false })), 800);
        setTimeout(() => setNamespaces(p => ({ ...p, h3: false })), 1100);
        setTimeout(() => setBridge(false), 1500);

    };

    const handleReset = () => {
        setNamespaces({ h1: true, h2: true, h3: true });
        setBridge(true);
    };

    const isClean = !namespaces.h1 && !namespaces.h2 && !namespaces.h3 && !bridge;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise2/r-clean-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="glass-effect p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">Cleanup Visualizer</h1>

                <div className="w-full min-h-[250px] bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-center items-center gap-8 p-8">
                    <div className="flex justify-center items-center gap-8">
                         <NamespaceVisual name="h1" exists={namespaces.h1} />
                         <NamespaceVisual name="h2" exists={namespaces.h2} />
                         <NamespaceVisual name="h3" exists={namespaces.h3} />
                    </div>
                     <BridgeVisual exists={bridge} />
                </div>
                
                <div className="flex justify-center gap-4">
                    <Button onClick={handleClean} disabled={isClean} className="bg-destructive hover:bg-destructive/90">
                        <Trash2 className="mr-2"/> Run Cleanup
                    </Button>
                    <Button onClick={handleReset} variant="outline">Reset</Button>
                </div>

                <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                   {!isClean ? "Environment is active. Run cleanup to remove it." : "Cleanup complete!"}
                </div>
            </div>
        </div>
    );
};

export default CleanupVisualizer;
