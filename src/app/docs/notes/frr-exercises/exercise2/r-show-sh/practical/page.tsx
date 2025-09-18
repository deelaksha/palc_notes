
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Network, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const fullReport = `
=== Network Namespace Information (suffix: arms) ===

=== Bridge Information ===
Bridge: br0-arms
Status: UP
Bridge ports:
  v3p-arms (state: UP)
  v2p-arms (state: UP)
  v1p-arms (state: UP)

=== Host Information ===

--- Host 1 (h1-arms) ---
Namespace: EXISTS
Interfaces:
  lo (state: UP)
  v1-arms (state: UP)
IP Addresses:
  127.0.0.1/8 on lo
  10.0.0.1/24 on v1-arms
Routes:
  10.0.0.0/24 dev v1-arms proto kernel scope link src 10.0.0.1
Loopback test:
  127.0.0.1: OK

--- Host 2 (h2-arms) ---
Namespace: EXISTS
Interfaces:
  lo (state: UP)
  v2-arms (state: UP)
IP Addresses:
  127.0.0.1/8 on lo
  10.0.0.2/24 on v2-arms
Routes:
  10.0.0.0/24 dev v2-arms proto kernel scope link src 10.0.0.2
Loopback test:
  127.0.0.1: OK

--- Host 3 (h3-arms) ---
Namespace: EXISTS
Interfaces:
  lo (state: UP)
  v3-arms (state: UP)
IP Addresses:
  127.0.0.1/8 on lo
  10.0.0.3/24 on v3-arms
Routes:
  10.0.0.0/24 dev v3-arms proto kernel scope link src 10.0.0.3
Loopback test:
  127.0.0.1: OK

=== Connectivity Test Matrix ===

        h1      h2      h3
h1      -       OK      OK      
h2      OK      -       OK      
h3      OK      OK      -       

=== Summary ===
Bridge: br0-arms
Namespaces: h1-arms, h2-arms, h3-arms
IP Range: 10.0.0.0/24
`;

const RShowPracticalPage = () => {
    const [output, setOutput] = useState('');

    const runScript = () => {
        setOutput(fullReport);
    }
    
    const reset = () => {
        setOutput('');
    }

    return (
        <main className="p-6">
            <div className="max-w-4xl mx-auto">
                 <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/notes/frr-exercises/exercise2/r-show-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="h-6 w-6 text-neon-blue" />
                        <h2 className="text-xl font-bold">`r-show.sh` Simulator</h2>
                    </div>
                     <p className="text-xs text-gray-400 mb-4">Click the button to simulate running the script and see a full diagnostic report of the network topology.</p>
                    <div className="flex gap-4">
                        <Button onClick={runScript} className="bg-neon-green text-black hover:bg-white">Run Script</Button>
                        <Button onClick={reset} variant="outline">Reset</Button>
                    </div>
                    <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] mt-4">
                        <ScrollArea className="h-96">
                             <pre className="font-mono text-xs whitespace-pre-wrap">
                                <AnimatePresence>
                                <motion.div
                                    key={output}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                >
                                    {output ? output : "Click 'Run Script' to see the output..."}
                                </motion.div>
                                </AnimatePresence>
                            </pre>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RShowPracticalPage;
