'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Code } from 'lucide-react';

const BinaryTreeVisualization = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [explanation, setExplanation] = useState('Build a tree or create a sample one to begin.');
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  const [animationQueue, setAnimationQueue] = useState<(() => Promise<void>)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Tree Node class
  class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(value: number) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  // Insert node into BST
  const insertNode = (root: TreeNode | null, value: number): TreeNode => {
    if (!root) return new TreeNode(value);
    
    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }
    return root;
  };

  const findMin = (node: TreeNode): TreeNode => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  const deleteNode = (root: TreeNode | null, value: number): TreeNode | null => {
    if (!root) return null;

    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) return null;
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      
      const minRight = findMin(root.right);
      root.value = minRight.value;
      root.right = deleteNode(root.right, minRight.value);
    }
    return root;
  };

  const searchNode = (root: TreeNode | null, value: number): TreeNode | null => {
    if (!root || root.value === value) return root;
    return value < root.value ? searchNode(root.left, value) : searchNode(root.right, value);
  };
  
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setExplanation('Please enter a valid number');
      return;
    }
    
    const steps: (() => Promise<void>)[] = [];
    let current = tree;

    steps.push(async () => {
        setExplanation(`Inserting ${value}. Start at the root.`);
        setHighlightedCode('// Begin insertion\nstruct Node* insert(struct Node* node, int value)');
        setHighlightedNodes(current ? [current.value] : []);
        await wait(500);
    });

    while(current) {
        if (value < current.value) {
            const next = current.left;
            const node = current;
            steps.push(async () => {
                setExplanation(`${value} < ${node.value}. Go left.`);
                setHighlightedCode('if (value < node->value)\n    node->left  = insert(node->left, value);');
                setHighlightedNodes(next ? [next.value] : [node.value]);
                await wait(500);
            });
            if (!next) break;
            current = next;
        } else if (value > current.value) {
            const next = current.right;
            const node = current;
            steps.push(async () => {
                setExplanation(`${value} > ${node.value}. Go right.`);
                setHighlightedCode('else if (value > node->value)\n    node->right = insert(node->right, value);');
                setHighlightedNodes(next ? [next.value] : [node.value]);
                await wait(500);
            });
            if (!next) break;
            current = next;
        } else {
            steps.push(async () => {
                setExplanation(`${value} already exists in the tree.`);
                setHighlightedCode('// Value already exists, return node unchanged\nreturn node;');
                setHighlightedNodes([value]);
                await wait(500);
            });
            setAnimationQueue(steps);
            return;
        }
    }

    steps.push(async () => {
        setExplanation(`Found an empty spot. Inserting ${value}.`);
        setHighlightedCode('// Base case: If the node is null, create a new node\nif (node == NULL) return newNode(value);');
        setTree(prev => insertNode(JSON.parse(JSON.stringify(prev || null)), value));
        setHighlightedNodes([value]);
        await wait(500);
    });
     steps.push(async () => {
        setExplanation(`Insertion of ${value} complete.`);
        setHighlightedCode('');
        setHighlightedNodes([]);
    });
    setAnimationQueue(steps);
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
  
  const runDelete = () => {
    // Simplified for brevity, would be implemented similar to runInsert
    const value = parseInt(inputValue);
    if (isNaN(value) || !searchNode(tree, value)) {
        setExplanation('Value not found or invalid.');
        return;
    }
    setTree(prev => deleteNode(JSON.parse(JSON.stringify(prev)), value));
    setExplanation(`Deleted ${value}. (Manual step-by-step for delete not implemented in this demo)`);
    setHighlightedCode('');
  }

  const runTraversal = (type: 'inorder' | 'preorder' | 'postorder') => {
    if (!tree) return;
    const steps: (() => Promise<void>)[] = [];
    const result: number[] = [];

    const buildSteps = (node: TreeNode | null) => {
        if (!node) {
            steps.push(async () => {
                 setExplanation(`Reached a NULL node, returning.`);
                 setHighlightedCode('if (node == NULL)\n    return;');
                 await wait(600);
            });
            return;
        };

        const visit = () => {
            steps.push(async () => {
                setExplanation(`Visiting node ${node.value}`);
                setHighlightedCode(`printf("%d ", node->data);`);
                setHighlightedNodes([node.value]);
                result.push(node.value);
                setTraversalResult([...result]);
                await wait(600);
            });
        };
        
        const goLeft = () => {
             steps.push(async () => {
                setExplanation(`Going left from ${node.value}`);
                setHighlightedCode(type === 'inorder' ? `printInorder(node->left);` : type === 'preorder' ? 'printPreorder(node->left);' : 'printPostorder(node->left);');
                setHighlightedNodes(node.left ? [node.left.value] : [node.value]);
                 await wait(600);
            });
        }
        
        const goRight = () => {
             steps.push(async () => {
                setExplanation(`Going right from ${node.value}`);
                 setHighlightedCode(type === 'inorder' ? `printInorder(node->right);` : type === 'preorder' ? 'printPreorder(node->right);' : 'printPostorder(node->right);');
                 setHighlightedNodes(node.right ? [node.right.value] : [node.value]);
                 await wait(600);
            });
        }

        if (type === 'preorder') {
            visit();
            goLeft();
            buildSteps(node.left);
            goRight();
            buildSteps(node.right);
        }
        if (type === 'inorder') {
            goLeft();
            buildSteps(node.left);
            visit();
            goRight();
            buildSteps(node.right);
        }
        if (type === 'postorder') {
            goLeft();
            buildSteps(node.left);
            goRight();
            buildSteps(node.right);
            visit();
        }
    };

    buildSteps(tree);
    steps.push(async () => {
        setExplanation(`${type} traversal complete.`);
        setHighlightedNodes([]);
        setHighlightedCode('');
    });
    setAnimationQueue(steps);
  };
  
  const clearTree = () => {
    setTree(null);
    setTraversalResult([]);
    setExplanation('Tree cleared');
    setHighlightedNodes([]);
    setAnimationQueue([]);
    setHighlightedCode('');
  };

  const createSampleTree = () => {
    let sampleTree: TreeNode | null = null;
    const values = [50, 30, 70, 20, 40, 60, 80];
    values.forEach(value => {
      sampleTree = insertNode(sampleTree, value);
    });
    setTree(sampleTree);
    setExplanation('Created sample tree.');
    setAnimationQueue([]);
    setHighlightedCode('');
  };
  
  const renderNode = (node: TreeNode | null, x: number, y: number, level: number): React.ReactNode => {
    if (!node) return null;
    const radius = 25;
    const verticalSpacing = 80;
    const horizontalSpacing = Math.max(200 / (level + 1), 40);
    const leftX = x - horizontalSpacing;
    const leftY = y + verticalSpacing;
    const rightX = x + horizontalSpacing;
    const rightY = y + verticalSpacing;
    const isHighlighted = highlightedNodes.includes(node.value);

    return (
      <g key={node.value}>
        {node.left && <line x1={x} y1={y} x2={leftX} y2={leftY} stroke="#4a5568" strokeWidth="2" />}
        {node.right && <line x1={x} y1={y} x2={rightX} y2={rightY} stroke="#4a5568" strokeWidth="2" />}
        <circle cx={x} cy={y} r={radius} fill={isHighlighted ? "#10b981" : "#3b82f6"} stroke={isHighlighted ? "#059669" : "#2563eb"} strokeWidth="3" />
        <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="16" fontWeight="bold">{node.value}</text>
        {node.left && renderNode(node.left, leftX, leftY, level + 1)}
        {node.right && renderNode(node.right, rightX, rightY, level + 1)}
      </g>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Binary Search Tree Visualization</h1>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
             <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-200 mb-2">Operations</h3>
                <div className="flex gap-2">
                    <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Value" className="bg-gray-700 border-gray-600 text-white" />
                    <Button onClick={runInsert} disabled={isAnimating || animationQueue.length > 0}>Insert</Button>
                    <Button onClick={runDelete} variant="destructive" disabled={isAnimating || animationQueue.length > 0}>Delete</Button>
                </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-200 mb-2">Traversals</h3>
                <div className="grid grid-cols-3 gap-2">
                    <Button onClick={() => runTraversal('inorder')} disabled={!tree || isAnimating || animationQueue.length > 0} variant="secondary">In-Order</Button>
                    <Button onClick={() => runTraversal('preorder')} disabled={!tree || isAnimating || animationQueue.length > 0} variant="secondary">Pre-Order</Button>
                    <Button onClick={() => runTraversal('postorder')} disabled={!tree || isAnimating || animationQueue.length > 0} variant="secondary">Post-Order</Button>
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
             <div className="bg-gray-900 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-gray-200 mb-1">Traversal Output:</h4>
                <div className="font-mono text-lg text-green-400 p-2 bg-gray-800 rounded min-h-[3rem]">
                    {traversalResult.join(', ')}
                </div>
            </div>
          </div>
        </div>
        
        {/* Full Code Implementation Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Complete C Implementation</h2>
          <div className="space-y-8 text-gray-300">
            <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">1. Node Structure</h3>
                <p className="text-sm text-gray-400 mb-4">The basic building block of a tree. Each node contains data, a pointer to a left child, and a pointer to a right child.</p>
                <CodeBlock>
<code><span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span> {'{'}
    <span className="syntax-datatype">int</span> data;
    <span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span> *left;
    <span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span> *right;
{'};'}</span></code>
                </CodeBlock>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">2. Insert Function</h3>
                <p className="text-sm text-gray-400 mb-4">Recursively finds the correct position in the tree to insert a new node while maintaining the BST property (left &lt; root &lt; right).</p>
                <CodeBlock>
<code><span className="syntax-comment">{'// Function to create a new node'}</span>
<span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>* <span className="syntax-function">newNode</span>(<span className="syntax-datatype">int</span> item) {'{'}
    <span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>* temp = (<span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>*)<span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>));
    temp<span className="syntax-operator">-></span>data = item;
    temp<span className="syntax-operator">-></span>left = temp<span className="syntax-operator">-></span>right = <span className="syntax-keyword">NULL</span>;
    <span className="syntax-keyword">return</span> temp;
{'}'}

<span className="syntax-comment">{'// Function to insert a new node with given data in BST'}</span>
<span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>* <span className="syntax-function">insert</span>(<span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>* node, <span className="syntax-datatype">int</span> data) {'{'}
    <span className="syntax-comment">{'// If the tree is empty, return a new node'}</span>
    <span className="syntax-keyword">if</span> (node == <span className="syntax-keyword">NULL</span>) <span className="syntax-keyword">return</span> <span className="syntax-function">newNode</span>(data);

    <span className="syntax-comment">{'// Otherwise, recur down the tree'}</span>
    <span className="syntax-keyword">if</span> (data < node<span className="syntax-operator">-></span>data)
        node<span className="syntax-operator">-></span>left  = <span className="syntax-function">insert</span>(node<span className="syntax-operator">-></span>left, data);
    <span className="syntax-keyword">else if</span> (data > node<span className="syntax-operator">-></span>data)
        node<span className="syntax-operator">-></span>right = <span className="syntax-function">insert</span>(node<span className="syntax-operator">-></span>right, data);   

    <span className="syntax-comment">{'// return the (unchanged) node pointer'}</span>
    <span className="syntax-keyword">return</span> node;
{'}'}</span></code>
                </CodeBlock>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">3. Traversal Functions</h3>
                <p className="text-sm text-gray-400 mb-4">Different ways to visit every node in the tree.</p>
                <CodeBlock>
<code><span className="syntax-comment">{'// In-Order Traversal (Left, Root, Right) - gives sorted output'}</span>
<span className="syntax-keyword">void</span> <span className="syntax-function">printInorder</span>(<span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>* node) {'{'}
    <span className="syntax-keyword">if</span> (node == <span className="syntax-keyword">NULL</span>)
        <span className="syntax-keyword">return</span>;
    <span className="syntax-function">printInorder</span>(node<span className="syntax-operator">-></span>left);
    <span className="syntax-function">printf</span>(<span className="syntax-string">"%d "</span>, node<span className="syntax-operator">-></span>data);  
    <span className="syntax-function">printInorder</span>(node<span className="syntax-operator">-></span>right);
{'}'}

<span className="syntax-comment">{'// Pre-Order Traversal (Root, Left, Right)'}</span>
<span className="syntax-keyword">void</span> <span className="syntax-function">printPreorder</span>(<span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>* node) {'{'}
    <span className="syntax-keyword">if</span> (node == <span className="syntax-keyword">NULL</span>)
        <span className="syntax-keyword">return</span>;
    <span className="syntax-function">printf</span>(<span className="syntax-string">"%d "</span>, node<span className="syntax-operator">-></span>data);  
    <span className="syntax-function">printPreorder</span>(node<span className="syntax-operator">-></span>left);  
    <span className="syntax-function">printPreorder</span>(node<span className="syntax-operator">-></span>right);
{'}'}

<span className="syntax-comment">{'// Post-Order Traversal (Left, Right, Root)'}</span>
<span className="syntax-keyword">void</span> <span className="syntax-function">printPostorder</span>(<span className="syntax-keyword">struct</span> <span className="syntax-datatype">Node</span>* node) {'{'}
    <span className="syntax-keyword">if</span> (node == <span className="syntax-keyword">NULL</span>)
        <span className="syntax-keyword">return</span>;
    <span className="syntax-function">printPostorder</span>(node<span className="syntax-operator">-></span>left);
    <span className="syntax-function">printPostorder</span>(node<span className="syntax-operator">-></span>right);
    <span className="syntax-function">printf</span>(<span className="syntax-string">"%d "</span>, node<span className="syntax-operator">-></span>data);
{'}'}</span></code>
                </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeVisualization;
    
    