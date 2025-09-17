
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Mail, Route, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const nodes = {
  A: { x: '10%', y: '50%' },
  B: { x: '35%', y: '20%' },
  C: { x: '35%', y: '80%' },
  D: { x: '65%', y: '50%' },
  E: { x: '90%', y: '50%' },
};

const links = [
  { from: 'A', to: 'B' },
  { from: 'A', to: 'C' },
  { from: 'B', to: 'D' },
  { from: 'C', to: 'D' },
  { from: 'D', to: 'E' },
];

export function DynamicRoutingGame() {
  const { toast } = useToast();
  const [isLinkDown, setIsLinkDown] = useState(false);
  const [packetPath, setPacketPath] = useState(['A', 'B', 'D', 'E']);
  const [currentHop, setCurrentHop] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getPosition = (nodeId: string) => ({
    left: nodes[nodeId as keyof typeof nodes].x,
    top: nodes[nodeId as keyof typeof nodes].y,
  });

  const runAnimation = async () => {
    setIsAnimating(true);
    setCurrentHop(0);
    for (let i = 1; i < packetPath.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      setCurrentHop(i);
    }
    await new Promise(r => setTimeout(r, 800));
    setIsAnimating(false);
  };
  
  const simulateFailure = async () => {
    if (isLinkDown || isAnimating) return;
    setIsAnimating(true);
    toast({ title: 'Link Failure!', description: 'Link between Router B and D has failed.', variant: 'destructive'});
    setIsLinkDown(true);
    await new Promise(r => setTimeout(r, 1000));
    
    toast({ title: 'Convergence...', description: 'Routers are updating their routing tables via OSPF/BGP.'});
    setPacketPath(['A', 'C', 'D', 'E']); // New path
    await new Promise(r => setTimeout(r, 1500));
    
    toast({ title: 'New Path Found!', description: 'Network has converged. New path is A -> C -> D -> E.'});
    setIsAnimating(false);
  };
  
  const resetGame = () => {
      setIsLinkDown(false);
      setPacketPath(['A', 'B', 'D', 'E']);
      setCurrentHop(0);
      setIsAnimating(false);
  }

  const packetAnimate = {
    ...getPosition(packetPath[currentHop]),
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  };

  return (
    <Card className="bg-card-nested border-primary/20">
      <CardContent className="p-4">
        <div className="relative h-64 mb-4">
          {/* Links */}
          {links.map(({ from, to }) => {
             const isFailedLink = isLinkDown && ((from === 'B' && to === 'D') || (from === 'D' && to === 'B'));
             return (
                <svg key={`${from}-${to}`} className="absolute w-full h-full" style={{ top: 0, left: 0 }}>
                    <motion.line
                        x1={nodes[from as keyof typeof nodes].x}
                        y1={nodes[from as keyof typeof nodes].y}
                        x2={nodes[to as keyof typeof nodes].x}
                        y2={nodes[to as keyof typeof nodes].y}
                        className={cn("stroke-current", isFailedLink ? "text-red-500/50" : "text-white/20")}
                        strokeWidth="2"
                        animate={{ strokeDasharray: isFailedLink ? "4 4" : "none" }}
                    />
                </svg>
            )
          })}

          {/* Nodes */}
          {Object.entries(nodes).map(([id, { x, y }]) => (
            <div key={id} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: x, top: y }}>
              {id === 'A' || id === 'E' ? <Server className="w-8 h-8 text-neon-blue"/> : <Route className="w-10 h-10 text-neon-green" />}
              <p className="text-xs font-bold">{id}</p>
            </div>
          ))}

          {/* Packet */}
          <motion.div initial={{ opacity: 0 }} animate={packetAnimate}>
            <Mail className="w-8 h-8 text-neon-pink" />
          </motion.div>
        </div>
        <div className="flex justify-center gap-2">
            <Button onClick={runAnimation} disabled={isAnimating}>{isAnimating ? 'Sending...' : 'Send Packet'}</Button>
            <Button onClick={simulateFailure} variant="destructive" disabled={isLinkDown || isAnimating}><WifiOff className="mr-2"/>Simulate Failure</Button>
            <Button onClick={resetGame} variant="outline"><RefreshCw className="mr-2"/>Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
}
