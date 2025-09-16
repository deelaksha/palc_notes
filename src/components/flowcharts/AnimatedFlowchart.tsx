
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type FlowchartProps } from './types';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: i * 0.2,
    },
  }),
};

const edgeVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 1, bounce: 0 },
        opacity: { duration: 0.01 },
        delay: i * 0.3 + 0.5,
      },
    }),
};

const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.3 + 0.8,
      },
    }),
};

export const AnimatedFlowchart: React.FC<FlowchartProps> = ({ nodes, edges, steps }) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [key, setKey] = React.useState(0); // Key to force re-render for restart

    const handleRestart = () => {
        setKey(prevKey => prevKey + 1);
        setCurrentStep(0);
    };

    React.useEffect(() => {
        if (currentStep < steps.length) {
            const timer = setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, 2000); // 2 seconds per step
            return () => clearTimeout(timer);
        }
    }, [currentStep, steps.length, key]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl" key={key}>
        <div className="w-full p-4 rounded-lg bg-card-nested text-center min-h-[60px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="prose prose-sm dark:prose-invert"
                >
                    <ReactMarkdown>{steps[currentStep] || "Animation complete!"}</ReactMarkdown>
                </motion.div>
            </AnimatePresence>
        </div>
      <svg width="100%" height="200" viewBox="0 0 750 150" className="overflow-visible">
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
          </marker>
        </defs>

        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          
          const isVisible = (currentStep > i);

          return (
            <g key={edge.from + edge.to}>
              <motion.path
                d={`M ${fromNode.position.x + 125} ${fromNode.position.y + 25} L ${toNode.position.x - 5} ${toNode.position.y + 25}`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                custom={i}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={edgeVariants}
              />
               <motion.text
                    x={(fromNode.position.x + 125 + toNode.position.x - 5) / 2}
                    y={fromNode.position.y}
                    textAnchor="middle"
                    fill="hsl(var(--foreground))"
                    fontSize="12"
                    className="font-code"
                    custom={i}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={textVariants}
                >
                    {edge.label}
                </motion.text>
            </g>
          );
        })}
      </svg>
      <div className="flex w-full justify-between">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            custom={i}
            initial="hidden"
            animate={(currentStep >= i) ? "visible" : "hidden"}
            variants={nodeVariants}
            className="w-[120px] h-[50px] bg-card border-2 border-primary-accent rounded-lg flex items-center justify-center p-2 text-center text-sm font-semibold"
          >
            {node.label}
          </motion.div>
        ))}
      </div>
      <Button onClick={handleRestart} variant="outline" size="sm">
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart Animation
      </Button>
    </div>
  );
};
