
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const fullReport = `
=== Dual-Router Network Information (suffix: arms) ===

=== Router Information ===

--- Router r1 (r1-arms) ---
IP forwarding: 1
Interfaces:
  r1-h1-arms (state: UP)
    IP: 192.168.1.1/24
  r1-h2-arms (state: UP)
    IP: 192.168.2.1/24
  r1-r2-arms (state: UP)
    IP: 10.0.0.1/30
Routing table:
  10.0.0.0/30 dev r1-r2-arms proto kernel scope link src 10.0.0.1
  192.168.1.0/24 dev r1-h1-arms proto kernel scope link src 192.168.1.1
  192.168.2.0/24 dev r1-h2-arms proto kernel scope link src 192.168.2.1
  192.168.3.0/24 via 10.0.0.2 dev r1-r2-arms
  192.168.4.0/24 via 10.0.0.2 dev r1-r2-arms

--- Router r2 (r2-arms) ---
IP forwarding: 1
Interfaces:
  r2-h3-arms (state: UP)
    IP: 192.168.3.1/24
  r2-h4-arms (state: UP)
    IP: 192.168.4.1/24
  r2-r1-arms (state: UP)
    IP: 10.0.0.2/30
Routing table:
  10.0.0.0/30 dev r2-r1-arms proto kernel scope link src 10.0.0.2
  192.168.1.0/24 via 10.0.0.1 dev r2-r1-arms
  192.168.2.0/24 via 10.0.0.1 dev r2-r1-arms
  192.168.3.0/24 dev r2-h3-arms proto kernel scope link src 192.168.3.1
  192.168.4.0/24 dev r2-h4-arms proto kernel scope link src 192.168.4.1

=== Host Information ===
(Host details for h1, h2, h3, h4 would appear here)

=== Cross-Network Connectivity Test Matrix ===

        h1      h2      h3      h4
h1      -       OK      OK      OK
h2      OK      -       OK      OK
h3      OK      OK      -       OK
h4      OK      OK      OK      -

=== Summary ===
This topology demonstrates multi-hop static routing.
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
                    <Link href="/docs/notes/frr-exercises/exercise4/r-show-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="h-6 w-6 text-neon-blue" />
                        <h2 className="text-xl font-bold">`r-show.sh` Simulator</h2>
                    </div>
                     <p className="text-xs text-gray-400 mb-4">Click the button to simulate running the script and see a full diagnostic report of the dual-router network topology.</p>
                    <div className="flex gap-4">
                        <Button onClick={runScript} className="bg-neon-green text-black hover:bg-white">Run Script</Button>
                        <Button onClick={reset} variant="outline">Reset</Button>
                    </div>
                    <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] mt-4">
                        <ScrollArea className="h-[500px]">
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
