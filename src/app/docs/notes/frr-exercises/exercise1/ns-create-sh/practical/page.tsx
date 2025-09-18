
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const NetworkNamespaceVisualizer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [step, setStep] = useState(0);
    const [explanation, setExplanation] = useState("Press 'Start Animation' to see how the bash script works.");
    const [command, setCommand] = useState("");
    const animationFrameId = useRef<number>();

    const explanationText = [
        "Ready to begin! Press 'Start Animation' to see how the bash script works.",
        "Step 1: The script creates two separate virtual computers, called 'network namespaces'. They are isolated from your main network.",
        "Step 2: A 'veth pair' is created. Think of this as a virtual network cable with two ends: v1-arms and v2-arms.",
        "Step 3: Each virtual computer is given its own 'phone number' (IP address) so they can find and talk to each other.",
        "Step 4: Now, one computer sends a 'ping' message to the other to see if the connection works.",
        "Step 5: The other computer gets the message and sends a 'reply'. This shows the connection is a success!",
        "Animation Complete! You've successfully built a virtual network. You can now reset and watch again."
    ];

    const commandText = [
        "",
        "sudo ip netns add h1-arms; sudo ip netns add h2-arms",
        "sudo ip link add v1-arms type veth peer name v2-arms",
        "sudo ip -n h1-arms addr add 10.0.0.1/24 dev v1-arms; sudo ip -n h2-arms addr add 10.0.0.2/24 dev v2-arms",
        "ping 10.0.0.2",
        "Received reply from 10.0.0.1",
        ""
    ];

    // --- Drawing Functions ---
    const drawBox = (ctx: CanvasRenderingContext2D, x: number, y: number, name: string, color: string, boxWidth: number, boxHeight: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, boxWidth, boxHeight);
        
        ctx.fillStyle = color;
        ctx.font = '16px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(name, x + boxWidth / 2, y + boxHeight + 25);
    };

    const drawVeth = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        ctx.fillStyle = color;
        ctx.font = '12px "Press Start 2P"';
        ctx.textAlign = 'right';
        ctx.fillText("v1-arms", (x1 + x2) / 2 - 10, (y1 + y2) / 2 - 10);
        ctx.textAlign = 'left';
        ctx.fillText("v2-arms", (x1 + x2) / 2 + 10, (y1 + y2) / 2 + 10);
    };

    const drawIPs = (ctx: CanvasRenderingContext2D, h1X: number, h2X: number, boxY: number, color: string, boxWidth: number, boxHeight: number) => {
        ctx.fillStyle = color;
        ctx.font = '14px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText("10.0.0.1", h1X + boxWidth / 2, boxY + boxHeight / 2);
        ctx.fillText("10.0.0.2", h2X + boxWidth / 2, boxY + boxHeight / 2);
    };
    
    const drawPing = (ctx: CanvasRenderingContext2D, progress: number, text: string, h1X: number, h2X: number, boxY: number, boxWidth: number, boxHeight: number) => {
        if (progress === 0) return;
        
        const startX = h1X + boxWidth;
        const endX = h2X;
        const x = startX + (endX - startX) * progress;
        const y = boxY + boxHeight / 2;

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.font = '12px "Press Start 2P"';
        ctx.fillText(text, x, y - 20);
    };

    // --- Animation Loop ---
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const rect = canvas.getBoundingClientRect();
        const boxWidth = 200;
        const boxHeight = 150;
        const padding = 50;

        const h1X = padding;
        const h2X = rect.width - padding - boxWidth;
        const boxY = (rect.height - boxHeight) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (step === 0) {
            ctx.fillStyle = '#ff00ff';
            ctx.font = '16px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText("Click 'Start Animation'", rect.width / 2, rect.height / 2);
            return;
        }
        
        if (step >= 1) {
            drawBox(ctx, h1X, boxY, "h1", "#ff00ff", boxWidth, boxHeight);
            drawBox(ctx, h2X, boxY, "h2", "#ff00ff", boxWidth, boxHeight);
        }
        if (step >= 2) {
            drawVeth(ctx, h1X + boxWidth, boxY + boxHeight / 2, h2X, boxY + boxHeight / 2, "#00ffff");
        }
        if (step >= 3) {
            drawIPs(ctx, h1X, h2X, boxY, "#00ffff", boxWidth, boxHeight);
        }
    }, [step]);
    
    // --- State Control ---
    useEffect(() => {
        setExplanation(explanationText[step]);
        setCommand(commandText[step]);
    }, [step]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const setCanvasSize = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                canvas.width = rect.width * window.devicePixelRatio;
                canvas.height = rect.height * window.devicePixelRatio;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                    draw();
                }
            }
        };
        
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);
        draw();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
             if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [draw]);

    const runAnimationStep = () => {
        if (step < 4) {
            setStep(s => s + 1);
        } else if (step === 4) {
             let pingProgress = 0;
             const animatePing = () => {
                 pingProgress += 0.01;
                 const canvas = canvasRef.current;
                 if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                       draw(); // Redraw background
                       const rect = canvas.getBoundingClientRect();
                        const boxWidth = 200, boxHeight = 150, padding = 50;
                        const h1X = padding;
                        const h2X = rect.width - padding - boxWidth;
                        const boxY = (rect.height - boxHeight) / 2;
                       drawPing(ctx, pingProgress, "Ping!", h1X, h2X, boxY, boxWidth, boxHeight);
                    }
                 }
                 if (pingProgress < 1) {
                     animationFrameId.current = requestAnimationFrame(animatePing);
                 } else {
                     setStep(5);
                 }
             }
             animatePing();
        } else if (step === 5) {
             let pingProgress = 0;
             const animateReply = () => {
                 pingProgress += 0.01;
                  const canvas = canvasRef.current;
                 if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        draw(); // Redraw background
                        const rect = canvas.getBoundingClientRect();
                        const boxWidth = 200, boxHeight = 150, padding = 50;
                        const h1X = padding;
                        const h2X = rect.width - padding - boxWidth;
                        const boxY = (rect.height - boxHeight) / 2;
                       drawPing(ctx, 1 - pingProgress, "Reply!", h1X, h2X, boxY, boxWidth, boxHeight);
                    }
                 }
                 if (pingProgress < 1) {
                     animationFrameId.current = requestAnimationFrame(animateReply);
                 } else {
                     setStep(6);
                 }
             }
             animateReply();
        }
    };
    
    useEffect(draw, [draw]);


    const resetAnimation = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        setStep(0);
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
                    {step < 6 && <Button onClick={runAnimationStep} className="bg-primary hover:bg-primary/90">Start/Next</Button>}
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

    