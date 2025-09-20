'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Code, GitCommit, RotateCw, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// AVL Tree Node
class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

const AVLTreeVisualization = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [explanation, setExplanation] = useState('Build an AVL tree or create a sample one to begin.');
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  
  const [animationQueue, setAnimationQueue] = useState<(() => Promise<void>)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // --- Core AVL Logic ---
  const height = (node: TreeNode | null) => node ? node.height : 0;
  const updateHeight = (node: TreeNode) => {
    node.height = 1 + Math.max(height(node.left), height(node.right));
  };
  const getBalance = (node: TreeNode | null) => node ? height(node.left) - height(node.right) : 0;

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
  
  const insertNode = (node: TreeNode | null, value: number, steps: any[]): TreeNode => {
    if (!node) {
        steps.push({ type: 'insert', value });
        return new TreeNode(value);
    }

    if (value < node.value) {
        steps.push({ type: 'traverse', from: node.value, to: node.left?.value, direction: 'left'});
        node.left = insertNode(node.left, value, steps);
    } else if (value > node.value) {
        steps.push({ type: 'traverse', from: node.value, to: node.right?.value, direction: 'right'});
        node.right = insertNode(node.right, value, steps);
    } else {
        steps.push({ type: 'info', text: 'Value already exists.' });
        return node;
    }

    updateHeight(node);
    const balance = getBalance(node);

    // Left Left Case
    if (balance > 1 && value < node.left!.value) {
        steps.push({ type: 'balance', node: node.value, balance, case: 'Left-Left Imbalance' });
        steps.push({ type: 'rotate', rotation: 'right', node: node.value });
        return rightRotate(node);
    }
    // Right Right Case
    if (balance < -1 && value > node.right!.value) {
        steps.push({ type: 'balance', node: node.value, balance, case: 'Right-Right Imbalance' });
        steps.push({ type: 'rotate', rotation: 'left', node: node.value });
        return leftRotate(node);
    }
    // Left Right Case
    if (balance > 1 && value > node.left!.value) {
        steps.push({ type: 'balance', node: node.value, balance, case: 'Left-Right Imbalance' });
        steps.push({ type: 'rotate', rotation: 'left', node: node.left!.value });
        node.left = leftRotate(node.left!);
        steps.push({ type: 'rotate', rotation: 'right', node: node.value });
        return rightRotate(node);
    }
    // Right Left Case
    if (balance < -1 && value < node.right!.value) {
        steps.push({ type: 'balance', node: node.value, balance, case: 'Right-Left Imbalance' });
        steps.push({ type: 'rotate', rotation: 'right', node: node.right!.value });
        node.right = rightRotate(node.right!);
        steps.push({ type: 'rotate', rotation: 'left', node: node.value });
        return leftRotate(node);
    }
    
    steps.push({type: 'update_height', node: node.value, height: node.height, balance: balance });
    return node;
};


  const runInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    let tempTree = JSON.parse(JSON.stringify(tree || null));
    const capturedSteps: any[] = [];
    const newTreeRoot = insertNode(tempTree, value, capturedSteps);
    
    const animationSteps = capturedSteps.map(step => async () => {
        setHighlightedNodes([]);
        switch(step.type) {
            case 'traverse':
                setExplanation(`Inserting ${value}. At node ${step.from}, go ${step.direction}.`);
                setHighlightedNodes([step.from, step.to].filter(Boolean));
                setHighlightedCode('if (value < node->value)\n  node->left  = insert(node->left, value);');
                break;
            case 'insert':
                 setExplanation(`Found empty spot. Inserting ${step.value}.`);
                 setTree(insertNode(JSON.parse(JSON.stringify(tree || null)), value, []));
                 setHighlightedNodes([step.value]);
                 setHighlightedCode('// Base case: If the node is null, create a new node\nif (node == NULL) return newNode(value);');
                 break;
            case 'update_height':
                 setExplanation(`Updating height & balance factor for node ${step.node}. Height: ${step.height}, Balance: ${step.balance}. Tree is balanced here.`);
                 setHighlightedNodes([step.node]);
                 setHighlightedCode('node->height = 1 + max(height(node->left), height(node->right));\nbalance = getBalance(node);');
                 break;
            case 'balance':
                setExplanation(`Unbalanced at node ${step.node}! Balance factor is ${step.balance}. Case: ${step.case}.`);
                setHighlightedNodes([step.node]);
                setHighlightedCode('if (balance > 1 || balance < -1) {\n  // Rebalance the tree\n}');
                break;
            case 'rotate':
                setExplanation(`Performing a ${step.rotation} rotation on node ${step.node}.`);
                setHighlightedNodes([step.node]);
                setTree(JSON.parse(JSON.stringify(newTreeRoot))); // Show final state after rotations
                setHighlightedCode(`// ${step.case}\nreturn ${step.rotation}Rotate(node);`);
                break;
        }
        await wait(800);
    });

    animationSteps.push(async () => {
        setExplanation(`Insertion of ${value} complete. Tree is balanced.`);
        setHighlightedNodes([]);
        setHighlightedCode('');
    });
    setAnimationQueue(animationSteps);
  };
  
  const runNextStep = useCallback(async () => {
      if (animationQueue.length > 0 && !isAnimating) {
          setIsAnimating(true);
          const nextStep = animationQueue[0];
          await nextStep();
          setAnimationQueue(prev => prev.slice(1));
          setIsAnimating(false);
      }
  }, [animationQueue, isAnimating]);

  const createSampleTree = () => {
    let sampleTree: TreeNode | null = null;
    const values = [10, 20, 30, 40, 50, 25];
    values.forEach(value => {
      sampleTree = insertNode(sampleTree, value, []);
    });
    setTree(sampleTree);
    setExplanation('Created sample AVL tree.');
  };
  
  const clearTree = () => {
    setTree(null);
    setExplanation('Tree cleared.');
    setAnimationQueue([]);
    setHighlightedCode('');
  };

  const renderNode = (node: TreeNode | null, x: number, y: number, level: number): React.ReactNode[] => {
    if (!node) return [];

    const radius = 22;
    const verticalSpacing = 70;
    const horizontalSpacing = Math.max(200 / (level + 1), 35);
    const leftX = x - horizontalSpacing;
    const leftY = y + verticalSpacing;
    const rightX = x + horizontalSpacing;
    const rightY = y + verticalSpacing;
    const isHighlighted = highlightedNodes.includes(node.value);

    let nodesToRender: React.ReactNode[] = [];

    if (node.left) {
        nodesToRender.push(<line key={`${node.value}-l-line`} x1={x} y1={y} x2={leftX} y2={leftY} stroke="#4a5568" strokeWidth="2" />);
        nodesToRender.push(...renderNode(node.left, leftX, leftY, level + 1));
    }
     if (node.right) {
        nodesToRender.push(<line key={`${node.value}-r-line`} x1={x} y1={y} x2={rightX} y2={rightY} stroke="#4a5568" strokeWidth="2" />);
        nodesToRender.push(...renderNode(node.right, rightX, rightY, level + 1));
    }
    
    nodesToRender.push(
      <g key={node.value}>
        <circle cx={x} cy={y} r={radius} fill={isHighlighted ? "#10b981" : "#3b82f6"} stroke={isHighlighted ? "#059669" : "#2563eb"} strokeWidth="3" />
        <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14" fontWeight="bold">{node.value}</text>
        <text x={x} y={y+8} textAnchor="middle" dominantBaseline="hanging" fill="cyan" fontSize="9">{getBalance(node)}</text>
      </g>
    );

    return nodesToRender;
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">AVL Tree Visualization</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
             <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-200 mb-2">Operations</h3>
                 <div className="flex gap-2">
                    <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Value" className="bg-gray-700 border-gray-600 text-white" />
                    <Button onClick={runInsert} disabled={isAnimating || animationQueue.length > 0}>Insert</Button>
                </div>
            </div>
             <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-200 mb-2">Animation Control</h3>
                 <div className="flex gap-2">
                    <Button onClick={runNextStep} disabled={isAnimating || animationQueue.length === 0} className="w-full">Next Step</Button>
                    <Button onClick={() => setAnimationQueue([])} disabled={animationQueue.length === 0} variant="outline">Skip</Button>
                </div>
            </div>
             <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-200 mb-2">Presets</h3>
                 <div className="flex gap-2">
                    <Button onClick={createSampleTree} disabled={isAnimating || animationQueue.length > 0} className="w-full">Sample Tree</Button>
                    <Button onClick={clearTree} variant="outline" className="w-full">Clear Tree</Button>
                 </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-cyan-400 min-h-[80px]">
                <h4 className="font-semibold text-cyan-300">Explanation:</h4>
                <p className="text-cyan-100 text-sm mt-1">{explanation}</p>
            </div>
             <div className="bg-gray-900 p-4 rounded-lg min-h-[100px]">
                 <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2"><Code className="size-4"/> Code Running:</h4>
                 {highlightedCode ? (
                    <CodeBlock className="bg-black/20 border-gray-600 text-sm">
                        {highlightedCode}
                    </CodeBlock>
                 ) : (
                    <p className="text-gray-500 text-sm">No operation running.</p>
                 )}
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-300 flex items-center gap-2"><HelpCircle size={16}/> Info</h4>
                <p className="text-yellow-100 text-sm mt-1">The small cyan number on each node is its **balance factor** (left height - right height). An AVL tree is balanced if this factor is -1, 0, or 1 for every node.</p>
            </div>
          </div>
          {/* Visualization */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-700 rounded-lg p-4 min-h-[400px] border border-gray-600">
              {!tree ? (
                <div className="flex items-center justify-center h-full text-gray-400">Tree is empty</div>
              ) : (
                <svg width="100%" height="450" className="overflow-visible">
                  {renderNode(tree, 400, 50, 0)}
                </svg>
              )}
            </div>
          </div>
        </div>
        
        {/* Full Code Implementation Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Complete C Implementation for AVL Tree</h2>
          <div className="space-y-8 text-gray-300">
            <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">1. Node Structure</h3>
                <p className="text-sm text-gray-400 mb-4">The AVL node includes a `height` field to track the subtree height, which is crucial for determining balance.</p>
                <CodeBlock>
{`struct Node {
    int key;
    struct Node *left;
    struct Node *right;
    int height;
};`}
                </CodeBlock>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">2. Rotation Functions</h3>
                <p className="text-sm text-gray-400 mb-4">These are the core operations for rebalancing the tree. A right rotation is used for left-heavy subtrees, and a left rotation for right-heavy ones.</p>
                <CodeBlock>
{`// Function to get height of the node
int height(struct Node *N) {
    if (N == NULL) return 0;
    return N->height;
}

// Right rotate subtree rooted with y
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
    // ... (similar logic to rightRotate)
}`}
                </CodeBlock>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">3. Insert Function with Rebalancing</h3>
                <p className="text-sm text-gray-400 mb-4">After a standard BST insertion, the tree walks back up, updating heights and checking the balance factor at each node. If an imbalance is found, the appropriate rotations are performed.</p>
                <CodeBlock>
{`// Get Balance factor of node N
int getBalance(struct Node *N) {
    if (N == NULL) return 0;
    return height(N->left) - height(N->right);
}

struct Node* insert(struct Node* node, int key) {
    // 1.  Perform the normal BST insertion
    if (node == NULL) return(newNode(key));
    if (key < node->key) node->left  = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    else return node; // Duplicate keys not allowed

    // 2. Update height of this ancestor node
    node->height = 1 + max(height(node->left), height(node->right));

    // 3. Get the balance factor of this ancestor node
    int balance = getBalance(node);

    // 4. If the node becomes unbalanced, there are 4 cases
    // Left Left Case
    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    // Right Right Case
    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    // Left Right Case
    if (balance > 1 && key > node->left->key) {
        node->left =  leftRotate(node->left);
        return rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}`}
                </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AVLTreeVisualization;

    