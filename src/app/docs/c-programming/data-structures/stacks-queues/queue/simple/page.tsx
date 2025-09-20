
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { List, ArrowRight, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QueueVisualizer = () => {
    const { toast } = useToast();
    const MAX_SIZE = 5;
    const [queue, setQueue] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [explanation, setExplanation] = useState('A queue follows a "First-In, First-Out" (FIFO) principle. The first item added is the first one to be removed.');

    const enqueue = () => {
        if (inputValue.trim() === '') return;
        if (queue.length >= MAX_SIZE) {
            toast({ title: 'Queue Overflow', description: 'The queue is full and cannot accept new items.', variant: 'destructive'});
            setExplanation('Queue is full! You must dequeue an item before adding a new one.');
            return;
        }
        setQueue(prev => [...prev, inputValue]);
        setInputValue('');
        setExplanation(`Enqueued "${inputValue}". It was added to the rear of the queue.`);
    };

    const dequeue = () => {
        if (queue.length === 0) {
            toast({ title: 'Queue Underflow', description: 'The queue is empty.', variant: 'destructive'});
            setExplanation('Queue is empty! Cannot remove any more items.');
            return;
        }
        const [removedItem, ...rest] = queue;
        setQueue(rest);
        setExplanation(`Dequeued "${removedItem}". It was removed from the front of the queue.`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visual Queue */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-center">Simple Queue Visualization</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col gap-4">
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter value"
                                className="flex-grow"
                                onKeyPress={(e) => e.key === 'Enter' && enqueue()}
                            />
                            <Button onClick={enqueue} className="bg-primary hover:bg-primary/90">Enqueue</Button>
                            <Button onClick={dequeue} variant="destructive">Dequeue</Button>
                        </div>

                        <div className="relative bg-card-nested rounded-lg p-6 min-h-64 flex flex-col justify-center items-center">
                            <div className="flex items-center w-full">
                                <div className="text-sm font-bold mr-2">Front</div>
                                <div className="flex-grow h-20 bg-background/50 rounded-lg flex items-center p-2 gap-2 border-2 border-dashed">
                                    <AnimatePresence>
                                        {queue.map((item, index) => (
                                            <motion.div
                                                layout
                                                key={`${item}-${index}`}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                className="bg-primary text-primary-foreground size-14 rounded-lg flex items-center justify-center font-bold text-lg shadow-md"
                                            >
                                                {item}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className="text-sm font-bold ml-2">Rear</div>
                            </div>
                        </div>
                        
                        {explanation && (
                            <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                                <h4 className="font-semibold text-foreground flex items-center gap-2"><HelpCircle className="size-5"/> What's Happening:</h4>
                                <p className="text-muted-foreground text-sm">{explanation}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Code and Explanations */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>C Implementation (Array)</CardTitle>
                             <CardDescription>A simple queue can be implemented with an array and two pointers: `front` and `rear`.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock>
{`#include <stdio.h>
#define MAX_SIZE 5

struct Queue {
    int items[MAX_SIZE];
    int front;
    int rear;
};

void init(struct Queue *q) {
    q->front = -1;
    q->rear = -1;
}

int isFull(struct Queue *q) {
    return q->rear == MAX_SIZE - 1;
}

int isEmpty(struct Queue *q) {
    return q->front == -1 || q->front > q->rear;
}

void enqueue(struct Queue *q, int value) {
    if (isFull(q)) {
        printf("Queue is full\\n");
    } else {
        if (q->front == -1) q->front = 0;
        q->items[++(q->rear)] = value;
    }
}

int dequeue(struct Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty\\n");
        return -1;
    } else {
        return q->items[(q->front)++];
    }
}`}
                            </CodeBlock>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Common Use Cases</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                                <li>CPU and disk scheduling</li>
                                <li>Handling requests on a single shared resource (like a printer)</li>
                                <li>Breadth-First Search (BFS) algorithm in graphs</li>
                                <li>Call center phone systems</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default function SimpleQueuePage() {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <List className="size-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                    Simple Queues
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Exploring the fundamental FIFO (First-In, First-Out) data structure.
                </p>
            </header>
            <QueueVisualizer />
        </div>
    );
}
