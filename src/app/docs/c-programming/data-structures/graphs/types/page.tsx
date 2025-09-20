
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Waypoints, Weight } from 'lucide-react';

const graphData = {
  nodes: ['A', 'B', 'C'],
  undirectedEdges: [ { from: 'A', to: 'B' }, { from: 'B', to: 'C' } ],
  directedEdges: [ { from: 'A', to: 'B' }, { from: 'B', to: 'C' } ],
  weightedEdges: [ { from: 'A', to: 'B', weight: 5 }, { from: 'B', to: 'C', weight: 8 } ],
};


const AdjacencyMatrix = ({ nodes, edges, isDirected, isWeighted }: { nodes: string[]; edges: any[]; isDirected: boolean; isWeighted?: boolean; }) => {
  const size = nodes.length;
  const matrix = Array(size).fill(0).map(() => Array(size).fill(0));
  edges.forEach(edge => {
    const fromIndex = nodes.indexOf(edge.from);
    const toIndex = nodes.indexOf(edge.to);
    const weight = isWeighted ? edge.weight : 1;
    if (fromIndex !== -1 && toIndex !== -1) {
      matrix[fromIndex][toIndex] = weight;
      if (!isDirected) {
        matrix[toIndex][fromIndex] = weight;
      }
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
              <TableCell key={j} className={cell !== 0 ? (isWeighted ? 'text-amber-400' : 'text-neon-green') + ' font-bold' : 'text-gray-500'}>
                 <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay: (i*nodes.length + j) * 0.05}}>{cell}</motion.div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


const GraphVisual = ({ edges, isDirected, isWeighted }: { edges: any[]; isDirected: boolean; isWeighted?: boolean; }) => (
    <div className="relative h-48 w-full">
        <div className="absolute top-[50%] left-[10%] -translate-y-1/2 p-2 bg-card rounded-full">A</div>
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 p-2 bg-card rounded-full">B</div>
        <div className="absolute top-[50%] left-[90%] -translate-x-1/2 p-2 bg-card rounded-full">C</div>
        
        <svg className="absolute w-full h-full" style={{top:0, left:0}}>
             {isDirected ? <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" /></marker></defs> : null}
            {edges.map((edge, i) => (
                 <g key={i}>
                    <line 
                        x1={edge.from === 'A' ? '10%' : '50%'} 
                        y1={edge.from === 'A' ? '50%' : '10%'}
                        x2={edge.to === 'B' ? '50%' : edge.to === 'C' ? '90%' : '10%'} 
                        y2={edge.to === 'B' ? '10%' : '50%'} 
                        className="stroke-primary" 
                        strokeWidth="2"
                        markerEnd={isDirected ? 'url(#arrow)' : undefined}
                    />
                    {isWeighted && <text x={edge.from === 'A' ? '30%' : '70%'} y={edge.from === 'A' ? '30%' : '30%'} fill="hsl(var(--foreground))" fontSize="12">{edge.weight}</text>}
                </g>
            ))}
        </svg>
    </div>
);


export default function GraphTypesPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-wide">Types of Graphs</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore the fundamental categories of graphs based on their edge properties.
            </p>
        </header>

        <Tabs defaultValue="direction" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="direction">Directionality</TabsTrigger>
                <TabsTrigger value="weight">Weight</TabsTrigger>
            </TabsList>
            
            {/* Directionality Tab */}
            <TabsContent value="direction">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                    <Card>
                        <CardHeader><CardTitle>Undirected Graphs</CardTitle><CardDescription>Edges have no direction; they are two-way streets.</CardDescription></CardHeader>
                        <CardContent>
                             <GraphVisual edges={graphData.undirectedEdges} isDirected={false} />
                             <p className="text-sm text-muted-foreground mt-4">An edge (A, B) is the same as (B, A). The adjacency matrix is always symmetric.</p>
                            <AdjacencyMatrix nodes={graphData.nodes} edges={graphData.undirectedEdges} isDirected={false} />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Directed Graphs (Digraphs)</CardTitle><CardDescription>Edges have a direction; they are one-way streets.</CardDescription></CardHeader>
                        <CardContent>
                            <GraphVisual edges={graphData.directedEdges} isDirected={true} />
                            <p className="text-sm text-muted-foreground mt-4">An edge (A, B) is not the same as (B, A). The adjacency matrix may not be symmetric.</p>
                            <AdjacencyMatrix nodes={graphData.nodes} edges={graphData.directedEdges} isDirected={true} />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            
            {/* Weight Tab */}
             <TabsContent value="weight">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                    <Card>
                        <CardHeader><CardTitle>Unweighted Graphs</CardTitle><CardDescription>Edges simply represent a connection; they have no associated cost or value.</CardDescription></CardHeader>
                        <CardContent>
                             <GraphVisual edges={graphData.undirectedEdges} isDirected={false} isWeighted={false} />
                             <p className="text-sm text-muted-foreground mt-4">The adjacency matrix uses '1' to indicate an edge and '0' for no edge.</p>
                            <AdjacencyMatrix nodes={graphData.nodes} edges={graphData.undirectedEdges} isDirected={false} isWeighted={false}/>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Weighted Graphs</CardTitle><CardDescription>Each edge has a numerical weight, representing a cost, distance, or capacity.</CardDescription></CardHeader>
                        <CardContent>
                            <GraphVisual edges={graphData.weightedEdges} isDirected={false} isWeighted={true} />
                            <p className="text-sm text-muted-foreground mt-4">The adjacency matrix stores the weight of the edge instead of just '1'. '0' or '∞' can represent no edge.</p>
                            <AdjacencyMatrix nodes={graphData.nodes} edges={graphData.weightedEdges} isDirected={false} isWeighted={true}/>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

        </Tabs>
    </div>
  );
}

