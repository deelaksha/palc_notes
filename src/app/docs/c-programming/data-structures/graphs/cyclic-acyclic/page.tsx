
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Workflow, HelpCircle } from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const nodes = [
    { id: 0, x: 50, y: 50, label: 'A' },
    { id: 1, x: 150, y: 150, label: 'B' },
    { id: 2, x: 50, y: 250, label: 'C' },
    { id: 3, x: 250, y: 150, label: 'D' },
];

const initialEdges = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 1, to: 3 },
];

const cycleEdge = { from: 3, to: 0 };
const cyclePath = [0, 1, 3, 0];

const Edge = ({ from, to, isCycleEdge, isHighlighted }: { from: any, to: any, isCycleEdge?: boolean, isHighlighted?: boolean }) => {
    return (
        <motion.line
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            stroke={isHighlighted ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
            strokeWidth={isHighlighted ? 4 : 2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{ duration: 0.5 }}
            markerEnd="url(#arrow)"
        />
    );
};

const CycleVisualizer = () => {
    const [hasCycle, setHasCycle] = useState(false);
    const [explanation, setExplanation] = useState('An acyclic graph has no paths that start and end at the same node.');

    const toggleCycle = () => {
        setHasCycle(!hasCycle);
        if (!hasCycle) {
            setExplanation('Added an edge from D to A, creating a cycle (A -> B -> D -> A). This is now a cyclic graph.');
        } else {
            setExplanation('Removed the edge from D to A. The graph is now acyclic again.');
        }
    };
    
    const allEdges = hasCycle ? [...initialEdges, cycleEdge] : initialEdges;

    return (
         <Card>
            <CardHeader>
                <CardTitle>Interactive Cycle Visualizer</CardTitle>
                <CardDescription>Click the button to add or remove an edge that creates a cycle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center">
                    <Button onClick={toggleCycle}>{hasCycle ? 'Remove Cycle' : 'Create Cycle'}</Button>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center pt-4">
                    <div className="relative w-full max-w-sm h-72 mx-auto">
                        <svg viewBox="0 0 300 300" className="w-full h-full">
                            <defs>
                                <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
                                </marker>
                            </defs>
                            <AnimatePresence>
                            {allEdges.map((edge, index) => {
                                const fromNode = nodes.find(n => n.id === edge.from)!;
                                const toNode = nodes.find(n => n.id === edge.to)!;
                                const isCyclePart = hasCycle && cyclePath.includes(edge.from) && cyclePath.includes(edge.to);
                                return <Edge key={index} from={fromNode} to={toNode} isHighlighted={isCyclePart} />;
                            })}
                            </AnimatePresence>
                             {nodes.map(node => (
                                <motion.g key={node.id} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <circle cx={node.x} cy={node.y} r="15" fill="hsl(var(--primary))" />
                                    <text x={node.x} y={node.y} dy="5" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="12">{node.label}</text>
                                </motion.g>
                            ))}
                        </svg>
                    </div>
                     <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-foreground flex items-center gap-2"><HelpCircle className="size-5"/> What's Happening:</h4>
                        <p className="text-muted-foreground text-sm">{explanation}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function CyclicAcyclicPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            <header className="text-center">
                 <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <Workflow className="size-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-wide">Cyclic vs. Acyclic Graphs</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Understanding cycles is crucial for many algorithms, from detecting dependencies to finding shortest paths.
                </p>
            </header>
            
            <CycleVisualizer />

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader><CardTitle>Cyclic Graphs</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">A cyclic graph is a graph containing at least one path that starts and ends at the same vertex. Such a path is called a cycle.</p>
                        <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2">
                            <li>Cycles can be found in both directed and undirected graphs.</li>
                            <li>They can complicate traversal algorithms and may represent invalid states (e.g., a circular dependency in a task manager).</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Acyclic Graphs</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">An acyclic graph is a graph that has no cycles. It's impossible to start at a node, follow a sequence of edges, and return to the starting node.</p>
                         <ul className="list-disc list-inside text-muted-foreground text-sm space-y-2">
                            <li>A connected, undirected, acyclic graph is called a **Tree**.</li>
                            <li>A **Directed Acyclic Graph (DAG)** is a directed graph with no directed cycles. DAGs are extremely important for modeling many real-world scenarios.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Detecting Cycles with DFS</CardTitle>
                    <CardDescription>A common way to detect a cycle in a directed graph is to use Depth-First Search (DFS) and keep track of the nodes currently in the recursion stack.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">The basic idea is: if a DFS traversal encounters a node that is already in the current recursion stack (i.e., it's an ancestor in the DFS tree), then a cycle has been found.</p>
                    <CodeBlock>
{`#include <stdbool.h>
// Simplified C-like pseudocode for cycle detection

bool isCyclicUtil(int v, bool visited[], bool recursionStack[], struct Graph* graph) {
    if (recursionStack[v])
        return true; // Found a back edge, cycle detected
    if (visited[v])
        return false; // Already visited and no cycle found from here

    visited[v] = true;
    recursionStack[v] = true;

    // Recur for all adjacent vertices
    struct Node* node = graph->adjLists[v];
    while (node != NULL) {
        if (isCyclicUtil(node->vertex, visited, recursionStack, graph))
            return true;
        node = node->next;
    }

    recursionStack[v] = false; // Remove the vertex from recursion stack
    return false;
}`}
                    </CodeBlock>
                </CardContent>
            </Card>

        </div>
    );
}
