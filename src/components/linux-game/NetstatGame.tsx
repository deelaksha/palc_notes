
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Unlink, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const connections = [
    { proto: 'tcp', local: '0.0.0.0:22', foreign: '0.0.0.0:*', state: 'LISTEN', program: 'sshd' },
    { proto: 'tcp', local: '127.0.0.1:8080', foreign: '0.0.0.0:*', state: 'LISTEN', program: 'nginx' },
    { proto: 'tcp', local: '192.168.1.10:4532', foreign: '104.16.132.229:443', state: 'ESTABLISHED', program: 'chrome' },
    { proto: 'udp', local: '0.0.0.0:68', foreign: '0.0.0.0:*', state: '', program: 'dhclient' },
];

const NetstatGame = () => {
    const [showListening, setShowListening] = useState(false);
    const [showNumeric, setShowNumeric] = useState(false);
    const [showPrograms, setShowPrograms] = useState(false);
    const [output, setOutput] = useState<any[]>([]);

    const handleRun = () => {
        let results = connections;
        if(showListening) {
            results = results.filter(c => c.state === 'LISTEN');
        }
        setOutput(results);
    };

    const getCommand = () => {
        let cmd = 'netstat ';
        if (showListening) cmd += '-l ';
        if (showNumeric) cmd += '-n ';
        if (showPrograms) cmd += '-p ';
        return cmd;
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 mb-6 space-y-4">
                 <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Link/> `netstat` Controls</h2>
                <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2"><Checkbox id="l" checked={showListening} onCheckedChange={(c) => setShowListening(Boolean(c))}/><Label htmlFor="l">-l (Listening)</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="n" checked={showNumeric} onCheckedChange={(c) => setShowNumeric(Boolean(c))}/><Label htmlFor="n">-n (Numeric)</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="p" checked={showPrograms} onCheckedChange={(c) => setShowPrograms(Boolean(c))}/><Label htmlFor="p">-p (Programs)</Label></div>
                </div>
                 <Button onClick={handleRun} className="w-full bg-neon-green text-black hover:bg-white">Run</Button>
            </div>
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                 <div className="bg-dark-primary p-4 rounded-lg font-mono text-xs">
                     <p className="text-gray-400">$ {getCommand()}</p>
                     <div className="mt-2">
                         <div className="flex font-bold text-neon-green">
                             <span className="w-12">Proto</span>
                             <span className="w-48">Local Address</span>
                             <span className="w-48">Foreign Address</span>
                             <span className="w-24">State</span>
                             {showPrograms && <span>Program</span>}
                         </div>
                         <AnimatePresence>
                         {output.map(c => (
                             <motion.div key={c.local} initial={{opacity:0}} animate={{opacity:1}} className="flex mt-1">
                                 <span className="w-12">{c.proto}</span>
                                 <span className="w-48 text-amber-400">{showNumeric ? c.local : c.local.replace('0.0.0.0', 'localhost')}</span>
                                 <span className="w-48">{showNumeric ? c.foreign : c.foreign.replace('0.0.0.0', 'localhost')}</span>
                                 <span className="w-24">{c.state}</span>
                                 {showPrograms && <span>{c.program}</span>}
                             </motion.div>
                         ))}
                         </AnimatePresence>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export { NetstatGame };
