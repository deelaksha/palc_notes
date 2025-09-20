
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Code, GitCommit, RotateCw, HelpCircle, GitBranch, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- AVL Tree Node Logic (non-React) ---
class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
  x: number;
  y: number;

  constructor(value: number, x = 0, y = 0) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.x = x;
    this.y = y;
  }
}

const height = (node: TreeNode | null): number => node ? node.height : 0;
const updateHeight = (node: TreeNode) => {
    node.height = 1 + Math.max(height(node.left), height(node.right));
};
const getBalance = (node: TreeNode | null): number => node ? height(node.left) - height(node.right) : 0;

const rightRotate = (y: TreeNode): TreeNode => {
    let x = y.left!;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    updateHeight(y);
    updateHeight(x);
    return x;
};

const leftRotate = (x: TreeNode): TreeNode => {
    let y = x.right!;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    updateHeight(x);
    updateHeight(y);
    return y;
};

// --- React Components ---

const NodeComponent = ({ node, isHighlighted }: { node: TreeNode, isHighlighted: boolean }) => {
    const balance = getBalance(node);
    let balanceColor = 'text-green-400';
    if (balance > 1 || balance < -1) balanceColor = 'text-red-400';
    else if (balance !== 0) balanceColor = 'text-yellow-400';

    return (
        <motion.g
            key={node.value}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ x: node.x, y: node.y }}
        >
             <circle cx={0} cy={0} r={22} fill={isHighlighted ? "#10b981" : "#3b82f6"} stroke={isHighlighted ? "#059669" : "#2563eb"} strokeWidth="3" />
            <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14" fontWeight="bold">{node.value}</text>
            <text x={0} y={8} textAnchor="middle" dominantBaseline="hanging" className={balanceColor} fontSize="10">{balance}</text>
        </motion.g>
    );
};

const TreeLines = ({ node }: { node: TreeNode | null }) => {
    if (!node) return null;
    const verticalSpacing = 70;
    const getHorizontalSpacing = (level: number) => Math.max(200 / (level + 1.5), 35);
    
    const lines: React.ReactNode[] = [];
    const traverse = (n: TreeNode, level: number) => {
        const hSpacing = getHorizontalSpacing(level);
        if (n.left) {
            const leftX = n.x - hSpacing;
            const leftY = n.y + verticalSpacing;
            lines.push(<line key={`${n.value}-l`} x1={n.x} y1={n.y} x2={leftX} y2={leftY} stroke="#4a5568" strokeWidth="2" />);
            n.left.x = leftX;
            n.left.y = leftY;
            traverse(n.left, level + 1);
        }
        if (n.right) {
            const rightX = n.x + hSpacing;
            const rightY = n.y + verticalSpacing;
            lines.push(<line key={`${n.value}-r`} x1={n.x} y1={n.y} x2={rightX} y2={rightY} stroke="#4a5568" strokeWidth="2" />);
            n.right.x = rightX;
            n.right.y = rightY;
            traverse(n.right, level + 1);
        }
    }
    traverse(node, 0);
    return <g>{lines}</g>;
};

const TreeNodes = ({ node, highlightedNode }: { node: TreeNode | null, highlightedNode: number | null }) => {
    if (!node) return null;
    const nodes: React.ReactNode[] = [];
    const traverse = (n: TreeNode) => {
        nodes.push(<NodeComponent key={n.value} node={n} isHighlighted={n.value === highlightedNode} />);
        if (n.left) traverse(n.left);
        if (n.right) traverse(n.right);
    };
    traverse(node);
    return <g>{nodes}</g>;
};

