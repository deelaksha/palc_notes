
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const fullReport = `
=== Router Network Information (suffix: arms) ===

=== Router Information ===
Router namespace: router-arms
IP forwarding: 1
Router interfaces:
  r-h1-arms (state: UP)
    IP: 192.168.1.1/24
  r-h2-arms (state: UP)
    IP: 192.168.2.1/24
  r-h3-arms (state: UP)
    IP: 192.168.3.1/24

Router routing table:
  192.168.1.0/24 dev r-h1-arms proto kernel scope link src 192.168.1.1
  192.168.2.0/24 dev r-h2-arms proto kernel scope link src 192.168.2.1
  192.168.3.0/24 dev r-h3-arms proto kernel scope link src 192.168.3.1

=== Host Information ===

--- Host 1 (h1-arms) ---
Namespace: EXISTS
Interfaces:
  h1-r-arms (state: UP)
IP Addresses:
  192.168.1.10/24 on h1-r-arms
Routes:
  default via 192.168.1.1 dev h1-r-arms
  192.168.1.0/24 dev h1-r-arms proto kernel scope link src 192.168.1.10
Loopback test:
  127.0.0.1: OK

--- Host 2 (h2-arms) ---
Namespace: EXISTS
Interfaces:
  h2-r-arms (state: UP)
IP Addresses:
  192.168.2.10/24 on h2-r-arms
Routes:
  default via 192.168.2.1 dev h2-r-arms
  192.168.2.0/24 dev h2-r-arms proto kernel scope link src 192.168.2.10
Loopback test:
  127.0.0.1: OK

--- Host 3 (h3-arms) ---
Namespace: EXISTS
Interfaces:
  h3-r-arms (state: UP)
IP Addresses:
  192.168.3.10/24 on h3-r-arms
Routes:
  default via 192.168.3.1 dev h3-r-arms
  192.168.3.0/24 dev h3-r-arms proto kernel scope link src 192.168.3.10
Loopback test:
  127.0.0.1: OK

=== Inter-Subnet Connectivity Test Matrix ===

        h1          h2          h3
h1      -           OK          OK          
h2      OK          -           OK          
h3      OK          OK          -           

=== Summary ===
Router: router-arms (IP forwarding: 1)
Hosts: h1-arms (192.168.1.10), h2-arms (192.168.2.10), h3-arms (192.168.3.10)
Topology: Each host is in its own subnet, connected via central router
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
                    <Link href="/docs/notes/frr-exercises/exercise3/r-show-sh">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="h-6 w-6 text-neon-blue" />
                        <h2 className="text-xl font-bold">`r-show.sh` Simulator</h2>
                    </div>
                     <p className="text-xs text-gray-400 mb-4">Click the button to simulate running the script and see a full diagnostic report of the router network topology.</p>
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
