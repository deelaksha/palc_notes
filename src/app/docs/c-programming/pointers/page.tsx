
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CPointersPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Pointers</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Unlock the power of C by mastering memory addresses, dereferencing, and pointer arithmetic.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">What Are Pointers?</h2>
                    <p className="mb-4 text-muted-foreground">
                        A pointer is a special variable that does not store a value, but instead stores a memory address. It "points to" the location where another variable is stored in your computer's memory. Pointers are one of the most powerful and defining features of C, allowing for direct memory manipulation, dynamic data structures, and efficient function calls.
                    </p>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. Core Pointer Operations</h2>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Declaration, Address-of (`&`), and Dereference (`*`)</h3>
                    <p className="mb-4 text-muted-foreground">
                        <b className="text-foreground">Declaration:</b> You declare a pointer by specifying the data type it will point to, followed by an asterisk `*`. Example: `int *p;` declares a pointer `p` that can point to an integer.
                    </p>
                    <p className="mb-4 text-muted-foreground">
                        <b className="text-foreground">Address-of Operator (`&`):</b> This operator gives you the memory address of a variable.
                    </p>
                    <p className="mb-4 text-muted-foreground">
                        <b className="text-foreground">Dereference Operator (`*`):</b> This operator, when used on a pointer, gives you the value stored at the memory address the pointer is pointing to.
                    </p>
                     <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> age <span className="syntax-operator">=</span> <span className="syntax-number">30</span>; <span className="syntax-comment">{'// A normal integer variable'}</span><br/>
                            <span className="syntax-datatype">int</span> *p_age; <span className="syntax-comment">{'// A pointer to an integer'}</span><br/><br/>
                            p_age <span className="syntax-operator">=</span> &age; <span className="syntax-comment">{'// Store the address of \'age\' in the pointer p_age'}</span><br/><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Value of age: %d\n"</span>, age); <span className="syntax-comment">{'// Prints 30'}</span><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Value via pointer: %d\n"</span>, *p_age); <span className="syntax-comment">{'// Dereference p_age to get the value it points to (prints 30)'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Pointer Types</h2>
                     <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Null Pointer</h3>
                     <p className="mb-4 text-muted-foreground">A pointer that points to nothing. It's a good practice to initialize pointers to `NULL` if you don't have a valid address to assign them yet. This prevents them from pointing to a random, invalid memory location.</p>
                     <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> *p <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span>;
                        </CodeSyntax>
                    </CodeBlock>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Void Pointer (`void *`)</h3>
                    <p className="mb-4 text-muted-foreground">A generic pointer that can point to any data type. You cannot dereference a void pointer directly; you must first cast it to the correct data type.</p>
                </Card>
                
                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Dynamic Memory Allocation</h2>
                    <p className="mb-4 text-muted-foreground">Pointers are essential for dynamic memory allocation, where you request memory from the system at runtime. This is done using functions from the `&lt;stdlib.h&gt;` library.</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><b className="text-foreground">`malloc(size)`</b>: Allocates a block of memory of a specific size and returns a void pointer to it.</li>
                        <li><b className="text-foreground">`free(ptr)`</b>: Releases the block of memory that was allocated, returning it to the system. For every `malloc`, there must be a `free`!</li>
                    </ul>
                     <CodeBlock>
                        <CodeSyntax>
                            #<span className="syntax-keyword">include</span> <span className="syntax-string">&lt;stdlib.h&gt;</span><br/><br/>
                            <span className="syntax-datatype">int</span> *arr;<br/>
                            <span className="syntax-comment">{'// Allocate memory for 5 integers'}</span><br/>
                            arr <span className="syntax-operator">=</span> (<span className="syntax-datatype">int</span>*)<span className="syntax-function">malloc</span>(<span className="syntax-number">5</span> <span className="syntax-operator">*</span> <span className="syntax-keyword">sizeof</span>(<span className="syntax-datatype">int</span>));<br/><br/>
                            <span className="syntax-comment">{'// Use the memory'}</span><br/>
                            arr[<span className="syntax-number">0</span>] <span className="syntax-operator">=</span> <span className="syntax-number">10</span>;<br/><br/>
                            <span className="syntax-comment">{'// Always free the memory when done'}</span><br/>
                            <span className="syntax-function">free</span>(arr);
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. Pass by Reference</h2>
                    <p className="mb-4 text-muted-foreground">Normally, C passes arguments to functions "by value" (a copy). By passing a pointer (an address), you can allow a function to directly modify the original variable. This is called "pass by reference."</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// This function takes a pointer and modifies the original value'}</span><br/>
                            <span className="syntax-datatype">void</span> <span className="syntax-function">addFive</span>(<span className="syntax-datatype">int</span> *num) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;*num <span className="syntax-operator">=</span> *num <span className="syntax-operator">+</span> <span className="syntax-number">5</span>;<br/>
                            {'}'}<br/><br/>
                            <span className="syntax-datatype">int</span> main() {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-datatype">int</span> my_val <span className="syntax-operator">=</span> <span className="syntax-number">10</span>;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">addFive</span>(&my_val); <span className="syntax-comment">{'// Pass the address of my_val'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// my_val is now 15'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">return</span> <span className="syntax-number">0</span>;<br/>
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

            </main>
        </div>
    );
}
