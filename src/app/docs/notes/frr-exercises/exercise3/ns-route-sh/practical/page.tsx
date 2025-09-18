
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Route, FileText, GitBranch, Network } from 'lucide-react';
import Link from 'next/link';

const routingTables = {
    h1: [
        { dest: 'default', via: '192.168.1.1', dev: 'h1-r-arms' },
        { dest: '192.168.1.0/24', via: 'direct', dev: 'h1-r-arms' }
    ],
    h2: [
        { dest: 'default', via: '192.168.2.1', dev: 'h2-r-arms' },
        { dest: '192.168.2.0/24', via: 'direct', dev: 'h2-r-arms' }
    ],
    h3: [
        { dest: 'default', via: '192.168.3.1', dev: 'h3-r-arms' },
        { dest: '192.168.3.0/24', via: 'direct', dev: 'h3-r-arms' }
    ],
    router: [
        { dest: '192.168.1.0/24', via: 'direct', dev: 'r-h1-arms' },
        { dest: '192.168.2.0/24', via: 'direct', dev: 'r-h2-arms' },
        { dest: '192.168.3.0/24', via: 'direct', dev: 'r-h3-arms' }
    ]
};

const NsRoutePracticalPage = () => {
    const [selectedNode, setSelectedNode] = useState('router');
    const tableData = routingTables[selectedNode as keyof typeof routingTables];

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise3/ns-route-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                 <h1 className="text-2xl font-bold text-center text-primary font-mono">Routing Table Explorer</h1>
                
                <div className="flex justify-center gap-2">
                    {Object.keys(routingTables).map(node => (
                        <Button 
                            key={node} 
                            onClick={() => setSelectedNode(node)}
                            variant={selectedNode === node ? 'default' : 'outline'}
                        >
                            {node}
                        </Button>
                    ))}
                </div>

                <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                    <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center gap-2">
                        <Network /> Routing Table for: <span className="text-amber-400">{selectedNode}</span>
                    </h2>
                    <div className="bg-dark-primary p-4 rounded-lg font-mono text-xs">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedNode}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Destination</TableHead>
                                            <TableHead>Gateway</TableHead>
                                            <TableHead>Interface</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tableData.map(row => (
                                            <TableRow key={row.dest}>
                                                <TableCell>{row.dest}</TableCell>
                                                <TableCell>{row.via}</TableCell>
                                                <TableCell>{row.dev}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                     <div className="text-xs text-muted-foreground mt-4 p-2 bg-background/30 rounded">
                        <h4 className="font-bold">Explanation:</h4>
                        {selectedNode.startsWith('h') ? 
                            <p>The host knows its local network directly. For all other traffic (`default`), it sends it to its gateway (the router).</p> :
                            <p>The router knows about all three subnets because it's directly connected to them. It doesn't need a default gateway for this topology.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NsRoutePracticalPage;
