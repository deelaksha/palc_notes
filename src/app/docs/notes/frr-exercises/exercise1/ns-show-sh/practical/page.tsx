'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Terminal, FileCode } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from '@/components/ui/scroll-area';

const h1Output = `
--- LINKS (brief) ---
lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP>
v1-arms@if11     UP             <BROADCAST,MULTICAST,UP,LOWER_UP>

--- ADDRESSES ---
lo               UNKNOWN        127.0.0.1/8
v1-arms          UP             10.0.0.1/24

--- ROUTES (v4) ---
10.0.0.0/24 dev v1-arms proto kernel scope link src 10.0.0.1

--- NEIGHBORS ---
10.0.0.2 dev v1-arms lladdr 1a:2b:3c:4d:5e:6f REACHABLE
`;

const h2Output = `
--- LINKS (brief) ---
lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP>
v2-arms@if10     UP             <BROADCAST,MULTICAST,UP,LOWER_UP>

--- ADDRESSES ---
lo               UNKNOWN        127.0.0.1/8
v2-arms          UP             10.0.0.2/24

--- ROUTES (v4) ---
10.0.0.0/24 dev v2-arms proto kernel scope link src 10.0.0.2

--- NEIGHBORS ---
10.0.0.1 dev v2-arms lladdr 6f:5e:4d:3c:2b:1a REACHABLE
`;


const NsShowPracticalPage = () => {
    const [output, setOutput] = useState({h1: '', h2: ''});

    const steps = [
        { exp: "Click 'Run Script' to see the detailed network state of each namespace.", code: "" },
        { exp: "The script loops through h1 and h2, running commands like 'ip addr' and 'ip route' inside each.", code: "for NS in \"h1-$SFX\" \"h2-$SFX\"; do ... done" },
        { exp: "The output shows links, IP addresses, routes, and neighbors for each namespace.", code: "sudo ip -n $NS ..." }
    ];
    
    const [step, setStep] = useState(0);

    const runScript = () => {
        setOutput({h1: h1Output, h2: h2Output});
        setStep(1);
    };

    const resetScript = () => {
        setOutput({h1: '', h2: ''});
        setStep(0);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
             <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/ns-show-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">`ns-show.sh` Simulator</h1>
                <div className="flex justify-center gap-4">
                    <Button onClick={runScript} className="bg-primary hover:bg-primary/90">Run Script</Button>
                    <Button onClick={resetScript} variant="outline">Reset</Button>
                </div>
                
                 <div className="bg-card-nested p-4 rounded-lg border border-secondary text-center space-y-2">
                   <p className="font-semibold text-accent min-h-[1rem] flex items-center justify-center">{steps[step].exp}</p>
                   {steps[step].code && (
                       <code className="text-xs text-amber-400 bg-black/30 p-2 rounded-md inline-block whitespace-pre-wrap"><FileCode className="inline-block mr-2 h-4 w-4"/>{steps[step].code}</code>
                   )}
                </div>

                <Tabs defaultValue="h1" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="h1">h1-arms</TabsTrigger>
                        <TabsTrigger value="h2">h2-arms</TabsTrigger>
                    </TabsList>
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={output.h1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                    <TabsContent value="h1">
                        <div className="bg-dark-primary text-accent font-mono p-4 rounded-lg border border-secondary min-h-[20rem]">
                            <p className="text-gray-400">$ ./ns-show.sh</p>
                            <ScrollArea className="h-72">
                                <pre className="text-xs whitespace-pre-wrap mt-2">{output.h1 || "Click 'Run Script' to see output..."}</pre>
                            </ScrollArea>
                        </div>
                    </TabsContent>
                    <TabsContent value="h2">
                         <div className="bg-dark-primary text-accent font-mono p-4 rounded-lg border border-secondary min-h-[20rem]">
                             <p className="text-gray-400">$ ./ns-show.sh</p>
                            <ScrollArea className="h-72">
                                <pre className="text-xs whitespace-pre-wrap mt-2">{output.h2 || "Click 'Run Script' to see output..."}</pre>
                            </ScrollArea>
                        </div>
                    </TabsContent>
                    </motion.div>
                    </AnimatePresence>
                </Tabs>
            </div>
        </div>
    );
};

export default NsShowPracticalPage;
