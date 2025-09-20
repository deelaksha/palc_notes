
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { CircleDot, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CircularQueueVisualizer = () => {
    const { toast } = useToast();
    const MAX_SIZE = 5;
    const [queue, setQueue] = useState(Array(MAX_SIZE).fill(null));
    const [front, setFront] = useState(-1);
    const [rear, setRear] = useState(-1);
    const [inputValue, setInputValue] = useState('');
    const [explanation, setExplanation] = useState('A circular queue efficiently reuses empty space left at the beginning of the array.');

    const isFull = () => (front === 0 && rear === MAX_SIZE - 1) || (front === rear + 1);
    const isEmpty = () => front === -1;

    const enqueue = () => {
        if (isFull()) {
            toast({ title: 'Queue Overflow', variant: 'destructive' });
            setExplanation('Queue is full! The front and rear pointers have met.');
            return;
        }
        if (inputValue.trim() === '') return;
        
        let newRear;
        if (front === -1) { // First element
            setFront(0);
            newRear = 0;
        } else {
            newRear = (rear + 1) % MAX_SIZE;
        }
        
        const newQueue = [...queue];
        newQueue[newRear] = inputValue;
        setQueue(newQueue);
        setRear(newRear);
        setInputValue('');
        setExplanation(`Enqueued "${inputValue}" at index ${newRear}. The rear pointer moves forward.`);
    };

    const dequeue = () => {
        if (isEmpty()) {
            toast({ title: 'Queue Underflow', variant: 'destructive' });
            setExplanation('Queue is empty!');
            return;
        }
        
        const newQueue = [...queue];
        const removedItem = newQueue[front];
        newQueue[front] = null;
        setQueue(newQueue);

        if (front === rear) { // Last element
            setFront(-1);
            setRear(-1);
        } else {
            setFront((front + 1) % MAX_SIZE);
        }
        setExplanation(`Dequeued "${removedItem}" from index ${front}. The front pointer moves forward.`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="flex flex-col">
                    <CardHeader><CardTitle className="text-center">Circular Queue Visualization</CardTitle></CardHeader>
                    <CardContent className="flex-grow flex flex-col gap-4">
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter value" onKeyPress={(e) => e.key === 'Enter' && enqueue()} />
                            <Button onClick={enqueue}>Enqueue</Button>
                            <Button onClick={dequeue} variant="destructive">Dequeue</Button>
                        </div>

                        <div className="relative bg-card-nested rounded-lg p-4 min-h-64 flex flex-col justify-center items-center">
                             <div className="flex justify-around w-full">
                                {queue.map((item, index) => (
                                    <div key={index} className="relative flex flex-col items-center">
                                        <AnimatePresence>
                                            {front === index && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-xs text-green-400 font-bold">Front</motion.div>}
                                            {rear === index && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-xs text-red-400 font-bold">Rear</motion.div>}
                                        </AnimatePresence>
                                        <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center font-bold text-lg border-2">
                                            <AnimatePresence>
                                            {item && (
                                                <motion.div initial={{scale:0.5}} animate={{scale:1}} exit={{scale:0.5}} className="bg-primary text-primary-foreground size-full rounded-md flex items-center justify-center">{item}</motion.div>
                                            )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">[{index}]</div>
                                    </div>
                                ))}
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
                            <CardTitle>C Implementation</CardTitle>
                             <CardDescription>A circular queue uses the modulo operator (`%`) to wrap around the array.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock>
<code><span className="syntax-keyword">#include</span> <span className="syntax-string">&lt;stdio.h&gt;</span>
<span className="syntax-keyword">#define</span> MAX_SIZE 5

<span className="syntax-comment">{'// ... (struct and init function are the same)'}</span>

<span className="syntax-datatype">int</span> <span className="syntax-function">isFull</span>(<span className="syntax-keyword">struct</span> Queue *q) {'{'}
    <span className="syntax-keyword">if</span> ((q-&gt;front <span className="syntax-operator">==</span> <span className="syntax-number">0</span> && q-&gt;rear <span className="syntax-operator">==</span> MAX_SIZE - <span className="syntax-number">1</span>) || (q-&gt;front <span className="syntax-operator">==</span> q-&gt;rear + <span className="syntax-number">1</span>)) {'{'}
        <span className="syntax-keyword">return</span> <span className="syntax-number">1</span>;
    }
    <span className="syntax-keyword">return</span> <span className="syntax-number">0</span>;
}

<span className="syntax-datatype">int</span> <span className="syntax-function">isEmpty</span>(<span className="syntax-keyword">struct</span> Queue *q) {'{'}
    <span className="syntax-keyword">return</span> q-&gt;front <span className="syntax-operator">==</span> -<span className="syntax-number">1</span>;
}

<span className="syntax-keyword">void</span> <span className="syntax-function">enqueue</span>(<span className="syntax-keyword">struct</span> Queue *q, <span className="syntax-datatype">int</span> value) {'{'}
    <span className="syntax-keyword">if</span> (isFull(q)) {'{'}
        printf(<span className="syntax-string">"Queue is full\\n"</span>);
    } <span className="syntax-keyword">else</span> {'{'}
        <span className="syntax-keyword">if</span> (q-&gt;front <span className="syntax-operator">==</span> -<span className="syntax-number">1</span>) q-&gt;front = <span className="syntax-number">0</span>;
        q-&gt;rear = (q-&gt;rear + <span className="syntax-number">1</span>) % MAX_SIZE;
        q-&gt;items[q-&gt;rear] = value;
    }
}

<span className="syntax-datatype">int</span> <span className="syntax-function">dequeue</span>(<span className="syntax-keyword">struct</span> Queue *q) {'{'}
    <span className="syntax-keyword">if</span> (isEmpty(q)) {'{'}
        <span className="syntax-keyword">return</span> -<span className="syntax-number">1</span>;
    } <span className="syntax-keyword">else</span> {'{'}
        <span className="syntax-datatype">int</span> element = q-&gt;items[q-&gt;front];
        <span className="syntax-keyword">if</span> (q-&gt;front <span className="syntax-operator">==</span> q-&gt;rear) {'{'} <span className="syntax-comment">{'// last element'}</span>
            q-&gt;front = -<span className="syntax-number">1</span>;
            q-&gt;rear = -<span className="syntax-number">1</span>;
        } <span className="syntax-keyword">else</span> {'{'}
            q-&gt;front = (q-&gt;front + <span className="syntax-number">1</span>) % MAX_SIZE;
        }
        <span className="syntax-keyword">return</span> element;
    }
}
</code>
                            </CodeBlock>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default function CircularQueuePage() {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <CircleDot className="size-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                    Circular Queues
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    An efficient implementation of the FIFO principle that reuses array space.
                </p>
            </header>
            <CircularQueueVisualizer />
        </div>
    );
}
