
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const BinaryTreeVisualization = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [explanation, setExplanation] = useState('Build a tree or create a sample one to begin.');
  const [codeExplanation, setCodeExplanation] = useState('');
  const [currentCodeStep, setCurrentCodeStep] = useState('');
  const [traversalResult, setTraversalResult] = useState<number[]>([]);

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
        setHighlightedNodes(current ? [current.value] : []);
        await wait(500);
    });

    while(current) {
        if (value < current.value) {
            const next = current.left;
            const node = current;
            steps.push(async () => {
                setExplanation(`${value} < ${node.value}. Go left.`);
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
                setHighlightedNodes(next ? [next.value] : [node.value]);
                await wait(500);
            });
            if (!next) break;
            current = next;
        } else {
            steps.push(async () => {
                setExplanation(`${value} already exists in the tree.`);
                setHighlightedNodes([value]);
                await wait(500);
            });
            setAnimationQueue(steps);
            return;
        }
    }

    steps.push(async () => {
        setExplanation(`Found an empty spot. Inserting ${value}.`);
        setTree(prev => insertNode(JSON.parse(JSON.stringify(prev || null)), value));
        setHighlightedNodes([value]);
        await wait(500);
    });
     steps.push(async () => {
        setExplanation(`Insertion of ${value} complete.`);
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
  }

  const runTraversal = (type: 'inorder' | 'preorder' | 'postorder') => {
    if (!tree) return;
    const steps: (() => Promise<void>)[] = [];
    const result: number[] = [];

    const buildSteps = (node: TreeNode | null) => {
        if (!node) return;

        const visit = () => {
            steps.push(async () => {
                setExplanation(`Visiting node ${node.value}`);
                setHighlightedNodes([node.value]);
                result.push(node.value);
                setTraversalResult([...result]);
                await wait(600);
            });
        };

        if (type === 'preorder') visit();
        buildSteps(node.left);
        if (type === 'inorder') visit();
        buildSteps(node.right);
        if (type === 'postorder') visit();
    };

    buildSteps(tree);
    steps.push(async () => {
        setExplanation(`${type} traversal complete.`);
        setHighlightedNodes([]);
    });
    setAnimationQueue(steps);
  };
  
  const clearTree = () => {
    setTree(null);
    setTraversalResult([]);
    setExplanation('Tree cleared');
    setHighlightedNodes([]);
    setAnimationQueue([]);
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
      </div>
    </div>
  );
};

export default BinaryTreeVisualization;
