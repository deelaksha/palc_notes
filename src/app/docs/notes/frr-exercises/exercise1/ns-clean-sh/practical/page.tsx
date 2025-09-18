
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
    const [namespaces, setNamespaces] = useState({ h1: true, h2: true });
    const [veth, setVeth] = useState(true);

    const handleClean = () => {
        if (!namespaces.h1 && !namespaces.h2) return;
        
        toast({ title: 'Running ns-clean.sh...', description: 'Deleting namespaces and virtual interfaces.'});
        
        // Stagger the animation
        setTimeout(() => setNamespaces({ h1: false, h2: true }), 500);
        setTimeout(() => setVeth(false), 800);
        setTimeout(() => setNamespaces({ h1: false, h2: false }), 1200);

    };

    const handleReset = () => {
        setNamespaces({ h1: true, h2: true });
        setVeth(true);
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
                    <Button onClick={handleClean} disabled={!namespaces.h1 && !namespaces.h2} className="bg-destructive hover:bg-destructive/90">
                        <Trash2 className="mr-2"/> Run Cleanup
                    </Button>
                    <Button onClick={handleReset} variant="outline">Reset</Button>
                </div>

                <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                   {namespaces.h1 || namespaces.h2 ? "Environment is active. Run cleanup to remove it." : "Cleanup complete!"}
                </div>
            </div>
        </div>
    );
};

export default CleanupVisualizer;
