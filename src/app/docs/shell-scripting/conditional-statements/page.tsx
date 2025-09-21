
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrowLeft, GitBranch, CaseSensitive, FileCheck2, CheckSquare } from 'lucide-react';
import Link from 'next/link';

const SectionCard = ({ title, description, titleColor, children, icon: Icon }: { title: string, description: string, titleColor: string, children: React.ReactNode, icon: React.ElementType }) => (
    <div className="bg-gray-900 terminal-bg rounded-xl p-6">
        <h2 className={`text-2xl font-bold ${titleColor} mb-4 flex items-center gap-3`}><Icon className="size-6" />{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        {children}
    </div>
);

export default function InteractiveConditionalsPage() {
    const [numberInput, setNumberInput] = useState('10');
    const [ifOutput, setIfOutput] = useState('');
    const [caseInput, setCaseInput] = useState('start');
    const [caseOutput, setCaseOutput] = useState('');


    const runIfScript = () => {
        const num = parseInt(numberInput, 10);
        let resultText = '';

        if (isNaN(num)) {
            setIfOutput('Please enter a valid number.');
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
        setIfOutput(scriptExecution.trim());
    };

     const runCaseScript = () => {
        let resultText = '';
        switch (caseInput.toLowerCase()) {
            case 'start':
                resultText = 'Starting the service...';
                break;
            case 'stop':
                resultText = 'Stopping the service...';
                break;
            case 'status':
                resultText = 'Service is running.';
                break;
            default:
                resultText = `Error: Invalid option '${caseInput}'.`;
        }
        const scriptExecution = `
$ choice="${caseInput}"
$ case $choice in
>   start) echo "Starting..." ;;
>   stop) echo "Stopping..." ;;
>   status) echo "Running." ;;
>   *) echo "Invalid." ;;
> esac
${resultText}
        `;
        setCaseOutput(scriptExecution.trim());
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
                    <p className="mt-4 text-xl font-medium text-gray-400">Make decisions in your script with if, else, and case statements.</p>
                </header>

                <SectionCard 
                    title="The `if...elif...else` Structure"
                    description="This is the fundamental way to make decisions. The script checks conditions sequentially from top to bottom."
                    titleColor="text-cyan-400"
                    icon={GitBranch}
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
                        {ifOutput || <span className="text-gray-500">Output will appear here...</span>}
                    </div>
                </SectionCard>
                
                 <SectionCard 
                    title="The `case` Statement"
                    description="A `case` statement is a cleaner way to handle multiple choices when you're matching a single variable against several possible values. It's often easier to read than a long `if/elif` chain."
                    titleColor="text-pink-400"
                    icon={CaseSensitive}
                >
                     <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                        <Input 
                            type="text" 
                            id="case-input" 
                            placeholder="Enter start, stop, or status" 
                            value={caseInput}
                            onChange={(e) => setCaseInput(e.target.value)}
                            className="flex-1 bg-gray-800 border-gray-700 text-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-200"
                        />
                         <Button onClick={runCaseScript} className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300">Run Script</Button>
                    </div>
                    <div id="output" className="bg-gray-800 rounded-md p-4 font-mono text-green-400 text-sm mt-6 min-h-[12rem] whitespace-pre-wrap">
                        {caseOutput || <span className="text-gray-500">Output will appear here...</span>}
                    </div>
                </SectionCard>

                <SectionCard 
                    title="Test Operators: `[ ... ]` vs `[[ ... ]]`" 
                    description="Bash offers two ways to test conditions. The double-bracket `[[ ... ]]` is a more modern and powerful version that should generally be preferred."
                    titleColor="text-purple-400"
                    icon={CheckSquare}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <div>
                            <h4 className="font-bold text-gray-200 mb-2">Old Style: `[ ... ]` (Single Bracket)</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>The original test command.</li>
                                <li>Requires variables to be quoted (`"$VAR"`) to prevent errors with spaces.</li>
                                <li>Uses `-a` for AND and `-o` for OR.</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-gray-200 mb-2">New Style: `[[ ... ]]` (Double Bracket)</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>A bash keyword, not a command. More robust.</li>
                                <li>Handles variables with spaces more gracefully.</li>
                                <li>Allows C-style `&&` for AND and `||` for OR.</li>
                                <li>Supports pattern matching with `==` (e.g., `[[ $file == *.txt ]]`).</li>
                            </ul>
                        </div>
                    </div>
                     <CodeBlock>
{`# Modern, recommended way:
if [[ "$user" == "root" && $count -gt 5 ]]; then
  echo "Root user has run this more than 5 times."
fi`}
                    </CodeBlock>
                </SectionCard>

                 <SectionCard 
                    title="Common Test Operators" 
                    description="These flags are used inside `[` or `[[` to perform checks."
                    titleColor="text-yellow-400"
                    icon={FileCheck2}
                 >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300 text-sm">
                        <div>
                            <h4 className="font-bold text-gray-200 mb-2">Numeric</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><code className="bg-gray-800 rounded px-1">-eq</code> (equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">-ne</code> (not equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">-gt</code> (greater than)</li>
                                <li><code className="bg-gray-800 rounded px-1">-lt</code> (less than)</li>
                                 <li><code className="bg-gray-800 rounded px-1">-ge</code> (greater/equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">-le</code> (less/equal)</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-gray-200 mb-2">String</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><code className="bg-gray-800 rounded px-1">==</code> or <code className="bg-gray-800 rounded px-1">=</code> (equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">!=</code> (not equal)</li>
                                <li><code className="bg-gray-800 rounded px-1">-z</code> (string is empty)</li>
                                <li><code className="bg-gray-800 rounded px-1">-n</code> (string is not empty)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-200 mb-2">File</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li><code className="bg-gray-800 rounded px-1">-f "file"</code> (is a file)</li>
                                <li><code className="bg-gray-800 rounded px-1">-d "dir"</code> (is a directory)</li>
                                <li><code className="bg-gray-800 rounded px-1">-e "path"</code> (path exists)</li>
                                <li><code className="bg-gray-800 rounded px-1">-r "file"</code> (is readable)</li>
                                <li><code className="bg-gray-800 rounded px-1">-w "file"</code> (is writable)</li>
                                <li><code className="bg-gray-800 rounded px-1">-x "file"</code> (is executable)</li>
                            </ul>
                        </div>
                    </div>
                </SectionCard>
            </div>
        </main>
    );
}
