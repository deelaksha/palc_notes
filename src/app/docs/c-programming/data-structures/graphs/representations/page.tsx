
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GitBranch, Waypoints } from 'lucide-react';

const graphData = {
  nodes: ['A', 'B', 'C', 'D', 'E'],
  edges: [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'D' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'E' },
  ],
};

const AdjacencyMatrix = ({ nodes, edges }: { nodes: string[]; edges: { from: string; to: string }[] }) => {
  const matrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));
  edges.forEach(edge => {
    const fromIndex = nodes.indexOf(edge.from);
    const toIndex = nodes.indexOf(edge.to);
    if(fromIndex !== -1 && toIndex !== -1) {
        matrix[fromIndex][toIndex] = 1;
        matrix[toIndex][fromIndex] = 1; // For undirected graph
    }
  });

  return (
    <Table className="font-mono text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="w-8"></TableHead>
          {nodes.map(node => <TableHead key={node} className="text-center">{node}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {matrix.map((row, i) => (
          <TableRow key={i}>
            <TableHead className="font-bold">{nodes[i]}</TableHead>
            {row.map((cell, j) => (
                <TableCell key={j} className={cell === 1 ? 'text-neon-green font-bold' : 'text-gray-500'}>
                    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay: (i*nodes.length + j) * 0.05}}>{cell}</motion.div>
                </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const AdjacencyList = ({ nodes, edges }: { nodes: string[]; edges: { from: string; to: string }[] }) => {
  const adjList: { [key: string]: string[] } = {};
  nodes.forEach(node => adjList[node] = []);
  edges.forEach(edge => {
    adjList[edge.from].push(edge.to);
    adjList[edge.to].push(edge.from); // For undirected graph
  });

  return (
    <div className="space-y-2 font-mono">
      {nodes.map((node, i) => (
        <motion.div 
            key={node} 
            initial={{opacity:0, x:-20}} 
            animate={{opacity:1, x:0}} 
            transition={{delay: i * 0.1}}
            className="flex items-center gap-2"
        >
          <span className="font-bold text-amber-400">{node}:</span>
          <div className="flex gap-2">
            {adjList[node].map(neighbor => (
                <span key={neighbor} className="text-neon-blue p-1 bg-blue-500/10 rounded-md">{neighbor}</span>
            ))}
             {adjList[node].length === 0 && <span className="text-gray-500">null</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function GraphRepresentationsPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-wide">Graph Representations</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                How to store a graph in memory: Adjacency Matrix vs. Adjacency List.
            </p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Waypoints/> The Sample Graph</CardTitle>
                <CardDescription>We will use this simple, undirected graph to demonstrate both representations. It has 5 nodes (A, B, C, D, E) and 6 edges.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="relative h-64 w-full">
                    {/* Nodes */}
                    <div className="absolute top-[10%] left-[50%] -translate-x-1/2">A</div>
                    <div className="absolute top-[45%] left-[25%] -translate-x-1/2">B</div>
                    <div className="absolute top-[45%] left-[75%] -translate-x-1/2">C</div>
                    <div className="absolute top-[90%] left-[35%] -translate-x-1/2">D</div>
                    <div className="absolute top-[90%] left-[65%] -translate-x-1/2">E</div>
                    {/* Edges */}
                    <svg className="absolute w-full h-full" style={{top:0, left:0}}>
                        <line x1="50%" y1="10%" x2="25%" y2="45%" className="stroke-white/30" />
                        <line x1="50%" y1="10%" x2="75%" y2="45%" className="stroke-white/30" />
                        <line x1="25%" y1="45%" x2="35%" y2="90%" className="stroke-white/30" />
                        <line x1="75%" y1="45%" x2="35%" y2="90%" className="stroke-white/30" />
                        <line x1="75%" y1="45%" x2="65%" y2="90%" className="stroke-white/30" />
                        <line x1="35%" y1="90%" x2="65%" y2="90%" className="stroke-white/30" />
                    </svg>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Interactive Visualization</CardTitle>
                <CardDescription>Switch between the two common representations to see how they store the same graph structure differently.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="matrix">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="matrix">Adjacency Matrix</TabsTrigger>
                        <TabsTrigger value="list">Adjacency List</TabsTrigger>
                    </TabsList>
                    <TabsContent value="matrix" className="p-4 bg-card-nested rounded-lg mt-4 min-h-[250px]">
                        <AdjacencyMatrix nodes={graphData.nodes} edges={graphData.edges} />
                    </TabsContent>
                     <TabsContent value="list" className="p-4 bg-card-nested rounded-lg mt-4 min-h-[250px]">
                        <AdjacencyList nodes={graphData.nodes} edges={graphData.edges} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Adjacency Matrix</CardTitle>
                    <CardDescription>A 2D array where `matrix[i][j] = 1` indicates an edge between node `i` and node `j`.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <h4 className="font-semibold text-primary-accent">Pros:</h4>
                    <ul className="list-disc list-inside text-muted-foreground text-sm">
                        <li>Fast to check for an edge between two given nodes: O(1).</li>
                        <li>Simple to implement.</li>
                    </ul>
                     <h4 className="font-semibold text-destructive">Cons:</h4>
                    <ul className="list-disc list-inside text-muted-foreground text-sm">
                        <li>Consumes a lot of space (V²), even for sparse graphs with few edges.</li>
                        <li>Adding or removing a node is expensive (requires resizing the whole matrix).</li>
                        <li>Getting all neighbors of a node takes O(V) time.</li>
                    </ul>
                     <CodeBlock>
{`#define V 5 // Number of vertices

struct Graph {
    int adj[V][V];
};

// Initialize graph with all 0s
void init_graph(struct Graph* g) {
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            g->adj[i][j] = 0;
        }
    }
}

// Add an edge (for undirected graph)
void add_edge(struct Graph* g, int u, int v) {
    g->adj[u][v] = 1;
    g->adj[v][u] = 1;
}`}
                     </CodeBlock>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Adjacency List</CardTitle>
                    <CardDescription>An array of linked lists, where `list[i]` holds a list of all nodes adjacent to node `i`.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <h4 className="font-semibold text-primary-accent">Pros:</h4>
                    <ul className="list-disc list-inside text-muted-foreground text-sm">
                        <li>Space-efficient for sparse graphs: O(V + E).</li>
                        <li>Easy to get all neighbors of a node.</li>
                        <li>Adding a new node is relatively easy.</li>
                    </ul>
                     <h4 className="font-semibold text-destructive">Cons:</h4>
                    <ul className="list-disc list-inside text-muted-foreground text-sm">
                        <li>Slower to check for an edge between two nodes: O(degree(u)).</li>
                    </ul>
                     <CodeBlock>
{`struct Node {
    int vertex;
    struct Node* next;
};

struct Graph {
    int numVertices;
    struct Node** adjLists;
};

struct Node* create_node(int v) {
    // ... malloc and assignment
}

struct Graph* create_graph(int vertices) {
    // ... malloc for graph and adjLists array
}

void add_edge(struct Graph* g, int src, int dest) {
    // Add edge from src to dest
    struct Node* newNode = create_node(dest);
    newNode->next = g->adjLists[src];
    g->adjLists[src] = newNode;

    // Add edge from dest to src (for undirected)
    newNode = create_node(src);
    newNode->next = g->adjLists[dest];
    g->adjLists[dest] = newNode;
}`}
                     </CodeBlock>
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
