
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const sampleText = `[info] Starting server...
[info] Server listening on port 8080.
[warn] DEPRECATION: The 'old_function' is deprecated.
[info] User 'admin' logged in.
[ERROR] Failed to connect to database!
[debug] Database connection string: ...
[error] Another lowercase error.`;

const GrepGame = () => {
    const [pattern, setPattern] = useState('error');
    const [ignoreCase, setIgnoreCase] = useState(false);
    const [invertMatch, setInvertMatch] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    
    const handleGrep = () => {
        let regex;
        try {
            regex = new RegExp(pattern, ignoreCase ? 'i' : '');
        } catch (e) {
            console.error("Invalid regex");
            return;
        }

        const lines = sampleText.split('\n');
        const filteredLines = lines.filter(line => {
            const match = regex.test(line);
            return invertMatch ? !match : match;
        });
        setResults(filteredLines);
    };

    const highlightedText = useMemo(() => {
        if (!pattern) return sampleText;
        const regex = new RegExp(`(${pattern})`, ignoreCase ? 'gi' : 'g');
        return sampleText.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                <span dangerouslySetInnerHTML={{ __html: line.replace(regex, '<mark class="bg-yellow-500/50 text-white">$1</mark>') }} />
                <br />
            </React.Fragment>
        ));
    }, [pattern, ignoreCase]);
    
    const getCommand = () => {
        let cmd = 'grep ';
        if (ignoreCase) cmd += '-i ';
        if (invertMatch) cmd += '-v ';
        cmd += `"${pattern}" log.txt`;
        return cmd;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls & File Content */}
            <div className="space-y-6">
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Search/> `grep` Controls</h2>
                    <Input 
                        placeholder="Pattern to search..." 
                        value={pattern} 
                        onChange={e => setPattern(e.target.value)} 
                        className="bg-dark-primary font-mono"
                    />
                    <div className="flex items-center space-x-2">
                        <Checkbox id="ignore-case" checked={ignoreCase} onCheckedChange={(checked) => setIgnoreCase(Boolean(checked))} />
                        <Label htmlFor="ignore-case">-i (Ignore Case)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="invert-match" checked={invertMatch} onCheckedChange={(checked) => setInvertMatch(Boolean(checked))} />
                        <Label htmlFor="invert-match">-v (Invert Match)</Label>
                    </div>
                    <Button onClick={handleGrep} className="w-full bg-neon-green text-black hover:bg-white">Run Grep</Button>
                </div>
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">log.txt</h2>
                    <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">{highlightedText}</pre>
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
                        {results.map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                dangerouslySetInnerHTML={{ __html: line.replace(new RegExp(`(${pattern})`, ignoreCase ? 'gi' : 'g'), '<span class="text-neon-pink font-bold">$1</span>')}}
                            />
                        ))}
                        </AnimatePresence>
                     </div>
                </div>
            </div>
        </div>
    );
};

export { GrepGame };
