
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, AtSign, Settings, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function GitConfigGame() {
    const { toast } = useToast();
    const [config, setConfig] = useState({ name: '', email: '' });
    const [command, setCommand] = useState('');

    const handleCommandRun = () => {
        const commandParts = command.trim().split(/\s+/);
        if (commandParts[0] !== 'git' || commandParts[1] !== 'config' || commandParts[2] !== '--global') {
            toast({ title: "Invalid Command", description: "Please use 'git config --global ...'", variant: "destructive" });
            return;
        }

        const key = commandParts[3];
        const value = commandParts.slice(4).join(' ').replace(/"/g, '');

        if (key === 'user.name') {
            setConfig(prev => ({ ...prev, name: value }));
            toast({ title: "Success!", description: `Set user.name to "${value}"` });
        } else if (key === 'user.email') {
            setConfig(prev => ({ ...prev, email: value }));
            toast({ title: "Success!", description: `Set user.email to "${value}"` });
        } else {
            toast({ title: "Invalid Key", description: "You can only set 'user.name' or 'user.email'.", variant: "destructive" });
        }
        setCommand('');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-4xl mx-auto">
            {/* Controls */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-pink" />
                    <h2 className="text-xl font-bold">Command Input</h2>
                </div>
                <p className="text-xs text-gray-400 mb-4">
                    Set your Git identity. Use the commands below:
                </p>
                <div className="space-y-4">
                    <code className="block text-sm bg-dark-primary p-2 rounded-md text-neon-green">git config --global user.name "Your Name"</code>
                    <code className="block text-sm bg-dark-primary p-2 rounded-md text-neon-green">git config --global user.email "you@example.com"</code>
                    <div className="flex gap-2 items-center pt-4">
                        <Input
                            type="text"
                            placeholder="Enter command here..."
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCommandRun()}
                            className="bg-dark-primary border-white/20"
                        />
                        <Button onClick={handleCommandRun} className="bg-neon-green text-black hover:bg-white">
                            Run
                        </Button>
                    </div>
                </div>
            </div>

            {/* Visualization */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-6">
                    <Settings className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">Git Configuration</h2>
                </div>
                <div className="space-y-4">
                    <motion.div layout className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
                        <User className="h-5 w-5 text-neon-blue flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-400">user.name</p>
                            <p className="font-semibold text-lg break-all">{config.name || 'Not Set'}</p>
                        </div>
                    </motion.div>
                    <motion.div layout className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
                        <AtSign className="h-5 w-5 text-neon-blue flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-400">user.email</p>
                            <p className="font-semibold text-lg break-all">{config.email || 'Not Set'}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
