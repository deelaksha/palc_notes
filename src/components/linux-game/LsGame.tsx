
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const files = [
    { name: 'README.md', type: 'file', permissions: '-rw-r--r--', owner: 'user', sizeBytes: 1200, modified: new Date('2023-09-15T10:30:00Z'), hidden: false },
    { name: 'app.js', type: 'file', permissions: '-rwxr-xr-x', owner: 'user', sizeBytes: 5400, modified: new Date('2023-09-15T11:00:00Z'), hidden: false },
    { name: '.config', type: 'file', permissions: '-rw-------', owner: 'user', sizeBytes: 256, modified: new Date('2023-09-14T09:00:00Z'), hidden: true },
    { name: 'node_modules', type: 'folder', permissions: 'drwxr-xr-x', owner: 'user', sizeBytes: 15000000, modified: new Date('2023-09-15T10:00:00Z'), hidden: false },
    { name: '.env', type: 'file', permissions: '-rw-------', owner: 'root', sizeBytes: 128, modified: new Date('2023-09-12T14:00:00Z'), hidden: true },
    { name: 'images', type: 'folder', permissions: 'drwxr-xr-x', owner: 'user', sizeBytes: 2300000, modified: new Date('2023-09-13T18:20:00Z'), hidden: false },
];

const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return '0B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'K', 'M', 'G', 'T'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

const FileLine = ({ file, longFormat, humanReadable }: { file: any; longFormat: boolean; humanReadable: boolean; }) => {
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
                <span className="w-12 text-right">{humanReadable ? formatBytes(file.sizeBytes) : file.sizeBytes}</span>
                <span className="w-32">{formatDate(file.modified)}</span>
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
    const [humanReadable, setHumanReadable] = useState(false);
    const [sortByTime, setSortByTime] = useState(false);
    const [sortBySize, setSortBySize] = useState(false);

    let processedFiles = files.filter(file => showHidden || !file.hidden);

    if (sortByTime) {
        processedFiles.sort((a, b) => b.modified.getTime() - a.modified.getTime());
    } else if (sortBySize) {
        processedFiles.sort((a, b) => b.sizeBytes - a.sizeBytes);
    } else {
        // Default alphabetical sort
        processedFiles.sort((a, b) => a.name.localeCompare(b.name));
    }


    const getFlags = () => {
        let flags = '';
        if (longFormat) flags += 'l';
        if (showHidden) flags += 'a';
        if (humanReadable && longFormat) flags += 'h';
        if (sortByTime) flags += 't';
        if (sortBySize) flags += 'S';
        
        // POSIX standard for flags is to have the sorting flags override each other, `ls -tS` would sort by size.
        // For this simulation, we'll give S precedence over t if both are checked.
        // We also handle the alphabetical default.
        const sortedFlags = Array.from(new Set(flags)).sort().join('');
        return sortedFlags ? `-${sortedFlags}` : '';
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink mb-4">`ls` Flags</h2>
                <div className="flex items-center space-x-2">
                    <Checkbox id="long-format" checked={longFormat} onCheckedChange={(checked) => setLongFormat(Boolean(checked))} />
                    <Label htmlFor="long-format" className="text-base"> -l (Long Format)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="show-hidden" checked={showHidden} onCheckedChange={(checked) => setShowHidden(Boolean(checked))} />
                    <Label htmlFor="show-hidden" className="text-base"> -a (All Files)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="human-readable" disabled={!longFormat} checked={humanReadable} onCheckedChange={(checked) => setHumanReadable(Boolean(checked))} />
                    <Label htmlFor="human-readable" className={`text-base ${!longFormat ? 'text-gray-500' : ''}`}> -h (Human-Readable)</Label>
                </div>
                <p className="text-sm text-gray-400 font-bold pt-4 border-t border-white/10">Sorting:</p>
                <div className="flex items-center space-x-2">
                    <Checkbox id="sort-time" checked={sortByTime} onCheckedChange={(checked) => { setSortByTime(Boolean(checked)); if (checked) setSortBySize(false); }} />
                    <Label htmlFor="sort-time" className="text-base"> -t (Sort by Time)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="sort-size" checked={sortBySize} onCheckedChange={(checked) => { setSortBySize(Boolean(checked)); if (checked) setSortByTime(false); }} />
                    <Label htmlFor="sort-size" className="text-base"> -S (Sort by Size)</Label>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                 <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                 <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] font-mono">
                    <p className="text-gray-400">$ ls {getFlags()}</p>
                    <AnimatePresence>
                        <div className={longFormat ? "flex flex-col space-y-1 mt-2" : "flex flex-wrap gap-4 mt-2"}>
                            {processedFiles.map(file => (
                                <FileLine key={file.name} file={file} longFormat={longFormat} humanReadable={humanReadable} />
                            ))}
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
