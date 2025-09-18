
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const RCreateVisualizer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [step, setStep] = useState(0);
    const [explanation, setExplanation] = useState("Press 'Start Animation' to see how the bash script works.");
    const [command, setCommand] = useState("");
    let animationFrameId: number | undefined;

    const explanationText = [
        "Ready to begin! This script creates 3 hosts connected to a central bridge.",
        "Step 1: Create three isolated network namespaces (h1, h2, h3).",
        "Step 2: Create a virtual network switch, called a 'bridge'.",
        "Step 3: Create a virtual cable (veth pair) for Host 1 and connect one end to h1 and the other to the bridge.",
        "Step 4: Create a second veth pair for Host 2 and connect it.",
        "Step 5: Create a third veth pair for Host 3 and connect it.",
        "Step 6: Assign IP addresses to each host so they can communicate over the bridge.",
        "Animation Complete! You've built a virtual LAN."
    ];

    const commandText = [
        "",
        "sudo ip netns add h1-arms\nsudo ip netns add h2-arms\nsudo ip netns add h3-arms",
        "sudo ip link add br0-arms type bridge\nsudo ip link set br0-arms up",
        "sudo ip link add v1 type veth peer name v1p\nsudo ip link set v1 netns h1-arms\nsudo ip link set v1p master br0-arms",
        "sudo ip link add v2 type veth peer name v2p\nsudo ip link set v2 netns h2-arms\nsudo ip link set v2p master br0-arms",
        "sudo ip link add v3 type veth peer name v3p\nsudo ip link set v3 netns h3-arms\nsudo ip link set v3p master br0-arms",
        "sudo ip -n h1-arms addr add 10.0.0.1/24 dev v1\nsudo ip -n h2-arms addr add 10.0.0.2/24 dev v2\nsudo ip -n h3-arms addr add 10.0.0.3/24 dev v3",
        ""
    ];

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const drawNode = (x: number, y: number, name: string, ip: string, color: string, isActive: boolean) => {
            ctx.strokeStyle = isActive ? color : '#555';
            ctx.fillStyle = isActive ? color : '#555';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = '12px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText(name, x, y + 45);
            if (ip) {
                 ctx.font = '10px "Press Start 2P"';
                 ctx.fillText(ip, x, y + 60);
            }
        };
        
        const drawBridge = (x: number, y: number, name: string, isActive: boolean) => {
            ctx.strokeStyle = isActive ? '#00ffff' : '#555';
            ctx.fillStyle = isActive ? '#00ffff' : '#555';
            ctx.lineWidth = 3;
            ctx.strokeRect(x - 40, y - 20, 80, 40);
             ctx.font = '12px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText(name, x, y + 35);
        };
        
        const drawLine = (x1: number, y1: number, x2: number, y2: number, isActive: boolean) => {
            ctx.strokeStyle = isActive ? '#fff' : '#555';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        };

        const h1Pos = { x: centerX, y: centerY - 120 };
        const h2Pos = { x: centerX - 150, y: centerY + 60 };
        const h3Pos = { x: centerX + 150, y: centerY + 60 };
        const bridgePos = { x: centerX, y: centerY };

        // Draw based on step
        drawNode(h1Pos.x, h1Pos.y, 'h1', step >= 6 ? '10.0.0.1' : '', '#ff00ff', step >= 1);
        drawNode(h2Pos.x, h2Pos.y, 'h2', step >= 6 ? '10.0.0.2' : '', '#ff00ff', step >= 1);
        drawNode(h3Pos.x, h3Pos.y, 'h3', step >= 6 ? '10.0.0.3' : '', '#ff00ff', step >= 1);
        
        drawBridge(bridgePos.x, bridgePos.y, 'br0', step >= 2);

        drawLine(h1Pos.x, h1Pos.y, bridgePos.x, bridgePos.y, step >= 3);
        drawLine(h2Pos.x, h2Pos.y, bridgePos.x, bridgePos.y, step >= 4);
        drawLine(h3Pos.x, h3Pos.y, bridgePos.x, bridgePos.y, step >= 5);
        

    }, [step]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const setCanvasSize = () => {
            const rect = canvas.parentElement!.getBoundingClientRect();
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

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);
    
    useEffect(() => {
        setExplanation(explanationText[step]);
        setCommand(commandText[step]);
        draw();
    }, [step, draw]);

    const handleNextStep = () => {
        if (step < explanationText.length - 1) {
            setStep(s => s + 1);
        }
    };
    
    const resetAnimation = () => {
        setStep(0);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/notes/frr-exercises/exercise2/r-create-sh">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border space-y-6">
                 <div className="title-text" style={{ fontFamily: "'Press Start 2P', cursive", color: '#ff00ff', textAlign: 'center', fontSize: '1.25rem' }}>3-Host Bridge Visualizer</div>
                <canvas ref={canvasRef} id="animationCanvas" className="w-full h-96 bg-[#1e1e1e] border-2 border-primary rounded-lg"></canvas>
                <div className="flex justify-center gap-4">
                    {step < explanationText.length - 1 && <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90">Start/Next</Button>}
                    <Button onClick={resetAnimation} variant="outline">Reset</Button>
                </div>
                 <div id="explanation" className="bg-card-nested text-accent font-mono p-4 rounded-lg border border-secondary text-center min-h-[4rem] flex items-center justify-center">
                    {explanation}
                </div>
                <div id="command" className="bg-card-nested text-yellow-400 font-mono p-4 rounded-lg border border-secondary min-h-[4rem] flex items-center justify-center whitespace-pre-wrap">
                    {command}
                </div>
            </div>
        </div>
    );
};

export default RCreateVisualizer;
