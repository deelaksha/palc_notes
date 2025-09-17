
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, FileText, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const fileSystem = {
    'app.log': `[info] Server starting...
[warn] Deprecated function used.
[ERROR] Database connection failed!
[info] User 'admin' logged in.`,
    'config.txt': `Port=8080
Host=localhost
ErrorLog=app.log`,
    'old_logs/': {
        'yesterday.log': `[info] Old log entry.
[error] A minor, old error.`
    }
};

const GrepGame = () => {
    const [pattern, setPattern] = useState('error');
    const [ignoreCase, setIgnoreCase] = useState(false);
    const [invertMatch, setInvertMatch] = useState(false);
    const [recursive, setRecursive] = useState(false);
    const [listFiles, setListFiles] = useState(false);
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    
    const handleGrep = () => {
        let regex;
        try {
            regex = new RegExp(pattern, ignoreCase ? 'i' : '');
        } catch (e) {
            setResults(['Invalid Regex']);
            return;
        }

        const foundFiles: Set<string> = new Set();
        let newResults: string[] = [];

        const searchFile = (fileName: string, content: string) => {
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                const match = regex.test(line);
                if (invertMatch ? !match : match) {
                    if (listFiles) {
                        foundFiles.add(fileName);
                        return;
                    }
                    const lineNumber = showLineNumbers ? `<span class="text-amber-400">${index + 1}:</span>` : '';
                    const highlightedLine = line.replace(new RegExp(`(${pattern})`, ignoreCase ? 'gi' : 'g'), '<span class="text-neon-pink font-bold">$1</span>');
                    newResults.push(`${fileName}:${lineNumber}${highlightedLine}`);
                }
            });
        };
        
        const searchDirectory = (basePath: string, files: any) => {
             for (const fileName in files) {
                const fullPath = `${basePath}${fileName}`;
                if (typeof files[fileName] === 'string') {
                    searchFile(fullPath, files[fileName]);
                } else if (typeof files[fileName] === 'object' && recursive) {
                    searchDirectory(fullPath, files[fileName]);
                }
            }
        }
        
        if (recursive) {
             searchDirectory('', fileSystem);
        } else {
            searchFile('app.log', fileSystem['app.log']);
        }
        
        if (listFiles) {
            setResults(Array.from(foundFiles));
        } else {
             setResults(newResults);
        }
    };
    
    const getCommand = () => {
        let cmd = 'grep ';
        if (ignoreCase) cmd += '-i ';
        if (invertMatch) cmd += '-v ';
        if (recursive) cmd += '-r ';
        if (listFiles) cmd += '-l ';
        if (showLineNumbers) cmd += '-n ';
        cmd += `"${pattern}"`;
        if (recursive) cmd += ` .`;
        else cmd += ' app.log'
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
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="ignore-case" checked={ignoreCase} onCheckedChange={(c) => setIgnoreCase(Boolean(c))} />
                            <Label htmlFor="ignore-case">-i (Ignore Case)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="invert-match" checked={invertMatch} onCheckedChange={(c) => setInvertMatch(Boolean(c))} />
                            <Label htmlFor="invert-match">-v (Invert)</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="recursive" checked={recursive} onCheckedChange={(c) => setRecursive(Boolean(c))} />
                            <Label htmlFor="recursive">-r (Recursive)</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="list-files" checked={listFiles} onCheckedChange={(c) => setListFiles(Boolean(c))} />
                            <Label htmlFor="list-files">-l (List Files)</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="line-numbers" checked={showLineNumbers} onCheckedChange={(c) => setShowLineNumbers(Boolean(c))} />
                            <Label htmlFor="line-numbers">-n (Line Number)</Label>
                        </div>
                    </div>
                    <Button onClick={handleGrep} className="w-full bg-neon-green text-black hover:bg-white">Run Grep</Button>
                </div>
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4">File System</h2>
                    <div className="font-mono text-sm space-y-2">
                        <div className="flex items-center gap-2"><FileText className="w-4 h-4"/> app.log</div>
                        <div className="flex items-center gap-2"><FileText className="w-4 h-4"/> config.txt</div>
                        <div className="flex items-center gap-2"><Folder className="w-4 h-4 text-amber-400"/> old_logs/</div>
                        <div className="flex items-center gap-2 pl-6"><FileText className="w-4 h-4"/> yesterday.log</div>
                    </div>
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
                                dangerouslySetInnerHTML={{ __html: line.replace(/^([^:]+):/, '<span class="text-neon-blue">$1</span>:')}}
                            />
                        ))}
                        </AnimatePresence>
                         {results.length === 0 && <p className="text-gray-500 mt-2">No matches found.</p>}
                     </div>
                </div>
            </div>
        </div>
    );
};

export { GrepGame };

    