const AVLTreeVisualizer = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] =useState('');
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('Add nodes to the tree to see how it balances itself.');
  const [isAnimating, setIsAnimating] = useState(false);

  const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

  const insertWithAnimation = async (value: number) => {
      setIsAnimating(true);
      
      const insertAndTrack = async (node: TreeNode | null, val: number): Promise<TreeNode> => {
          if (!node) {
              setExplanation(`Inserting new node ${val}.`);
              setHighlightedNode(val);
              await wait(800);
              return new TreeNode(val);
          }
          
          setExplanation(`Comparing ${val} with ${node.value}...`);
          setHighlightedNode(node.value);
          await wait(800);

          if (val < node.value) {
              node.left = await insertAndTrack(node.left, val);
          } else if (val > node.value) {
              node.right = await insertAndTrack(node.right, val);
          } else {
              setExplanation(`${val} already exists.`);
              await wait(800);
              return node; // No duplicates
          }

          updateHeight(node);
          const balance = getBalance(node);

          setExplanation(`Updating heights and balance for ${node.value}. Balance: ${balance}`);
          setTree(prev => ({...prev!})); // Force re-render
          setHighlightedNode(node.value);
          await wait(1000);

          // Rebalance logic
          if (balance > 1 && val < node.left!.value) { // LL
              setExplanation(`Left-Left imbalance at ${node.value}. Performing right rotation.`);
              await wait(1500);
              return rightRotate(node);
          }
          if (balance < -1 && val > node.right!.value) { // RR
              setExplanation(`Right-Right imbalance at ${node.value}. Performing left rotation.`);
              await wait(1500);
              return leftRotate(node);
          }
          if (balance > 1 && val > node.left!.value) { // LR
              setExplanation(`Left-Right imbalance at ${node.value}. Rotating left on ${node.left!.value}...`);
              await wait(1500);
              node.left = leftRotate(node.left!);
              setTree(prev => ({...prev!}));
              await wait(1500);
              setExplanation(`...then rotating right on ${node.value}.`);
              await wait(1500);
              return rightRotate(node);
          }
          if (balance < -1 && val < node.right!.value) { // RL
              setExplanation(`Right-Left imbalance at ${node.value}. Rotating right on ${node.right!.value}...`);
              await wait(1500);
              node.right = rightRotate(node.right!);
              setTree(prev => ({...prev!}));
              await wait(1500);
              setExplanation(`...then rotating left on ${node.value}.`);
              await wait(1500);
              return leftRotate(node);
          }

          return node;
      };

      const newTree = await insertAndTrack(tree, value);
      setTree(newTree);
      setHighlightedNode(null);
      setExplanation('Tree is balanced. Ready for next operation.');
      setIsAnimating(false);
      setInputValue('');
  };

  const handleInsert = () => {
    const val = parseInt(inputValue, 10);
    if (!isNaN(val)) insertWithAnimation(val);
  };
  
   const createSampleTree = () => {
    let sampleTree: TreeNode | null = null;
    const values = [30, 20, 40, 10, 25, 50];
    values.forEach(v => {
        let tempTree = JSON.parse(JSON.stringify(sampleTree));
        sampleTree = insertNode(sampleTree, v);
    });
    setTree(sampleTree);
    setExplanation('Sample tree created.');
  };
  
    const insertNode = (node: TreeNode | null, value: number): TreeNode => {
        if (!node) return new TreeNode(value);
        if (value < node.value) node.left = insertNode(node.left, value);
        else if (value > node.value) node.right = insertNode(node.right, value);
        else return node;
        updateHeight(node);
        const balance = getBalance(node);
        if (balance > 1 && value < node.left!.value) return rightRotate(node);
        if (balance < -1 && value > node.right!.value) return leftRotate(node);
        if (balance > 1 && value > node.left!.value) {
            node.left = leftRotate(node.left!);
            return rightRotate(node);
        }
        if (balance < -1 && value < node.right!.value) {
            node.right = rightRotate(node.right!);
            return leftRotate(node);
        }
        return node;
    };


  const fullTree = useMemo(() => {
    if (!tree) return null;
    const newTree = JSON.parse(JSON.stringify(tree));
    newTree.x = 400; newTree.y = 50;
    return newTree;
  }, [tree]);
  
  return (
    <Card className="bg-gray-800/50">
        <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-white">Interactive Insertion</CardTitle>
            <CardDescription className="text-center">Enter a number and watch how the AVL tree maintains its balance through rotations.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-900/70 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Operations</h3>
                        <div className="flex gap-2">
                            <Input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter a number..."
                                className="bg-gray-700 border-gray-600 text-white"
                                disabled={isAnimating}
                                onKeyPress={e => e.key === 'Enter' && handleInsert()}
                            />
                            <Button onClick={handleInsert} disabled={isAnimating}>Insert</Button>
                        </div>
                    </div>
                     <div className="bg-gray-900/70 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Presets</h3>
                        <div className="flex gap-2">
                           <Button onClick={createSampleTree} disabled={isAnimating} className="w-full">Sample Tree</Button>
                           <Button onClick={() => {setTree(null); setExplanation('Tree cleared.');}} variant="outline" className="w-full">Clear</Button>
                        </div>
                    </div>
                     <div className="bg-gray-700/80 p-4 rounded-lg border-l-4 border-cyan-400 min-h-[80px]">
                        <h4 className="font-semibold text-cyan-300">Explanation</h4>
                        <p className="text-cyan-100 text-sm mt-1">{explanation}</p>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="relative bg-gray-900/50 rounded-lg p-4 min-h-[400px] border border-gray-700">
                        <svg width="100%" height="450" className="overflow-visible">
                            <TreeLines node={fullTree} />
                            <TreeNodes node={fullTree} highlightedNode={highlightedNode} />
                        </svg>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
};


