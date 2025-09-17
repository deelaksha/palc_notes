
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsUp, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const fileContent = `Title: My Awesome Project
Version: 1.0
Author: The Coder
Date: 2023-10-27
---
This is the main description of the project.
It spans multiple lines.
It's a very cool project.
Line 8
Line 9
Line 10
Line 11
Line 12
Line 13
Line 14
Line 15`;

const HeadGame = () => {
    const [lineCount, setLineCount] = useState(10);
    const [output, setOutput] = useState('');

    const handleHead = () => {
        const lines = fileContent.split('\n');
        const result = lines.slice(0, lineCount).join('\n');
        setOutput(result);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
             {/* Controls & File Content */}
            <div className="space-y-6">
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><ChevronsUp /> `head` Controls</h2>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="line-count" className="font-mono">-n</Label>
                        <Input 
                            id="line-count"
                            type="number"
                            value={lineCount}
                            onChange={e => setLineCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="bg-dark-primary w-24"
                        />
                         <Button onClick={handleHead} className="bg-neon-green text-black hover:bg-white">Run head</Button>
                    </div>
                </div>
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">my_file.txt</h2>
                    <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">{fileContent}</pre>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] font-mono text-sm">
                    <p className="text-gray-400">$ head -n {lineCount} my_file.txt</p>
                    <AnimatePresence>
                        <motion.pre 
                            key={output}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="whitespace-pre-wrap mt-2"
                        >
                            {output}
                        </motion.pre>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { HeadGame };
