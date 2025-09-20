
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CAdvancedMemoryPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming: Advanced Memory Concepts</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A deep dive into how C manages memory.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. Stack vs Heap Memory</h2>
                    <p className="mb-4 text-muted-foreground">
                        C programs use two main areas for memory allocation: the <strong>stack</strong> and the <strong>heap</strong>. Understanding the difference is crucial for writing efficient and safe code.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div>
                            <h3 className="text-2xl font-semibold text-secondary-accent mb-2">The Stack</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>Automatic Allocation:</strong> Memory is automatically managed by the compiler.</li>
                                <li><strong>LIFO (Last-In, First-Out):</strong> Variables are pushed onto and popped off the stack.</li>
                                <li><strong>Fast Access:</strong> Memory allocation and deallocation is extremely quick.</li>
                                <li><strong>Limited Size:</strong> The stack size is fixed and relatively small.</li>
                                <li><strong>Used For:</strong> Local variables and function calls.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-secondary-accent mb-2">The Heap</h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>Dynamic Allocation:</strong> Memory is managed manually by the programmer using functions like `malloc()` and `free()`.</li>
                                <li><strong>Flexible Size:</strong> You can request memory as needed during runtime.</li>
                                <li><strong>Slower Access:</strong> Allocation and deallocation are slower than the stack.</li>
                                <li><strong>Potential for Errors:</strong> Prone to memory leaks and fragmentation if not managed correctly.</li>
                                <li><strong>Used For:</strong> Dynamic data structures like linked lists, trees, and large arrays.</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Dangling Pointer</h2>
                    <p className="mb-4 text-muted-foreground">
                        A <strong>dangling pointer</strong> is a pointer that points to a memory location that has been deallocated (freed). Attempting to dereference a dangling pointer leads to <strong>undefined behavior</strong>, which can cause a program to crash or produce unexpected results.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            #<span className="syntax-keyword">include</span> <span className="syntax-string">&lt;stdlib.h&gt;</span><br />
                            <br />
                            <span className="syntax-comment">{'// Example of a dangling pointer'}</span><br />
                            <span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>ptr <span className="syntax-operator">=</span> (<span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>)<span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-datatype">int</span>))<span className="syntax-semicolon">;</span><br />
                            <span className="syntax-operator">*</span>ptr <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-function">free</span>(ptr)<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// The memory is deallocated'}</span><br />
                            <br />
                            <span className="syntax-comment">{'// \'ptr\' is now a dangling pointer.'}</span><br />
                            <span className="syntax-comment">{'// This will cause undefined behavior.'}</span><br />
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Value: %d\n"</span>, <span className="syntax-operator">*</span>ptr)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mt-4 text-muted-foreground">
                        <strong>Prevention:</strong> Always set a pointer to `NULL` after freeing the memory it points to. A `NULL` pointer is a safe pointer.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// The correct way to prevent a dangling pointer'}</span><br />
                            <span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>ptr <span className="syntax-operator">=</span> (<span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>)<span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-datatype">int</span>))<span className="syntax-semicolon">;</span><br />
                            <span className="syntax-function">free</span>(ptr)<span className="syntax-semicolon">;</span><br />
                            ptr <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span><span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Memory Leak</h2>
                    <p className="mb-4 text-muted-foreground">
                        A <strong>memory leak</strong> occurs when a program allocates memory dynamically but fails to free it when it is no longer needed. This "leaked" memory remains allocated for the entire duration of the program, making it unavailable for other parts of the application or other processes.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// A memory leak occurs here'}</span><br />
                            <span className="syntax-keyword">void</span> <span className="syntax-function">leak_memory</span>() {'{'}<br />
                            &nbsp;&nbsp;<span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>ptr <span className="syntax-operator">=</span> (<span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>)<span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-datatype">int</span>))<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;<span className="syntax-comment">{'// We lose the pointer to the allocated memory.'}</span><br />
                            &nbsp;&nbsp;<span className="syntax-comment">{'// The memory is not freed and is now a memory leak.'}</span><br />
                            &nbsp;&nbsp;<span className="syntax-keyword">return</span><span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. Wild Pointer</h2>
                    <p className="mb-4 text-muted-foreground">
                        A <strong>wild pointer</strong> is a pointer that has been declared but not initialized. It holds an arbitrary, garbage value that could point to any random memory location. Dereferencing a wild pointer is highly dangerous and can lead to a program crash or corrupting other parts of the program's memory.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Example of a wild pointer'}</span><br />
                            <span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>wild_ptr<span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-comment">{'// This is extremely dangerous and unpredictable!'}</span><br />
                            <span className="syntax-operator">*</span>wild_ptr <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mt-4 text-muted-foreground">
                        <strong>Prevention:</strong> Always initialize pointers to a valid address or to `NULL` to ensure they are never wild.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// A safe way to initialize a pointer'}</span><br />
                            <span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>safe_ptr <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span><span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">5. Double Free Error</h2>
                    <p className="mb-4 text-muted-foreground">
                        A <strong>double free error</strong> occurs when you try to call `free()` on the same block of memory more than once. This can lead to heap corruption, which is a serious issue that can cause crashes and security vulnerabilities.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            #<span className="syntax-keyword">include</span> <span className="syntax-string">&lt;stdlib.h&gt;</span><br />
                            <br />
                            <span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>ptr <span className="syntax-operator">=</span> (<span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>)<span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-datatype">int</span>))<span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-function">free</span>(ptr)<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// First free is correct'}</span><br />
                            <br />
                            <span className="syntax-comment">{'// This will cause a double free error and corrupt the heap!'}</span><br />
                            <span className="syntax-function">free</span>(ptr)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                     <p className="mt-4 text-muted-foreground">
                        <strong>Prevention:</strong> Always set the pointer to `NULL` immediately after freeing its memory, as `free(NULL)` is a safe and valid operation that does nothing.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>ptr <span className="syntax-operator">=</span> (<span className="syntax-datatype">int</span> <span className="syntax-operator">*</span>)<span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-datatype">int</span>))<span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-function">free</span>(ptr)<span className="syntax-semicolon">;</span><br />
                            ptr <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span><span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-comment">{'// This second call to free is now safe.'}</span><br />
                            <span className="syntax-function">free</span>(ptr)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

            </main>
        </div>
    );
}
