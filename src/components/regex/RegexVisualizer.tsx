
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const textToSearch = "The quick brown fox jumps over the lazy dog. aaa".split('');

export function RegexVisualizer() {
    const [regexChar, setRegexChar] = useState('a');
    const [isAnimating, setIsAnimating] = useState(false);
    const [matches, setMatches] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    const textContentRef = useRef<HTMLDivElement>(null);
    const matchesDisplayRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const runRegex = async () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setMatches([]);
        setProgress(0);

        const charElements = textContentRef.current?.querySelectorAll('.animated-char') as NodeListOf<HTMLSpanElement>;
        if (!charElements) return;

        let foundMatches: string[] = [];

        for (let i = 0; i < textToSearch.length; i++) {
            const char = textToSearch[i];
            const charEl = charElements[i];

            charEl.classList.add('active');
            await new Promise(resolve => setTimeout(resolve, 50));
            charEl.classList.remove('active');

            if (char.toLowerCase() === regexChar.toLowerCase()) {
                charEl.classList.add('match');
                charEl.style.animation = 'pulse-once 1s forwards';

                foundMatches.push(char);
                setMatches([...foundMatches]);
                
                // Animate character flying to matches area
                if (containerRef.current) {
                    const sourceRect = charEl.getBoundingClientRect();
                    const containerRect = containerRef.current.getBoundingClientRect();

                    const flyingChar = document.createElement('div');
                    flyingChar.textContent = char;
                    flyingChar.className = 'flying-char absolute text-lg font-bold text-neon-green z-50 pointer-events-none';
                    flyingChar.style.left = `${sourceRect.left - containerRect.left}px`;
                    flyingChar.style.top = `${sourceRect.top - containerRect.top}px`;
                    containerRef.current.appendChild(flyingChar);

                    const matchEl = matchesDisplayRef.current?.lastElementChild;
                    if(matchEl) {
                        const finalRect = matchEl.getBoundingClientRect();
                        
                        flyingChar.style.transition = 'transform 1s ease-in-out, opacity 0.8s ease-in-out';
                        flyingChar.style.transform = `translate(${finalRect.left - sourceRect.left}px, ${finalRect.top - sourceRect.top}px)`;

                        await new Promise(resolve => setTimeout(resolve, 1000));
                        flyingChar.remove();

                         // Animate confetti effect on match
                        for (let j = 0; j < 5; j++) {
                            const confetti = document.createElement('div');
                            confetti.className = 'confetti absolute w-2 h-2 rounded-full';
                             confetti.style.backgroundColor = '#ff006e';
                            confetti.style.left = `${finalRect.left - containerRect.left + finalRect.width / 2}px`;
                            confetti.style.top = `${finalRect.top - containerRect.top + finalRect.height / 2}px`;
                            confetti.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
                            confetti.style.animation = 'confetti-fall 2s ease-out forwards';
                            containerRef.current.appendChild(confetti);
                            setTimeout(() => confetti.remove(), 2000);
                        }
                    }
                }
            }

            setProgress(((i + 1) / textToSearch.length) * 100);
             charEl.addEventListener('animationend', () => {
                charEl.classList.remove('match');
                charEl.style.animation = '';
            }, { once: true });
        }

        setIsAnimating(false);
    };

    useEffect(() => {
        // Auto-animate on page load
        setTimeout(runRegex, 500);
    }, []);

    return (
        <div ref={containerRef} className="relative container max-w-4xl w-full mx-auto p-8 rounded-3xl bg-dark-secondary/80 backdrop-blur-2xl border-2 border-white/10 shadow-2xl flex flex-col gap-8">
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
                    <label htmlFor="regex-input" className="block text-sm font-medium text-gray-400 mb-2">Enter a single character to match:</label>
                    <Input
                        type="text"
                        id="regex-input"
                        maxLength={1}
                        placeholder="e.g., a, o, s"
                        value={regexChar}
                        onChange={(e) => setRegexChar(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-neon-blue focus:outline-none focus:border-neon-green p-2 text-lg text-white"
                        disabled={isAnimating}
                    />
                </div>
                <Button onClick={runRegex} disabled={isAnimating} className="w-full md:w-auto px-6 py-3 mt-4 md:mt-0 font-bold text-lg rounded-full bg-neon-blue text-dark-primary hover:bg-neon-green transition-colors duration-300">
                    Run Regex
                </Button>
            </div>

            <div ref={textContentRef} className="animated-text-container text-2xl font-medium leading-loose min-h-[150px] text-left p-4 bg-white/5 rounded-xl">
                {textToSearch.map((char, index) => (
                    <span key={index} className="animated-char inline-block transition-all duration-200" data-index={index}>
                        {char}
                    </span>
                ))}
            </div>

            <div className="text-center">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Total Matches:</span>
                    <span id="match-count" className="text-3xl font-bold text-neon-green">{matches.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div id="progress-bar" className="h-full bg-neon-green transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div ref={matchesDisplayRef} className="matches-container min-h-[50px] p-4 bg-white/5 rounded-xl text-center relative overflow-hidden">
                <p className="text-gray-400 mb-2">Found Characters:</p>
                <div id="matches-display" className="flex flex-wrap gap-2 justify-center">
                    {matches.map((match, index) => (
                        <span key={index} className="text-neon-green text-2xl font-bold">{match}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add some styles that might not be covered by Tailwind config
const GlobalRegexStyles = () => (
  <style jsx global>{`
    .animated-char {
        display: inline-block;
        transition: all 0.2s ease-in-out;
        transform-origin: bottom;
    }
    .animated-char.active {
        color: #00f3ff;
        transform: scale(1.2) translateY(-5px);
    }
    .animated-char.match {
        color: #00ff41;
        font-weight: 700;
    }
    .flying-char {
        /* Handled in component */
    }
    .confetti {
        /* Handled in component */
    }
  `}</style>
);