export default function AVLTreePage() {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-wide">AVL Trees</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    The original self-balancing binary search tree, ensuring that tree operations remain efficient.
                </p>
            </header>

            <Card>
                <CardHeader><CardTitle>What is an AVL Tree?</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">An AVL tree is a type of Binary Search Tree (BST) that automatically balances itself. In a standard BST, if you insert sorted data, the tree can become lopsided and degenerate into a linked list, making searches slow (O(n)). An AVL tree avoids this by ensuring that for any node, the heights of its two child subtrees differ by at most one. This height difference is called the **Balance Factor**.</p>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                     <CardTitle>Core Concepts</CardTitle>
                     <CardDescription>The balance of the tree is maintained using two key ideas: the balance factor and rotations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <h4 className="font-semibold text-primary-accent">Balance Factor</h4>
                        <p className="text-muted-foreground">The balance factor of a node is calculated as: <strong>(Height of Left Subtree) - (Height of Right Subtree)</strong>. An AVL tree is balanced if every single node has a balance factor of -1, 0, or 1.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-primary-accent">Imbalance and Rotations</h4>
                        <p className="text-muted-foreground">If a node's balance factor becomes -2 or 2 after an insertion or deletion, the tree is considered "unbalanced" at that point. To fix this, the tree performs one or more **rotations**. There are four main cases of imbalance:</p>
                        <ul className="list-disc list-inside text-muted-foreground pl-4 mt-2">
                            <li><strong>Left-Left (LL) Case:</strong> Requires a single Right rotation.</li>
                            <li><strong>Right-Right (RR) Case:</strong> Requires a single Left rotation.</li>
                            <li><strong>Left-Right (LR) Case:</strong> Requires a Left rotation followed by a Right rotation.</li>
                            <li><strong>Right-Left (RL) Case:</strong> Requires a Right rotation followed by a Left rotation.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <AVLTreeVisualizer />
            
             <Card>
                <CardHeader>
                    <CardTitle>C Implementation</CardTitle>
                    <CardDescription>Here is a complete C implementation demonstrating the node structure, rotation functions, and the insertion logic with rebalancing.</CardDescription>
                </CardHeader>
                <CardContent>
                <h3 className="text-xl font-semibold text-gray-100 mb-2 mt-4">1. Node Structure & Utility Functions</h3>
                <CodeBlock>
{`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key;
    struct Node *left;
    struct Node *right;
    int height;
};

// Function to get the height of a node
int height(struct Node *N) {
    if (N == NULL)
        return 0;
    return N->height;
}

// Function to get max of two integers
int max(int a, int b) {
    return (a > b) ? a : b;
}

// Function to create a new node
struct Node* newNode(int key) {
    struct Node* node = (struct Node*) malloc(sizeof(struct Node));
    node->key   = key;
    node->left   = NULL;
    node->right  = NULL;
    node->height = 1; // New node is initially added at leaf
    return(node);
}`}
                </CodeBlock>
                 <h3 className="text-xl font-semibold text-gray-100 mb-2 mt-4">2. Rotation Functions</h3>
                 <CodeBlock>
{`// Right rotate subtree rooted with y
struct Node *rightRotate(struct Node *y) {
    struct Node *x = y->left;
    struct Node *T2 = x->right;

    // Perform rotation
    x->right = y;
    y->left = T2;

    // Update heights
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;

    return x;
}

// Left rotate subtree rooted with x
struct Node *leftRotate(struct Node *x) {
    struct Node *y = x->right;
    struct Node *T2 = y->left;

    // Perform rotation
    y->left = x;
    x->right = T2;

    // Update heights
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;

    return y;
}`}
                 </CodeBlock>
                 <h3 className="text-xl font-semibold text-gray-100 mb-2 mt-4">3. Insertion with Rebalancing</h3>
                 <CodeBlock>
{`// Get Balance factor of node N
int getBalance(struct Node *N) {
    if (N == NULL)
        return 0;
    return height(N->left) - height(N->right);
}

struct Node* insert(struct Node* node, int key) {
    /* 1.  Perform the normal BST insertion */
    if (node == NULL)
        return(newNode(key));

    if (key < node->key)
        node->left  = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    else // Equal keys are not allowed in BST
        return node;

    /* 2. Update height of this ancestor node */
    node->height = 1 + max(height(node->left), height(node->right));

    /* 3. Get the balance factor of this ancestor node to check whether this node became unbalanced */
    int balance = getBalance(node);

    // If the node becomes unbalanced, then there are 4 cases

    // Left Left Case
    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    // Right Right Case
    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    // Left Right Case
    if (balance > 1 && key > node.left->key) {
        node->left =  leftRotate(node->left);
        return rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    /* return the (unchanged) node pointer */
    return node;
}`}
                 </CodeBlock>
                </CardContent>
            </Card>

        </div>
    );
}

