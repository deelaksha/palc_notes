
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrowLeftRight, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DequeVisualizer = () => {
    const { toast } = useToast();
    const MAX_SIZE = 6;
    const [deque, setDeque] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [explanation, setExplanation] = useState('A deque allows adding and removing elements from both the front and the rear.');

    const addFront = () => {
        if (inputValue.trim() === '') return;
        if (deque.length >= MAX_SIZE) {
            toast({ title: 'Deque Overflow', variant: 'destructive' });
            return;
        }
        setDeque(prev => [inputValue, ...prev]);
        setInputValue('');
        setExplanation(`Added "${inputValue}" to the front.`);
    };
    
    const addRear = () => {
        if (inputValue.trim() === '') return;
        if (deque.length >= MAX_SIZE) {
            toast({ title: 'Deque Overflow', variant: 'destructive' });
            return;
        }
        setDeque(prev => [...prev, inputValue]);
        setInputValue('');
        setExplanation(`Added "${inputValue}" to the rear.`);
    };

    const removeFront = () => {
        if (deque.length === 0) {
            toast({ title: 'Deque Underflow', variant: 'destructive' });
            return;
        }
        const [removed, ...rest] = deque;
        setDeque(rest);
        setExplanation(`Removed "${removed}" from the front.`);
    };
    
     const removeRear = () => {
        if (deque.length === 0) {
            toast({ title: 'Deque Underflow', variant: 'destructive' });
            return;
        }
        const newDeque = [...deque];
        const removed = newDeque.pop();
        setDeque(newDeque);
        setExplanation(`Removed "${removed}" from the rear.`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-center">Deque Visualization</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col gap-4">
                        <div className="space-y-3">
                            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter value" onKeyPress={(e) => e.key === 'Enter' && addRear()} />
                            <div className="grid grid-cols-2 gap-2">
                                <Button onClick={addFront}>Add Front</Button>
                                <Button onClick={addRear}>Add Rear</Button>
                                <Button onClick={removeFront} variant="destructive">Remove Front</Button>
                                <Button onClick={removeRear} variant="destructive">Remove Rear</Button>
                            </div>
                        </div>

                        <div className="relative bg-card-nested rounded-lg p-2 min-h-64 flex flex-col justify-center">
                            <div className="flex items-center w-full justify-center flex-wrap gap-2">
                                <AnimatePresence>
                                    {deque.map((item, index) => (
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
                            <CardTitle>C Implementation (Circular Array)</CardTitle>
                             <CardDescription>A deque is often implemented using a circular array to handle wrapping.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock>
{`#include <stdio.h>
#define MAX_SIZE 6

// ... (struct is the same as circular queue)

// Insert at front
void addFront(struct Queue *q, int value) {
    if (isFull(q)) { /* ... */ }
    if (q->front == -1) { // first element
        q->front = 0;
        q->rear = 0;
    } else if (q->front == 0) { // wrap around
        q->front = MAX_SIZE - 1;
    } else {
        q->front = q->front - 1;
    }
    q->items[q->front] = value;
}

// ... (addRear, removeFront, removeRear functions would follow) ...
`}
                            </CodeBlock>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default function DequePage() {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <ArrowLeftRight className="size-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                    Deques (Double-Ended Queues)
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A versatile queue that allows insertion and deletion from both the front and rear ends.
                </p>
            </header>
            <DequeVisualizer />
        </div>
    );
}
