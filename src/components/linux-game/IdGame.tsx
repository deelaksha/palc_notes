
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Terminal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const users = {
    'myuser': { uid: 1000, gid: 1000, groups: '1000(myuser), 27(sudo), 100(users)'},
    'root': { uid: 0, gid: 0, groups: '0(root)'},
    'www-data': { uid: 33, gid: 33, groups: '33(www-data)'},
};

const IdGame = () => {
    const [selectedUser, setSelectedUser] = useState('myuser');
    const user = users[selectedUser as keyof typeof users];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Controls */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                 <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><User /> `id` Controls</h2>
                <p className="text-xs text-gray-400">Select a user to see their identity information.</p>
                
                <div>
                    <label htmlFor="user-select">User:</label>
                    <Select value={selectedUser} onValueChange={setSelectedUser}>
                        <SelectTrigger id="user-select"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {Object.keys(users).map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            {/* Output */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50">
                 <h2 className="text-xl font-bold text-neon-green mb-4 flex items-center gap-2"><Terminal/> Output</h2>
                <div className="bg-dark-primary p-4 rounded-lg font-mono text-sm min-h-[150px]">
                    <p className="text-gray-400">$ id {selectedUser}</p>
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedUser}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2"
                    >
                       <p>uid=<span className="text-neon-green">{user.uid}</span>({selectedUser}) gid=<span className="text-neon-green">{user.gid}</span>({selectedUser}) groups=<span className="text-amber-400">{user.groups}</span></p>
                    </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export { IdGame };
