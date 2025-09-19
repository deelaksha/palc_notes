
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CStorageClassesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Storage Classes</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Understand how variables are stored and their behavior in a C program.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">What Are Storage Classes?</h2>
                    <p className="mb-4 text-muted-foreground">
                        Storage classes in C are keywords that determine the **scope** (where a variable can be seen), **lifetime** (how long a variable exists in memory), and **storage location** (e.g., memory or CPU registers) of a variable. Understanding them is key to managing your program's data effectively.
                    </p>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. `auto` Storage Class</h2>
                    <p className="mb-4 text-muted-foreground">This is the default storage class for all local variables. You almost never need to type it, as the compiler assumes it for any variable declared inside a function or block.</p>
                     <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><b>Storage:</b> In the stack memory.</li>
                        <li><b>Lifetime:</b> Only exists as long as the block it's in is being executed. It's created when the block is entered and destroyed when the block is exited.</li>
                        <li><b>Scope:</b> Local to the block where it is declared.</li>
                    </ul>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-datatype">void</span> <span className="syntax-function">myFunction</span>() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">auto</span> <span className="syntax-datatype">int</span> localVar <span className="syntax-operator">=</span> <span className="syntax-number">10</span>; <span className="syntax-comment">{'// `auto` is redundant here'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-datatype">int</span> anotherVar <span className="syntax-operator">=</span> <span className="syntax-number">20</span>; <span className="syntax-comment">{'// Also an auto variable by default'}</span><br/>
                            {'}'} <span className="syntax-comment">{'// Both localVar and anotherVar are destroyed here'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. `static` Storage Class</h2>
                    <p className="mb-4 text-muted-foreground">The `static` keyword changes a local variable's lifetime. Instead of being destroyed when its block is exited, a static variable persists throughout the entire program execution, retaining its value between function calls.</p>
                     <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><b>Storage:</b> In the data segment of memory, not the stack.</li>
                        <li><b>Lifetime:</b> The entire duration of the program. It's initialized only once.</li>
                        <li><b>Scope:</b> Remains local to the block where it is declared.</li>
                    </ul>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-datatype">void</span> <span className="syntax-function">counter</span>() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">static</span> <span className="syntax-datatype">int</span> count <span className="syntax-operator">=</span> <span className="syntax-number">0</span>; <span className="syntax-comment">{'// Initialized only on the first call'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;count<span className="syntax-operator">++</span>;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"This function has been called %d times.\n"</span>, count);<br/>
                            {'}'}<br/><br/>
                            <span className="syntax-comment">{'// counter(); // Prints "1 time"'}</span><br/>
                            <span className="syntax-comment">{'// counter(); // Prints "2 times"'}</span><br/>
                            <span className="syntax-comment">{'// counter(); // Prints "3 times"'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. `register` Storage Class</h2>
                    <p className="mb-4 text-muted-foreground">This keyword provides a **hint** to the compiler to store a variable in a CPU register instead of memory (RAM). Since accessing registers is much faster than accessing RAM, this can optimize performance for frequently used variables.</p>
                     <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><b>Storage:</b> CPU register (if the compiler honors the request).</li>
                        <li><b>Lifetime & Scope:</b> Same as `auto`.</li>
                        <li><b>Important:</b> You cannot get the memory address of a register variable (e.g., using `&myVar`) because it might not be in memory. Modern compilers are very good at optimization and often ignore this keyword, making their own decisions about what to place in registers.</li>
                    </ul>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                           <span className="syntax-keyword">register</span> <span className="syntax-datatype">int</span> loopCounter; <span className="syntax-comment">{'// Suggesting this for fast loop access'}</span><br/>
                           <span className="syntax-keyword">for</span> (loopCounter <span className="syntax-operator">=</span> <span className="syntax-number">0</span>; loopCounter <span className="syntax-operator"><</span> <span className="syntax-number">10000</span>; loopCounter<span className="syntax-operator">++</span>) {'{'}<br/>
                           &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// ... some very frequent operation ...'}</span><br/>
                           {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. `extern` Storage Class</h2>
                    <p className="mb-4 text-muted-foreground">The `extern` keyword is used to declare a global variable that is defined in another file. It tells the compiler, "Hey, this variable exists, but its definition and memory are somewhere else. You'll find it when you link all the files together."</p>
                     <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>It does not allocate memory for the variable; it's just a declaration.</li>
                        <li>It's used to share global variables across multiple C source files.</li>
                    </ul>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <CodeBlock>
                            <CodeSyntax>
                                <span className="syntax-comment">{'// In file: main.c'}</span><br/>
                                #<span className="syntax-keyword">include</span> <span className="syntax-string">&lt;stdio.h&gt;</span><br/><br/>
                                <span className="syntax-comment">{'// Declare that `global_var` exists elsewhere'}</span><br/>
                                <span className="syntax-keyword">extern</span> <span className="syntax-datatype">int</span> global_var;<br/><br/>
                                <span className="syntax-datatype">int</span> <span className="syntax-function">main</span>() {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Global var is %d\n"</span>, global_var);<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">return</span> <span className="syntax-number">0</span>;<br/>
                                {'}'}
                            </CodeSyntax>
                        </CodeBlock>
                         <CodeBlock>
                            <CodeSyntax>
                               <span className="syntax-comment">{'// In file: globals.c'}</span><br/><br/>
                                <span className="syntax-comment">{'// Define and initialize the global variable'}</span><br/>
                               <span className="syntax-datatype">int</span> global_var <span className="syntax-operator">=</span> <span className="syntax-number">42</span>;
                            </CodeSyntax>
                        </CodeBlock>
                    </div>
                </Card>

            </main>
        </div>
    );
}
