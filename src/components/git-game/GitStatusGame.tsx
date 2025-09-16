
'use client';

import React, { useState } from 'react';
import { Terminal, File, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialFiles = {
    'index.html': 'staged',
    'style.css': 'modified',
    'app.js': 'untracked',
    'README.md': 'committed'
};

type FileStatus = 'staged' | 'modified' | 'untracked' | 'committed';

const statusStyles = {
    staged: { text: 'text-neon-green', border: 'border-neon-green' },
    modified: { text: 'text-amber-400', border: 'border-amber-400' },
    untracked: { text: 'text-neon-pink', border: 'border-neon-pink' },
    committed: { text: 'text-gray-400', border: 'border-gray-500' }
};

export function GitStatusGame() {
    const [files, setFiles] = useState(initialFiles);
    const [output, setOutput] = useState<string[]>([]);
    
    const runStatus = () => {
        const newOutput: string[] = [
            `On branch main`,
            `Your branch is up to date with 'origin/main'.`,
            ``
        ];
        
        const staged = Object.entries(files).filter(([_, status]) => status === 'staged');
        if (staged.length > 0) {
            newOutput.push('Changes to be committed:');
            newOutput.push('  (use "git restore --staged <file>..." to unstage)');
            staged.forEach(([name]) => newOutput.push(`\t<span class="text-neon-green">modified:   ${name}</span>`));
            newOutput.push('');
        }

        const modified = Object.entries(files).filter(([_, status]) => status === 'modified');
        if (modified.length > 0) {
            newOutput.push('Changes not staged for commit:');
            newOutput.push('  (use "git add <file>..." to update what will be committed)');
            newOutput.push('  (use "git restore <file>..." to discard changes in working directory)');
            modified.forEach(([name]) => newOutput.push(`\t<span class="text-amber-400">modified:   ${name}</span>`));
            newOutput.push('');
        }
        
        const untracked = Object.entries(files).filter(([_, status]) => status === 'untracked');
        if (untracked.length > 0) {
            newOutput.push('Untracked files:');
            newOutput.push('  (use "git add <file>..." to include in what will be committed)');
            untracked.forEach(([name]) => newOutput.push(`\t<span class="text-neon-pink">${name}</span>`));
            newOutput.push('');
        }

        if (staged.length === 0 && modified.length === 0 && untracked.length === 0) {
            newOutput.push('nothing to commit, working tree clean');
        }

        setOutput(newOutput);
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
            {/* File Structure */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <GitBranch className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Repository State</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {Object.entries(files).map(([name, status]) => (
                        <div key={name} className={`flex items-center gap-2 p-2 rounded-md bg-white/5 border-l-4 ${statusStyles[status as FileStatus].border}`}>
                            <File className={`h-4 w-4 ${statusStyles[status as FileStatus].text}`} />
                            <span className="text-sm">{name}</span>
                        </div>
                    ))}
                </div>
                 <div className="mt-6">
                    <Button onClick={runStatus} className="w-full bg-neon-green text-black hover:bg-white">
                        Run git status
                    </Button>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Terminal Output</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] text-sm overflow-x-auto">
                    <AnimatePresence>
                        {output.map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="whitespace-pre"
                                dangerouslySetInnerHTML={{ __html: line || ' ' }}
                            />
                        ))}
                    </AnimatePresence>
                    {output.length === 0 && <p className="text-gray-500">Run `git status` to see the output.</p>}
                </div>
            </div>
        </div>
    );
}
