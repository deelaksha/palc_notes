
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

const NodeBox = ({ data, next }: { data: string; next: string }) => (
    <div className="inline-block bg-gray-800 border-2 border-blue-500 rounded-lg p-4 m-2 text-center align-middle">
        <div className="bg-gray-900 text-green-300 p-2 rounded text-center">
            data: {data}
        </div>
        <div className="text-yellow-300 font-mono text-center mt-2">
            next: {next}
        </div>
    </div>
);

const Arrow = ({ direction }: { direction: 'down' | 'right' }) => (
    <span className="text-green-400 text-3xl mx-4 align-middle">
        {direction === 'down' ? '↓' : '→'}
    </span>
);


export default function CSinglyLinkedListPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">Singly Linked Lists in C</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A deep dive into the most fundamental dynamic data structure.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. What is a Linked List?</h2>
                    <p className="mb-4 text-muted-foreground">
                        A **linked list** is a fundamental data structure consisting of a sequence of **nodes**. Unlike an array, a linked list is not stored in a contiguous block of memory. Each node contains a data element and a **pointer** to the next node in the sequence. This dynamic nature makes them perfect for scenarios where the size of the data changes frequently.
                    </p>

                    <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">The `Node` Structure</h3>
                    <p className="mb-4 text-muted-foreground">
                        Every linked list starts with the definition of a `struct` that represents a single node. The most crucial part of this structure is the self-referential pointer, which points to another node of the same type.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-keyword">struct</span> Node {'{'}<br />
                            &nbsp;&nbsp;<span className="syntax-datatype">int</span> data<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;<span className="syntax-keyword">struct</span> Node <span className="syntax-operator">*</span>next<span className="syntax-semicolon">;</span><br />
                            {'};'}
                        </CodeSyntax>
                    </CodeBlock>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                        <li><strong>`data`:</strong> This is the payload of the node. It can be any data type, like an `int`, a `float`, or even another `struct`.</li>
                        <li><strong>`*next`:</strong> This is the self-referential pointer. It holds the memory address of the next `Node` in the list. The last node's `next` pointer is always `NULL`.</li>
                    </ul>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Visual Walkthrough: Creating a List</h2>
                    <p className="mb-4 text-muted-foreground">
                        Let's visualize the process of building a simple linked list with three nodes. We'll track the head pointer and the individual nodes as they are created in memory.
                    </p>

                    <h3 className="text-2xl font-semibold text-secondary-accent mt-6">Step 1: The Head Pointer</h3>
                    <p className="mb-4 text-muted-foreground">
                        First, we create a pointer called `head` and initialize it to `NULL`. This pointer will always point to the very first node in our list. Right now, our list is empty.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-keyword">struct</span> Node <span className="syntax-operator">*</span>head <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span><span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <div className="mt-4 text-center">
                        <span className="text-xl font-bold text-green-300">head</span> → <span className="text-yellow-300">NULL</span>
                    </div>

                    <h3 className="text-2xl font-semibold text-secondary-accent mt-6">Step 2: Creating the First Node</h3>
                    <p className="mb-4 text-muted-foreground">
                        We dynamically allocate memory for the first node, assign a value, and make its `next` pointer `NULL`. We then make the `head` pointer point to this new node.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Allocate memory for the first node'}</span><br />
                            head <span className="syntax-operator">=</span> <span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-keyword">struct</span> Node))<span className="syntax-semicolon">;</span><br />
                            head<span className="syntax-operator">{'->'}</span>data <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span><br />
                            head<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span><span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <div className="mt-4 text-center">
                        <span className="text-xl font-bold text-green-300">head</span><Arrow direction="down" /><br />
                        <NodeBox data="10" next="NULL" />
                    </div>

                    <h3 className="text-2xl font-semibold text-secondary-accent mt-6">Step 3: Adding a Second Node</h3>
                    <p className="mb-4 text-muted-foreground">
                        Now, we create a second node. To link it, we first make the first node's `next` pointer point to this new node. This establishes the link.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                             <span className="syntax-comment">{'// Create a new pointer for the second node'}</span><br />
                            <span className="syntax-keyword">struct</span> Node <span className="syntax-operator">*</span>second_node <span className="syntax-operator">=</span> <span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-keyword">struct</span> Node))<span className="syntax-semicolon">;</span><br />
                            second_node<span className="syntax-operator">{'->'}</span>data <span className="syntax-operator">=</span> <span className="syntax-number">20</span><span className="syntax-semicolon">;</span><br />
                            second_node<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span><span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-comment">{'// Link the first node to the second'}</span><br />
                            head<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">=</span> second_node<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                     <div className="mt-4 text-center">
                        <span className="text-xl font-bold text-green-300">head</span><Arrow direction="down" /><br />
                        <NodeBox data="10" next="Addr of Node 20" />
                        <Arrow direction="right" />
                        <NodeBox data="20" next="NULL" />
                    </div>

                    <h3 className="text-2xl font-semibold text-secondary-accent mt-6">Step 4: Adding a Third Node</h3>
                    <p className="mb-4 text-muted-foreground">
                        The process is the same for every new node. We find the last node in the list and update its `next` pointer to point to the new node.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Create the third node'}</span><br />
                            <span className="syntax-keyword">struct</span> Node <span className="syntax-operator">*</span>third_node <span className="syntax-operator">=</span> <span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-keyword">struct</span> Node))<span className="syntax-semicolon">;</span><br />
                            third_node<span className="syntax-operator">{'->'}</span>data <span className="syntax-operator">=</span> <span className="syntax-number">30</span><span className="syntax-semicolon">;</span><br />
                            third_node<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span><span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-comment">{'// Link the second node to the third'}</span><br />
                            second_node<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">=</span> third_node<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                     <div className="mt-4 text-center">
                         <span className="text-xl font-bold text-green-300">head</span><Arrow direction="down" /><br />
                        <NodeBox data="10" next="Addr of Node 20" />
                        <Arrow direction="right" />
                        <NodeBox data="20" next="Addr of Node 30" />
                        <Arrow direction="right" />
                        <NodeBox data="30" next="NULL" />
                    </div>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Linked List Operations</h2>

                    <h3 className="text-2xl font-semibold text-secondary-accent mt-6 mb-2">3.1 Traversal</h3>
                    <p className="mb-4 text-muted-foreground">
                        To traverse the list, you start at the `head` and follow the `next` pointers until you reach a node whose `next` pointer is `NULL`. This function demonstrates how to print each node's data.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Function to print the linked list'}</span><br />
                            <span className="syntax-keyword">void</span> <span className="syntax-function">printList</span>(<span className="syntax-keyword">struct</span> Node <span className="syntax-operator">*</span>n) {'{'}<br />
                            &nbsp;&nbsp;<span className="syntax-keyword">while</span> (n <span className="syntax-operator">!=</span> <span className="syntax-keyword">NULL</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">" %d "</span>, n<span className="syntax-operator">{'->'}</span>data)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;n <span className="syntax-operator">=</span> n<span className="syntax-operator">{'->'}</span>next<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;{'}'}<br />
                            &nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>

                     <h3 className="text-2xl font-semibold text-secondary-accent mt-6 mb-2">3.2 Insertion at the Beginning</h3>
                    <p className="mb-4 text-muted-foreground">
                        This operation, also known as `push`, adds a new node at the very front of the list. We make the new node's `next` pointer point to the old `head`, and then update the `head` to point to the new node.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-keyword">void</span> <span className="syntax-function">push</span>(<span className="syntax-keyword">struct</span> Node <span className="syntax-operator">**</span>head_ref, <span className="syntax-datatype">int</span> new_data) {'{'}<br />
                            &nbsp;&nbsp;<span className="syntax-keyword">struct</span> Node <span className="syntax-operator">*</span>new_node <span className="syntax-operator">=</span> (<span className="syntax-keyword">struct</span> Node<span className="syntax-operator">*</span>)<span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-keyword">struct</span> Node))<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;new_node<span className="syntax-operator">{'->'}</span>data <span className="syntax-operator">=</span> new_data<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;new_node<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">=</span> (<span className="syntax-operator">*</span>head_ref)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;(<span className="syntax-operator">*</span>head_ref) <span className="syntax-operator">=</span> new_node<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>

                    <h3 className="text-2xl font-semibold text-secondary-accent mt-6 mb-2">3.3 Insertion at the End</h3>
                    <p className="mb-4 text-muted-foreground">
                        To add a node to the end of the list, we first traverse the list until we find the last node (the one whose `next` pointer is `NULL`). We then update this last node's `next` pointer to point to the new node.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-keyword">void</span> <span className="syntax-function">append</span>(<span className="syntax-keyword">struct</span> Node<span className="syntax-operator">**</span> head_ref, <span className="syntax-datatype">int</span> new_data) {'{'}<br />
                            &nbsp;&nbsp;<span className="syntax-keyword">struct</span> Node<span className="syntax-operator">*</span> new_node <span className="syntax-operator">=</span> (<span className="syntax-keyword">struct</span> Node<span className="syntax-operator">*</span>) <span className="syntax-function">malloc</span>(<span className="syntax-keyword">sizeof</span>(<span className="syntax-keyword">struct</span> Node))<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;<span className="syntax-keyword">struct</span> Node <span className="syntax-operator">*</span>last <span className="syntax-operator">=</span> <span className="syntax-operator">*</span>head_ref<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;new_node<span className="syntax-operator">{'->'}</span>data <span className="syntax-operator">=</span> new_data<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;new_node<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">=</span> <span className="syntax-keyword">NULL</span><span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;<span className="syntax-keyword">if</span> (<span className="syntax-operator">*</span>head_ref <span className="syntax-operator">==</span> <span className="syntax-keyword">NULL</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;(<span className="syntax-operator">*</span>head_ref) <span className="syntax-operator">=</span> new_node<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">return</span><span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;{'}'}<br />
                            &nbsp;&nbsp;<span className="syntax-keyword">while</span> (last<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">!=</span> <span className="syntax-keyword">NULL</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;last <span className="syntax-operator">=</span> last<span className="syntax-operator">{'->'}</span>next<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;{'}'}<br />
                            &nbsp;&nbsp;last<span className="syntax-operator">{'->'}</span>next <span className="syntax-operator">=</span> new_node<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
            </main>
        </div>
    );
}

