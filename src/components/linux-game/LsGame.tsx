
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const files = [
    { name: 'README.md', type: 'file', permissions: '-rw-r--r--', owner: 'user', size: '1.2K', modified: 'Sep 15 10:30', hidden: false },
    { name: 'app.js', type: 'file', permissions: '-rwxr-xr-x', owner: 'user', size: '5.4K', modified: 'Sep 15 11:00', hidden: false },
    { name: '.config', type: 'file', permissions: '-rw-------', owner: 'user', size: '256B', modified: 'Sep 14 09:00', hidden: true },
    { name: 'node_modules', type: 'folder', permissions: 'drwxr-xr-x', owner: 'user', size: '15M', modified: 'Sep 15 10:00', hidden: false },
    { name: '.env', type: 'file', permissions: '-rw-------', owner: 'root', size: '128B', modified: 'Sep 12 14:00', hidden: true },
    { name: 'images', type: 'folder', permissions: 'drwxr-xr-x', owner: 'user', size: '2.3M', modified: 'Sep 13 18:20', hidden: false },
];

const FileLine = ({ file, longFormat }: { file: any; longFormat: boolean; }) => {
    const icon = file.type === 'file' ? <FileText className="w-4 h-4 text-neon-blue" /> : <Folder className="w-4 h-4 text-amber-400" />;
    
    if (longFormat) {
        return (
             <motion.div
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm whitespace-pre"
            >
                <span className="w-24">{file.permissions}</span>
                <span className="w-12">{file.owner}</span>
                <span className="w-12 text-right">{file.size}</span>
                <span className="w-32">{file.modified}</span>
                <div className="flex items-center gap-1">
                    {icon}
                    <span>{file.name}</span>
                </div>
            </motion.div>
        );
    }
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-2 p-2 bg-dark-primary rounded-md"
        >
            {icon}
            <span>{file.name}</span>
        </motion.div>
    );
};

export function LsGame() {
    const [showHidden, setShowHidden] = useState(false);
    const [longFormat, setLongFormat] = useState(false);

    const filteredFiles = files.filter(file => showHidden || !file.hidden);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink mb-4">`ls` Flags</h2>
                <div className="flex items-center space-x-2">
                    <Checkbox id="long-format" checked={longFormat} onCheckedChange={(checked) => setLongFormat(Boolean(checked))} />
                    <Label htmlFor="long-format" className="text-lg"> -l (Long Format)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="show-hidden" checked={showHidden} onCheckedChange={(checked) => setShowHidden(Boolean(checked))} />
                    <Label htmlFor="show-hidden" className="text-lg"> -a (All Files)</Label>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                 <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                 <div className="bg-dark-primary p-4 rounded-lg min-h-[250px] font-mono">
                    <p className="text-gray-400">$ ls {longFormat ? '-l' : ''}{showHidden ? 'a' : ''}</p>
                    <AnimatePresence>
                        <div className={longFormat ? "flex flex-col space-y-1 mt-2" : "flex flex-wrap gap-4 mt-2"}>
                            {filteredFiles.map(file => (
                                <FileLine key={file.name} file={file} longFormat={longFormat} />
                            ))}
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
