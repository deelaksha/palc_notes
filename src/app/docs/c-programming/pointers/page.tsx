
'use client';

import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MemoryStick, MousePointer, Binary, Link as LinkIcon, Lock } from 'lucide-react';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

const MemoryCell = ({ address, value, label, isPointer, isHighlighted }: { address: string; value: string; label?: string; isPointer?: boolean; isHighlighted?: boolean; }) => (
    <div className={`relative p-2 rounded-md ${isHighlighted ? 'bg-blue-500/30 border-2 border-blue-400' : 'bg-gray-700/50'}`}>
        <div className="text-xs text-gray-400 font-mono absolute -top-5 left-1">{address}</div>
        <div className={`text-lg font-bold font-mono text-center ${isPointer ? 'text-amber-400' : 'text-green-300'}`}>{value}</div>
        {label && <div className="text-center text-xs mt-1 text-white">{label}</div>}
    </div>
);

const PointerVisualizer = () => (
    <div className="space-y-8">
        <h4 className="text-xl font-semibold text-center text-gray-300">Memory Layout</h4>
        <div className="grid grid-cols-4 gap-x-8 gap-y-12 items-center relative">
            <MemoryCell address="0x7ffc..." value="30" label="age" isHighlighted />
            <div className="absolute top-1/2 left-1/4 w-1/4 h-0.5 bg-amber-400/50" />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 border-r-2 border-b-2 border-amber-400/50 transform -translate-y-1/2 rotate-[-45deg]" />
            <div className="col-start-3">
                <MemoryCell address="0x7ffd..." value="0x7ffc..." label="p_age" isPointer isHighlighted />
            </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">The pointer <code className="font-mono text-amber-400">p_age</code> doesn't hold the value <code className="font-mono text-green-300">30</code>. It holds the memory address of the variable <code className="font-mono text-white">age</code>.</p>
    </div>
);

