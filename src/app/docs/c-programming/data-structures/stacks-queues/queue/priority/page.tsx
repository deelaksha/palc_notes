
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Star, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PriorityQueueVisualizer = () => {
    const { toast } = useToast();
    const [queue, setQueue] = useState<{ value: string; priority: number }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [priority, setPriority] = useState(1);
    const [explanation, setExplanation] = useState('Elements are removed based on priority, not just arrival time. Higher numbers mean higher priority.');

    const enqueue = () => {
        if (inputValue.trim() === '' || !priority) return;
        
        const newItem = { value: inputValue, priority: Number(priority) };
        const newQueue = [...queue, newItem].sort((a, b) => b.priority - a.priority);

        setQueue(newQueue);
        setInputValue('');
        setExplanation(`Enqueued "${inputValue}" with priority ${priority}. The queue re-sorted itself.`);
    };

    const dequeue = () => {
        if (queue.length === 0) {
            toast({ title: 'Queue Underflow', variant: 'destructive' });
            return;
        }
        const [removedItem, ...rest] = queue;
        setQueue(rest);
        setExplanation(`Dequeued "${removedItem.value}" because it had the highest priority.`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-center">Priority Queue Visualization</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col gap-4">
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Value"/>
                            <Input type="number" value={priority} onChange={(e) => setPriority(Number(e.target.value))} placeholder="Priority" className="w-24" />
                            <Button onClick={enqueue}>Enqueue</Button>
                            <Button onClick={dequeue} variant="destructive">Dequeue</Button>
                        </div>

                        <div className="relative bg-card-nested rounded-lg p-2 min-h-64 flex flex-col justify-center items-center">
                            <div className="flex items-center w-full flex-wrap justify-center gap-2">
                                <AnimatePresence>
                                    {queue.map((item, index) => (
                                        <motion.div
                                            layout
                                            key={`${item.value}-${index}`}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="relative bg-primary text-primary-foreground size-16 rounded-lg flex flex-col items-center justify-center font-bold text-lg shadow-md"
                                        >
                                            <span className="absolute top-0 right-1 text-yellow-300 text-xs flex items-center"><Star className="size-3"/>{item.priority}</span>
                                            {item.value}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                         <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 className="font-semibold text-foreground flex items-center gap-2"><HelpCircle className="size-5"/> What's Happening:</h4>
                            <p className="text-muted-foreground text-sm">{explanation}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>C Implementation (Simple Heap)</CardTitle>
                             <CardDescription>A common way to implement a priority queue is with a heap data structure.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock>
{`// A simplified C implementation for a max-heap based priority queue
#include <stdio.h>

#define MAX_SIZE 10

struct PriorityQueue {
    int items[MAX_SIZE + 1];
    int size;
};

void init(struct PriorityQueue *pq) {
    pq->size = 0;
}

// Function to maintain heap property after insertion
void heapifyUp(struct PriorityQueue *pq, int index) {
    while (index > 1 && pq->items[index / 2] < pq->items[index]) {
        // Swap with parent
        int temp = pq->items[index];
        pq->items[index] = pq->items[index / 2];
        pq->items[index / 2] = temp;
        index = index / 2;
    }
}

void enqueue(struct PriorityQueue *pq, int value) {
    if (pq->size >= MAX_SIZE) {
        printf("Queue is full\\n");
        return;
    }
    pq->items[++(pq->size)] = value;
    heapifyUp(pq, pq->size);
}

// ... dequeue would involve heapifyDown ...
`}
                            </CodeBlock>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default function PriorityQueuePage() {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <Star className="size-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                    Priority Queues
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A data structure where each element has a "priority," and elements with higher priority are served first.
                </p>
            </header>
            <PriorityQueueVisualizer />
        </div>
    );
}
