
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Folder, FileArchive, Terminal, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const initialFiles = [
    { name: 'report.docx', type: 'file', selected: false },
    { name: 'logo.png', type: 'file', selected: false },
    { name: 'data/', type: 'folder', selected: false },
];

const TarGame = () => {
    const [files, setFiles] = useState(initialFiles);
    const [archive, setArchive] = useState<any[] | null>(null);
    const [flags, setFlags] = useState({ c: true, x: false, z: false, v: false, f: true });
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

    const handleFileSelect = (name: string) => {
        setFiles(files.map(f => f.name === name ? { ...f, selected: !f.selected } : f));
    };

    const handleFlagChange = (flag: keyof typeof flags, value: boolean) => {
        const newFlags = { ...flags, [flag]: value };
        if (flag === 'c' && value) newFlags.x = false;
        if (flag === 'x' && value) newFlags.c = false;
        setFlags(newFlags);
    };

    const runTar = () => {
        const selectedFiles = files.filter(f => f.selected).map(f => f.name);
        const command = `tar -${Object.keys(flags).filter(k => flags[k as keyof typeof flags]).join('')} archive.tar${flags.z ? '.gz' : ''} ${selectedFiles.join(' ')}`;
        let output: string[] = [];

        if (flags.c) { // Create
            setArchive(selectedFiles);
            if (flags.v) {
                output = selectedFiles;
            }
        } else if (flags.x) { // Extract
            if (archive) {
                if (flags.v) {
                    output = archive;
                }
                // Here you might add the extracted files back to the file list if needed
            }
        }
        setTerminalOutput([command, ...output]);
    };

    const flagMap = [
        { key: 'c', label: 'Create' },
        { key: 'x', label: 'Extract' },
        { key: 'z', label: 'gZip' },
        { key: 'v', label: 'Verbose' },
        { key: 'f', label: 'File' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Controls */}
            <div className="space-y-6">
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Settings/> `tar` Controls</h2>
                    <div>
                        <h3 className="mb-2 font-semibold">1. Select Files/Folders:</h3>
                        <div className="space-y-2">
                        {files.map(file => (
                            <div key={file.name} className="flex items-center space-x-2 bg-dark-secondary p-2 rounded">
                                <Checkbox id={file.name} checked={file.selected} onCheckedChange={() => handleFileSelect(file.name)} />
                                <Label htmlFor={file.name} className="flex items-center gap-2">
                                    {file.type === 'file' ? <FileText className="w-4 h-4 text-neon-blue"/> : <Folder className="w-4 h-4 text-amber-400"/>}
                                    {file.name}
                                </Label>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-2 font-semibold">2. Set Flags:</h3>
                        <div className="grid grid-cols-3 gap-2">
                        {flagMap.map(flagInfo => (
                             <div key={flagInfo.key} className="flex items-center space-x-2">
                                <Checkbox id={flagInfo.key} checked={flags[flagInfo.key as keyof typeof flags]} onCheckedChange={(c) => handleFlagChange(flagInfo.key as keyof typeof flags, Boolean(c))}/>
                                <Label htmlFor={flagInfo.key}>-{flagInfo.key} ({flagInfo.label})</Label>
                            </div>
                        ))}
                        </div>
                    </div>
                    <Button onClick={runTar} className="w-full !mt-6 bg-neon-green text-black hover:bg-white">Run `tar`</Button>
                </div>
            </div>

            {/* Terminal and Archive */}
            <div className="space-y-6">
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                    <h2 className="text-xl font-bold text-neon-green flex items-center gap-2"><FileArchive/> Archive View</h2>
                    <div className="bg-dark-primary p-4 rounded-lg min-h-[100px] mt-2">
                        <AnimatePresence>
                        {archive && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex items-center gap-2">
                                <FileArchive className="w-8 h-8"/>
                                <span>archive.tar{flags.z ? '.gz' : ''}</span>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                 </div>
                 <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue flex items-center gap-2"><Terminal/> Terminal Output</h2>
                     <div className="bg-dark-primary p-4 rounded-lg min-h-[150px] font-mono text-xs mt-2">
                        <p className="text-gray-400">$ {terminalOutput[0]}</p>
                        <div className="mt-2 space-y-1">
                        <AnimatePresence>
                        {terminalOutput.slice(1).map((line, i) => (
                            <motion.p key={i} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: i*0.1}}>{line}</motion.p>
                        ))}
                        </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TarGame };
