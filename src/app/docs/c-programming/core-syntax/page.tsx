
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CBasicsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Core Syntax</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A detailed, point-by-point guide to the fundamental concepts of C programming.
                </p>
            </header>

            <main>
            <div className="space-y-8">

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. Keywords & Identifiers</h2>
                    <p className="mb-4 text-muted-foreground">
                        <span className="font-semibold text-foreground">Keywords</span> are a set of predefined, reserved words in C that have special meanings. They cannot be used as variable names. Examples include `int`, `for`, `while`, and `if`.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> a <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// `int` is a keyword'}</span><br />
                            <span className="syntax-keyword">if</span> (a <span className="syntax-operator">{'>'}</span> <span className="syntax-number">5</span>) {'{'} <span className="syntax-comment">{'// `if` is a keyword'}</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"a is greater than 5"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mb-4 mt-4 text-muted-foreground">
                        <span className="font-semibold text-foreground">Identifiers</span> are names given to variables, functions, and arrays. They are user-defined and must follow specific rules:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>They can only contain letters (A-Z, a-z), digits (0-9), or the underscore (_).</li>
                        <li>They must start with a letter or an underscore.</li>
                        <li>They are case-sensitive (e.g., `myVar` is different from `myvar`).</li>
                        <li>They cannot be a keyword.</li>
                    </ul>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Valid identifiers'}</span><br />
                            <span className="syntax-datatype">int</span> my_variable<span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">float</span> totalSum<span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">char</span> _status<span className="syntax-semicolon">;</span><br /><br />
                            <span className="syntax-comment">{'// Invalid identifiers'}</span><br />
                            <span className="syntax-comment">{'// int 1st_number; (starts with a digit)'}</span><br />
                            <span className="syntax-comment">{'// float new-variable; (contains a hyphen)'}</span><br />
                            <span className="syntax-comment">{'// double int; (is a keyword)'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Variables & Constants</h2>
                    <p className="mb-4 text-muted-foreground">
                        <span className="font-semibold text-foreground">Variables</span> are memory locations used to store data. They can be changed during program execution. They must be declared with a data type before use.
                    </p>
                    <CodeBlock className="mb-4">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> score <span className="syntax-operator">=</span> <span className="syntax-number">0</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// Declaration and initialization'}</span><br />
                            score <span className="syntax-operator">=</span> <span className="syntax-number">100</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// Value can be changed'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mb-4 text-muted-foreground">
                        <span className="font-semibold text-foreground">Constants</span> are like variables, but their values cannot be modified once they are defined. They are useful for storing fixed values like PI or a maximum size.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            #<span className="syntax-keyword">define</span> PI <span className="syntax-number">3.14159</span> <span className="syntax-comment">{'// Using the preprocessor directive'}</span><br />
                            <span className="syntax-keyword">const</span> <span className="syntax-datatype">float</span> G <span className="syntax-operator">=</span> <span className="syntax-number">9.8</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// Using the `const` keyword'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Data Types</h2>
                    <p className="mb-4 text-muted-foreground">
                        Data types specify the size and type of values that can be stored in a variable. Here are the core data types in C:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><span className="font-semibold text-foreground">int:</span> Used to store integers (whole numbers) like 5, -10, or 100. Typically occupies 4 bytes.</li>
                        <li><span className="font-semibold text-foreground">char:</span> Used to store a single character, like 'A', 'b', or '5'. Occupies 1 byte.</li>
                        <li><span className="font-semibold text-foreground">float:</span> Used to store single-precision floating-point numbers (numbers with decimal points). Typically 4 bytes.</li>
                        <li><span className="font-semibold text-foreground">double:</span> Used to store double-precision floating-point numbers. Provides more precision than `float`. Typically 8 bytes.</li>
                        <li><span className="font-semibold text-foreground">void:</span> An incomplete type that represents the absence of a value. It's used for functions that don't return a value or for generic pointers.</li>
                    </ul>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> age <span className="syntax-operator">=</span> <span className="syntax-number">30</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">char</span> initial <span className="syntax-operator">=</span> <span className="syntax-string">'G'</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">float</span> price <span className="syntax-operator">=</span> <span className="syntax-number">19.99</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">double</span> pi_exact <span className="syntax-operator">=</span> <span className="syntax-number">3.1415926535</span><span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. Input/Output (scanf, printf)</h2>
                    <p className="mb-4 text-muted-foreground">
                        The `&lt;stdio.h&gt;` header file provides functions for standard input and output.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><span className="font-semibold text-foreground">printf():</span> Used to print formatted output to the console. It uses format specifiers to insert values into a string.</li>
                        <li><span className="font-semibold text-foreground">scanf():</span> Used to read formatted input from the user. It requires a format specifier and the address of the variable where the data should be stored.</li>
                    </ul>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            #<span className="syntax-keyword">include</span> <span className="syntax-string">&lt;stdio.h&gt;</span><br />
                            <span className="syntax-datatype">int</span> <span className="syntax-function">main</span>() {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-datatype">int</span> userAge<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Enter your age: "</span>)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">scanf</span>(<span className="syntax-string">"%d"</span>, &amp;userAge)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"You are %d years old.\\n"</span>, userAge)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">return</span> <span className="syntax-number">0</span><span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">5. Type Casting</h2>
                    <p className="mb-4 text-muted-foreground">
                        Type casting is the process of converting a value from one data type to another. It can be done either implicitly or explicitly.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><span className="font-semibold text-foreground">Implicit Casting (Coercion):</span> The compiler automatically converts the data type, usually from a smaller to a larger type.</li>
                        <li><span className="font-semibold text-foreground">Explicit Casting:</span> You manually force a conversion using the cast operator `(type)`. This is often required when converting from a larger to a smaller type to avoid data loss.</li>
                    </ul>
                    <CodeBlock className="mt-4">
                         <CodeSyntax>
                            <span className="syntax-comment">{'// Implicit Casting'}</span><br />
                            <span className="syntax-datatype">int</span> a <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">double</span> b <span className="syntax-operator">=</span> a<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// `a` is implicitly converted to a double'}</span><br />
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"b = %f\\n"</span>, b)<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// Prints 10.000000'}</span><br /><br />
                            <span className="syntax-comment">{'// Explicit Casting'}</span><br />
                            <span className="syntax-datatype">double</span> c <span className="syntax-operator">=</span> <span className="syntax-number">5.75</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">int</span> d <span className="syntax-operator">=</span> (<span className="syntax-datatype">int</span>)c<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// `c` is explicitly cast to an int'}</span><br />
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"d = %d\\n"</span>, d)<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// Prints 5 (the decimal part is truncated)'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
            </div>
        </main>

        </div>
    );
}
