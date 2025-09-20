
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const releaseInfo = {
    DistributorID: 'Ubuntu',
    Description: 'Ubuntu 22.04.3 LTS',
    Release: '22.04',
    Codename: 'jammy'
};

const LsbReleaseGame = () => {
    const [flags, setFlags] = useState({ a: true, d: false, c: false, r: false });
    const [output, setOutput] = useState('');

    const handleFlagChange = (flag: keyof typeof flags, checked: boolean) => {
        const newFlags = { a: false, d: false, c: false, r: false };
        if (flag === 'a' && checked) {
            setFlags({ a: true, d: false, c: false, r: false });
        } else {
            newFlags[flag] = checked;
            setFlags(newFlags);
        }
    };
    
    const runCommand = () => {
        let result = '';
        if (flags.a) {
            result = Object.entries(releaseInfo).map(([key, value]) => `${key}:\t${value}`).join('\n');
        } else {
            const parts = [];
            if(flags.d) parts.push(releaseInfo.Description);
            if(flags.c) parts.push(releaseInfo.Codename);
            if(flags.r) parts.push(releaseInfo.Release);
            if(parts.length === 0) { // Default behavior of lsb_release is -d if no flags
                 result = `Description:\t${releaseInfo.Description}`;
            } else {
                 result = parts.join('\n');
            }
        }
        setOutput(result);
    };
    
    const getCommand = () => {
        const activeFlags = Object.keys(flags).filter(f => flags[f as keyof typeof flags]).join('');
        return `lsb_release -${activeFlags || 'd'}`;
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4 mb-6">
                <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><Info /> `lsb_release` Controls</h2>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2"><Checkbox id="a" checked={flags.a} onCheckedChange={c => handleFlagChange('a', Boolean(c))} /><Label htmlFor="a">-a (All)</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="d" checked={flags.d} onCheckedChange={c => handleFlagChange('d', Boolean(c))} /><Label htmlFor="d">-d (Description)</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="c" checked={flags.c} onCheckedChange={c => handleFlagChange('c', Boolean(c))} /><Label htmlFor="c">-c (Codename)</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="r" checked={flags.r} onCheckedChange={c => handleFlagChange('r', Boolean(c))} /><Label htmlFor="r">-r (Release)</Label></div>
                </div>
                <Button onClick={runCommand} className="w-full bg-neon-green text-black hover:bg-white">Run Command</Button>
            </div>

            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2"><Terminal /> Output</h2>
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-sm min-h-[150px]">
                    <p className="text-gray-400">$ {getCommand()}</p>
                    <motion.pre
                        key={output}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="whitespace-pre-wrap mt-2"
                    >
                        {output || '(Run command to see output)'}
                    </motion.pre>
                </div>
            </div>
        </div>
    );
};

export { LsbReleaseGame };
