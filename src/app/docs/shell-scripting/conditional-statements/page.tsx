'use client';

import { useState } from 'react';
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

export default function InteractiveConditionalsPage() {
    const [numberInput, setNumberInput] = useState('10');
    const [output, setOutput] = useState('');

    const runIfScript = () => {
        const num = parseInt(numberInput, 10);
        let resultText = '';

        if (isNaN(num)) {
            setOutput('Please enter a valid number.');
            return;
        }

        if (num > 10) {
            resultText = 'Your number is greater than 10.';
        } else if (num === 10) {
            resultText = 'Your number is exactly 10.';
        } else {
            resultText = 'Your number is less than 10.';
        }

        const scriptExecution = `
$ echo "Enter a number:"
Enter a number:
$ read num
${num}
$ if [ "$num" -gt 10 ]; then
>   echo "Your number is greater than 10."
> elif [ "$num" -eq 10 ]; then
>   echo "Your number is exactly 10."
> else
>   echo "Your number is less than 10."
> fi
${resultText}
        `;
        setOutput(scriptExecution.trim());
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
                    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Conditional Statements</h1>
                    <p className="mt-4 text-xl font-medium text-gray-400">Make decisions in your script with if, else, and elif.</p>
                </header>

                <SectionCard 
                    title="Interactive `if` statement" 
                    description="Enter a number and run the script to see how the if, elif, and else statements work based on your input."
                    titleColor="text-cyan-400"
                >
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                        <Input 
                            type="number" 
                            id="number-input" 
                            placeholder="Enter a number" 
                            value={numberInput}
                            onChange={(e) => setNumberInput(e.target.value)}
                            className="flex-1 bg-gray-800 border-gray-700 text-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                        />
                         <Button onClick={runIfScript} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">Run Script</Button>
                    </div>
                    <div id="output" className="bg-gray-800 rounded-md p-4 font-mono text-green-400 text-sm mt-6 min-h-[12rem] whitespace-pre-wrap">
                        {output || <span className="text-gray-500">Output will appear here...</span>}
                    </div>
                </SectionCard>
                
                <SectionCard 
                    title="Common Test Operators" 
                    description="Bash uses special flags inside `[ ... ]` or `[[ ... ]]` to compare numbers, check strings, and inspect files."
                    titleColor="text-purple-400"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <div>
                            <h4 className="font-bold text-gray-200 mb-2">Numeric Comparisons</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><code className="bg-gray-800 rounded px-1">-eq</code> (equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">-ne</code> (not equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">-gt</code> (greater than)</li>
                                <li><code className="bg-gray-800 rounded px-1">-lt</code> (less than)</li>
                                 <li><code className="bg-gray-800 rounded px-1">-ge</code> (greater or equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">-le</code> (less or equal)</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-gray-200 mb-2">File & String Checks</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><code className="bg-gray-800 rounded px-1">-f "file.txt"</code> (is a file)</li>
                                <li><code className="bg-gray-800 rounded px-1">-d "folder"</code> (is a directory)</li>
                                <li><code className="bg-gray-800 rounded px-1">-z "$VAR"</code> (string is empty)</li>
                                <li><code className="bg-gray-800 rounded px-1">-n "$VAR"</code> (string is not empty)</li>
                                <li><code className="bg-gray-800 rounded px-1">"$A" == "$B"</code> (strings are equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">"$A" != "$B"</code> (strings not equal)</li>
                            </ul>
                        </div>
                    </div>
                     <CodeBlock>
# Example checking if a file exists
if [ -f "/etc/hosts" ]; then
  echo "Hosts file found!"
fi
                    </CodeBlock>
                </SectionCard>

                 <SectionCard title="✅ Practice" description="Try these small challenges to solidify your understanding." titleColor="text-yellow-400">
                    <ul className="list-disc list-inside text-gray-300 pl-4 space-y-2">
                        <li>Write a script that checks if a file named <code className="bg-gray-800 rounded px-1">config.txt</code> exists in the current directory.</li>
                        <li>Write a script that asks for a number and prints whether it's even or odd. (Hint: <code className="bg-gray-800 rounded px-1">$((num % 2)) -eq 0</code>)</li>
                        <li>Write a script that takes a command-line argument and checks if it is the word "start", "stop", or something else.</li>
                    </ul>
                </SectionCard>
            </div>
        </main>
    );
}
