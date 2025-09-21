
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrowLeft, Folder, File as FileIcon } from 'lucide-react';
import Link from 'next/link';

const SectionCard = ({ title, description, titleColor, children }: { title: string, description: string, titleColor: string, children: React.ReactNode }) => (
    <div className="bg-gray-900 terminal-bg rounded-xl p-6">
        <h2 className={`text-2xl font-bold ${titleColor} mb-4`}>{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        {children}
    </div>
);

const FileSystemViewer = ({ fs }: { fs: any }) => {
    return (
        <div className="flex flex-wrap gap-4">
            {Object.keys(fs.children).map(key => {
                const item = fs.children[key];
                return (
                    <div key={key} className="flex items-center gap-2 p-2 bg-gray-800 rounded-md">
                        {item.type === 'dir' ? <Folder className="w-4 h-4 text-cyan-400" /> : <FileIcon className="w-4 h-4 text-gray-400" />}
                        <span className="font-mono text-sm">{key}</span>
                    </div>
                )
            })}
        </div>
    );
};


export default function InteractiveBasicsPage() {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState<string[]>(['Welcome! Try running a command like `ls` or `mkdir new_folder`']);
    const [fileSystem, setFileSystem] = useState({
        name: 'my-scripts',
        type: 'dir',
        children: {
            'script.sh': { type: 'file', content: 'echo "hello"' },
            'notes.txt': { type: 'file', content: 'some notes' }
        }
    });

    const handleCommand = () => {
        const [cmd, ...args] = command.split(' ');
        let newOutput = [`$ ${command}`];
        let newFs = { ...fileSystem };

        switch (cmd) {
            case 'ls':
                newOutput.push(Object.keys(newFs.children).join('\t'));
                break;
            case 'pwd':
                newOutput.push('/home/user/my-scripts');
                break;
            case 'mkdir':
                if (args[0]) {
                    if (!newFs.children[args[0]]) {
                        newFs.children[args[0]] = { type: 'dir', children: {} };
                        newOutput.push(`Created directory: ${args[0]}`);
                    } else {
                        newOutput.push(`mkdir: cannot create directory ‘${args[0]}’: File exists`);
                    }
                } else {
                    newOutput.push('mkdir: missing operand');
                }
                break;
            case 'touch':
                if (args[0]) {
                     if (!newFs.children[args[0]]) {
                        newFs.children[args[0]] = { type: 'file', content: '' };
                        newOutput.push(`Created file: ${args[0]}`);
                    } else {
                         newOutput.push(`Updated timestamp for: ${args[0]}`);
                    }
                } else {
                     newOutput.push('touch: missing file operand');
                }
                break;
             case 'rm':
                if (args[0]) {
                    if(newFs.children[args[0]]){
                        if(newFs.children[args[0]].type === 'file') {
                            delete newFs.children[args[0]];
                            newOutput.push(`Removed file: ${args[0]}`);
                        } else {
                             newOutput.push(`rm: cannot remove '${args[0]}': Is a directory`);
                        }
                    } else {
                        newOutput.push(`rm: cannot remove '${args[0]}': No such file or directory`);
                    }
                } else {
                    newOutput.push('rm: missing operand');
                }
                break;
            case 'echo':
                newOutput.push(args.join(' '));
                break;
            case 'cat':
                 if (args[0] && newFs.children[args[0]] && newFs.children[args[0]].type === 'file') {
                    newOutput.push(newFs.children[args[0]].content || '(empty file)');
                } else {
                    newOutput.push(`cat: ${args[0] || ''}: No such file or directory`);
                }
                break;
            case 'clear':
                newOutput = [];
                break;
            default:
                newOutput.push(`bash: command not found: ${cmd}`);
        }
        setOutput(newOutput);
        setFileSystem(newFs);
        setCommand('');
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
                    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Basics of Linux Shell</h1>
                    <p className="mt-4 text-xl font-medium text-gray-400">Essential Commands</p>
                </header>

                <SectionCard title="Interactive Terminal" description="Try running some basic commands yourself! The current directory is shown below. Try `ls`, `mkdir new_dir`, `touch new_file.txt`, `echo 'hello' > new_file.txt`, `cat new_file.txt`, or `rm new_file.txt`." titleColor="text-cyan-400">
                    <div className="bg-gray-800 rounded-md p-4 mb-4">
                        <FileSystemViewer fs={fileSystem} />
                    </div>
                    <div className="flex gap-2">
                        <Input 
                            type="text"
                            placeholder="Enter a command..."
                            className="flex-1 bg-gray-800 border-gray-700 text-gray-300 font-mono"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
                        />
                        <Button onClick={handleCommand}>Run</Button>
                    </div>
                     <div id="command-output" className="bg-gray-800 rounded-md p-4 font-mono text-green-400 text-sm mt-4 min-h-[6rem] whitespace-pre-wrap">
                        {output.map((line, index) => <p key={index}>{line}</p>)}
                    </div>
                </SectionCard>
                
                 <SectionCard title="File Permissions" description="Use `chmod` to change who can read (r), write (w), and execute (x) files. `chmod +x` is critical for making your scripts runnable." titleColor="text-purple-400">
                     <CodeBlock>
{`# Give the current user execute permission
chmod u+x my_script.sh

# A common permission set for scripts (rwx for user, r-x for group & others)
chmod 755 my_script.sh

# Make a file read-only for everyone
chmod 444 read_only_file.txt`}
                     </CodeBlock>
                 </SectionCard>
            </div>
        </main>
    );
}

