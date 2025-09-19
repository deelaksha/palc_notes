
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CLoopsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Loops</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A comprehensive guide to `for`, `while`, and `do-while` loops in C.
                </p>
            </header>

            <main className="space-y-8">

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">Introduction to Loops</h2>
                    <p className="mb-4 text-muted-foreground">
                        Loops are a fundamental programming concept that allows you to execute a block of code repeatedly as long as a certain condition is true. This is essential for tasks that require repetition, such as processing items in a list, performing a calculation multiple times, or waiting for user input.
                    </p>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. The `for` Loop</h2>
                    <p className="mb-4 text-muted-foreground">
                        The `for` loop is perfect when you know exactly how many times you want the loop to run. Its syntax is compact and has three parts:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><strong>Initialization:</strong> A one-time setup statement before the loop starts (e.g., `int i = 0`).</li>
                        <li><strong>Condition:</strong> An expression checked *before* each iteration. The loop runs only if it's true.</li>
                        <li>**Increment/Decrement:** A statement executed at the *end* of each iteration, usually to move closer to the exit condition (e.g., `i++`).</li>
                    </ul>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Example: Printing numbers from 1 to 5'}</span><br />
                            <span className="syntax-keyword">for</span> (<span className="syntax-datatype">int</span> i <span className="syntax-operator">=</span> <span className="syntax-number">1</span><span className="syntax-semicolon">;</span> i <span className="syntax-operator">&lt;=</span> <span className="syntax-number">5</span><span className="syntax-semicolon">;</span> i<span className="syntax-operator">++</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Number: %d\n"</span>, i)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                     <p className="mt-4 mb-4 text-muted-foreground">
                        You can also create a **nested `for` loop** to handle more complex, multi-dimensional tasks like a 2D grid or a multiplication table.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Example: Nested loop for a 3x3 grid'}</span><br />
                            <span className="syntax-keyword">for</span> (<span className="syntax-datatype">int</span> i <span className="syntax-operator">=</span> <span className="syntax-number">0</span><span className="syntax-semicolon">;</span> i <span className="syntax-operator">&lt;</span> <span className="syntax-number">3</span><span className="syntax-semicolon">;</span> i<span className="syntax-operator">++</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">for</span> (<span className="syntax-datatype">int</span> j <span className="syntax-operator">=</span> <span className="syntax-number">0</span><span className="syntax-semicolon">;</span> j <span className="syntax-operator">&lt;</span> <span className="syntax-number">3</span><span className="syntax-semicolon">;</span> j<span className="syntax-operator">++</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"(%d, %d) "</span>, i, j)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. The `while` Loop</h2>
                    <p className="mb-4 text-muted-foreground">
                        The `while` loop is used when the number of iterations is unknown. It continues to execute as long as its condition remains `true`. The condition is checked **before** each iteration, so it might not run at all if the condition is initially false.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Example: Loop until user enters a specific value'}</span><br />
                            <span className="syntax-datatype">int</span> number <span className="syntax-operator">=</span> <span className="syntax-number">0</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Enter the number 10 to exit the loop: "</span>)<span className="syntax-semicolon">;</span><br />
                            <span className="syntax-function">scanf</span>(<span className="syntax-string">"%d"</span>, &amp;number)<span className="syntax-semicolon">;</span><br /><br/>
                            <span className="syntax-keyword">while</span> (number <span className="syntax-operator">!=</span> <span className="syntax-number">10</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"You entered %d. Try again.\n"</span>, number)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Enter 10 to exit: "</span>)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">scanf</span>(<span className="syntax-string">"%d"</span>, &amp;number)<span className="syntax-semicolon">;</span><br />
                            {'}'}<br /><br/>
                             <span className="syntax-function">printf</span>(<span className="syntax-string">"Correct! Exiting loop.\n"</span>)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. The `do-while` Loop</h2>
                    <p className="mb-4 text-muted-foreground">
                        The `do-while` loop is similar to the `while` loop, but its condition is checked at the **end** of each iteration. This means the code block is **guaranteed to execute at least once**, even if the condition is false from the start.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Example: Prompting for a positive number'}</span><br />
                            <span className="syntax-datatype">int</span> positiveNumber<span className="syntax-semicolon">;</span><br />
                            <span className="syntax-keyword">do</span> {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Please enter a positive number: "</span>)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">scanf</span>(<span className="syntax-string">"%d"</span>, &amp;positiveNumber)<span className="syntax-semicolon">;</span><br />
                            {'}'} <span className="syntax-keyword">while</span> (positiveNumber <span className="syntax-operator">&lt;=</span> <span className="syntax-number">0</span>)<span className="syntax-semicolon">;</span><br /><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"You entered: %d\n"</span>, positiveNumber)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. Loop Control Statements</h2>
                    <p className="mb-4 text-muted-foreground">
                        C provides keywords to manually control the flow of a loop from within its body, allowing you to create more complex logic.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><strong>`break`:</strong> Terminates the innermost loop or `switch` statement immediately. Execution resumes at the next statement after the loop.</li>
                        <li><strong>`continue`:</strong> Skips the rest of the current iteration and jumps directly to the next iteration of the loop, re-evaluating the loop's condition.</li>
                    </ul>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Example with `break` and `continue`'}</span><br />
                            <span className="syntax-keyword">for</span> (<span className="syntax-datatype">int</span> i <span className="syntax-operator">=</span> <span className="syntax-number">1</span><span className="syntax-semicolon">;</span> i <span className="syntax-operator">&lt;=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span> i<span className="syntax-operator">++</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// If i is 5, skip this iteration and go to the next one.'}</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">if</span> (i <span className="syntax-operator">==</span> <span className="syntax-number">5</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">continue</span><span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br /><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// Break out of the loop completely if i is greater than 8.'}</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">if</span> (i <span className="syntax-operator">&gt;</span> <span className="syntax-number">8</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">break</span><span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br /><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Processing number: %d\n"</span>, i)<span className="syntax-semicolon">;</span><br />
                            {'}'}<br /><br />
                             <span className="syntax-function">printf</span>(<span className="syntax-string">"Loop finished.\n"</span>)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

            </main>
        </div>
    );
}
