
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CLinkedListsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming: Linked Lists</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A foundational guide to dynamic data structures.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">What is a Linked List?</h2>
                    <p className="mb-4 text-muted-foreground">
                        A linked list is a linear data structure where elements are not stored at contiguous memory locations. Instead, each element (called a 'node') contains a data field and a pointer (or 'link') to the next node in the sequence. This dynamic structure allows for efficient insertion and deletion of elements.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="comment">{'// A basic node for a singly linked list'}</span><br />
                            <span className="keyword">struct</span> Node {'{'}<br />
                            &nbsp;&nbsp;<span className="datatype">int</span> data<span className="semicolon">;</span><br />
                            &nbsp;&nbsp;<span className="keyword">struct</span> Node <span className="operator">*</span>next<span className="semicolon">;</span><br />
                            {'}'}<span className="semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. Singly Linked List</h2>
                    <p className="mb-4 text-muted-foreground">
                        This is the simplest type of linked list. Each node contains a data field and a single pointer that points to the next node in the list. The last node's pointer points to `NULL`, indicating the end of the list. Traversal is only possible in one direction.
                    </p>
                     <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><b>Pros:</b> Uses less memory per node compared to other types; simpler to implement.</li>
                        <li><b>Cons:</b> Cannot be traversed in reverse.</li>
                    </ul>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Doubly Linked List</h2>
                    <p className="mb-4 text-muted-foreground">
                        In a doubly linked list, each node has two pointers: one pointing to the next node and one pointing to the previous node. This allows for traversal in both forward and backward directions.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="comment">{'// A node for a doubly linked list'}</span><br />
                            <span className="keyword">struct</span> Node {'{'}<br />
                            &nbsp;&nbsp;<span className="datatype">int</span> data<span className="semicolon">;</span><br />
                            &nbsp;&nbsp;<span className="keyword">struct</span> Node <span className="operator">*</span>next<span className="semicolon">;</span> <span className="comment">{'// Pointer to the next node'}</span><br />
                             &nbsp;&nbsp;<span className="keyword">struct</span> Node <span className="operator">*</span>prev<span className="semicolon">;</span> <span className="comment">{'// Pointer to the previous node'}</span><br />
                            {'}'}<span className="semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                        <li><b>Pros:</b> Can be traversed in both directions, making some operations like deletion easier.</li>
                        <li><b>Cons:</b> Requires more memory per node due to the extra pointer.</li>
                    </ul>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Circular Linked List</h2>
                    <p className="mb-4 text-muted-foreground">
                        A circular linked list is a variation where the last node's `next` pointer does not point to `NULL`, but instead points back to the first node of the list, forming a circle. This can be implemented as either a singly or doubly circular linked list.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><b>Pros:</b> Any node can be a starting point. Useful for applications that need to cycle through a list repeatedly, like a playlist or round-robin scheduling.</li>
                        <li><b>Cons:</b> Care must be taken to avoid infinite loops during traversal if the termination condition is not handled correctly.</li>
                    </ul>
                </Card>

            </main>
        </div>
    );
}
