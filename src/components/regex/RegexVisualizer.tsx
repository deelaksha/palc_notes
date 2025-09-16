'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

export function RegexVisualizer({
  initialPattern = 'a',
  initialText = 'The quick brown fox jumps over the lazy dog. aaa',
  onPatternChange,
  onTextChange,
}: {
  initialPattern?: string;
  initialText?: string;
  onPatternChange?: (pattern: string) => void;
  onTextChange?: (text: string) => void;
}) {
  const [pattern, setPattern] = useState(initialPattern);
  const [text, setText] = useState(initialText);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPattern(initialPattern);
  }, [initialPattern]);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const runRegex = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMatches([]);
    setProgress(0);

    const textToSearch = text.split('');
    const charElements = Array.from(
      containerRef.current?.querySelectorAll('.animated-char') as NodeListOf<HTMLSpanElement>
    );

    if (!charElements) {
        setIsAnimating(false);
        return;
    };
    
    let regex;
    try {
        regex = new RegExp(pattern, 'g');
    } catch(e) {
        console.error("Invalid Regex:", e);
        setIsAnimating(false);
        return;
    }
    
    // Find all matches first
    const allMatches = [...text.matchAll(regex)];
    let currentMatchIndex = 0;

    for (let i = 0; i < textToSearch.length; i++) {
        const charEl = charElements[i];
        if (charEl) {
            charEl.classList.add('active');
            await new Promise(resolve => setTimeout(resolve, 25));
            charEl.classList.remove('active');
        }

        const match = allMatches[currentMatchIndex];
        if (match && i === match.index) {
            const matchText = match[0];
            const matchElements = charElements.slice(i, i + matchText.length);

            matchElements.forEach(el => {
                el.classList.add('match');
                el.style.animation = 'pulse-once 0.7s forwards';
            });
            
            const newMatch = { text: matchText, key: Date.now() + Math.random() };
            setMatches(prev => [...prev, newMatch]);

            await new Promise(resolve => setTimeout(resolve, 700));

            matchElements.forEach(el => {
                el.classList.remove('match');
                el.style.animation = '';
            });

            currentMatchIndex++;
            i += matchText.length - 1; // Skip ahead
        }

        setProgress(((i + 1) / textToSearch.length) * 100);
    }
    setIsAnimating(false);
  }, [isAnimating, pattern, text]);

  useEffect(() => {
    if (pattern && text) {
        runRegex();
    }
  }, [pattern, text, runRegex]);

  return (
    <div
      ref={containerRef}
      className="relative container max-w-4xl w-full mx-auto p-8 rounded-3xl bg-dark-secondary/80 backdrop-blur-2xl border-2 border-white/10 shadow-2xl flex flex-col gap-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-pink">
            Regex Visualizer
          </span>
        </h1>
        <p className="text-gray-400">Watch the engine find matches in real-time.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <label htmlFor="regex-input" className="block text-sm font-medium text-gray-400 mb-2">
            Regular Expression
          </label>
          <Input
            type="text"
            id="regex-input"
            placeholder="/your-pattern/g"
            value={pattern}
            onChange={(e) => {
              setPattern(e.target.value)
              if (onPatternChange) onPatternChange(e.target.value);
            }}
            className="w-full bg-transparent border-b-2 border-neon-blue focus:outline-none focus:border-neon-green p-2 text-lg text-white font-mono"
            disabled={isAnimating}
          />
        </div>
        <Button
          onClick={runRegex}
          disabled={isAnimating}
          className="w-full md:w-auto px-6 py-3 mt-4 md:mt-0 font-bold text-lg rounded-full bg-neon-blue text-dark-primary hover:bg-neon-green transition-colors duration-300"
        >
          {isAnimating ? 'Running...' : 'Run Regex'}
        </Button>
      </div>

      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-400 mb-2">
            Test String
        </label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => {
              setText(e.target.value);
              if (onTextChange) onTextChange(e.target.value);
          }}
          className="w-full bg-white/5 p-4 rounded-xl text-lg font-mono leading-loose min-h-[150px]"
          disabled={isAnimating}
        />
      </div>

       <div className="animated-text-container">
            {text.split('').map((char, index) => (
                <span key={index} className="animated-char">
                    {char === ' ' ? '\\u00A0' : char}
                </span>
            ))}
        </div>

      <div className="text-center">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Total Matches:</span>
          <span id="match-count" className="text-3xl font-bold text-neon-green">
            {matches.length}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-neon-green"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>

      <div className="matches-container relative overflow-hidden">
        <p className="text-gray-400 mb-2">Found Matches:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {matches.map((match) => (
            <motion.span
                key={match.key}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-neon-green text-lg font-bold bg-green-500/10 py-1 px-3 rounded-md"
            >
              {match.text}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
