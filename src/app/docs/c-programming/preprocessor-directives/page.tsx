
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CPreprocessorPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming: Preprocessor Directives</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A detailed, point-by-point guide to C preprocessor directives.
                </p>
            </header>

            <main>
                <div className="space-y-8">
                    <Card className="p-6 shadow-lg border-border">
                        <h2 className="text-3xl font-bold mb-4 text-primary">1. Preprocessor Directives</h2>
                        <p className="mb-4 text-muted-foreground">
                            Preprocessor directives are instructions given to the C preprocessor, not to the compiler. They are executed <strong>before</strong> the code is compiled. All preprocessor directives begin with a hash symbol (`#`).
                        </p>

                        <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">`#define` (Macros)</h3>
                        <p className="mb-4 text-muted-foreground">
                            The `#define` directive is used to create a <strong>macro</strong>, which is essentially a symbolic constant or a reusable code snippet. The preprocessor performs a simple text-based substitution, replacing every instance of the macro name with its defined value before compilation.
                        </p>
                        <CodeBlock>
                            <CodeSyntax>
                                <span className="syntax-comment">{'// Defining a symbolic constant'}</span><br />
                                <span className="syntax-keyword">#define</span> PI <span className="syntax-number">3.14159</span><br />
                                <br />
                                <span className="syntax-comment">{'// Defining a function-like macro'}</span><br />
                                <span className="syntax-keyword">#define</span> MAX(a, b) ((a) {'>'} (b) ? (a) : (b))<br />
                                <br />
                                <span className="syntax-datatype">int</span> x <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span><br />
                                <span className="syntax-datatype">int</span> y <span className="syntax-operator">=</span> <span className="syntax-number">20</span><span className="syntax-semicolon">;</span><br />
                                <span className="syntax-datatype">int</span> max_val <span className="syntax-operator">=</span> <span className="syntax-function">MAX</span>(x, y)<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// Preprocessor replaces this with int max_val = ((x) > (y) ? (x) : (y));'}</span>
                            </CodeSyntax>
                        </CodeBlock>

                        <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">`#include` (Header Files)</h3>
                        <p className="mb-4 text-muted-foreground">
                            The `#include` directive is used to include the contents of a specified file. It is the most common preprocessor directive, used to include header files that contain function prototypes, macro definitions, and other declarations needed for your program.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Angle brackets (`&lt;&gt;`)</strong> are used for standard library header files. The preprocessor searches in system-specific locations.</li>
                            <li><strong>Double quotes (`""`)</strong> are used for user-defined header files. The preprocessor first searches the current directory, then system-specific locations.</li>
                        </ul>
                        <CodeBlock className="mt-4">
                            <CodeSyntax>
                                <span className="syntax-comment">{'// Include a standard library header'}</span><br />
                                <span className="syntax-keyword">#include</span> <span className="syntax-string">&lt;stdio.h&gt;</span><br />
                                <br />
                                <span className="syntax-comment">{'// Include a user-defined header'}</span><br />
                                <span className="syntax-keyword">#include</span> <span className="syntax-string">"my_functions.h"</span>
                            </CodeSyntax>
                        </CodeBlock>

                        <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">Conditional Compilation</h3>
                        <p className="mb-4 text-muted-foreground">
                            These directives allow you to compile or ignore sections of code based on a condition, which is useful for debugging, porting code to different platforms, or managing different build configurations.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>`#ifdef`:</strong > Compiles the code block if the macro is defined.</li>
                            <li><strong>`#ifndef`:</strong > Compiles the code block if the macro is <strong>not</strong> defined.</li>
                            <li><strong>`#endif`:</strong > Marks the end of an `#ifdef` or `#ifndef` block.</li>
                            <li><strong>`#undef`:</strong > Undefines a previously defined macro.</li>
                        </ul>
                        <CodeBlock className="mt-4">
                            <CodeSyntax>
                                <span className="syntax-keyword">#define</span> DEBUG_MODE<br />
                                <br />
                                <span className="syntax-keyword">#ifdef</span> DEBUG_MODE<br />
                                &nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Debugging mode is active.\n"</span>)<span className="syntax-semicolon">;</span><br />
                                <span className="syntax-keyword">#endif</span><br />
                                <br />
                                <span className="syntax-comment">{'// You can undefine it later'}</span><br />
                                <span className="syntax-keyword">#undef</span> DEBUG_MODE
                            </CodeSyntax>
                        </CodeBlock>

                        <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">`#pragma` Directives</h3>
                        <p className="mb-4 text-muted-foreground">
                            The `#pragma` directive is a non-standard, compiler-specific directive that allows you to give special instructions to the compiler. The behavior of `#pragma` depends on the compiler being used. A common use is to suppress compiler warnings.
                        </p>
                        <CodeBlock className="mt-4">
                            <CodeSyntax>
                                <span className="syntax-comment">{'// Common use case: suppressing a specific warning in GCC'}</span><br />
                                <span className="syntax-keyword">#pragma</span> GCC diagnostic ignored <span className="syntax-string">"-Wunused-variable"</span>
                            </CodeSyntax>
                        </CodeBlock>
                    </Card>
                </div>
            </main>
        </div>
    );
}
