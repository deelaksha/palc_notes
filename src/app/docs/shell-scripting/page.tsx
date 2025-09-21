
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function ShellScriptingPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">Shell Scripting Roadmap for Linux</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A beginner-to-advanced roadmap for learning shell scripting with `.sh` files on Linux.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. Basics of the Linux Shell</h2>
                    <p className="mb-4 text-muted-foreground">Before writing scripts, you need to be comfortable with the command line. The shell (like `bash`) is the program that reads and executes your commands.</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><b>Essential Commands:</b> Learn `ls` (list), `cd` (change directory), `pwd` (print working directory), `cp` (copy), `mv` (move/rename), `rm` (remove), `touch` (create file), `mkdir` (make directory), `echo` (print text), `cat` (view file).</li>
                        <li><b>File Permissions:</b> Understand how `chmod` changes who can read, write, and execute files.</li>
                    </ul>
                    <div className="mt-4 p-4 bg-card-nested rounded-lg">
                        <h4 className="font-semibold text-secondary-accent mb-2">✅ Practice:</h4>
                        <p className="text-sm text-muted-foreground">Open your terminal. Create a folder named `my-first-scripts`, `cd` into it, `touch` a new file, and then use `ls -l` to see its permissions.</p>
                    </div>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Your First Shell Script</h2>
                    <p className="mb-4 text-muted-foreground">A shell script is just a text file containing a sequence of commands. The "shebang" `#!/bin/bash` at the top tells the system which shell to use to run the script.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'#!/bin/bash'}</span><br/><br/>
                            <span className="syntax-function">echo</span> <span className="syntax-string">"Hello, World!"</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mt-4 text-muted-foreground">Save this as `hello.sh`, then make it executable and run it:</p>
                    <CodeBlock>
                        <CodeSyntax>
                            chmod +x hello.sh <span className="syntax-comment"># Make it executable</span><br/>
                            ./hello.sh       <span className="syntax-comment"># Run the script</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Variables and User Input</h2>
                    <p className="mb-4 text-muted-foreground">Use variables to store and reuse data. Use the `read` command to get input from the user.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">#!/bin/bash</span><br/><br/>
                            name=<span className="syntax-string">"Deelaksha"</span> <span className="syntax-comment"># No spaces around =</span><br/>
                            <span className="syntax-function">echo</span> <span className="syntax-string">"My name is $name"</span><br/><br/>
                            <span className="syntax-function">echo</span> <span className="syntax-string">"Enter your favorite color:"</span><br/>
                            <span className="syntax-keyword">read</span> color<br/>
                            <span className="syntax-function">echo</span> <span className="syntax-string">"$color is a great color!"</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. Conditional Statements (`if`)</h2>
                    <p className="mb-4 text-muted-foreground">Make decisions in your script using `if`, `else`, and `elif`. The `[ ... ]` syntax is used to test conditions.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-function">echo</span> <span className="syntax-string">"Enter a number:"</span><br/>
                            <span className="syntax-keyword">read</span> num<br/><br/>
                            <span className="syntax-keyword">if</span> [ <span className="syntax-variable">$num</span> -gt 10 ]; <span className="syntax-keyword">then</span><br/>
                            {"  "}<span className="syntax-function">echo</span> <span className="syntax-string">"The number is greater than 10."</span><br/>
                            <span className="syntax-keyword">elif</span> [ <span className="syntax-variable">$num</span> -eq 10 ]; <span className="syntax-keyword">then</span><br/>
                            {"  "}<span className="syntax-function">echo</span> <span className="syntax-string">"The number is exactly 10."</span><br/>
                            <span className="syntax-keyword">else</span><br/>
                            {"  "}<span className="syntax-function">echo</span> <span className="syntax-string">"The number is less than 10."</span><br/>
                            <span className="syntax-keyword">fi</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">5. Loops (`for`, `while`)</h2>
                    <p className="mb-4 text-muted-foreground">Repeat actions using loops. `for` loops are great for iterating over a list of items, while `while` loops run as long as a condition is true.</p>
                     <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">For Loop</h3>
                    <CodeBlock>
                        <CodeSyntax>
                           <span className="syntax-keyword">for</span> fruit <span className="syntax-keyword">in</span> apple banana cherry; <span className="syntax-keyword">do</span><br/>
                           {"  "}<span className="syntax-function">echo</span> <span className="syntax-string">"I like $fruit"</span><br/>
                           <span className="syntax-keyword">done</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <h3 className="text-2xl font-semibold mt-6 mb-2 text-secondary-accent">While Loop</h3>
                     <CodeBlock>
                        <CodeSyntax>
                            count=1<br/>
                            <span className="syntax-keyword">while</span> [ <span className="syntax-variable">$count</span> -le 3 ]; <span className="syntax-keyword">do</span><br/>
                            {"  "}<span className="syntax-function">echo</span> <span className="syntax-string">"Count: $count"</span><br/>
                            {"  "}count=$((count+1)) <span className="syntax-comment"># Use ((...)) for arithmetic</span><br/>
                            <span className="syntax-keyword">done</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">6. Functions</h2>
                    <p className="mb-4 text-muted-foreground">Group reusable code into functions. `$1`, `$2`, etc., are used to access arguments passed to the function.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">#!/bin/bash</span><br/><br/>
                            greet() {'{'}<br/>
                            {"  "}<span className="syntax-function">echo</span> <span className="syntax-string">"Hello, $1! Welcome."</span><br/>
                            {'}'}<br/><br/>
                            <span className="syntax-comment"># Call the function</span><br/>
                            greet "Alice"<br/>
                            greet "Bob"
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">7. Advanced Topics</h2>
                    <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                        <li><b>Command-Line Arguments:</b> Access arguments passed to your script with `$1`, `$2`. `$0` is the script name, `$#` is the count of arguments, and `$@` represents all arguments.</li>
                        <li><b>`case` Statement:</b> A cleaner alternative to complex `if/elif` chains for matching a variable against several patterns.</li>
                        <li><b>Process Management:</b> Use `ps` to see running processes and `kill` to stop them.</li>
                         <li><b>Scheduling:</b> Use `cron` to schedule your scripts to run automatically at specific times.</li>
                    </ul>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">8. Real-World Project Ideas</h2>
                    <p className="mb-4 text-muted-foreground">The best way to learn is by building. Try creating simple, useful scripts to automate your daily tasks.</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>A backup script that copies a specific folder to a backup location and names it with the current date.</li>
                        <li>A system monitor script that prints the current CPU usage, RAM usage, and disk space.</li>
                         <li>A log parser that uses `grep` to find all lines containing "ERROR" in a log file and saves them to a separate `errors.log` file.</li>
                    </ul>
                </Card>
            </main>
        </div>
    );
}
