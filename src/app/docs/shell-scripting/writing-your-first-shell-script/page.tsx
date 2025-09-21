'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrowLeft, Terminal, FileCode, Play, Lock, Unlock } from 'lucide-react';
import Link from 'next/link';

const SectionCard = ({ title, description, titleColor, children }: { title: string, description: string, titleColor: string, children: React.ReactNode }) => (
    <div className="bg-gray-900 terminal-bg rounded-xl p-6">
        <h2 className={`text-2xl font-bold ${titleColor} mb-4`}>{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        {children}
    </div>
);

export default function InteractiveFirstScriptPage() {
    const [scriptContent, setScriptContent] = useState('#!/bin/bash\n# This is a comment\necho "Hello, World!"');
    const [isExecutable, setIsExecutable] = useState(false);
    const [output, setOutput] = useState<string[]>([]);

    const handleRunScript = () => {
        if (!isExecutable) {
            setOutput([
                `$ ./hello.sh`,
                `bash: ./hello.sh: Permission denied`
            ]);
            return;
        }
        
        const lines = scriptContent.split('\n');
        const newOutput = [`$ ./hello.sh`];
        lines.forEach(line => {
            if (line.trim().startsWith('echo')) {
                newOutput.push(line.trim().substring(5).replace(/"/g, ''));
            }
        });
        setOutput(newOutput);
    };
    
    const handleChmod = () => {
        setIsExecutable(true);
        setOutput([
            `$ chmod +x hello.sh`,
            `Permissions updated for hello.sh`
        ]);
    };

    return (
        <main className="p-4 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/docs/shell-scripting">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Roadmap
                    </Link>
                </Button>
                <header className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Writing Your First Shell Script</h1>
                     <p className="mt-4 text-xl font-medium text-gray-400">Learn to create, execute, and understand a basic .sh file.</p>
                </header>

                <SectionCard title="Interactive Script Runner" description="A shell script is a text file with commands. The first line is the 'shebang' (#!/bin/bash) which tells the system how to run it. Before you can run it, you must make it executable." titleColor="text-cyan-400">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2"><FileCode className="w-4 h-4"/> hello.sh</h3>
                            <Textarea 
                                value={scriptContent}
                                onChange={(e) => setScriptContent(e.target.value)}
                                className="h-40 font-mono text-sm bg-gray-800 border-gray-700"
                            />
                        </div>
                         <div>
                             <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2"><Terminal className="w-4 h-4"/> Output</h3>
                             <div className="bg-gray-800 rounded-md p-4 font-mono text-sm min-h-[160px] text-green-400 whitespace-pre-wrap">
                                {output.map((line, index) => <p key={index} dangerouslySetInnerHTML={{__html: line.replace(/Permission denied/, '<span class="text-red-500">Permission denied</span>')}}></p>)}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <Button onClick={handleChmod} disabled={isExecutable} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            {isExecutable ? <Unlock/> : <Lock />}
                           chmod +x hello.sh
                        </Button>
                        <Button onClick={handleRunScript} className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
                            <Play className="mr-2"/>
                            ./hello.sh
                        </Button>
                    </div>
                     <div className="mt-4 text-xs text-gray-400 p-2 border-t border-gray-700">
                        <p><strong className="text-gray-200">Step 1:</strong> Make the script executable with `chmod +x`. If you don't, you'll get a "Permission denied" error.</p>
                        <p><strong className="text-gray-200">Step 2:</strong> Run the script using `./` followed by the filename.</p>
                    </div>
                </SectionCard>
            </div>
        </main>
    );
}
