
'use client';

import React, { useState, useEffect, useRef } from 'react';

const commitMessages = [
    '🐛 Fix critical bug',
    '✨ Add new feature',
    '📚 Update documentation',
    '🔧 Refactor code',
    '🎨 Improve UI design',
    '⚡ Performance boost',
    '🔒 Security patch',
    '🧪 Add unit tests',
    '🌐 API integration',
    '📱 Mobile responsive',
    '🚀 Deploy updates',
    '💡 Code optimization',
    '🔥 Hot fix',
    '📊 Analytics setup',
    '🛡️ Error handling'
];

const Commit = ({ message, index }: { message: string, index: number }) => (
    <div 
        className="bg-white/5 p-4 rounded-xl border-l-4 border-neon-blue transition-all duration-300 cursor-pointer hover:bg-white/10 hover:translate-x-2 hover:shadow-lg hover:shadow-neon-blue/20 relative overflow-hidden shimmer"
        style={{ animationDelay: `${index * 0.1}s` }}
    >
        {message}
    </div>
);

const FlyingCommit = ({ message, fromRect, toRect }: { message: string, fromRect?: DOMRect, toRect?: DOMRect }) => {
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        if (fromRect) {
            setStyle({
                left: `${fromRect.left + fromRect.width / 2}px`,
                top: `${fromRect.top + fromRect.height / 2}px`,
                transform: 'translate(-50%, -50%)',
            });
        }

        const timeout = setTimeout(() => {
            if (toRect) {
                setStyle({
                    left: `${toRect.left + toRect.width / 2}px`,
                    top: `${toRect.top + toRect.height / 2}px`,
                    transform: 'translate(-50%, -50%)',
                });
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [fromRect, toRect]);

    return (
        <div className="flying-commit text-white font-semibold py-3 px-6 rounded-full shadow-2xl text-sm" style={style}>
            {message}
        </div>
    );
};


export function GitSyncGame({ commandName }: { commandName: string }) {
    const [localCommits, setLocalCommits] = useState(['📝 Initial commit']);
    const [remoteCommits, setRemoteCommits] = useState(['📝 Initial commit']);
    const [commitCounter, setCommitCounter] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [stats, setStats] = useState({ pushCount: 0, pullCount: 0 });
    const [statusMessage, setStatusMessage] = useState('Ready to start your Git journey! Click "Generate" to begin.');
    const [syncStatus, setSyncStatus] = useState<'synced' | 'unsynced'>('synced');
    const [progress, setProgress] = useState(100);

    const [flyingCommit, setFlyingCommit] = useState<{ message: string; direction: 'push' | 'pull' } | null>(null);

    const localRepoRef = useRef<HTMLDivElement>(null);
    const remoteRepoRef = useRef<HTMLDivElement>(null);
    const syncStatusRef = useRef<HTMLDivElement>(null);

    const createParticleEffect = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;
            
            document.body.appendChild(particle);

            const angle = (i / 12) * Math.PI * 2;
            const distance = 60 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1200,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }
    
    const showSyncCelebration = () => {
        const confettiColors = ['#00f3ff', '#ff006e', '#00ff41', '#6c5ce7'];
        const numConfetti = 50;
        
        for (let i = 0; i < numConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'absolute w-3 h-3 rounded-full';
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * -100;
            const endX = Math.random() * window.innerWidth;
            const endY = window.innerHeight + 100;
            
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            
            document.body.appendChild(confetti);
            
            confetti.animate([
                { transform: `translateY(0) rotate(0deg)` },
                { transform: `translateY(${endY - startY}px) rotate(${Math.random() * 720}deg)` }
            ], {
                duration: 2000 + Math.random() * 1000,
                delay: Math.random() * 500,
                easing: 'ease-in'
            }).onfinish = () => confetti.remove();
        }
    }


    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const generateCommits = async () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStatusMessage('🎲 Generating new commits...');

        const numCommits = Math.floor(Math.random() * 3) + 1;
        const targetRepo = Math.random() > 0.5 ? 'local' : 'remote';
        
        for (let i = 0; i < numCommits; i++) {
            await delay(500);
            const message = commitMessages[Math.floor(Math.random() * commitMessages.length)];
            const commitName = `${message} #${commitCounter + i}`;
            
            if (targetRepo === 'local') {
                setLocalCommits(prev => [...prev, commitName]);
                if (localRepoRef.current) createParticleEffect(localRepoRef.current);
            } else {
                setRemoteCommits(prev => [...prev, commitName]);
                if (remoteRepoRef.current) createParticleEffect(remoteRepoRef.current);
            }
        }
        
        setCommitCounter(prev => prev + numCommits);
        setStatusMessage(`✨ Added ${numCommits} commit(s) to ${targetRepo} repository!`);
        setIsAnimating(false);
    };

    const pushCommits = async () => {
        const newCommits = localCommits.filter(c => !remoteCommits.includes(c));
        if (isAnimating || newCommits.length === 0) return;

        setIsAnimating(true);
        setStatusMessage('⬆️ Pushing commits to remote...');
        
        for (const commit of newCommits) {
            setFlyingCommit({ message: commit, direction: 'push' });
            await delay(1600); // Animation duration + buffer
            setRemoteCommits(prev => [...prev, commit]);
            setFlyingCommit(null);
        }
        
        setStats(prev => ({ ...prev, pushCount: prev.pushCount + 1 }));
        setStatusMessage(`✅ Successfully pushed ${newCommits.length} commit(s)!`);
        setIsAnimating(false);
    };

    const pullCommits = async () => {
        const newCommits = remoteCommits.filter(c => !localCommits.includes(c));
        if (isAnimating || newCommits.length === 0) return;

        setIsAnimating(true);
        setStatusMessage('⬇️ Pulling commits from remote...');

        for (const commit of newCommits) {
            setFlyingCommit({ message: commit, direction: 'pull' });
            await delay(1600); // Animation duration + buffer
            setLocalCommits(prev => [...prev, commit]);
            setFlyingCommit(null);
        }

        setStats(prev => ({ ...prev, pullCount: prev.pullCount + 1 }));
        setStatusMessage(`✅ Successfully pulled ${newCommits.length} commit(s)!`);
        setIsAnimating(false);
    };

    const resetGame = () => {
        if (isAnimating) return;
        setLocalCommits(['📝 Initial commit']);
        setRemoteCommits(['📝 Initial commit']);
        setCommitCounter(1);
        setStats({ pushCount: 0, pullCount: 0 });
        setStatusMessage('🔄 Game reset! Ready to start your Git journey again.');
    };

    useEffect(() => {
        const localSet = new Set(localCommits);
        const remoteSet = new Set(remoteCommits);
        const isSynced = localSet.size === remoteSet.size && [...localSet].every(commit => remoteSet.has(commit));
        
        setSyncStatus(isSynced ? 'synced' : 'unsynced');
        
        const localOnlyCount = localCommits.filter(c => !remoteCommits.includes(c)).length;
        const remoteOnlyCount = remoteCommits.filter(c => !remoteCommits.includes(c)).length;

        if (!isAnimating) {
            if (isSynced) {
                setStatusMessage('🎉 Perfect Sync! Repositories are synchronized.');
                if (localCommits.length > 1) { // Avoid celebration on initial load
                    showSyncCelebration();
                }
            } else {
                const actions = [];
                if (localOnlyCount > 0) actions.push(`<span class="text-neon-green">Push ${localOnlyCount}</span>`);
                if (remoteOnlyCount > 0) actions.push(`<span class="text-neon-blue">Pull ${remoteOnlyCount}</span>`);
                setStatusMessage(`🔄 Out of sync. You need to ${actions.join(' or ')} commit(s) to synchronize.`);
            }
        }
        
        // Update Progress
        const uniqueCommits = new Set([...localCommits, ...remoteCommits]);
        const syncedCommits = localCommits.filter(c => remoteCommits.includes(c)).length;
        const totalUnique = uniqueCommits.size;
        setProgress(totalUnique > 0 ? (syncedCommits / totalUnique) * 100 : 100);

    }, [localCommits, remoteCommits, isAnimating]);

    const canPush = localCommits.filter(c => !remoteCommits.includes(c)).length > 0;
    const canPull = remoteCommits.filter(c => !localCommits.includes(c)).length > 0;

    return (
        <div className="max-w-7xl mx-auto p-8 relative z-10 w-full">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 drop-shadow-2xl">
                    Practical: git {commandName}
                </h1>
                <p className="text-lg text-gray-300 font-light">
                    Master Git synchronization with this interactive game! 🚀
                </p>
                 <p className="text-sm text-amber-400 font-light mt-4">
                    (Note: This is a general Push/Pull simulation. It can be adapted to demonstrate the specifics of `git {commandName}`.)
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12 min-h-[500px]">
                <div ref={localRepoRef} className={`glass-effect rounded-3xl p-8 border-2 shadow-2xl hover:shadow-neon-blue/20 transition-all duration-300 hover:-translate-y-2 min-h-[400px] flex flex-col ${syncStatus === 'synced' ? 'border-neon-green/50' : 'border-neon-pink/50'}`}>
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-white/10">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-neon-blue rounded-xl flex items-center justify-center text-2xl font-bold">💻</div>
                        <div>
                            <div className="text-2xl font-semibold text-white">Local Repository</div>
                            <div className="text-sm text-gray-400">Your workspace</div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-3">{localCommits.map((c, i) => <Commit key={`local-${i}`} message={c} index={i} />)}</div>
                </div>

                <div className="flex items-center justify-center">
                    <div ref={syncStatusRef} className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 z-20 ${syncStatus === 'synced' ? 'bg-gradient-to-br from-neon-green to-green-500 animate-pulse-custom' : 'bg-gradient-to-br from-neon-pink to-red-500 animate-shake-custom'}`}>
                        <span>{syncStatus === 'synced' ? '✅' : '⚠️'}</span>
                    </div>
                </div>

                <div ref={remoteRepoRef} className={`glass-effect rounded-3xl p-8 border-2 shadow-2xl hover:shadow-neon-blue/20 transition-all duration-300 hover:-translate-y-2 min-h-[400px] flex flex-col ${syncStatus === 'synced' ? 'border-neon-green/50' : 'border-neon-pink/50'}`}>
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-white/10">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-neon-blue rounded-xl flex items-center justify-center text-2xl font-bold">☁️</div>
                        <div>
                            <div className="text-2xl font-semibold text-white">Remote Repository</div>
                            <div className="text-sm text-gray-400">Origin server</div>
                        </div>
                    </div>
                    <div className="flex-1 space-y-3">{remoteCommits.map((c, i) => <Commit key={`remote-${i}`} message={c} index={i} />)}</div>
                </div>
            </div>
             {flyingCommit && (
                <FlyingCommit 
                    message={flyingCommit.message} 
                    fromRect={flyingCommit.direction === 'push' ? localRepoRef.current?.getBoundingClientRect() : remoteRepoRef.current?.getBoundingClientRect()}
                    toRect={flyingCommit.direction === 'push' ? remoteRepoRef.current?.getBoundingClientRect() : localRepoRef.current?.getBoundingClientRect()}
                />
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <button id="btn-create" onClick={generateCommits} disabled={isAnimating} className="shimmer relative overflow-hidden bg-gradient-to-r from-accent-purple to-purple-600 text-white font-bold py-4 px-6 rounded-2xl border-2 border-accent-purple hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    <span className="relative z-10">🎲 Generate</span>
                </button>
                <button id="btn-push" onClick={pushCommits} disabled={isAnimating || !canPush} className="shimmer relative overflow-hidden bg-gradient-to-r from-neon-green to-green-600 text-black font-bold py-4 px-6 rounded-2xl border-2 border-neon-green hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    <span className="relative z-10">⬆️ Push</span>
                </button>
                <button id="btn-pull" onClick={pullCommits} disabled={isAnimating || !canPull} className="shimmer relative overflow-hidden bg-gradient-to-r from-neon-blue to-blue-600 text-black font-bold py-4 px-6 rounded-2xl border-2 border-neon-blue hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    <span className="relative z-10">⬇️ Pull</span>
                </button>
                <button id="btn-reset" onClick={resetGame} disabled={isAnimating} className="shimmer relative overflow-hidden bg-gradient-to-r from-neon-pink to-pink-600 text-white font-bold py-4 px-6 rounded-2xl border-2 border-neon-pink hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    <span className="relative z-10">🔄 Reset</span>
                </button>
            </div>

            <div className="glass-effect rounded-3xl p-8 border-2 border-white/10 text-center relative overflow-hidden">
                <div className="text-xl font-semibold mb-4 min-h-[60px] flex items-center justify-center" dangerouslySetInnerHTML={{ __html: statusMessage }}></div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-6">
                    <div id="progress-fill" className="h-full bg-gradient-to-r from-neon-blue to-accent-purple rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold text-neon-blue mb-1">{localCommits.length}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">Local Commits</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold text-neon-blue mb-1">{remoteCommits.length}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">Remote Commits</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold text-neon-green mb-1">{stats.pushCount}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">Pushes</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold text-purple-400 mb-1">{stats.pullCount}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">Pulls</div>
                    </div>
                </div>
            </div>
        </div>
    );
}