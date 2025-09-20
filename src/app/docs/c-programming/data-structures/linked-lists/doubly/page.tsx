'use client';

import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NodeBox = ({ prev, data, next }: { prev: string, data: string, next: string }) => (
    <div className="node-box inline-block align-top mx-2" style={{ backgroundColor: '#2D3748', border: '2px solid #569CD6', borderRadius: '0.5rem', padding: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}>
        <div className="node-parts flex justify-between items-center text-center">
            <div className="node-part prev w-[30%] bg-[#1A1A1A] text-[#DCDCAA] text-xs p-2 rounded">{prev}</div>
            <div className="node-part data w-[40%] bg-[#1A1A1A] text-[#B5CEA8] p-2 rounded font-bold text-xl">{data}</div>
            <div className="node-part next w-[30%] bg-[#1A1A1A] text-[#DCDCAA] text-xs p-2 rounded">{next}</div>
        </div>
    </div>
);

const Arrow = () => <span className="arrow text-[#39FF14] text-2xl mx-2 align-middle">&larr;&rarr;</span>;
const DownArrow = () => <span className="arrow text-[#39FF14] text-2xl mx-2">&darr;</span>;
const UpArrow = () => <span className="arrow text-[#39FF14] text-2xl mx-2">&uarr;</span>;


const steps = [
    {
        title: "Step 1: Initializing an Empty List",
        description: "We start with two pointers, `head` and `tail`, both pointing to `NULL`. This signifies an empty list.",
        visualization: (
            <div className="text-center">
                <p className="head-pointer font-bold text-lg text-[#B5CEA8]">head &rarr; <span className="text-[#DCDCAA]">NULL</span></p>
                <p className="tail-pointer font-bold text-lg text-[#B5CEA8]">tail &rarr; <span className="text-[#DCDCAA]">NULL</span></p>
            </div>
        ),
        code: `<span class=\"keyword\">struct</span> Node <span class=\"operator\">*</span>head <span class=\"operator\">=</span> <span class=\"datatype\">NULL</span><span class=\"semicolon\">;</span><br /><span class=\"keyword\">struct</span> Node <span class=\"operator\">*</span>tail <span class=\"operator\">=</span> <span class=\"datatype\">NULL</span><span class=\"semicolon\">;</span>`
    },
    {
        title: "Step 2: Adding the First Node (10)",
        description: "When the list is empty, the first node becomes both the `head` and the `tail`. Its `prev` and `next` pointers are both set to `NULL`.",
        visualization: (
             <div className="text-center">
                <div className="head-pointer font-bold text-lg text-[#B5CEA8]">head <DownArrow /></div>
                <NodeBox prev="NULL" data="10" next="NULL" />
                <div className="tail-pointer font-bold text-lg text-[#B5CEA8]"><UpArrow /> tail</div>
            </div>
        ),
        code: `<span class=\"comment\">// 1. Allocate memory for new node</span><br><span class=\"keyword\">struct</span> Node <span class=\"operator\">*</span>new_node <span class=\"operator\">=</span> <span class=\"function\">malloc</span>(<span class=\"function\">sizeof</span>(<span class=\"keyword\">struct</span> Node))<span class=\"semicolon\">;</span><br><span class=\"comment\">// 2. Set data and pointers to NULL</span><br>new_node->data = <span class=\"number\">10</span><span class=\"semicolon\">;</span><br>new_node->prev = <span class=\"datatype\">NULL</span><span class=\"semicolon\">;</span><br>new_node->next = <span class=\"datatype\">NULL</span><span class=\"semicolon\">;</span><br><br><span class=\"comment\">// 3. Update head and tail</span><br>head = new_node<span class=\"semicolon\">;</span><br>tail = new_node<span class=\"semicolon\">;</span>`
    },
    {
        title: "Step 3: Adding a Second Node (20)",
        description: "To add a second node, we create it and make the new node's `prev` pointer point to the old `tail`. Then, we make the old `tail`'s `next` pointer point to the new node. Finally, the new node becomes the new `tail`.",
        visualization: (
            <div className="text-center">
                <div className="head-pointer font-bold text-lg text-[#B5CEA8]">head <DownArrow /></div>
                <NodeBox prev="NULL" data="10" next="Addr(20)" />
                <Arrow />
                <NodeBox prev="Addr(10)" data="20" next="NULL" />
                <div className="tail-pointer font-bold text-lg text-[#B5CEA8]"><UpArrow /> tail</div>
            </div>
        ),
        code: `<span class=\"comment\">// Create new node with data 20</span><br><span class=\"keyword\">struct</span> Node <span class=\"operator\">*</span>new_node <span class=\"operator\">=</span> <span class=\"function\">malloc</span>(<span class=\"function\">sizeof</span>(<span class=\"keyword\">struct</span> Node))<span class=\"semicolon\">;</span><br>new_node->data = <span class=\"number\">20</span><span class=\"semicolon\">;</span><br>new_node->next = <span class=\"datatype\">NULL</span><span class=\"semicolon\">;</span><br><br><span class=\"comment\">// 1. Link the old tail (10) to the new node</span><br>tail->next = new_node<span class=\"semicolon\">;</span><br><span class=\"comment\">// 2. Link the new node back to the old tail</span><br>new_node->prev = tail<span class=\"semicolon\">;</span><br><span class=\"comment\">// 3. Update the tail pointer to the new node</span><br>tail = new_node<span class=\"semicolon\">;</span>`
    },
     {
        title: "Step 4: Adding a Third Node (30)",
        description: "The process is repeated. The current `tail` (20) points to the new node (30), and the new node points back to the old `tail`. Node 30 becomes the new `tail`.",
        visualization: (
            <div className="text-center">
                 <div className="head-pointer font-bold text-lg text-[#B5CEA8]">head <DownArrow /></div>
                <NodeBox prev="NULL" data="10" next="Addr(20)" />
                <Arrow />
                <NodeBox prev="Addr(10)" data="20" next="Addr(30)" />
                 <Arrow />
                <NodeBox prev="Addr(20)" data="30" next="NULL" />
                <div className="tail-pointer font-bold text-lg text-[#B5CEA8]"><UpArrow /> tail</div>
            </div>
        ),
        code: `<span class=\"comment\">// Create new node with data 30</span><br><span class=\"comment\">// Link old tail (20) to new node (30)</span><br><span class=\"comment\">// Link new node (30) back to old tail (20)</span><br><span class=\"comment\">// Update tail to be the new node (30)</span>`
    }
];

export default function DoublyLinkedListPage() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">Doubly Linked List</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A comprehensive visual guide to a fundamental data structure in C.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. Introduction & The `Node` Structure</h2>
                    <p className="mb-4 text-muted-foreground">
                        A <strong>doubly linked list</strong> is a more versatile version of a singly linked list. Unlike its predecessor, each node contains not one, but <strong>two</strong> pointers: one to the next node and one to the previous node. This bidirectional linkage allows for traversal in both forward and backward directions, making certain operations more efficient.
                    </p>

                    <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">The `Node` Structure</h3>
                    <p className="mb-4 text-muted-foreground">
                        The defining feature of a doubly linked list is the `struct` that represents a node. It includes the data, a pointer to the next node, and a pointer to the previous node.
                    </p>
                    <CodeBlock>
{`struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
};`}
                    </CodeBlock>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                        <li><strong>`data`:</strong> The information stored in the node. This can be of any data type.</li>
                        <li><strong>`*prev`:</strong> A pointer to the memory address of the <strong>previous</strong> node in the sequence. For the first node, this is always `NULL`.</li>
                        <li><strong>`*next`:</strong> A pointer to the memory address of the <strong>next</strong> node in the sequence. For the last node, this is always `NULL`.</li>
                    </ul>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Visual Walkthrough: Building a Doubly Linked List</h2>
                    <p className="mb-4 text-muted-foreground">
                        Let's visualize the process of building a list with three nodes. Use the buttons to step through the animation and see how the pointers connect each element.
                    </p>
                    <div className="flex justify-center my-4 space-x-4">
                        <Button onClick={handlePrev} disabled={currentStep === 0}>Previous Step</Button>
                        <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>Next Step</Button>
                    </div>
                    
                    <div className="mt-8 text-center min-h-[350px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-2xl font-bold text-secondary-accent mt-6">{steps[currentStep].title}</h3>
                                <p className="mb-4 text-muted-foreground">{steps[currentStep].description}</p>
                                <div className="my-4">{steps[currentStep].visualization}</div>
                                <CodeBlock>{steps[currentStep].code}</CodeBlock>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Doubly Linked List Operations</h2>
                    
                    <h3 className="text-2xl font-semibold text-secondary-accent mt-6 mb-2">3.1 Traversal</h3>
                    <p className="mb-4 text-muted-foreground">
                        A key advantage is the ability to traverse in both directions.
                        <br />
                        <strong>Forward Traversal:</strong> Start at the `head` and follow the `next` pointers.
                        <br />
                        <strong>Backward Traversal:</strong> Start at the `tail` and follow the `prev` pointers.
                    </p>
                    <CodeBlock>
{`// Forward Traversal: prints 10 -> 20 -> 30 -> NULL
void traverseForward(struct Node *n) {
    while (n != NULL) {
        printf("%d -> ", n->data);
        n = n->next;
    }
    printf("NULL\n");
}

// Backward Traversal: prints <- 30 <- 20 <- 10 <- NULL
void traverseBackward(struct Node *n) {
    while (n != NULL) {
        printf("<- %d ", n->data);
        n = n->prev;
    }
    printf("<- NULL\n");
}`}
                    </CodeBlock>
                    
                    <h3 className="text-2xl font-semibold text-secondary-accent mt-6 mb-2">3.2 Deletion of a Node</h3>
                    <p className="mb-4 text-muted-foreground">
                        Deleting a node in a doubly linked list is also more straightforward as you don't need to find the previous node first. You can access it directly. The key is to re-link the surrounding nodes to bypass the node being deleted.
                    </p>
                    <CodeBlock>
{`void deleteNode(struct Node** head_ref, struct Node* del_node) {
    if (*head_ref == NULL || del_node == NULL) return;

    if (*head_ref == del_node) *head_ref = del_node->next;

    if (del_node->next != NULL) del_node->next->prev = del_node->prev;

    if (del_node->prev != NULL) del_node->prev->next = del_node->next;

    free(del_node);
}`}
                    </CodeBlock>
                </Card>
            </main>
        </div>
    );
}
