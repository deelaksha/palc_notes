
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const fileContent = `Hello world,
this is a sample text file.

It's displayed using the 'cat' command.
This is the final line.`;

const CatGame = () => {
    const [showLineNumbers, setShowLineNumbers] = useState(false);

    const getOutput = () => {
        if (!showLineNumbers) {
            return fileContent;
        }
        return fileContent.split('\n').map((line, index) => `     ${index + 1}\t${line}`).join('\n');
    };
    
    const getCommand = () => {
        return `cat ${showLineNumbers ? '-n' : ''} file.txt`;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls and File Preview */}
            <div className="space-y-6">
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><FileText /> `cat` Controls</h2>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="line-numbers" checked={showLineNumbers} onCheckedChange={(c) => setShowLineNumbers(Boolean(c))} />
                        <Label htmlFor="line-numbers">-n (Number Lines)</Label>
                    </div>
                </div>
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">file.txt</h2>
                    <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">{fileContent}</pre>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[200px] font-mono text-sm">
                    <p className="text-gray-400">$ {getCommand()}</p>
                    <motion.pre 
                        key={getOutput()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="whitespace-pre-wrap mt-2"
                    >
                        {getOutput()}
                    </motion.pre>
                </div>
            </div>
        </div>
    );
};

export { CatGame };
