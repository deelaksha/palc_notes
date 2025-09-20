
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Terminal, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const csvData = `id,name,email,city
1,Alice,alice@email.com,New York
2,Bob,bob@email.com,London
3,Charlie,charlie@email.com,Tokyo
`;

const CutGame = () => {
    const [delimiter, setDelimiter] = useState(',');
    const [fields, setFields] = useState('1,3');
    const [output, setOutput] = useState<string[]>([]);
    
    const handleCut = () => {
        let results: string[] = [];
        const lines = csvData.split('\n').filter(Boolean);
        const fieldIndexes = fields.split(',').map(f => parseInt(f.trim()) - 1).filter(n => !isNaN(n));

        for (const line of lines) {
            const columns = line.split(delimiter);
            const selectedColumns = fieldIndexes.map(i => columns[i]).filter(Boolean);
            results.push(selectedColumns.join(delimiter));
        }
        setOutput(results);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls and File Preview */}
            <div className="space-y-6">
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Scissors /> `cut` Controls</h2>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-mono" htmlFor="delimiter">Delimiter (-d)</label>
                        <Input id="delimiter" value={delimiter} onChange={e => setDelimiter(e.target.value)} maxLength={1} className="w-16 bg-dark-primary font-mono text-center"/>
                    </div>
                     <div className="flex items-center gap-2">
                        <label className="text-sm font-mono" htmlFor="fields">Fields (-f)</label>
                        <Input id="fields" value={fields} onChange={e => setFields(e.target.value)} placeholder="e.g., 1,3" className="bg-dark-primary font-mono"/>
                    </div>
                    <Button onClick={handleCut} className="w-full bg-neon-green text-black hover:bg-white">Run cut</Button>
                </div>
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">data.csv</h2>
                    <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">{csvData}</pre>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] font-mono text-sm">
                     <p className="text-gray-400">$ cut -d '{delimiter}' -f {fields} data.csv</p>
                     <div className="mt-2 space-y-1">
                        <AnimatePresence>
                        {output.map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {line}
                            </motion.p>
                        ))}
                        </AnimatePresence>
                     </div>
                </div>
            </div>
        </div>
    );
};

export { CutGame };
