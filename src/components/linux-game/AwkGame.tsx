
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const logData = `error   2023-10-27  192.168.1.10  login_failed
info    2023-10-27  192.168.1.15  user_logged_in
warn    2023-10-27  192.168.1.10  disk_space_low
error   2023-10-28  192.168.1.20  db_connection_error
`;

const AwkGame = () => {
    const [action, setAction] = useState('{print $1, $3}');
    const [pattern, setPattern] = useState('/error/');
    const [output, setOutput] = useState<string[]>([]);
    
    const handleAwk = () => {
        let results: string[] = [];
        const lines = logData.split('\n').filter(Boolean);

        let patternRegex;
        try {
            if (pattern) {
                const patternBody = pattern.startsWith('/') && pattern.endsWith('/') 
                    ? pattern.slice(1, -1) 
                    : pattern;
                patternRegex = new RegExp(patternBody, 'i'); // Made it case-insensitive for ease of use
            }
        } catch (e) {
            setOutput(['Invalid pattern regex']);
            return;
        }

        for (const line of lines) {
            if (patternRegex && !patternRegex.test(line)) continue;

            const fields = line.split(/\s+/);
            try {
                // A very simplified awk evaluator for demonstration
                // It makes columns $1, $2 etc. available
                const result = new Function('$0', '$1', '$2', '$3', '$4', `
                    const parts = [${action.slice(1, -1).split(' ').join(',')}];
                    return parts.join(' ');
                `)(line, fields[0], fields[1], fields[2], fields[3]);
                results.push(String(result));
            } catch (e) {
                results.push('Error in action execution');
            }
        }
        setOutput(results);
    };

    const getCommand = () => {
        return `awk '${pattern} ${action}' server.log`;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls and File Preview */}
            <div className="space-y-6">
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Settings /> `awk` Controls</h2>
                     <div>
                        <Label className="text-sm font-mono">Pattern</Label>
                        <Input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="/pattern/ or condition" className="bg-dark-primary font-mono mt-1"/>
                    </div>
                     <div>
                        <Label className="text-sm font-mono">Action</Label>
                        <Input value={action} onChange={e => setAction(e.target.value)} placeholder="{ action }" className="bg-dark-primary font-mono mt-1"/>
                    </div>
                    <Button onClick={handleAwk} className="w-full bg-neon-green text-black hover:bg-white">Run awk</Button>
                </div>
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">server.log</h2>
                    <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">{logData}</pre>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] font-mono text-sm">
                     <p className="text-gray-400">$ {getCommand()}</p>
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

export { AwkGame };
