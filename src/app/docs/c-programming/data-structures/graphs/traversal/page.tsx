
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const graphData = {
  nodes: { A: {x: '20%', y: '50%'}, B: {x: '40%', y: '20%'}, C: {x: '40%', y: '80%'}, D: {x: '60%', y: '50%'}, E: {x: '80%', y: '20%'}, F: {x: '80%', y: '80%'} },
  adj: {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B'],
    F: ['C'],
  },
};

const bfsOrder = ['A', 'B', 'C', 'D', 'E', 'F'];
const dfsOrder = ['A', 'B', 'D', 'E', 'C', 'F'];

const GraphTraversalVisualizer = ({ traversalType }: { traversalType: 'bfs' | 'dfs' }) => {
  const [visited, setVisited] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const order = traversalType === 'bfs' ? bfsOrder : dfsOrder;

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setVisited([]);
    let i = 0;
    const interval = setInterval(() => {
      setVisited(prev => [...prev, order[i]]);
      i++;
      if (i >= order.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 800);
  };
  
  const reset = () => {
      setVisited([]);
      setIsAnimating(false);
  }

  return (
    <Card className="bg-card-nested">
        <CardContent className="p-6">
             <div className="relative h-64 w-full mb-6">
                {/* Edges */}
                <svg className="absolute w-full h-full" style={{top:0, left:0}}>
                    {Object.entries(graphData.adj).map(([node, neighbors]) => 
                        neighbors.map(neighbor => {
                            const n1 = graphData.nodes[node as keyof typeof graphData.nodes];
                            const n2 = graphData.nodes[neighbor as keyof typeof graphData.nodes];
                            return <line key={`${node}-${neighbor}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} className="stroke-white/20" />
                        })
                    )}
                </svg>
                 {/* Nodes */}
                {Object.entries(graphData.nodes).map(([id, pos]) => (
                    <motion.div
                        key={id}
                        className={cn("absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-300", visited.includes(id) ? 'bg-neon-green text-black border-white' : 'bg-dark-secondary border-neon-blue/50')}
                        style={{ left: pos.x, top: pos.y }}
                        animate={{ scale: visited.includes(id) ? 1.1 : 1 }}
                    >
                        {id}
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-center gap-2">
                <Button onClick={runAnimation} disabled={isAnimating}>{isAnimating ? 'Traversing...' : `Run ${traversalType.toUpperCase()}`}</Button>
                <Button onClick={reset} variant="outline">Reset</Button>
            </div>
            <div className="mt-4 p-4 bg-background rounded-lg min-h-[50px]">
                <h4 className="font-semibold mb-2">Visited Order:</h4>
                <div className="flex gap-2 flex-wrap font-mono">
                    <AnimatePresence>
                    {visited.map((node, i) => (
                        <motion.div
                            key={node}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: i * 0.1}}
                            className="bg-primary/20 px-2 py-1 rounded-md text-primary"
                        >
                            {node}
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default function GraphTraversalPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-wide">Graph Traversal Algorithms</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Exploring Breadth-First Search (BFS) and Depth-First Search (DFS).
            </p>
        </header>

        <Tabs defaultValue="bfs" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bfs">Breadth-First Search (BFS)</TabsTrigger>
                <TabsTrigger value="dfs">Depth-First Search (DFS)</TabsTrigger>
            </TabsList>
            <TabsContent value="bfs" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle>How BFS Works</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">BFS explores the graph "layer by layer". It starts at a source node, explores all of its immediate neighbors, then explores all of their neighbors, and so on. It's like ripples spreading out in a pond.</p>
                                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-1 text-sm">
                                    <li>Uses a **Queue** data structure (First-In, First-Out).</li>
                                    <li>Finds the shortest path between two nodes in an unweighted graph.</li>
                                    <li>Excellent for finding all reachable nodes.</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>C Implementation (BFS)</CardTitle></CardHeader>
                            <CardContent>
                                <CodeBlock>
{`// Simplified BFS implementation
#include <stdio.h>
#include <stdlib.h>
#define MAX 50

int queue[MAX];
int front = -1, rear = -1;

void enqueue(int item) {
    // ...
}
int dequeue() {
    // ...
}

void bfs(int adj[MAX][MAX], int startNode, int n) {
    int visited[MAX] = {0};
    int i;
    
    enqueue(startNode);
    visited[startNode] = 1;
    
    while(front != -1) {
        int currentNode = dequeue();
        printf("%c ", currentNode + 65); // Print node
        
        for (i = 0; i < n; i++) {
            if (adj[currentNode][i] == 1 && !visited[i]) {
                enqueue(i);
                visited[i] = 1;
            }
        }
    }
}`}
                                </CodeBlock>
                            </CardContent>
                        </Card>
                    </div>
                    <GraphTraversalVisualizer traversalType="bfs" />
                </div>
            </TabsContent>
             <TabsContent value="dfs" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <Card>
                            <CardHeader><CardTitle>How DFS Works</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">DFS explores as far as possible down one path before backtracking. It's like navigating a maze by taking one path, hitting a dead end, and then backtracking to try a different one.</p>
                                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-1 text-sm">
                                    <li>Uses a **Stack** data structure (Last-In, First-Out), often implemented with recursion.</li>
                                    <li>Good for pathfinding or checking if a graph is connected.</li>
                                    <li>Can get stuck in long paths if the graph is very deep.</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>C Implementation (DFS)</CardTitle></CardHeader>
                            <CardContent>
                                <CodeBlock>
{`// Simplified recursive DFS implementation
#include <stdio.h>
#define MAX 50

void dfs(int adj[MAX][MAX], int visited[MAX], int startNode, int n) {
    int i;
    printf("%c ", startNode + 65); // Print node
    visited[startNode] = 1;
    
    for (i = 0; i < n; i++) {
        if (adj[startNode][i] == 1 && !visited[i]) {
            dfs(adj, visited, i, n);
        }
    }
}`}
                                </CodeBlock>
                            </CardContent>
                        </Card>
                    </div>
                     <GraphTraversalVisualizer traversalType="dfs" />
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
