
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Link, Terminal, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function GitRemoteGame() {
    const { toast } = useToast();
    const [remotes, setRemotes] = useState<{ name: string; url: string }[]>([]);
    const [remoteName, setRemoteName] = useState('origin');
    const [remoteUrl, setRemoteUrl] = useState('https://github.com/user/repo.git');
    const [output, setOutput] = useState<string[]>(['Run `git remote -v` to see configured remotes.']);

    const handleAddRemote = () => {
        if (!remoteName || !remoteUrl) {
            toast({ title: 'Error', description: 'Both name and URL are required.', variant: 'destructive' });
            return;
        }
        if (remotes.find(r => r.name === remoteName)) {
            toast({ title: 'Error', description: `Remote '${remoteName}' already exists.`, variant: 'destructive' });
            return;
        }
        setRemotes(prev => [...prev, { name: remoteName, url: remoteUrl }]);
        toast({ title: 'Success', description: `Added remote '${remoteName}'.` });
    };
    
    const handleShowRemotes = () => {
        if (remotes.length === 0) {
            setOutput([]);
            return;
        }
        const newOutput = remotes.flatMap(r => [
            `${r.name}\t${r.url} (fetch)`,
            `${r.name}\t${r.url} (push)`
        ]);
        setOutput(newOutput);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
            {/* Controls */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="h-6 w-6 text-neon-pink" />
                        <h2 className="text-xl font-bold">Commands</h2>
                    </div>
                     <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm">Remote Name</label>
                            <Input value={remoteName} onChange={(e) => setRemoteName(e.target.value)} placeholder="e.g., origin" className="bg-dark-primary" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm">Remote URL</label>
                            <Input value={remoteUrl} onChange={(e) => setRemoteUrl(e.target.value)} placeholder="e.g., https://github.com/user/repo.git" className="bg-dark-primary" />
                        </div>
                        <Button onClick={handleAddRemote} className="w-full bg-neon-blue text-black hover:bg-white">
                           <Plus className="mr-2"/> git remote add {remoteName || '...'} {'<url>'}
                        </Button>
                    </div>
                </div>
                 <div className="pt-6 border-t border-white/10">
                     <Button onClick={handleShowRemotes} className="w-full bg-neon-green text-black hover:bg-white">
                       <Eye className="mr-2"/> git remote -v
                    </Button>
                </div>
            </div>

            {/* Visualization */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <div className="flex items-center gap-3 mb-4">
                    <Server className="h-6 w-6 text-neon-green" />
                    <h2 className="text-xl font-bold">Configured Remotes</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg min-h-[300px] text-sm font-mono overflow-x-auto">
                    <AnimatePresence>
                        {output.map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="whitespace-pre"
                                dangerouslySetInnerHTML={{ __html: line.replace(/(\S+)\s+(\S+)\s+\((\w+)\)/, '<span class="text-amber-400">$1</span>\t<span class="text-neon-blue">$2</span> ($3)') }}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
