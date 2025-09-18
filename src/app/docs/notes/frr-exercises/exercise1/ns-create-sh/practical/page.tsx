
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const NetworkNamespaceVisualizer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [step, setStep] = useState(0);
    const [explanation, setExplanation] = useState("Press Start to begin...");
    const [command, setCommand] = useState("");
    const animationFrameId = useRef<number>();

    const explanationText = [
        "Ready to begin! Press 'Start Animation' to see how the bash script works.",
        "Step 1: The script creates two separate virtual computers, called 'network namespaces'. They are isolated from your main network.",
        "Step 2: A 'veth pair' is created. Think of this as a virtual network cable with two ends. One end is put into each virtual computer.",
        "Step 3: Each virtual computer is given its own 'phone number' (IP address) so they can find and talk to each other.",
        "Step 4: Now, one computer sends a 'ping' message to the other to see if the connection works.",
        "Step 5: The other computer gets the message and sends a 'reply'. This shows the connection is a success!",
        "Animation Complete! You've successfully built a virtual network. You can now reset and watch again."
    ];

    const commandText = [
        "",
        "sudo ip netns add h1-arms; sudo ip netns add h2-arms",
        "sudo ip link add v1-arms type veth peer name v2-arms",
        "sudo ip -n h1-arms addr add 10.0.0.1/24 dev v1-arms",
        "ping 10.0.0.2",
        "Received reply from 10.0.0.1",
        ""
    ];

    const drawInitialState = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        h1X = padding;
        h2X = rect.width - padding - boxWidth;
        boxY = (rect.height - boxHeight) / 2;
        
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff00ff';
        ctx.font = '16px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText("Click 'Start Animation'", canvas.width / (2 * window.devicePixelRatio), canvas.height / (2* window.devicePixelRatio));
    }, []);

    // --- Animation Variables ---
    const padding = 50;
    const boxWidth = 200;
    const boxHeight = 150;
    let h1X: number, h2X: number, boxY: number;

    const animatePing = useCallback((isReply: boolean) => {
        let pingProgress = 0;
        const pingInterval = setInterval(() => {
            pingProgress += 0.01;
            if (pingProgress >= 1) {
                clearInterval(pingInterval);
                if (!isReply) {
                    setStep(5);
                } else {
                    setStep(6);
                }
            }
        }, 10);
    }, []);
    
    useEffect(() => {
        if(step === 5) {
            animatePing(true);
        }
    }, [step, animatePing]);


    useEffect(() => {
        setExplanation(explanationText[step]);
        setCommand(commandText[step]);
    }, [step]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setCanvasSize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            drawInitialState();
        };
        
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [drawInitialState]);

    const startAnimation = () => {
        if(step === 0) {
            setStep(1);
        } else if (step > 0 && step < 4) {
            setStep(s => s + 1);
        } else if (step === 4) {
            animatePing(false);
        }
    };

    const resetAnimation = () => {
        setStep(0);
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        drawInitialState();
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise1/ns-create-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                <h1 className="text-2xl font-bold text-center text-primary font-mono">Network Namespace Visualizer</h1>
                <canvas ref={canvasRef} id="animationCanvas" className="w-full h-96 bg-[#1e1e1e] border-2 border-primary rounded-lg"></canvas>
                <div className="flex justify-center gap-4">
                    {step < 6 && <Button onClick={startAnimation} className="bg-primary hover:bg-primary/90">Start/Next</Button>}
                    <Button onClick={resetAnimation} variant="outline">Reset</Button>
                </div>
                <div className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                    {explanation}
                </div>
                <div className="bg-card-nested text-yellow-400 font-mono p-4 rounded-lg border border-secondary text-center min-h-[2rem] flex items-center justify-center">
                    {command}
                </div>
            </div>
        </div>
    );
};

export default NetworkNamespaceVisualizer;
