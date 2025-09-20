
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Terminal, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const csvData = `id,name,email,city
1,Alice,alice@email.com,New York
2,Bob,bob@email.com,London
3,Charlie,charlie@email.com,Tokyo
`;

const CutGame = () => {
    const [delimiter, setDelimiter] = useState(',');
    const [fields, setFields] = useState('1,3');
    const [output, setOutput] = useState<string[]>([]);
    const [cutBy, setCutBy] = useState<'field' | 'char'>('field');
    const [complement, setComplement] = useState(false);
    
    const handleCut = () => {
        let results: string[] = [];
        const lines = csvData.split('\n').filter(Boolean);

        for (const line of lines) {
            let resultLine = '';
            if (cutBy === 'field') {
                const columns = line.split(delimiter);
                const fieldIndexes = fields.split(',').map(f => parseInt(f.trim()) - 1).filter(n => !isNaN(n));
                
                let selectedColumns;
                if (complement) {
                    selectedColumns = columns.filter((_, index) => !fieldIndexes.includes(index));
                } else {
                    selectedColumns = fieldIndexes.map(i => columns[i]).filter(Boolean);
                }
                resultLine = selectedColumns.join(delimiter);
            } else { // cut by character
                const charIndexes = fields.split(',').flatMap(f => {
                    if (f.includes('-')) {
                        const [start, end] = f.split('-').map(Number);
                        return Array.from({ length: end - start + 1 }, (_, i) => start + i - 1);
                    }
                    return [parseInt(f.trim()) - 1];
                }).filter(n => !isNaN(n));

                if (complement) {
                     resultLine = line.split('').filter((_, index) => !charIndexes.includes(index)).join('');
                } else {
                     resultLine = charIndexes.map(i => line[i]).filter(Boolean).join('');
                }
            }
            results.push(resultLine);
        }
        setOutput(results);
    };

    const getCommand = () => {
        let cmd = `cut `;
        if (cutBy === 'field') {
            cmd += `-d '${delimiter}' -f ${fields}`;
        } else {
            cmd += `-c ${fields}`;
        }
        if (complement) {
            cmd += ' --complement';
        }
        cmd += ' data.csv';
        return cmd;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls and File Preview */}
            <div className="space-y-6">
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Scissors /> `cut` Controls</h2>
                    
                    <RadioGroup value={cutBy} onValueChange={(v) => setCutBy(v as any)} className="flex gap-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="field" id="r1" /><Label htmlFor="r1">By Field (-f)</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="char" id="r2" /><Label htmlFor="r2">By Character (-c)</Label></div>
                    </RadioGroup>
                    
                    {cutBy === 'field' && (
                         <div className="flex items-center gap-2">
                            <Label className="text-sm font-mono" htmlFor="delimiter">Delimiter (-d)</Label>
                            <Input id="delimiter" value={delimiter} onChange={e => setDelimiter(e.target.value)} maxLength={1} className="w-16 bg-dark-primary font-mono text-center"/>
                        </div>
                    )}

                     <div className="flex items-center gap-2">
                        <Label className="text-sm font-mono" htmlFor="fields">{cutBy === 'field' ? 'Fields (-f)' : 'Characters (-c)'}</Label>
                        <Input id="fields" value={fields} onChange={e => setFields(e.target.value)} placeholder={cutBy === 'field' ? "e.g., 1,3" : "e.g., 1-5,10"} className="bg-dark-primary font-mono"/>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox id="complement" checked={complement} onCheckedChange={(c) => setComplement(Boolean(c))} />
                        <Label htmlFor="complement">--complement (Invert Selection)</Label>
                    </div>

                    <Button onClick={handleCut} className="w-full bg-neon-green text-black hover:bg-white !mt-6">Run cut</Button>
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
                     <p className="text-gray-400 break-all">$ {getCommand()}</p>
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
