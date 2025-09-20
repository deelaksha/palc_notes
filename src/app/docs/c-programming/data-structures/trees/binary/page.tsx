
'use client';

import React, { useState, useEffect } from 'react';

const BinaryTreeVisualization = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [animatingNode, setAnimatingNode] = useState<number | null>(null);
  const [operation, setOperation] = useState('');
  const [explanation, setExplanation] = useState('');
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [traversalStep, setTraversalStep] = useState(0);
  const [codeExplanation, setCodeExplanation] = useState('');
  const [currentCodeStep, setCurrentCodeStep] = useState('');

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

  // Find minimum value node
  const findMin = (node: TreeNode): TreeNode => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  // Delete node from BST
  const deleteNode = (root: TreeNode | null, value: number): TreeNode | null => {
    if (!root) return null;

    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      // Node to delete found
      if (!root.left && !root.right) {
        return null; // Leaf node
      } else if (!root.left) {
        return root.right; // Only right child
      } else if (!root.right) {
        return root.left; // Only left child
      } else {
        // Two children
        const minRight = findMin(root.right);
        root.value = minRight.value;
        root.right = deleteNode(root.right, minRight.value);
      }
    }
    return root;
  };

  // Search for a value
  const searchNode = (root: TreeNode | null, value: number): TreeNode | null => {
    if (!root || root.value === value) return root;
    if (value < root.value) return searchNode(root.left, value);
    return searchNode(root.right, value);
  };

  // Insert operation with step-by-step explanation
  const insert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setExplanation('Please enter a valid number');
      return;
    }

    setOperation('insert');
    setAnimatingNode(value);
    
    // Step 1: Start insertion
    setCurrentCodeStep('Starting insertion...');
    setCodeExplanation('Step 1: Call insert(root, ' + value + ')');
    setExplanation(`Inserting ${value} into the Binary Search Tree. Following BST property: left < root < right`);

    setTimeout(() => {
      // Step 2: Show comparison logic
      setCurrentCodeStep('if (!root) return new TreeNode(value)');
      setCodeExplanation('Step 2: Check if root is null. If yes, create new node.');
    }, 200);

    setTimeout(() => {
      // Step 3: Show recursive logic
      setCurrentCodeStep('if (value < root.value) go left, else go right');
      setCodeExplanation('Step 3: Compare ' + value + ' with current node. Navigate left if smaller, right if larger.');
    }, 500);

    setTimeout(() => {
      // Step 4: Show final placement
      setCurrentCodeStep('Found empty spot - creating new TreeNode(' + value + ')');
      setCodeExplanation('Step 4: Found the correct position following BST property. Creating new node.');
    }, 800);

    setTimeout(() => {
      setTree(prevTree => insertNode(prevTree, value));
      setInputValue('');
      setAnimatingNode(null);
      setOperation('');
      setCurrentCodeStep('');
      setCodeExplanation('Insertion complete! Node added to maintain BST property.');
    }, 1000);
  };

  // Delete operation with step-by-step explanation
  const deleteValue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || !tree) {
      setExplanation('Please enter a valid number and ensure tree is not empty');
      return;
    }

    if (!searchNode(tree, value)) {
      setExplanation(`Value ${value} not found in the tree`);
      return;
    }

    setOperation('delete');
    setAnimatingNode(value);
    
    // Step 1: Find the node
    setCurrentCodeStep('Searching for node to delete...');
    setCodeExplanation('Step 1: Navigate to find node with value ' + value);
    setExplanation(`Deleting ${value} from the tree. First, we need to find the node.`);

    setTimeout(() => {
      // Step 2: Determine deletion case
      const nodeToDelete = searchNode(tree, value);
      let caseType = '';
      if (nodeToDelete && !nodeToDelete.left && !nodeToDelete.right) {
        caseType = 'Case 1: Leaf node (no children)';
        setCodeExplanation('Step 2: Node has no children - simply remove it');
      } else if (nodeToDelete && (!nodeToDelete.left || !nodeToDelete.right)) {
        caseType = 'Case 2: Node has one child';
        setCodeExplanation('Step 2: Node has one child - replace node with its child');
      } else {
        caseType = 'Case 3: Node has two children';
        setCodeExplanation('Step 2: Node has two children - find inorder successor (smallest in right subtree)');
      }
      setCurrentCodeStep(caseType);
    }, 300);

    setTimeout(() => {
      // Step 3: Show replacement logic for case 3
      const nodeToDelete = searchNode(tree, value);
      if (nodeToDelete && nodeToDelete.left && nodeToDelete.right) {
        setCurrentCodeStep('Finding minimum in right subtree...');
        setCodeExplanation('Step 3: Find the smallest value in the right subtree to replace deleted node');
      } else {
        setCurrentCodeStep('Reconnecting parent-child links...');
        setCodeExplanation('Step 3: Update parent pointers to bypass the deleted node');
      }
    }, 600);

    setTimeout(() => {
      setTree(prevTree => deleteNode(prevTree, value));
      setInputValue('');
      setAnimatingNode(null);
      setOperation('');
      setCurrentCodeStep('');
      setCodeExplanation('Deletion complete! BST property maintained.');
    }, 1000);
  };

  // Search operation with step-by-step explanation
  const search = () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || !tree) {
      setExplanation('Please enter a valid number and ensure tree is not empty');
      return;
    }

    setCurrentCodeStep('Starting search for ' + value + '...');
    setCodeExplanation('Step 1: Begin at root node, compare ' + value + ' with current node value');

    // Simulate search path
    let currentNode: TreeNode | null = tree;
    let step = 1;
    const searchPath: number[] = [];

    while (currentNode) {
      searchPath.push(currentNode.value);
      if (currentNode.value === value) break;
      currentNode = value < currentNode.value ? currentNode.left : currentNode.right;
    }

    // Animate search path
    searchPath.forEach((nodeValue, index) => {
      setTimeout(() => {
        setHighlightedNodes([nodeValue]);
        setCurrentCodeStep(`Checking node ${nodeValue}...`);
        
        if (nodeValue === value) {
          setCodeExplanation(`Step ${index + 1}: Found! ${value} === ${nodeValue} - Search successful`);
        } else if (value < nodeValue) {
          setCodeExplanation(`Step ${index + 1}: ${value} < ${nodeValue}, go LEFT to continue search`);
        } else {
          setCodeExplanation(`Step ${index + 1}: ${value} > ${nodeValue}, go RIGHT to continue search`);
        }
      }, index * 600);
    });

    const found = searchNode(tree, value);
    setTimeout(() => {
      if (found) {
        setExplanation(`Found ${value} in the tree! Search completed in ${searchPath.length} steps.`);
      } else {
        setExplanation(`Value ${value} not found in the tree. Reached null pointer.`);
        setHighlightedNodes([]);
      }
      setCurrentCodeStep('');
      setCodeExplanation('');
    }, searchPath.length * 600 + 500);

    setTimeout(() => {
      setHighlightedNodes([]);
    }, searchPath.length * 600 + 3000);
  };

  // Tree traversals
  const inOrderTraversal = (root: TreeNode | null, result: number[] = []) => {
    if (root) {
      inOrderTraversal(root.left, result);
      result.push(root.value);
      inOrderTraversal(root.right, result);
    }
    return result;
  };

  const preOrderTraversal = (root: TreeNode | null, result: number[] = []) => {
    if (root) {
      result.push(root.value);
      preOrderTraversal(root.left, result);
      preOrderTraversal(root.right, result);
    }
    return result;
  };

  const postOrderTraversal = (root: TreeNode | null, result: number[] = []) => {
    if (root) {
      postOrderTraversal(root.left, result);
      postOrderTraversal(root.right, result);
      result.push(root.value);
    }
    return result;
  };

  // Animated traversal with detailed code explanation
  const animateTraversal = (traversalType: 'inorder' | 'preorder' | 'postorder') => {
    if (!tree) {
      setExplanation('Tree is empty');
      return;
    }

    let result: number[] = [];
    let description = '';
    let codeSteps: { value: number; step: string; code: string; }[] = [];

    // Build traversal result and code steps
    const buildTraversalSteps = (node: TreeNode | null, type: string, steps: { value: number; step: string; code: string; }[] = [], path = 'root'): { value: number; step: string; code: string; }[] => {
      if (!node) return steps;

      if (type === 'preorder') {
        steps.push({
          value: node.value,
          step: `Visit ${path} (${node.value}) - Process current node FIRST`,
          code: `visit(${node.value}) // Pre-order: Root first`
        });
        buildTraversalSteps(node.left, type, steps, `${path}.left`);
        buildTraversalSteps(node.right, type, steps, `${path}.right`);
      } else if (type === 'inorder') {
        buildTraversalSteps(node.left, type, steps, `${path}.left`);
        steps.push({
          value: node.value,
          step: `Visit ${path} (${node.value}) - Process BETWEEN left and right`,
          code: `visit(${node.value}) // In-order: Root between children`
        });
        buildTraversalSteps(node.right, type, steps, `${path}.right`);
      } else if (type === 'postorder') {
        buildTraversalSteps(node.left, type, steps, `${path}.left`);
        buildTraversalSteps(node.right, type, steps, `${path}.right`);
        steps.push({
          value: node.value,
          step: `Visit ${path} (${node.value}) - Process current node LAST`,
          code: `visit(${node.value}) // Post-order: Root after children`
        });
      }
      return steps;
    };

    switch (traversalType) {
      case 'inorder':
        result = inOrderTraversal(tree);
        description = 'In-Order: Left → Root → Right (gives sorted order for BST)';
        codeSteps = buildTraversalSteps(tree, 'inorder');
        break;
      case 'preorder':
        result = preOrderTraversal(tree);
        description = 'Pre-Order: Root → Left → Right (useful for copying tree)';
        codeSteps = buildTraversalSteps(tree, 'preorder');
        break;
      case 'postorder':
        result = postOrderTraversal(tree);
        description = 'Post-Order: Left → Right → Root (useful for deleting tree)';
        codeSteps = buildTraversalSteps(tree, 'postorder');
        break;
    }

    setTraversalResult(result);
    setExplanation(description);
    setTraversalStep(0);
    
    setCurrentCodeStep('Starting ' + traversalType + ' traversal...');
    setCodeExplanation('Step 0: Begin traversal from root node');

    // Animate each step with detailed explanations
    codeSteps.forEach((stepInfo, index) => {
      setTimeout(() => {
        setHighlightedNodes([stepInfo.value]);
        setTraversalStep(index + 1);
        setCurrentCodeStep(stepInfo.code);
        setCodeExplanation(`Step ${index + 1}: ${stepInfo.step}`);
      }, (index + 1) * 1200);
    });

    setTimeout(() => {
      setHighlightedNodes([]);
      setTraversalStep(0);
      setCurrentCodeStep('');
      setCodeExplanation(`${traversalType} traversal complete! Final sequence: [${result.join(', ')}]`);
      
      setTimeout(() => {
        setCodeExplanation('');
      }, 3000);
    }, codeSteps.length * 1200 + 1000);
  };

  // Clear tree
  const clearTree = () => {
    setTree(null);
    setTraversalResult([]);
    setExplanation('Tree cleared');
    setHighlightedNodes([]);
  };

  // Create sample tree
  const createSampleTree = () => {
    let sampleTree: TreeNode | null = null;
    const values = [50, 30, 70, 20, 40, 60, 80];
    
    values.forEach(value => {
      sampleTree = insertNode(sampleTree, value);
    });
    
    setTree(sampleTree);
    setExplanation('Created sample Binary Search Tree with values: 50, 30, 70, 20, 40, 60, 80');
  };

  // Render tree nodes recursively
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
    const isAnimating = animatingNode === node.value;

    return (
      <g key={node.value}>
        {/* Lines to children */}
        {node.left && (
          <line
            x1={x}
            y1={y}
            x2={leftX}
            y2={leftY}
            stroke="#4a5568"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y}
            x2={rightX}
            y2={rightY}
            stroke="#4a5568"
            strokeWidth="2"
          />
        )}

        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r={radius}
          fill={
            isAnimating 
              ? "#fbbf24" 
              : isHighlighted 
                ? "#10b981" 
                : "#3b82f6"
          }
          stroke={
            isAnimating 
              ? "#f59e0b" 
              : isHighlighted 
                ? "#059669" 
                : "#2563eb"
          }
          strokeWidth="3"
          className={isAnimating ? "animate-pulse" : ""}
        />

        {/* Node value */}
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
        >
          {node.value}
        </text>

        {/* Render children */}
        {node.left && renderNode(node.left, leftX, leftY, level + 1)}
        {node.right && renderNode(node.right, rightX, rightY, level + 1)}
      </g>
    );
  };

  // Get tree height for info
  const getTreeHeight = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
  };

  // Count total nodes
  const countNodes = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Binary Search Tree</h1>
          <p className="text-lg text-gray-300">Hierarchical data structure with left &lt; root &lt; right property</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tree Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-200 text-center">Tree Visualization</h2>
            
            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter number"
                  className="w-full px-4 py-2 border-2 border-gray-600 bg-gray-700 text-white rounded-lg focus:border-blue-400 focus:outline-none placeholder-gray-400"
                />
                <div className="flex gap-2">
                  <button
                    onClick={insert}
                    disabled={inputValue === '' || operation !== ''}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Insert
                  </button>
                  <button
                    onClick={deleteValue}
                    disabled={inputValue === '' || operation !== '' || !tree}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
                <button
                  onClick={search}
                  disabled={inputValue === '' || !tree}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Search
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={createSampleTree}
                  disabled={operation !== ''}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Sample Tree
                </button>
                <button
                  onClick={clearTree}
                  disabled={operation !== ''}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Clear Tree
                </button>
                <div className="text-sm text-gray-400 text-center">
                  Nodes: {tree ? countNodes(tree) : 0} | Height: {tree ? getTreeHeight(tree) : 0}
                </div>
              </div>
            </div>

            {/* Traversal Controls */}
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => animateTraversal('inorder')}
                disabled={!tree}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                In-Order
              </button>
              <button
                onClick={() => animateTraversal('preorder')}
                disabled={!tree}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Pre-Order
              </button>
              <button
                onClick={() => animateTraversal('postorder')}
                disabled={!tree}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Post-Order
              </button>
            </div>

            {/* Tree Container */}
            <div className="relative bg-gray-700 rounded-lg p-6 min-h-96 border border-gray-600 overflow-auto">
              {!tree ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-400 text-center">
                    <div className="text-lg mb-2">Tree is empty</div>
                    <div className="text-sm">Insert nodes or create a sample tree to get started</div>
                  </div>
                </div>
              ) : (
                <svg width="100%" height="400" className="overflow-visible">
                  {renderNode(tree, 400, 50, 0)}
                </svg>
              )}
              
              {/* Animating node for insertion */}
              {animatingNode && operation === 'insert' && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-gray-900 px-4 py-3 rounded-full border-2 border-yellow-400 font-semibold animate-bounce z-10">
                  {animatingNode}
                </div>
              )}
            </div>

            {/* Code Step Explanation Panel */}
            {(currentCodeStep || codeExplanation) && (
              <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-cyan-400">
                <h4 className="font-semibold text-cyan-300 mb-2">Code Execution:</h4>
                {currentCodeStep && (
                  <div className="bg-black p-3 rounded font-mono text-sm text-green-400 mb-2">
                    {currentCodeStep}
                  </div>
                )}
                {codeExplanation && (
                  <p className="text-cyan-200 text-sm">{codeExplanation}</p>
                )}
              </div>
            )}
            {traversalResult.length > 0 && (
              <div className="bg-gray-600 p-4 rounded-lg border border-gray-500">
                <div className="text-sm text-gray-300 mb-2">Traversal Result:</div>
                <div className="font-mono text-lg text-white">
                  {traversalResult.map((value, index) => (
                    <span
                      key={index}
                      className={`inline-block px-2 py-1 mr-2 rounded ${
                        index < traversalStep ? 'bg-green-600' : 'bg-gray-700'
                      }`}
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Code and Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-200">Implementation</h2>
            
            {/* Node Structure */}
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <pre className="text-yellow-400 mb-2">// Node Structure</pre>
              <pre className="text-blue-300">class TreeNode &#123;</pre>
              <pre className="ml-4 text-blue-300">constructor(value) &#123;</pre>
              <pre className="ml-8 text-gray-300">this.value = value;</pre>
              <pre className="ml-8 text-gray-300">this.left = null;</pre>
              <pre className="ml-8 text-gray-300">this.right = null;</pre>
              <pre className="ml-4">&#125;</pre>
              <pre>&#125;</pre>
            </div>

            {/* Enhanced BST Operations with more detail */}
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs max-h-80 overflow-y-auto">
              <pre className="text-yellow-400 mb-2">// BST Insert with Step-by-Step Logic</pre>
              <pre className="text-blue-300">insert(root, value) &#123;</pre>
              <pre className="ml-2 text-cyan-300">// Step 1: Base case - empty spot found</pre>
              <pre className="ml-2 text-gray-300">if (!root) return new TreeNode(value);</pre>
              <pre className="ml-2 text-cyan-300">// Step 2: Compare and recurse</pre>
              <pre className="ml-2 text-gray-300">if (value &lt; root.value)</pre>
              <pre className="ml-4 text-gray-300">root.left = insert(root.left, value);</pre>
              <pre className="ml-2 text-gray-300">else if (value &gt; root.value)</pre>
              <pre className="ml-4 text-gray-300">root.right = insert(root.right, value);</pre>
              <pre className="ml-2 text-gray-300">return root; // Return updated root</pre>
              <pre>&#125;</pre>
              <pre></pre>
              <pre className="text-yellow-400">// BST Delete - Three Cases</pre>
              <pre className="text-blue-300">delete(root, value) &#123;</pre>
              <pre className="ml-2 text-gray-300">if (!root) return null;</pre>
              <pre className="ml-2 text-cyan-300">// Navigate to node</pre>
              <pre className="ml-2 text-gray-300">if (value &lt; root.value)</pre>
              <pre className="ml-4 text-gray-300">root.left = delete(root.left, value);</pre>
              <pre className="ml-2 text-gray-300">else if (value &gt; root.value)</pre>
              <pre className="ml-4 text-gray-300">root.right = delete(root.right, value);</pre>
              <pre className="ml-2 text-gray-300">else &#123; // Node found</pre>
              <pre className="ml-4 text-cyan-300">// Case 1: Leaf node</pre>
              <pre className="ml-4 text-gray-300">if (!root.left && !root.right) return null;</pre>
              <pre className="ml-4 text-cyan-300">// Case 2: One child</pre>
              <pre className="ml-4 text-gray-300">if (!root.left) return root.right;</pre>
              <pre className="ml-4 text-gray-300">if (!root.right) return root.left;</pre>
              <pre className="ml-4 text-cyan-300">// Case 3: Two children - find successor</pre>
              <pre className="ml-4 text-gray-300">const successor = findMin(root.right);</pre>
              <pre className="ml-4 text-gray-300">root.value = successor.value;</pre>
              <pre className="ml-4 text-gray-300">root.right = delete(root.right, successor.value);</pre>
              <pre className="ml-2 text-gray-300">&#125;</pre>
              <pre className="ml-2 text-gray-300">return root;</pre>
              <pre>&#125;</pre>
              <pre></pre>
              <pre className="text-yellow-400">// In-Order Traversal (Left-Root-Right)</pre>
              <pre className="text-blue-300">inOrder(root) &#123;</pre>
              <pre className="ml-2 text-gray-300">if (root) &#123;</pre>
              <pre className="ml-4 text-cyan-300">inOrder(root.left);   // Visit left subtree</pre>
              <pre className="ml-4 text-cyan-300">visit(root);          // Process current node</pre>
              <pre className="ml-4 text-cyan-300">inOrder(root.right);  // Visit right subtree</pre>
              <pre className="ml-2 text-gray-300">&#125;</pre>
              <pre>&#125; // Result: Sorted sequence!</pre>
            </div>

            {/* Key Properties */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-200">BST Properties:</h3>
              
              <div className="bg-blue-900 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-300">Ordering Property</h4>
                <p className="text-blue-200 text-sm">Left subtree values &lt; Root &lt; Right subtree values</p>
              </div>
              
              <div className="bg-green-900 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-300">Efficient Operations</h4>
                <p className="text-green-200 text-sm">Average O(log n) search, insert, delete</p>
              </div>
              
              <div className="bg-purple-900 p-4 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-300">In-Order Traversal</h4>
                <p className="text-purple-200 text-sm">Gives sorted sequence of values</p>
              </div>
            </div>

            {/* Traversal Types */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-gray-200 mb-2">Traversal Types:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <span className="text-indigo-400">In-Order:</span> Left → Root → Right (sorted)</li>
                <li>• <span className="text-indigo-400">Pre-Order:</span> Root → Left → Right (copy tree)</li>
                <li>• <span className="text-indigo-400">Post-Order:</span> Left → Right → Root (delete tree)</li>
              </ul>
            </div>

            {/* Real-time Explanation */}
            {explanation && (
              <div className="bg-yellow-900 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-300">What's Happening:</h4>
                <p className="text-yellow-200 text-sm">{explanation}</p>
              </div>
            )}

            {/* Use Cases */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-gray-200 mb-2">Common Use Cases:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Database indexing</li>
                <li>• Expression parsing</li>
                <li>• File system directories</li>
                <li>• Priority queues (heap)</li>
                <li>• Decision trees</li>
                <li>• Autocomplete systems</li>
              </ul>
            </div>

            {/* Time Complexities */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-gray-200 mb-2">Time Complexity:</h4>
              <ul className="text-sm text-gray-300 space-y-1 font-mono">
                <li>• Search: O(log n) avg, O(n) worst</li>
                <li>• Insert: O(log n) avg, O(n) worst</li>
                <li>• Delete: O(log n) avg, O(n) worst</li>
                <li>• Traversal: O(n)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeVisualization;