const ArrayPointerVisualizer = () => {
    const [index, setIndex] = useState(0);
    const array = [10, 20, 30, 40, 50];

    const handleNext = () => setIndex(prev => (prev + 1) % array.length);
    const handleReset = () => setIndex(0);

    return (
        <div className="p-4 bg-gray-900/50 rounded-lg">
             <h4 className="text-xl font-semibold text-center text-gray-300 mb-6">Array Traversal with a Pointer</h4>
            <div className="flex justify-center items-center gap-2 relative h-24">
                {array.map((val, i) => (
                    <div key={i} className="relative w-16 h-16 border-2 border-gray-600 flex items-center justify-center rounded-md">
                        <span className="text-xl font-bold text-green-300">{val}</span>
                    </div>
                ))}
                 <AnimatePresence>
                    <motion.div
                        className="absolute top-0 flex flex-col items-center"
                        initial={{ left: '10%' }}
                        animate={{ left: `${10 + index * 21}%` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <span className="font-mono text-amber-400">ptr</span>
                        <MousePointer className="w-6 h-6 text-amber-400 transform rotate-90" />
                    </motion.div>
                </AnimatePresence>
            </div>
             <p className="text-center text-sm text-gray-400 my-4">
                Current pointer value: <code className="font-mono text-amber-400">*(ptr + {index})</code> which is <code className="font-mono text-green-300">{array[index]}</code>.
            </p>
            <div className="flex justify-center gap-4">
                <Button onClick={handleNext}>ptr++</Button>
                <Button onClick={handleReset} variant="outline">Reset</Button>
            </div>
        </div>
    );
};

export default function CPointersPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <MousePointer className="size-12 text-primary" />
                </div>
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">A Deep Dive into C Pointers</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Unlock the full power of C by mastering memory addresses, pointer arithmetic, and advanced pointer types.
                </p>
            </header>

            <main className="space-y-12">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. What Are Pointers?</h2>
                    <p className="mb-4 text-muted-foreground">
                        A pointer is a special variable that does not store a value itself, but instead stores a **memory address**. It "points to" the location where another variable lives in your computer's RAM. They are the foundation for dynamic memory allocation, complex data structures, and efficient function arguments in C.
                    </p>
                    <PointerVisualizer />
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Core Pointer Operations</h2>
                    <p className="mb-4 text-muted-foreground">There are two fundamental operators for working with pointers:</p>
                    <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                        <li><strong className="text-foreground">Address-of Operator (`&`):</strong> When placed before a variable, it returns that variable's memory address.</li>
                        <li><strong className="text-foreground">Dereference Operator (`*`):</strong> When placed before a pointer variable, it "goes to" the address stored in the pointer and retrieves the value stored there.</li>
                    </ul>
                     <CodeBlock className="my-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> age <span className="syntax-operator">=</span> <span className="syntax-number">30</span>; <span className="syntax-comment">{'// A normal integer variable'}</span><br/>
                            <span className="syntax-datatype">int</span> *p_age; <span className="syntax-comment">{'// Declare a pointer that can point to an integer'}</span><br/><br/>
                            p_age <span className="syntax-operator">=</span> &age; <span className="syntax-comment">{'// Store the ADDRESS OF \'age\' in the pointer p_age'}</span><br/><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Address of age: %p\\n"</span>, &age);<br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Value in p_age: %p\\n"</span>, p_age); <span className="syntax-comment">{'// Prints the same address'}</span><br/><br/>
                            <span className="syntax-comment">{'// To get the value 30, we must DEREFERENCE the pointer'}</span><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Value pointed to by p_age: %d\\n"</span>, *p_age); <span className="syntax-comment">{'// Prints 30'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary flex items-center gap-2"><Binary /> 3. Pointer Arithmetic</h2>
                    <p className="mb-4 text-muted-foreground">You can perform arithmetic operations on pointers. When you add `1` to a pointer, it doesn't add `1` to the memory address. Instead, it increments the address by the `sizeof` the data type it points to. This makes it easy to move between elements in an array.</p>
                    <ArrayPointerVisualizer />
                    <CodeBlock className="mt-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> arr[5] <span className="syntax-operator">=</span> {'{10, 20, 30, 40, 50}'};<br/>
                            <span className="syntax-datatype">int</span> *ptr <span className="syntax-operator">=</span> arr; <span className="syntax-comment">{'// ptr points to arr[0]'}</span><br/><br/>
                            ptr<span className="syntax-operator">++</span>; <span className="syntax-comment">{'// ptr now points to arr[1]. The address increased by sizeof(int).'}</span><br/>
                             <span className="syntax-function">printf</span>(<span className="syntax-string">"Value: %d"</span>, *ptr); <span className="syntax-comment">{'// Prints 20'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary flex items-center gap-2"><LinkIcon /> 4. Pointers and Arrays</h2>
                     <p className="mb-4 text-muted-foreground">In C, pointers and arrays are deeply connected. The name of an array acts as a constant pointer to its first element.</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li>`arr` is equivalent to `&arr[0]`.</li>
                        <li>`*(arr + i)` is equivalent to `arr[i]`.</li>
                    </ul>
                     <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> numbers[3] <span className="syntax-operator">=</span> {'{100, 200, 300}'};<br/>
                            <span className="syntax-comment">{'// These three lines all print the value 200'}</span><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"%d\\n"</span>, numbers[1]);<br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"%d\\n"</span>, *(numbers + 1));<br/>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary flex items-center gap-2"><Cpu /> 5. Dynamic Memory Allocation</h2>
                    <p className="mb-4 text-muted-foreground">Pointers are essential for dynamic memory allocation—requesting memory from the heap at runtime. This is done with functions from `&lt;stdlib.h&gt;`.</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><b className="text-foreground">`malloc(size)`</b>: Allocates a block of memory of a specific size and returns a void pointer to it.</li>
                        <li><b className="text-foreground">`calloc(num, size)`</b>: Allocates memory for an array of `num` elements of `size` bytes each and initializes them to zero.</li>
                        <li><b className="text-foreground">`free(ptr)`</b>: Releases the block of memory, returning it to the system. For every `malloc`/`calloc`, there must be a `free` to prevent memory leaks!</li>
                    </ul>
                     <CodeBlock>
                        <CodeSyntax>
                            #<span className="syntax-keyword">include</span> <span className="syntax-string">&lt;stdlib.h&gt;</span><br/><br/>
                            <span className="syntax-datatype">int</span> *arr;<br/>
                            <span className="syntax-comment">{'// Allocate memory for 5 integers'}</span><br/>
                            arr <span className="syntax-operator">=</span> (<span className="syntax-datatype">int</span>*)<span className="syntax-function">malloc</span>(<span className="syntax-number">5</span> <span className="syntax-operator">*</span> <span className="syntax-keyword">sizeof</span>(<span className="syntax-datatype">int</span>));<br/><br/>
                            <span className="syntax-keyword">if</span> (arr == <span className="syntax-keyword">NULL</span>) {'{ /* Always check for allocation failure */ }'}<br/><br/>
                            arr[<span className="syntax-number">0</span>] <span className="syntax-operator">=</span> <span className="syntax-number">10</span>;<br/><br/>
                            <span className="syntax-comment">{'// Always free the memory when done'}</span><br/>
                            <span className="syntax-function">free</span>(arr);
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">6. Advanced Pointer Types</h2>
                     <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Pointer to Pointer (`**ptr`)</h3>
                            <p className="mb-4 text-muted-foreground">A pointer to a pointer (or double pointer) is a variable that holds the memory address of another pointer. This is useful for functions that need to modify the original pointer itself, not just the value it points to.</p>
                             <CodeBlock>
                                <CodeSyntax>
                                    <span className="syntax-datatype">int</span> x <span className="syntax-operator">=</span> <span className="syntax-number">10</span>;<br/>
                                    <span className="syntax-datatype">int</span> *p <span className="syntax-operator">=</span> &x;<br/>
                                    <span className="syntax-datatype">int</span> **pp <span className="syntax-operator">=</span> &p;<br/><br/>
                                     <span className="syntax-function">printf</span>(<span className="syntax-string">"Value of x = %d\\n"</span>, **pp); <span className="syntax-comment">{'// Prints 10'}</span>
                                </CodeSyntax>
                            </CodeBlock>
                        </div>

                         <div>
                            <h3 className="text-2xl font-semibold mb-2 text-secondary-accent flex items-center gap-2"><Lock />Pointers and `const`</h3>
                             <p className="mb-4 text-muted-foreground">The `const` keyword can be used with pointers in two ways to enforce read-only access:</p>
                              <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                                <li><b className="text-foreground">Pointer to a Constant:</b> The data pointed to cannot be changed, but the pointer itself can be moved to point to something else.</li>
                                <li><b className="text-foreground">Constant Pointer:</b> The pointer must always point to the same address, but the data at that address can be changed.</li>
                            </ul>
                            <CodeBlock className="mt-4">
                                <CodeSyntax>
                                    <span className="syntax-keyword">const</span> <span className="syntax-datatype">int</span> *ptr_to_const; <span className="syntax-comment">{'// Data is const, pointer is not'}</span><br/>
                                    <span className="syntax-datatype">int</span> * <span className="syntax-keyword">const</span> const_ptr; <span className="syntax-comment">{'// Pointer is const, data is not'}</span>
                                </CodeSyntax>
                            </CodeBlock>
                        </div>
                        
                         <div>
                            <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Function Pointers</h3>
                             <p className="mb-4 text-muted-foreground">You can declare a pointer that holds the memory address of a function. This allows you to pass functions as arguments to other functions or to create arrays of functions, enabling powerful dynamic behavior.</p>
                             <CodeBlock>
                                <CodeSyntax>
                                    <span className="syntax-comment">{'// Declare a pointer that can hold a function taking two ints and returning an int'}</span><br/>
                                    <span className="syntax-datatype">int</span> (*operation)(<span className="syntax-datatype">int</span>, <span className="syntax-datatype">int</span>);<br/><br/>
                                    <span className="syntax-comment">{'// Point it to an 'add' function'}</span><br/>
                                    operation = &add;<br/><br/>
                                    <span className="syntax-comment">{'// Call the function through the pointer'}</span><br/>
                                    <span className="syntax-datatype">int</span> result <span className="syntax-operator">=</span> (*operation)(<span className="syntax-number">5</span>, <span className="syntax-number">3</span>); <span className="syntax-comment">{'// result is 8'}</span>
                                </CodeSyntax>
                            </CodeBlock>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
}
