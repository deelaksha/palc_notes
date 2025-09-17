
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const fileStructure = [
    { name: 'project_docs/', size: '4.0K', type: 'dir' },
    { name: 'node_modules/', size: '25M', type: 'dir' },
    { name: 'image.jpg', size: '1.2M', type: 'file' },
    { name: 'app.js', size: '8.0K', type: 'file' },
];

const DuGame = () => {
    const [summarize, setSummarize] = useState(false);
    const [humanReadable, setHumanReadable] = useState(true);
    const [output, setOutput] = useState<any[]>([]);

    const handleDu = () => {
        let results = [...fileStructure];
        let totalSize = 26216; // 25M + 1.2M + 4K + 8K in KB

        if (summarize) {
             results = [{ name: '.', size: humanReadable ? '26M' : totalSize, type: 'dir' }];
        } else {
            results = results.map(item => ({
                ...item,
                displaySize: humanReadable ? item.size : parseInt(item.size) * (item.size.includes('M') ? 1024 : 1)
            }));
        }
        setOutput(results);
    };

    const getCommand = () => {
        let flags = '';
        if (summarize) flags += 's';
        if (humanReadable) flags += 'h';
        return `du ${flags ? '-' + flags : ''} *`;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Disc /> `du` Controls</h2>
                <div className="flex items-center space-x-2">
                    <Checkbox id="summarize" checked={summarize} onCheckedChange={(c) => setSummarize(Boolean(c))} />
                    <Label htmlFor="summarize">-s (Summarize)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="human-readable" checked={humanReadable} onCheckedChange={(c) => setHumanReadable(Boolean(c))} />
                    <Label htmlFor="human-readable">-h (Human-Readable)</Label>
                </div>
                <Button onClick={handleDu} className="w-full bg-neon-green text-black hover:bg-white !mt-6">Run `du`</Button>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[200px] font-mono text-sm">
                    <p className="text-gray-400">$ {getCommand()}</p>
                    <div className="mt-2 space-y-1">
                        {output.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex"
                            >
                                <span className="text-amber-400 w-16">{summarize ? item.size : item.displaySize}</span>
                                <span>{item.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { DuGame };
