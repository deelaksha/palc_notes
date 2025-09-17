
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast';

const users = ['root', 'alice', 'bob'];
const groups = ['root', 'developers', 'admins', 'users'];

export function ChownGame() {
    const { toast } = useToast();
    const [owner, setOwner] = useState('alice');
    const [group, setGroup] = useState('users');
    const [selectedOwner, setSelectedOwner] = useState(owner);
    const [selectedGroup, setSelectedGroup] = useState(group);

    const handleChown = () => {
        setOwner(selectedOwner);
        setGroup(selectedGroup);
        toast({ title: 'Ownership Changed!', description: `sudo chown ${selectedOwner}:${selectedGroup} config.yml`})
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Controls */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><User /> `chown` Controls</h2>
                <p className="text-xs text-gray-400">Select a new owner and group, then apply the changes.</p>
                
                <div>
                    <Label htmlFor="owner-select">New Owner:</Label>
                    <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                        <SelectTrigger id="owner-select"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {users.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                
                <div>
                    <Label htmlFor="group-select">New Group:</Label>
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                        <SelectTrigger id="group-select"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {groups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleChown} className="w-full bg-neon-green text-black hover:bg-white !mt-6">Apply chown</Button>
            </div>
            
            {/* File Info */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 flex flex-col justify-center items-center text-center">
                 <h2 className="text-xl font-bold text-neon-blue mb-4">File Info</h2>
                 <div className="p-4 bg-dark-primary rounded-lg mb-4">
                    <FileText className="w-16 h-16 text-neon-blue" />
                    <p className="font-mono text-sm mt-1">config.yml</p>
                </div>
                
                <div className="flex gap-8">
                    <div className="text-center">
                        <h3 className="text-sm text-gray-400">Owner</h3>
                         <motion.div key={`owner-${owner}`} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="flex items-center gap-2 mt-1 text-lg font-bold text-amber-400">
                            <User/>
                            <span>{owner}</span>
                        </motion.div>
                    </div>
                     <div className="text-center">
                        <h3 className="text-sm text-gray-400">Group</h3>
                        <motion.div key={`group-${group}`} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="flex items-center gap-2 mt-1 text-lg font-bold text-amber-400">
                            <Users/>
                            <span>{group}</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
