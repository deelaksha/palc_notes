
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Server, Waypoints, HardDrive, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { cn } from '@/lib/utils';

const scriptContent = `
#!/bin/bash
# Clean up any existing setup first
echo "Cleaning up..."
sudo ip netns del h1-arms 2>/dev/null || true
sudo ip netns del h2-arms 2>/dev/null || true
sudo ip netns del h3-arms 2>/dev/null || true
sudo ip link del br0-arms 2>/dev/null || true

# Create namespaces
echo "Creating namespaces..."
sudo ip netns add h1-arms
sudo ip netns add h2-arms
sudo ip netns add h3-arms

# Create bridge
echo "Creating bridge br0-arms..."
sudo ip link add br0-arms type bridge
sudo ip link set br0-arms up

# Connect Host 1
echo "Connecting Host 1..."
sudo ip link add v1-arms type veth peer name v1p-arms
sudo ip link set v1-arms netns h1-arms
sudo ip link set v1p-arms master br0-arms
sudo ip link set v1p-arms up
sudo ip -n h1-arms addr add 10.0.0.1/24 dev v1-arms
sudo ip -n h1-arms link set v1-arms up

# Connect Host 2
echo "Connecting Host 2..."
sudo ip link add v2-arms type veth peer name v2p-arms
sudo ip link set v2-arms netns h2-arms
sudo ip link set v2p-arms master br0-arms
sudo ip link set v2p-arms up
sudo ip -n h2-arms addr add 10.0.0.2/24 dev v2-arms
sudo ip -n h2-arms link set v2-arms up

# Connect Host 3
echo "Connecting Host 3..."
sudo ip link add v3-arms type veth peer name v3p-arms
sudo ip link set v3-arms netns h3-arms
sudo ip link set v3p-arms master br0-arms
sudo ip link set v3p-arms up
sudo ip -n h3-arms addr add 10.0.0.3/24 dev v3-arms
sudo ip -n h3-arms link set v3-arms up

echo "Setup complete!"
`;

const steps = [
    { description: "Start: Clean slate.", codeLines: [1] },
    { description: "Cleanup: Remove any old namespaces and bridges to ensure a fresh start.", codeLines: [3, 4, 5, 6] },
    { description: "Create Namespaces: Three isolated network environments (h1, h2, h3) are created.", codeLines: [9, 10, 11] },
    { description: "Create Bridge: A virtual switch (br0) is created and activated.", codeLines: [14, 15] },
    { description: "Connect Host 1: A virtual cable (veth pair) is created. One end goes into h1, the other plugs into the bridge.", codeLines: [18, 19, 20, 21] },
    { description: "Configure Host 1: The virtual interface inside h1 is assigned an IP address and turned on.", codeLines: [22, 23] },
    { description: "Connect Host 2: Repeat the process for the second host.", codeLines: [26, 27, 28, 29] },
    { description: "Configure Host 2: Assign an IP address to h2's interface.", codeLines: [30, 31] },
    { description: "Connect Host 3: Repeat the process for the third host.", codeLines: [34, 35, 36, 37] },
    { description: "Configure Host 3: Assign an IP address to h3's interface.", codeLines: [38, 39] },
    { description: "Setup Complete! All hosts are connected and configured.", codeLines: [41] }
];

