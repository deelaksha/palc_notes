
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Shield, FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const PermissionCheckbox = ({ label, isChecked, onCheckedChange }: { label: string; isChecked: boolean; onCheckedChange: (checked: boolean) => void; }) => (
    <div className="flex items-center gap-2">
        <Checkbox checked={isChecked} onCheckedChange={onCheckedChange} id={label.toLowerCase()}/>
        <Label htmlFor={label.toLowerCase()} className="text-sm">{label}</Label>
    </div>
);

const PermissionGroup = ({ title, perms, setPerms }: { title: string; perms: any; setPerms: (perms: any) => void; }) => (
    <div className="p-4 bg-dark-secondary rounded-lg">
        <h4 className="font-bold mb-2">{title}</h4>
        <div className="flex gap-4">
            <PermissionCheckbox label="Read (4)" isChecked={perms.read} onCheckedChange={(c) => setPerms({...perms, read: c})} />
            <PermissionCheckbox label="Write (2)" isChecked={perms.write} onCheckedChange={(c) => setPerms({...perms, write: c})} />
            <PermissionCheckbox label="Execute (1)" isChecked={perms.execute} onCheckedChange={(c) => setPerms({...perms, execute: c})} />
        </div>
    </div>
);


export function ChmodGame() {
    const [ownerPerms, setOwnerPerms] = useState({ read: true, write: true, execute: false });
    const [groupPerms, setGroupPerms] = useState({ read: true, write: false, execute: false });
    const [otherPerms, setOtherPerms] = useState({ read: true, write: false, execute: false });

    const getOctal = (perms: any) => {
        let total = 0;
        if (perms.read) total += 4;
        if (perms.write) total += 2;
        if (perms.execute) total += 1;
        return total;
    };
    
    const getSymbolic = (perms: any) => {
        return (perms.read ? 'r' : '-') + (perms.write ? 'w' : '-') + (perms.execute ? 'x' : '-');
    }
    
    const ownerOctal = getOctal(ownerPerms);
    const groupOctal = getOctal(groupPerms);
    const otherOctal = getOctal(otherPerms);

    const symbolicPerms = `-${getSymbolic(ownerPerms)}${getSymbolic(groupPerms)}${getSymbolic(otherPerms)}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Controls */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-pink/50 space-y-4">
                <h2 className="text-xl font-bold text-neon-pink flex items-center gap-2"><KeyRound /> `chmod` Controls</h2>
                <p className="text-xs text-gray-400">Toggle the checkboxes to see how they affect the octal and symbolic permission representations.</p>
                <PermissionGroup title="Owner (User)" perms={ownerPerms} setPerms={setOwnerPerms} />
                <PermissionGroup title="Group" perms={groupPerms} setPerms={setGroupPerms} />
                <PermissionGroup title="Other" perms={otherPerms} setPerms={setOtherPerms} />
            </div>

            {/* Result */}
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-green/50 flex flex-col justify-center items-center text-center">
                <h2 className="text-xl font-bold text-neon-green mb-4">File Permissions</h2>
                <div className="p-4 bg-dark-primary rounded-lg mb-4">
                    <FileText className="w-16 h-16 text-neon-blue" />
                    <p className="font-mono text-sm mt-1">my_script.sh</p>
                </div>
                
                <div className="font-mono text-2xl bg-dark-secondary px-4 py-2 rounded-lg text-amber-400 mb-4">
                    <motion.div key={symbolicPerms} initial={{opacity: 0}} animate={{opacity: 1}}>{symbolicPerms}</motion.div>
                </div>
                
                <div className="text-lg">
                    <p>Octal Value: <span className="font-bold text-neon-green">{`${ownerOctal}${groupOctal}${otherOctal}`}</span></p>
                    <p className="font-mono text-sm mt-2 text-gray-400">chmod {`${ownerOctal}${groupOctal}${otherOctal}`} my_script.sh</p>
                </div>
            </div>
        </div>
    );
}
