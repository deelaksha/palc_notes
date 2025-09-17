
'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Hash, TextCursorInput } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const sampleText = `Hello world,
this is a sample text file.
It contains multiple lines,
words, and characters.
Use wc to count them!`;

const WcGame = () => {
    const [showLines, setShowLines] = useState(true);
    const [showWords, setShowWords] = useState(true);
    const [showChars, setShowChars] = useState(true);

    const counts = useMemo(() => {
        const lines = sampleText.split('\n').length;
        const words = sampleText.split(/\s+/).filter(Boolean).length;
        const chars = sampleText.length;
        return { lines, words, chars };
    }, []);

    const noFlags = !showLines && !showWords && !showChars;
    
    let displayedCounts = [];
    if (noFlags || showLines) displayedCounts.push({ label: 'Lines', value: counts.lines, icon: <TextCursorInput /> });
    if (noFlags || showWords) displayedCounts.push({ label: 'Words', value: counts.words, icon: <CheckSquare /> });
    if (noFlags || showChars) displayedCounts.push({ label: 'Characters', value: counts.chars, icon: <Hash /> });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Controls and File Preview */}
            <div className="space-y-6">
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                    <h2 className="text-xl font-bold text-neon-pink">`wc` Flags</h2>
                    <p className="text-xs text-gray-400">Select flags to change the output. If no flags are selected, all counts are shown.</p>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="lines" checked={showLines} onCheckedChange={(c) => setShowLines(Boolean(c))} />
                        <Label htmlFor="lines">-l (Lines)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="words" checked={showWords} onCheckedChange={(c) => setShowWords(Boolean(c))} />
                        <Label htmlFor="words">-w (Words)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="chars" checked={showChars} onCheckedChange={(c) => setShowChars(Boolean(c))} />
                        <Label htmlFor="chars">-c (Characters/Bytes)</Label>
                    </div>
                </div>
                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-2">sample.txt</h2>
                    <pre className="bg-dark-primary p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">{sampleText}</pre>
                </div>
            </div>

            {/* Results */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50 flex flex-col justify-center items-center">
                 <h2 className="text-xl font-bold text-neon-green mb-6">Output</h2>
                 <div className="flex gap-4 md:gap-8">
                    {displayedCounts.map(item => (
                        <motion.div
                            key={item.label}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-2 p-4 bg-dark-primary rounded-lg w-28"
                        >
                            <div className="text-neon-blue">{item.icon}</div>
                            <span className="text-3xl font-bold">{item.value}</span>
                            <span className="text-xs text-gray-400">{item.label}</span>
                        </motion.div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export { WcGame };
