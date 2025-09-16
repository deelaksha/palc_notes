
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const commitHistory = [
    { id: 'C1', msg: 'Initial commit' },
    { id: 'C2', msg: 'Add feature X' },
    { id: 'C3', msg: 'Fix bug in feature X' },
    { id: 'C4', msg: 'Prepare for release' },
];

const Commit = ({ commit, tags }: { commit: any, tags: any[] }) => (
    <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg w-64">
            <GitCommit className="w-5 h-5 text-neon-blue flex-shrink-0" />
            <div className="truncate">
                <span className="font-mono text-xs text-amber-400">{commit.id}</span>
                <span className="text-sm text-gray-300 ml-2">{commit.msg}</span>
            </div>
        </div>
        <div className="flex gap-2">
            <AnimatePresence>
            {tags.map(tag => (
                <motion.div
                    key={tag.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs"
                >
                    <Tag className="w-3 h-3" />
                    <span>{tag.name}</span>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
    </div>
);

export function GitTagGame() {
    const { toast } = useToast();
    const [tags, setTags] = useState<{ [key: string]: { name: string }[] }>({});
    const [tagName, setTagName] = useState('');
    
    const handleTag = () => {
        if (!tagName) {
            toast({ title: 'Tag name is required', variant: 'destructive'});
            return;
        }

        const targetCommit = 'C4'; // For simplicity, always tag the last commit
        
        setTags(prev => {
            const commitTags = prev[targetCommit] || [];
            if(commitTags.some(t => t.name === tagName)) {
                toast({ title: 'Tag already exists', variant: 'destructive'});
                return prev;
            }
            toast({ title: 'Success!', description: `Tagged commit ${targetCommit} with '${tagName}'`});
            return {
                ...prev,
                [targetCommit]: [...commitTags, { name: tagName }]
            };
        });
        setTagName('');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink mb-4">Tagging Controls</h2>
                <p className="text-xs text-gray-400">Create a lightweight tag and apply it to the latest commit (C4).</p>
                <div>
                    <label className="text-sm mb-2 block">Tag Name:</label>
                    <Input 
                        value={tagName} 
                        onChange={(e) => setTagName(e.target.value)} 
                        placeholder="e.g., v1.0.0"
                        className="bg-dark-primary"
                    />
                </div>
                <Button onClick={handleTag} className="w-full bg-neon-green text-black hover:bg-white">
                    <Tag className="mr-2"/> git tag {tagName || '<name>'}
                </Button>
            </div>

            {/* Commit History */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <h2 className="text-xl font-bold text-neon-blue mb-4">Commit History</h2>
                <div className="space-y-3">
                    {commitHistory.map(commit => (
                        <Commit key={commit.id} commit={commit} tags={tags[commit.id] || []} />
                    ))}
                </div>
            </div>
        </div>
    );
}
