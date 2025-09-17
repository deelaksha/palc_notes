
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const WgetGame = () => {
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isDownloading && progress < 100) {
            interval = setInterval(() => {
                setProgress(p => Math.min(100, p + Math.random() * 10));
            }, 300);
        } else if (progress >= 100) {
            setIsDownloading(false);
        }
        return () => clearInterval(interval);
    }, [isDownloading, progress]);
    
    const startDownload = () => {
        setProgress(0);
        setIsDownloading(true);
    };

    return (
        <div className="w-full max-w-md mx-auto">
             <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50 text-center">
                <h2 className="text-xl font-bold text-neon-blue mb-4 flex items-center justify-center gap-2"><Download/> `wget` Simulator</h2>
                <Button onClick={startDownload} disabled={isDownloading} className="mb-4">
                    wget large_file.zip
                </Button>
                <div className="font-mono text-xs text-left bg-dark-primary p-4 rounded-lg">
                    <p>--{new Date().toLocaleTimeString()}--  https://example.com/large_file.zip</p>
                    <p>Resolving example.com... 93.184.216.34</p>
                    <p>Connecting to example.com|93.184.216.34|:443... connected.</p>
                    <p>HTTP request sent, awaiting response... 200 OK</p>
                    <p>Length: 102400 (100K) [application/zip]</p>
                    <p>Saving to: ‘large_file.zip’</p>
                    <div className="mt-2">
                        <Progress value={progress}/>
                        <div className="flex justify-between mt-1">
                            <span>{progress.toFixed(0)}%</span>
                            <span>100K</span>
                        </div>
                    </div>
                     {progress >= 100 && <p className="text-neon-green mt-2">`large_file.zip` saved.</p>}
                </div>
            </div>
        </div>
    );
};

export { WgetGame };