const HostVisual = ({ name, exists, ip, lineActive }: { name: string; exists: boolean, ip: string, lineActive: boolean }) => (
  <AnimatePresence>
    {exists && (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="flex flex-col items-center gap-1 text-center"
      >
        <HardDrive className={cn("w-12 h-12 transition-colors", lineActive ? 'text-neon-pink' : 'text-neon-blue')} />
        <p className="font-bold font-mono">{name}</p>
        <AnimatePresence>
        {ip && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-xs text-neon-green">{ip}</motion.p>}
        </AnimatePresence>
      </motion.div>
    )}
  </AnimatePresence>
);

const BridgeVisual = ({ exists, lineActive }: { exists: boolean, lineActive: boolean }) => (
    <AnimatePresence>
        {exists && (
             <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex flex-col items-center gap-2"
             >
                <Waypoints className={cn("w-16 h-16 transition-colors", lineActive ? 'text-neon-pink' : 'text-neon-green')} />
                 <p className="font-bold font-mono">br0-arms</p>
             </motion.div>
        )}
    </AnimatePresence>
)

const TopologyVisualizer = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(s => s + 1);
        }
    };
    const prevStep = () => {
        if (step > 0) {
            setStep(s => s - 1);
        }
    };
    const reset = () => setStep(0);

    const isLineActive = (lineNumber: number) => steps[step].codeLines.includes(lineNumber);

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/docs/notes/frr-exercises/exercise2/r-create-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="grid lg:grid-cols-2 gap-6 items-start">
                {/* Left side: Animation and Controls */}
                <div className="glass-effect p-6 rounded-2xl shadow-lg border border-border space-y-6 sticky top-24">
                    <h1 className="text-2xl font-bold text-center text-primary font-mono">Topology Visualizer</h1>

                    <div className="w-full h-[300px] bg-dark-primary rounded-lg border-2 border-primary/50 flex flex-col justify-center items-center p-4 relative">
                        {/* Bridge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <BridgeVisual exists={step >= 3} lineActive={isLineActive(14)} />
                        </div>
                        {/* Hosts */}
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2">
                             <HostVisual name="h1-arms" exists={step >= 2} ip={step >= 5 ? '10.0.0.1/24' : ''} lineActive={isLineActive(9) || isLineActive(18)} />
                        </div>
                        <div className="absolute bottom-[10%] left-[20%] -translate-x-1/2">
                            <HostVisual name="h2-arms" exists={step >= 2} ip={step >= 7 ? '10.0.0.2/24' : ''} lineActive={isLineActive(10) || isLineActive(26)} />
                        </div>
                        <div className="absolute bottom-[10%] right-[20%] translate-x-1/2">
                            <HostVisual name="h3-arms" exists={step >= 2} ip={step >= 9 ? '10.0.0.3/24' : ''} lineActive={isLineActive(11) || isLineActive(34)} />
                        </div>
                        
                        {/* Connections */}
                        <svg className="absolute w-full h-full top-0 left-0 overflow-visible" strokeWidth="2">
                            <AnimatePresence>
                                {step >= 4 && <motion.line x1="50%" y1="20%" x2="50%" y2="50%" initial={{pathLength:0}} animate={{pathLength:1}} className={cn(isLineActive(19) || isLineActive(20) ? "stroke-neon-pink" : "stroke-white/50")} />}
                                {step >= 6 && <motion.line x1="20%" y1="85%" x2="50%" y2="50%" initial={{pathLength:0}} animate={{pathLength:1}} className={cn(isLineActive(27) || isLineActive(28) ? "stroke-neon-pink" : "stroke-white/50")} />}
                                {step >= 8 && <motion.line x1="80%" y1="85%" x2="50%" y2="50%" initial={{pathLength:0}} animate={{pathLength:1}} className={cn(isLineActive(35) || isLineActive(36) ? "stroke-neon-pink" : "stroke-white/50")} />}
                            </AnimatePresence>
                        </svg>
                    </div>
                    
                    <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                       <AnimatePresence mode="wait">
                          <motion.p key={step} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                            {steps[step].description}
                          </motion.p>
                       </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button onClick={prevStep} disabled={step === 0} variant="outline">Previous</Button>
                        <Button onClick={nextStep} disabled={step >= steps.length - 1}>Next Step</Button>
                        <Button onClick={reset} variant="secondary">Reset</Button>
                    </div>
                </div>

                {/* Right side: Code */}
                <div className="glass-effect p-4 rounded-2xl shadow-lg border border-border">
                     <h2 className="text-xl font-bold text-center text-primary font-mono mb-4">r-create.sh</h2>
                     <div className="font-mono text-xs bg-code-bg p-4 rounded-lg h-[480px] overflow-auto">
                        {scriptContent.trim().split('\n').map((line, index) => (
                           <div key={index} className={cn("transition-colors duration-300", isLineActive(index + 1) ? "bg-primary/20 text-white" : "text-gray-400")}>
                               {line || '\u00A0'}
                           </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default TopologyVisualizer;

        
