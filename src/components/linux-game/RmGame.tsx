
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, Folder, Trash2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const initialItems = [
    { name: 'temp_file.tmp', type: 'file' },
    { name: 'project_folder', type: 'folder' },
    { name: 'document.pdf', type: 'file' },
];

const Item = ({ item, onRemove }: { item: any, onRemove: (item: any) => void }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
        className="flex items-center justify-between p-3 bg-dark-secondary rounded-lg border border-neon-blue/50"
    >
        <div className="flex items-center gap-2">
            {item.type === 'folder' ? <Folder className="w-5 h-5 text-amber-400" /> : <File className="w-5 h-5 text-neon-blue" />}
            <span className="font-mono">{item.name}</span>
        </div>
        <Button size="icon" variant="ghost" onClick={() => onRemove(item)} className="h-8 w-8 text-neon-pink hover:bg-neon-pink/20">
            <Trash2 className="w-5 h-5"/>
        </Button>
    </motion.div>
);

export function RmGame() {
    const { toast } = useToast();
    const [items, setItems] = useState(initialItems);
    const [recursive, setRecursive] = useState(false);
    const [force, setForce] = useState(false);

    const handleRemove = (item: any) => {
        if (item.type === 'folder' && !recursive) {
            toast({ title: 'Cannot remove directory', description: `rm: cannot remove '${item.name}': Is a directory. (Hint: use -r flag)`, variant: 'destructive'});
            return;
        }

        const command = `rm ${recursive ? '-r' : ''}${force ? 'f' : ''} ${item.name}`;
        
        setItems(prev => prev.filter(i => i.name !== item.name));
        toast({ title: 'Removed!', description: `Ran \`${command}\`` });
    };

    const resetGame = () => {
        setItems(initialItems);
        toast({title: 'Game Reset'});
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {/* Controls */}
            <div className="md:col-span-1 glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink mb-4">`rm` Flags</h2>
                 <p className="text-xs text-gray-400">Click the trash icon on an item to run `rm` with the selected flags.</p>
                <div className="flex items-center space-x-2">
                    <Checkbox id="recursive" checked={recursive} onCheckedChange={(checked) => setRecursive(Boolean(checked))} />
                    <Label htmlFor="recursive" className="text-base"> -r (Recursive)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="force" checked={force} onCheckedChange={(checked) => setForce(Boolean(checked))} />
                    <Label htmlFor="force" className="text-base flex items-center gap-2"> -f (Force) <ShieldAlert className="w-4 h-4 text-red-500"/></Label>
                </div>
                <Button onClick={resetGame} variant="outline" className="w-full !mt-8">Reset</Button>
            </div>
            
            {/* File View */}
            <div className="md:col-span-2 glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                <h2 className="text-xl font-bold text-neon-green mb-4">Current Directory</h2>
                <div className="space-y-3 min-h-[200px]">
                    <AnimatePresence>
                        {items.map(item => <Item key={item.name} item={item} onRemove={handleRemove} />)}
                    </AnimatePresence>
                    {items.length === 0 && <p className="text-center text-gray-400 pt-16">Directory is empty.</p>}
                </div>
            </div>
        </div>
    );
}

