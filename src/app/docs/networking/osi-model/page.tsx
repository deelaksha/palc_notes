
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Layers, Play, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const layersData = [
  { name: 'Application', color: 'bg-red-500', description: 'Provides network services directly to users. Protocols: HTTP, FTP, SMTP, DNS.' },
  { name: 'Presentation', color: 'bg-orange-500', description: 'Formats and encrypts data. Handles syntax, encryption, and compression.' },
  { name: 'Session', color: 'bg-yellow-500', description: 'Manages sessions between applications. Start, control, and end connections.' },
  { name: 'Transport', color: 'bg-green-500', description: 'Reliable data delivery, flow control, and error correction. Protocols: TCP, UDP.' },
  { name: 'Network', color: 'bg-blue-500', description: 'Handles routing, addressing, and packet forwarding. Protocols: IP, ICMP.' },
  { name: 'Data Link', color: 'bg-indigo-500', description: 'Manages error detection, framing, and MAC addressing. Protocols: Ethernet, PPP.' },
  { name: 'Physical', color: 'bg-purple-500', description: 'Transmission of raw bits over a physical medium (cables, wireless).' },
];

const animationSteps = [
    { from: 'Sender', to: 'Sender', layer: 0, text: 'User data is created at the Application Layer.' },
    { from: 'Sender', to: 'Sender', layer: 1, text: 'Presentation Layer formats and encrypts the data.' },
    { from: 'Sender', to: 'Sender', layer: 2, text: 'Session Layer establishes a connection.' },
    { from: 'Sender', to: 'Sender', layer: 3, text: 'Transport Layer segments the data and adds TCP headers.' },
    { from: 'Sender', to: 'Sender', layer: 4, text: 'Network Layer adds IP headers for routing (Packet).' },
    { from: 'Sender', to: 'Sender', layer: 5, text: 'Data Link Layer adds MAC headers (Frame).' },
    { from: 'Sender', to: 'Sender', layer: 6, text: 'Physical Layer converts the frame into bits for transmission.' },
    { from: 'Sender', to: 'Receiver', layer: 6, text: 'Bits are transmitted over the physical medium.' },
    { from: 'Receiver', to: 'Receiver', layer: 5, text: 'Data Link Layer reassembles bits into a frame and checks MAC address.' },
    { from: 'Receiver', to: 'Receiver', layer: 4, text: 'Network Layer checks IP address and routes the packet.' },
    { from: 'Receiver', to: 'Receiver', layer: 3, text: 'Transport Layer reassembles segments and ensures reliability.' },
    { from: 'Receiver', to: 'Receiver', layer: 2, text: 'Session Layer manages the ongoing session.' },
    { from: 'Receiver', to: 'Receiver', layer: 1, text: 'Presentation Layer decrypts and formats the data.' },
    { from: 'Receiver', to: 'Receiver', layer: 0, text: 'Application Layer presents the data to the receiving application.' },
];


function OSIModelAnimation() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentStep(0);
  };
  
  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(-1);
  };

  useEffect(() => {
    if (isAnimating && currentStep < animationSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep === animationSteps.length - 1) {
        setIsAnimating(false);
    }
  }, [currentStep, isAnimating]);

  const activeStep = currentStep >= 0 ? animationSteps[currentStep] : null;

  return (
     <Card className="bg-card-nested">
        <CardHeader>
            <CardTitle>OSI Data Flow Animation</CardTitle>
            <CardDescription>Watch how data is encapsulated and de-encapsulated as it travels through the OSI model.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex justify-center gap-4 mb-6">
                <Button onClick={startAnimation} disabled={isAnimating && currentStep >= 0}>
                    <Play className="mr-2 h-4 w-4" /> Start Animation
                </Button>
                 <Button onClick={resetAnimation} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center text-center font-mono">
                {/* Sender */}
                <div>
                    <h3 className="font-headline font-bold text-lg mb-4">Sender</h3>
                    <div className="space-y-1 relative">
                        {layersData.map((layer, index) => (
                            <div key={`sender-${index}`} className={cn("p-2 rounded-md border text-sm transition-all duration-500", layer.color, activeStep?.from === 'Sender' && activeStep?.layer === index ? 'border-4 border-white shadow-lg shadow-white/30 scale-105' : 'opacity-60')}>
                                {layer.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Packet */}
                <div className="relative h-full flex items-center justify-center">
                    <AnimatePresence>
                        {activeStep && (
                             <motion.div
                                key={currentStep}
                                initial={{ 
                                    y: activeStep.layer * 40 - 120, // 40px approx height of each layer div
                                    x: activeStep.from === 'Sender' ? 0 : '100%', 
                                    opacity: 0,
                                }}
                                animate={{
                                    y: activeStep.layer * 40 - 120,
                                    x: activeStep.to === 'Sender' ? 0 : '100%',
                                    opacity: 1,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 50, damping: 10 }}
                                className="absolute w-24"
                             >
                                <div className="p-2 rounded bg-primary text-primary-foreground text-xs shadow-lg">
                                    { currentStep <= 6 && 'Data' }
                                    { currentStep >= 4 && currentStep <= 10 && ' ✉️' }
                                    { currentStep >= 5 && currentStep <= 9 && ' 🖼️' }
                                    { currentStep >= 7 && currentStep <= 7 && '0101' }
                                </div>
                             </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {/* Receiver */}
                <div>
                     <h3 className="font-headline font-bold text-lg mb-4">Receiver</h3>
                     <div className="space-y-1 relative">
                        {layersData.map((layer, index) => (
                            <div key={`receiver-${index}`} className={cn("p-2 rounded-md border text-sm transition-all duration-500", layer.color, activeStep?.to === 'Receiver' && activeStep?.layer === (layersData.length - 1 - index) ? 'border-4 border-white shadow-lg shadow-white/30 scale-105' : 'opacity-60')}>
                                {layer.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-center bg-background/50 p-4 rounded-lg min-h-[60px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p 
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="font-semibold"
                    >
                        {activeStep ? activeStep.text : 'Click "Start Animation" to begin.'}
                    </motion.p>
                </AnimatePresence>
            </div>
        </CardContent>
     </Card>
  );
}


export default function OSIModelPage() {
    return (
        <main className="flex-1 p-4 md:p-8 lg:p-12">
            <div className="max-w-5xl mx-auto">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/docs/networking">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Networking
                    </Link>
                </Button>
                <header className="text-center mb-12">
                    <Layers className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                        The OSI Model
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        A conceptual framework that standardizes the functions of a telecommunication or computing system into seven distinct layers.
                    </p>
                </header>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-headline font-bold mb-6 pb-2 border-b">Layers Explained</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {layersData.map((layer, index) => (
                                <Card key={layer.name} className="hover:border-primary transition-colors">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <span className={cn("flex items-center justify-center size-8 rounded-full text-white font-bold", layer.color)}>
                                                {7 - index}
                                            </span>
                                            {layer.name} Layer
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{layer.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                    
                    <section>
                         <h2 className="text-3xl font-headline font-bold mb-6 pb-2 border-b">Data Flow</h2>
                         <OSIModelAnimation />
                    </section>

                     <section>
                        <h2 className="text-3xl font-headline font-bold mb-6 pb-2 border-b">Use Cases</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {['Sending an Email', 'Loading a Website', 'Streaming a Video'].map(useCase => (
                                <Card key={useCase}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{useCase}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">This action involves multiple OSI layers, from the Application layer (HTTP/SMTP) down to the Physical layer for transmission.</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
