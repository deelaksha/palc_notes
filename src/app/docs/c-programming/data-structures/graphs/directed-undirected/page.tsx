
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const nodes = [
    { id: 0, x: 50, y: 100 },
    { id: 1, x: 150, y: 50 },
    { id: 2, x: 150, y: 150 },
    { id: 3, x: 250, y: 100 },
];

const edges = [
    { from: 0, to: 1, weight: 5 },
    { from: 0, to: 2, weight: 3 },
    { from: 1, to: 2, weight: 2 },
    { from: 1, to: 3, weight: 8 },
    { from: 2, to: 3, weight: 4 },
];

const Edge = ({ edge, isDirected, isWeighted }: { edge: any, isDirected: boolean, isWeighted: boolean }) => {
    const fromNode = nodes[edge.from];
    const toNode = nodes[edge.to];
    const progress = useMotionValue(0);

    useEffect(() => {
        if (isDirected) {
            const animation = motion.animate(progress, 1, {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
            });
            return () => animation.stop();
        }
    }, [isDirected, progress]);

    const cx = useTransform(progress, [0, 1], [fromNode.x, toNode.x]);
    const cy = useTransform(progress, [0, 1], [fromNode.y, toNode.y]);

    return (
        <g>
            <motion.line
                x1={fromNode.x} y1={fromNode.y}
                x2={toNode.x} y2={toNode.y}
                stroke="hsl(var(--muted-foreground))" strokeWidth="2"
                markerEnd={isDirected ? "url(#arrow)" : ""}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
            />
             <AnimatePresence>
            {isDirected && (
                <motion.circle
                    r="4"
                    fill="hsl(var(--primary))"
                    style={{ cx, cy }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                 />
            )}
            </AnimatePresence>
            <AnimatePresence>
                {isWeighted && (
                    <motion.text
                        x={(fromNode.x + toNode.x) / 2}
                        y={(fromNode.y + toNode.y) / 2 - 8}
                        fill="hsl(var(--primary))" fontSize="14" textAnchor="middle" fontWeight="bold"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        {edge.weight}
                    </motion.text>
                )}
            </AnimatePresence>
        </g>
    )
}

const GraphVisualizer = () => {
    const [isDirected, setIsDirected] = useState(false);
    const [isWeighted, setIsWeighted] = useState(false);

    const adjacencyMatrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));
    edges.forEach(edge => {
        const value = isWeighted ? edge.weight : 1;
        adjacencyMatrix[edge.from][edge.to] = value;
        if (!isDirected) {
            adjacencyMatrix[edge.to][edge.from] = value;
        }
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Interactive Graph Visualizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <div className="flex items-center space-x-2">
                        <Switch id="directed-switch" checked={isDirected} onCheckedChange={setIsDirected} />
                        <Label htmlFor="directed-switch">Directed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="weighted-switch" checked={isWeighted} onCheckedChange={setIsWeighted} />
                        <Label htmlFor="weighted-switch">Weighted</Label>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center pt-4">
                    <div className="relative w-full max-w-sm h-64 mx-auto">
                        <svg viewBox="0 0 300 200" className="w-full h-full" aria-labelledby="graph-title">
                            <title id="graph-title">An animated graph showing nodes and edges.</title>
                            <defs>
                                <motion.marker 
                                    id="arrow" 
                                    viewBox="0 0 10 10" 
                                    refX="10" refY="5" 
                                    markerWidth="6" markerHeight="6" 
                                    orient="auto-start-reverse"
                                >
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
                                </motion.marker>
                            </defs>
                            
                            {edges.map((edge, index) => (
                               <Edge key={`edge-${index}`} edge={edge} isDirected={isDirected} isWeighted={isWeighted} />
                            ))}
                            
                            {nodes.map(node => (
                                <motion.g 
                                    key={`node-${node.id}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                >
                                    <circle cx={node.x} cy={node.y} r="15" fill="hsl(var(--primary))" />
                                    <text x={node.x} y={node.y} dy="5" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="12">{node.id}</text>
                                </motion.g>
                            ))}
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-center">Adjacency Matrix</h4>
                        <div className="p-4 bg-card-nested rounded-lg font-mono text-center text-sm">
                            <AnimatePresence>
                            {adjacencyMatrix.map((row, i) => (
                                <motion.div 
                                    key={`row-${i}`} 
                                    className="flex justify-around"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {row.map((val, j) => (
                                        <motion.span
                                            key={`cell-${j}`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-8 py-1"
                                        >
                                            {val}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function DirectedUndirectedPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-wide">Graph Types</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Exploring how direction and edge weights define a graph's behavior.
                </p>
            </header>
            
            <GraphVisualizer />

            <Card>
                <CardHeader><CardTitle>Directed vs. Undirected Graphs</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">The primary difference is whether the relationship between two nodes is a one-way or two-way street.</p>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-secondary-accent mb-2">Undirected Graphs</h4>
                            <p className="text-sm text-muted-foreground">Edges have no orientation. If an edge connects node A to B, it also connects B to A. Think of a friendship on Facebook. The adjacency matrix for an undirected graph is always symmetric.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-secondary-accent mb-2">Directed Graphs (Digraphs)</h4>
                            <p className="text-sm text-muted-foreground">Edges have a direction. An edge from A to B does not imply an edge from B to A. Think of following someone on Twitter. The adjacency matrix may not be symmetric.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

             <Card id="weighted-unweighted">
                <CardHeader><CardTitle>Weighted vs. Unweighted Graphs</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">This distinction is about whether the edges have a 'cost' associated with them.</p>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-secondary-accent mb-2">Unweighted Graphs</h4>
                            <p className="text-sm text-muted-foreground">Edges simply represent a connection. The only concern is whether a path exists, not how 'long' it is. The adjacency matrix uses '1' to represent an edge.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-secondary-accent mb-2">Weighted Graphs</h4>
                            <p className="text-sm text-muted-foreground">Each edge has a numerical weight or cost. This can represent distance, time, or capacity. Finding the "shortest path" often means finding the path with the minimum total weight. The adjacency matrix uses the weights instead of '1'.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
