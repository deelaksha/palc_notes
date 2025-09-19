
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CFunctionsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Functions</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Learn to write clean, reusable, and modular code by mastering functions.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">What Are Functions?</h2>
                    <p className="mb-4 text-muted-foreground">
                        A function is a self-contained block of code that performs a specific task. Think of it like a recipe: you give it some ingredients (parameters), it follows a set of steps, and it gives you back a finished dish (the return value).
                    </p>
                    <p className="mb-4 text-muted-foreground">
                        Functions are the most important building blocks for creating organized and manageable programs. They allow you to break down a large, complex problem into smaller, simpler, and reusable pieces.
                    </p>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. The Three Parts of a Function</h2>
                    <p className="mb-4 text-muted-foreground">Using a function involves three key steps: declaration, definition, and calling.</p>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">A. Function Declaration (Prototype)</h3>
                    <p className="mb-4 text-muted-foreground">
                        A function declaration, or prototype, is a a short summary that tells the compiler about the function before it's actually defined. It specifies the function's name, its return type, and the types of its parameters. This allows you to call a function before its full code appears in your file.
                    </p>
                     <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Function prototype for a function that adds two integers'}</span><br/>
                            <span className="syntax-datatype">int</span> <span className="syntax-function">add</span>(<span className="syntax-datatype">int</span> a, <span className="syntax-datatype">int</span> b);
                        </CodeSyntax>
                    </CodeBlock>

                    <h3 className="text-2xl font-semibold mt-6 mb-2 text-secondary-accent">B. Function Definition</h3>
                    <p className="mb-4 text-muted-foreground">
                        The function definition is the actual body of the function, containing the code that will be executed when the function is called.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> <span className="syntax-function">add</span>(<span className="syntax-datatype">int</span> a, <span className="syntax-datatype">int</span> b) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// This is the function body'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-datatype">int</span> sum <span className="syntax-operator">=</span> a <span className="syntax-operator">+</span> b;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">return</span> sum; <span className="syntax-comment">{'// This returns the result'}</span><br/>
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>

                     <h3 className="text-2xl font-semibold mt-6 mb-2 text-secondary-accent">C. Function Call</h3>
                    <p className="mb-4 text-muted-foreground">
                        A function call is how you execute the function. You provide the actual values (arguments) for the function's parameters.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> main() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-datatype">int</span> result <span className="syntax-operator">=</span> <span className="syntax-function">add</span>(<span className="syntax-number">5</span>, <span className="syntax-number">3</span>); <span className="syntax-comment">{'// Calling the add function with arguments 5 and 3'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"The result is: %d\n"</span>, result); <span className="syntax-comment">{'// Will print 8'}</span><br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">return</span> <span className="syntax-number">0</span>;<br/>
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Scope of Variables</h2>
                    <p className="mb-4 text-muted-foreground">
                        Scope determines where a variable can be accessed.
                    </p>
                    <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                        <li><b className="text-foreground">Local Variables:</b> Declared inside a function. They can only be used within that function and are destroyed when the function exits.</li>
                        <li><b className="text-foreground">Global Variables:</b> Declared outside all functions. They can be accessed by any function in the file. Use them sparingly as they can make code hard to debug.</li>
                        <li><b className="text-foreground">Static Variables:</b> A special type of local variable. When you use the `static` keyword, the variable is not destroyed when the function exits. It keeps its value between function calls.</li>
                    </ul>
                     <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> global_var <span className="syntax-operator">=</span> <span className="syntax-number">100</span>; <span className="syntax-comment">{'// Global variable'}</span><br/><br/>
                             <span className="syntax-datatype">void</span> <span className="syntax-function">counter</span>() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">static</span> <span className="syntax-datatype">int</span> static_count <span className="syntax-operator">=</span> <span className="syntax-number">0</span>; <span className="syntax-comment">{'// Static local variable'}</span><br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-datatype">int</span> local_count <span className="syntax-operator">=</span> <span className="syntax-number">0</span>; <span className="syntax-comment">{'// Regular local variable'}</span><br/><br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;static_count<span className="syntax-operator">++</span>;<br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;local_count<span className="syntax-operator">++</span>;<br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Static: %d, Local: %d\n"</span>, static_count, local_count);<br/>
                            {'}'}<br/><br/>
                             <span className="syntax-comment">{'// Calling counter() multiple times:'}</span><br/>
                             <span className="syntax-comment">{'// counter(); -> Static: 1, Local: 1'}</span><br/>
                             <span className="syntax-comment">{'// counter(); -> Static: 2, Local: 1'}</span><br/>
                             <span className="syntax-comment">{'// counter(); -> Static: 3, Local: 1'}</span><br/>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Recursion</h2>
                    <p className="mb-4 text-muted-foreground">
                        Recursion is a powerful programming technique where a function calls itself. It's often used to solve problems that can be broken down into smaller, self-similar sub-problems. Every recursive function needs a **base case** to stop the recursion and prevent an infinite loop.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Example: Calculating factorial using recursion'}</span><br/>
                            <span className="syntax-datatype">long</span> <span className="syntax-function">factorial</span>(<span className="syntax-datatype">int</span> n) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// Base case: if n is 0 or 1, the factorial is 1'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">if</span> (n <span className="syntax-operator">&lt;=</span> <span className="syntax-number">1</span>) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">return</span> <span className="syntax-number">1</span>;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'} <span className="syntax-keyword">else</span> {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// Recursive step: n * factorial of (n-1)'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">return</span> n <span className="syntax-operator">*</span> <span className="syntax-function">factorial</span>(n <span className="syntax-operator">-</span> <span className="syntax-number">1</span>);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">✅ Practice Problems</h2>
                    <p className="mb-4 text-muted-foreground">Test your understanding of functions and recursion with these challenges.</p>
                     <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                        <li>
                            <b className="text-foreground">Recursive Factorial:</b> Write a function that calculates the factorial of a number using recursion (as shown in the example above).
                        </li>
                        <li>
                            <b className="text-foreground">Greatest Common Divisor (GCD):</b> Write a recursive function to find the GCD of two numbers using the Euclidean algorithm. Hint: `gcd(a, b)` is the same as `gcd(b, a % b)` until `b` is `0`.
                        </li>
                        <li>
                            <b className="text-foreground">Tower of Hanoi:</b> A classic recursion puzzle. Write a function that prints the steps to solve the Tower of Hanoi for N disks.
                        </li>
                    </ul>
                </Card>

            </main>
        </div>
    );
}
