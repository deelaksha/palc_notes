
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, GitBranch, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GitInitGame() {
    const [isInitialized, setIsInitialized] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleInit = () => {
        if (isInitialized) return;
        setIsAnimating(true);
        setTimeout(() => {
            setIsInitialized(true);
            setIsAnimating(false);
        }, 1000);
    };

    const handleReset = () => {
        setIsInitialized(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 border-2 border-neon-blue/50 w-full min-h-[250px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {!isInitialized ? (
                        <motion.div
                            key="uninitialized"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-center"
                        >
                            <Folder className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-2xl font-bold">MyProject</h3>
                            <p className="text-gray-400">A regular folder</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="initialized"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-center"
                        >
                            <div className="relative">
                                <Folder className="h-16 w-16 mx-auto text-neon-green mb-4" />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.5 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute -top-2 -right-2 flex items-center gap-1 bg-neon-green/20 text-neon-green text-xs px-2 py-1 rounded-full"
                                >
                                    <GitBranch className="h-3 w-3" />
                                    <span>.git</span>
                                </motion.div>
                            </div>
                            <h3 className="text-2xl font-bold text-white">MyProject</h3>
                            <p className="text-neon-green">Is now a Git Repository!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex gap-4">
                <Button
                    onClick={handleInit}
                    disabled={isInitialized || isAnimating}
                    className="bg-neon-green text-black hover:bg-white w-48"
                >
                    <Play className="mr-2 h-4 w-4" />
                    git init
                </Button>
                <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}
