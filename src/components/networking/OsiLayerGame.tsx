
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

type OsiLayer = 'Application' | 'Presentation' | 'Session' | 'Transport' | 'Network' | 'Data Link' | 'Physical';

type GameComponentProps = {
  layer: OsiLayer;
};

const animations = {
  Application: () => {
    const [state, setState] = useState('idle');
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex gap-4 items-center">
            <motion.div animate={{ scale: state === 'request' ? 1.1 : 1 }}>👤</motion.div>
            <motion.div initial={{ width: 0 }} animate={{ width: state === 'request' ? '50px' : '0px' }} className="h-0.5 bg-neon-blue"/>
            <motion.div animate={{ scale: state === 'request' ? 1.1 : 1 }}>🌐</motion.div>
        </div>
        <p className="text-xs text-center">{state === 'request' ? 'User requests a website...' : 'HTTP, FTP, SMTP'}</p>
        <Button size="sm" onClick={() => setState('request')}>Simulate Request</Button>
      </div>
    );
  },
  Presentation: () => {
    const [text, setText] = useState('abc');
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <motion.p key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-2xl text-neon-green">{text}</motion.p>
        <Button size="sm" onClick={() => setText(text === 'abc' ? 'xyz' : 'abc')}>
          {text === 'abc' ? 'Encrypt Data' : 'Decrypt Data'}
        </Button>
      </div>
    );
  },
  Session: () => {
     const [state, setState] = useState('disconnected');
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex gap-8 items-center">
            <motion.div animate={{ y: state === 'connected' ? -10 : 0 }}>💻</motion.div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: state === 'connected' ? 1 : 0 }} className="w-16 h-1 bg-neon-green rounded-full" />
            <motion.div animate={{ y: state === 'connected' ? -10 : 0 }}>🖥️</motion.div>
        </div>
        <p className="text-xs">{state === 'connected' ? 'Session Established' : 'Session Terminated'}</p>
        <Button size="sm" onClick={() => setState(state === 'connected' ? 'disconnected' : 'connected')}>
            {state === 'connected' ? 'End Session' : 'Start Session'}
        </Button>
      </div>
    );
  },
  Transport: () => {
    const [isSegmented, setIsSegmented] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-32 h-8 bg-neon-blue/20 rounded-lg flex items-center justify-center">
                {!isSegmented ? (
                    <motion.div layoutId="data">Data</motion.div>
                ) : (
                    <div className="flex gap-1">
                        <motion.div layoutId="seg1" className="w-10 h-6 bg-neon-green/30 rounded flex items-center justify-center text-xs">TCP 1</motion.div>
                        <motion.div layoutId="seg2" className="w-10 h-6 bg-neon-green/30 rounded flex items-center justify-center text-xs">TCP 2</motion.div>
                        <motion.div layoutId="seg3" className="w-10 h-6 bg-neon-green/30 rounded flex items-center justify-center text-xs">TCP 3</motion.div>
                    </div>
                )}
            </div>
            <Button size="sm" onClick={() => setIsSegmented(!isSegmented)}>{isSegmented ? 'Reassemble' : 'Segment Data'}</Button>
        </div>
    );
  },
  Network: () => {
    const [step, setStep] = useState(0);
    const nodes = [0, 1, 2, 3];
    const path = [0, 2, 3];
    return (
         <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="relative w-48 h-16">
                {nodes.map(i => <div key={i} className="absolute w-4 h-4 bg-white/30 rounded-full" style={{ left: `${i * 30}%`, top: i % 2 === 0 ? '0' : '80%'}} />)}
                <motion.div className="absolute w-5 h-5 bg-neon-pink rounded-full"
                    initial={{ left: '0%', top: '0' }}
                    animate={{ left: `${path[step] * 30}%`, top: path[step] % 2 === 0 ? '0' : '80%' }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >IP</motion.div>
            </div>
            <Button size="sm" onClick={() => setStep(s => (s + 1) % path.length)}>Next Hop</Button>
        </div>
    );
  },
  'Data Link': () => {
    const [sent, setSent] = useState(false);
     return (
         <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="flex items-center gap-2 w-full">
                <div className="text-center w-1/3">
                    <p className="text-xs">MAC: 0A</p>
                    <p>💻</p>
                </div>
                 <div className="flex-1 relative h-4">
                    <motion.div initial={{ left: 0 }} animate={{ left: sent ? 'calc(100% - 2rem)' : 0 }} className="absolute w-8 h-4 bg-neon-green/50 text-black text-xs rounded">F</motion.div>
                </div>
                <div className="text-center w-1/3">
                    <p className="text-xs">MAC: 0B</p>
                    <p>🖥️</p>
                </div>
            </div>
            <Button size="sm" onClick={() => setSent(!sent)}>{sent ? 'Reset Frame' : 'Send Frame'}</Button>
        </div>
    );
  },
  Physical: () => {
    const bits = [0,1,1,0,1,0,0,1];
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 500);
        return () => clearInterval(interval);
    }, []);
    return (
         <div className="flex items-center justify-center h-full gap-2">
            {bits.map((bit, i) => (
                <motion.div key={i} animate={{ scale: (tick + i) % bits.length === 0 ? 1.2 : 1, opacity: (tick + i) % bits.length === 0 ? 1 : 0.5}} className="w-4 h-8 bg-neon-blue rounded-sm flex items-center justify-center">{bit}</motion.div>
            ))}
        </div>
    );
  },
};

export const OsiLayerGame: React.FC<GameComponentProps> = ({ layer }) => {
  const AnimationComponent = animations[layer];

  return (
    <Card className="h-full bg-card-nested border-primary/20">
      <CardContent className="p-4 h-full flex items-center justify-center">
        <AnimationComponent />
      </CardContent>
    </Card>
  );
};
