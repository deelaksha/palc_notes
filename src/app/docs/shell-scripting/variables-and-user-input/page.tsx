'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SectionCard = ({ title, description, titleColor, children }: { title: string, description: string, titleColor: string, children: React.ReactNode }) => (
    <div className="bg-gray-900 terminal-bg rounded-xl p-6">
        <h2 className={`text-2xl font-bold ${titleColor} mb-4`}>{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        {children}
    </div>
);

export default function InteractiveVariablesPage() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [sumOutput, setSumOutput] = useState('Output will appear here...');

    const [userName, setUserName] = useState('');
    const [greetOutput, setGreetOutput] = useState('Output will appear here...');

    const runSumScript = () => {
        const n1 = parseFloat(num1) || 0;
        const n2 = parseFloat(num2) || 0;
        const sum = n1 + n2;
        setSumOutput(`$ echo "Please enter the first number:"
Please enter the first number:
$ read num1
${n1}
$ echo "Please enter the second number:"
read num2
${n2}
$ sum=$((num1 + num2))
$ echo "The sum is: $sum"
The sum is: ${sum}`);
    };

    const runGreetScript = () => {
        const name = userName || 'guest';
        const homeDir = `/home/${name.toLowerCase().replace(/\s/g, '-')}`;
        setGreetOutput(`$ echo "Hello, $USER!"
Hello, ${name}!
$ echo "Your home directory is: $HOME"
Your home directory is: ${homeDir}`);
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
                    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Interactive Bash Guide</h1>
                    <p className="mt-4 text-xl font-medium text-gray-400">Variables, User Input, and Environment Variables</p>
                </header>

                <SectionCard title="Declaring Variables" description="Use variables to store data. Remember: there are no spaces around the = sign." titleColor="text-cyan-400">
                    <div className="bg-gray-800 rounded-md p-4 font-mono text-green-400 text-sm overflow-x-auto">
                        <pre><code className="whitespace-pre-wrap">{`$ GREETING="Hello"
$ USER_NAME="Deelaksha"
$ # Use quotes to handle spaces
$ echo "$GREETING, $USER_NAME!"
Hello, Deelaksha!`}</code></pre>
                    </div>
                </SectionCard>

                <SectionCard title="Reading User Input" description="Use the read command to get input from the user and store it in a variable." titleColor="text-purple-400">
                    <div className="bg-gray-800 rounded-md p-4 font-mono text-green-400 text-sm overflow-x-auto">
                        <pre><code className="whitespace-pre-wrap">{`$ echo "Please enter your name:"
Please enter your name:
$ read user_name
Deelaksha
$ echo "Welcome, $user_name!"
Welcome, Deelaksha!`}</code></pre>
                    </div>
                </SectionCard>

                <SectionCard title="Environment Variables" description="The system has many built-in variables you can use, such as:" titleColor="text-pink-400">
                    <ul className="list-disc list-inside text-gray-300 pl-4 space-y-2">
                        <li><code className="bg-gray-800 rounded-md px-1 py-0.5 text-sm">$HOME</code>: Your home directory.</li>
                        <li><code className="bg-gray-800 rounded-md px-1 py-0.5 text-sm">$USER</code>: Your current username.</li>
                        <li><code className="bg-gray-800 rounded-md px-1 py-0.5 text-sm">$PWD</code>: The current working directory.</li>
                        <li><code className="bg-gray-800 rounded-md px-1 py-0.5 text-sm">$PATH</code>: A list of directories where the system looks for commands.</li>
                    </ul>
                </SectionCard>

                <SectionCard title="✅ Practice" description="" titleColor="text-yellow-400">
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-200 mb-4">Calculate the Sum of Two Numbers</h3>
                        <p className="text-gray-300 mb-4">Enter two numbers below and click "Run Script" to see their sum.</p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                            <Input type="number" id="num1" placeholder="First number" value={num1} onChange={(e) => setNum1(e.target.value)} className="flex-1 bg-gray-800 border-gray-700 text-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200" />
                            <Input type="number" id="num2" placeholder="Second number" value={num2} onChange={(e) => setNum2(e.target.value)} className="flex-1 bg-gray-800 border-gray-700 text-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200" />
                        </div>
                        <Button id="runSumBtn" onClick={runSumScript} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900">Run Script</Button>
                        <div id="sum-output" className="bg-gray-800 rounded-md p-4 font-mono text-green-400 text-sm mt-6 min-h-[4rem] whitespace-pre-wrap">
                            <span className={sumOutput === 'Output will appear here...' ? 'text-gray-500' : ''}>{sumOutput}</span>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-gray-200 mb-4">Greet User and Show Home Directory</h3>
                        <p className="text-gray-300 mb-4">Enter your name and see a personalized greeting and your home directory (simulated).</p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                            <Input type="text" id="user-name-input" placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="flex-1 bg-gray-800 border-gray-700 text-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-200" />
                        </div>
                        <Button id="runGreetBtn" onClick={runGreetScript} className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900">Run Script</Button>
                        <div id="greet-output" className="bg-gray-800 rounded-md p-4 font-mono text-green-400 text-sm mt-6 min-h-[4rem] whitespace-pre-wrap">
                             <span className={greetOutput === 'Output will appear here...' ? 'text-gray-500' : ''}>{greetOutput}</span>
                        </div>
                    </div>
                </SectionCard>
            </div>
        </main>
    );
}
