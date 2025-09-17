
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Folder, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fileSystem = [
    { path: './README.md', type: 'file', size: 1500 },
    { path: './src/app.js', type: 'file', size: 8400 },
    { path: './src/components/Button.js', type: 'file', size: 2300 },
    { path: './config.json', type: 'file', size: 500 },
    { path: './assets/logo.png', type: 'file', size: 12000 },
    { path: './assets/icons/icon.svg', type: 'file', size: 800 },
    { path: './docs/guide.md', type: 'file', size: 25000 },
    { path: './node_modules/react/index.js', type: 'file', size: 19000 },
    { path: './src', type: 'folder', size: 10700 },
    { path: './assets', type: 'folder', size: 12800 },
    { path: './docs', type: 'folder', size: 25000 },
];

const ResultItem = ({ path, type }: { path: string; type: string }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        className="flex items-center gap-2"
    >
        {type === 'file' ? <FileText className="w-4 h-4 text-neon-blue" /> : <Folder className="w-4 h-4 text-amber-400" />}
        <span>{path}</span>
    </motion.div>
);

export function FindGame() {
    const [namePattern, setNamePattern] = useState('');
    const [typeFilter, setTypeFilter] = useState('any');
    const [results, setResults] = useState<any[]>([]);
    const [command, setCommand] = useState('find .');

    const handleFind = () => {
        let newCommand = 'find .';
        let filtered = [...fileSystem];

        if (namePattern) {
            newCommand += ` -name "${namePattern}"`;
            const regex = new RegExp(namePattern.replace(/\*/g, '.*'));
            filtered = filtered.filter(item => regex.test(item.path.split('/').pop()!));
        }

        if (typeFilter !== 'any') {
            newCommand += ` -type ${typeFilter === 'file' ? 'f' : 'd'}`;
            filtered = filtered.filter(item => item.type === typeFilter);
        }
        
        setCommand(newCommand);
        setResults(filtered);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink mb-4 flex items-center gap-2"><Search/> `find` Controls</h2>
                
                <div>
                    <label className="text-sm">Name Pattern (`-name`)</label>
                    <Input 
                        placeholder="e.g., *.js or README.*" 
                        value={namePattern} 
                        onChange={e => setNamePattern(e.target.value)}
                        className="bg-dark-primary mt-1"
                    />
                </div>

                <div>
                    <label className="text-sm">Type (`-type`)</label>
                     <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="bg-dark-primary mt-1">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="file">File (f)</SelectItem>
                            <SelectItem value="folder">Directory (d)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <p className="text-xs text-gray-400 pt-2 border-t border-white/10">More filters like size and time coming soon!</p>

                <Button onClick={handleFind} className="w-full !mt-6 bg-neon-green text-black hover:bg-white">
                    Run Find
                </Button>
            </div>

            {/* Terminal Output */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                 <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                 <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] font-mono text-sm">
                    <p className="text-gray-400">$ {command}</p>
                    <div className="mt-2 space-y-1">
                        <AnimatePresence>
                            {results.map(item => (
                                <ResultItem key={item.path} path={item.path} type={item.type} />
                            ))}
                        </AnimatePresence>
                        {results.length === 0 && <p className="text-gray-500 mt-4">(No results found for this query)</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
