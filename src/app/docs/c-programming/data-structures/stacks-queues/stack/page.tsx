
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Layers, HelpCircle, Undo2, ArrowDown } from 'lucide-react';

const StackVisualization = () => {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [animatingItem, setAnimatingItem] = useState<string | null>(null);
  const [operation, setOperation] = useState('');
  const [explanation, setExplanation] = useState('The stack is a "Last-In, First-Out" (LIFO) data structure.');

  const push = () => {
    if (inputValue.trim() === '' || operation !== '') return;
    
    setOperation('push');
    setAnimatingItem(inputValue);
    setExplanation(`Pushing "${inputValue}" onto the stack. It becomes the new top element.`);
    
    setTimeout(() => {
      setStack(prev => [...prev, inputValue]);
      setInputValue('');
      setAnimatingItem(null);
      setOperation('');
    }, 800);
  };

  const pop = () => {
    if (stack.length === 0) {
      setExplanation('Cannot pop from an empty stack!');
      return;
    }
    
    const topItem = stack[stack.length - 1];
    setOperation('pop');
    setAnimatingItem(topItem);
    setExplanation(`Popping "${topItem}" from the stack. The element below it will become the new top.`);
    
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setAnimatingItem(null);
      setOperation('');
    }, 800);
  };

  const peek = () => {
    if (stack.length === 0) {
      setExplanation('Stack is empty - nothing to peek at!');
      return;
    }
    const topItem = stack[stack.length - 1];
    setExplanation(`Peek: The top element is "${topItem}". Peek doesn't remove the element.`);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visual Stack */}
          <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-center">Stack Visualization</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4">
                <div className="flex flex-wrap gap-3 justify-center">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                    className="flex-grow"
                    onKeyPress={(e) => e.key === 'Enter' && push()}
                    disabled={operation !== ''}
                  />
                  <Button
                    onClick={push}
                    disabled={inputValue.trim() === '' || operation !== ''}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Push
                  </Button>
                  <Button
                    onClick={pop}
                    disabled={stack.length === 0 || operation !== ''}
                    variant="destructive"
                  >
                    Pop
                  </Button>
                  <Button
                    onClick={peek}
                    disabled={stack.length === 0}
                    variant="secondary"
                  >
                    Peek
                  </Button>
                </div>

                <div className="relative bg-card-nested rounded-lg p-6 min-h-96 flex flex-col justify-end items-center">
                    <div className="absolute top-4 left-4 text-sm text-muted-foreground flex items-center gap-1">Top of Stack <ArrowDown className="size-4"/></div>
                    
                    <AnimatePresence>
                        {operation === 'push' && animatingItem && (
                            <motion.div 
                                className="absolute bg-yellow-400 text-gray-800 px-4 py-3 rounded-lg border-2 border-yellow-500 font-semibold z-10"
                                initial={{ top: 0, opacity: 0 }}
                                animate={{ top: '40%', opacity: 1, transition: { type: 'spring', stiffness: 100 } }}
                                exit={{ top: '80%', opacity: 0}}
                            >
                            {animatingItem}
                            </motion.div>
                        )}
                        {operation === 'pop' && animatingItem && (
                             <motion.div 
                                className="absolute bg-red-500 text-white px-4 py-3 rounded-lg border-2 border-red-600 font-semibold z-10"
                                style={{ bottom: `${(stack.length - 1) * 3.5 + 4}rem` }}
                                animate={{ top: '-20%', opacity: 0, transition: { duration: 0.5 } }}
                            >
                            {animatingItem}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <div className="flex flex-col-reverse gap-2 w-full max-w-xs">
                        {stack.map((item, index) => (
                          <motion.div
                            layout
                            key={`${item}-${index}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`bg-primary text-primary-foreground px-4 py-3 rounded-lg text-center font-semibold transition-all duration-300 ${
                              index === stack.length - 1 ? 'ring-4 ring-primary/50' : ''
                            }`}
                          >
                            {item}
                          </motion.div>
                        ))}
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
                    <CardTitle>C Implementation</CardTitle>
                </CardHeader>
                <CardContent>
                <CodeBlock>
{`#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 10

struct Stack {
    int items[MAX_SIZE];
    int top;
};

// Initialize stack
void init(struct Stack *s) {
    s->top = -1;
}

// Check if stack is full
int isFull(struct Stack *s) {
    return s->top == MAX_SIZE - 1;
}

// Check if stack is empty
int isEmpty(struct Stack *s) {
    return s->top == -1;
}

// Push operation
void push(struct Stack *s, int value) {
    if (isFull(s)) {
        printf("Stack Overflow\\n");
    } else {
        s->items[++(s->top)] = value;
    }
}

// Pop operation
int pop(struct Stack *s) {
    if (isEmpty(s)) {
        printf("Stack Underflow\\n");
        return -1;
    } else {
        return s->items[(s->top)--];
    }
}`}
                </CodeBlock>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Common Use Cases</CardTitle></CardHeader>
                <CardContent>
                     <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                        <li>Function call management (the "call stack")</li>
                        <li>Undo operations in applications (<Undo2 className="inline-block size-4 mr-1"/>)</li>
                        <li>Expression evaluation (e.g., converting infix to postfix) and syntax parsing</li>
                        <li>Browser history navigation</li>
                        <li>Backtracking algorithms (e.g., solving a maze)</li>
                    </ul>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};


export default function StackPage() {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <Layers className="size-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                    Stacks
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Exploring the fundamental LIFO (Last-In, First-Out) data structure.
                </p>
            </header>
            <StackVisualization />
        </div>
    );
}
