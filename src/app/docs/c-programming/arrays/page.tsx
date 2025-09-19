
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CArraysPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Arrays</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Learn to store and manage collections of data using arrays.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">What Are Arrays?</h2>
                    <p className="mb-4 text-muted-foreground">
                        An array is a data structure that stores a collection of elements of the same data type in contiguous memory locations. Think of it as a row of numbered boxes, where each box holds a value, and you can access any box by its number (index).
                    </p>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. One-Dimensional (1D) Arrays</h2>
                    <p className="mb-4 text-muted-foreground">
                        A 1D array is the simplest form of an array, representing a single row of elements.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Declaration'}</span><br/>
                            <span className="syntax-datatype">int</span> numbers[5]; <span className="syntax-comment">{'// Declares an array to hold 5 integers'}</span><br/><br/>
                            <span className="syntax-comment">{'// Initialization'}</span><br/>
                            <span className="syntax-datatype">int</span> scores[5] <span className="syntax-operator">=</span> {'{'} <span className="syntax-number">90</span>, <span className="syntax-number">85</span>, <span className="syntax-number">92</span>, <span className="syntax-number">78</span>, <span className="syntax-number">88</span> {'}'};<br/><br/>
                            <span className="syntax-comment">{'// Accessing elements (indices start at 0)'}</span><br/>
                            scores[2] <span className="syntax-operator">=</span> <span className="syntax-number">95</span>; <span className="syntax-comment">{'// Changes the third element to 95'}</span><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"The first score is: %d\n"</span>, scores[0]); <span className="syntax-comment">{'// Prints 90'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Two-Dimensional (2D) Arrays</h2>
                    <p className="mb-4 text-muted-foreground">
                        A 2D array can be visualized as a grid or a table with rows and columns. It's an array of arrays.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// A 2x3 matrix (2 rows, 3 columns)'}</span><br/>
                            <span className="syntax-datatype">int</span> matrix[2][3] <span className="syntax-operator">=</span> {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<span className="syntax-number">1</span>, <span className="syntax-number">2</span>, <span className="syntax-number">3</span>{'}'}, <span className="syntax-comment">{'// Row 0'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<span className="syntax-number">4</span>, <span className="syntax-number">5</span>, <span className="syntax-number">6</span>{'}'}  <span className="syntax-comment">{'// Row 1'}</span><br/>
                            {'};'}<br/><br/>
                            <span className="syntax-comment">{'// Accessing an element'}</span><br/>
                            <span className="syntax-datatype">int</span> element <span className="syntax-operator">=</span> matrix[1][2]; <span className="syntax-comment">{'// Accesses the element in row 1, column 2 (value is 6)'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Array Operations</h2>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Traversal</h3>
                    <p className="mb-4 text-muted-foreground">Traversal means visiting every element of the array. This is typically done with a `for` loop.</p>
                     <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-keyword">for</span>(<span className="syntax-datatype">int</span> i <span className="syntax-operator">=</span> <span className="syntax-number">0</span>; i &lt; <span className="syntax-number">5</span>; i<span className="syntax-operator">++</span>) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"%d "</span>, scores[i]);<br/>
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                    
                     <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Insertion &amp; Deletion</h3>
                     <p className="mb-4 text-muted-foreground">In C, arrays have a fixed size, so you cannot dynamically add or remove elements. "Insertion" and "deletion" mean shifting elements within the array's existing bounds. This is often complex and inefficient. For dynamic collections, linked lists or dynamic memory allocation are better choices.</p>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. Sorting Algorithms in C</h2>
                    <p className="mb-4 text-muted-foreground">Sorting an array means arranging its elements in a specific order (e.g., ascending or descending). Here are some common algorithms.</p>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Bubble Sort</h3>
                    <p className="mb-4 text-muted-foreground">The simplest sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.</p>
                     <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">void</span> <span className="syntax-function">bubbleSort</span>(<span className="syntax-datatype">int</span> arr[], <span className="syntax-datatype">int</span> n) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">for</span> (<span className="syntax-datatype">int</span> i <span className="syntax-operator">=</span> <span className="syntax-number">0</span>; i &lt; n <span className="syntax-operator">-</span> <span className="syntax-number">1</span>; i<span className="syntax-operator">++</span>) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">for</span> (<span className="syntax-datatype">int</span> j <span className="syntax-operator">=</span> <span className="syntax-number">0</span>; j &lt; n <span className="syntax-operator">-</span> i <span className="syntax-operator">-</span> <span className="syntax-number">1</span>; j<span className="syntax-operator">++</span>) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">if</span> (arr[j] &gt; arr[j <span className="syntax-operator">+</span> <span className="syntax-number">1</span>]) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// swap arr[j] and arr[j+1]'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Quicksort</h3>
                    <p className="mb-4 text-muted-foreground">A highly efficient, divide-and-conquer algorithm. It picks an element as a 'pivot' and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.</p>
                     <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Quicksort is more complex and often implemented using recursion.'}</span><br/>
                             <span className="syntax-datatype">void</span> <span className="syntax-function">quicksort</span>(<span className="syntax-datatype">int</span> arr[], <span className="syntax-datatype">int</span> low, <span className="syntax-datatype">int</span> high) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">if</span> (low &lt; high) {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-datatype">int</span> pi <span className="syntax-operator">=</span> <span className="syntax-function">partition</span>(arr, low, high);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">quicksort</span>(arr, low, pi <span className="syntax-operator">-</span> <span className="syntax-number">1</span>);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">quicksort</span>(arr, pi <span className="syntax-operator">+</span> <span className="syntax-number">1</span>, high);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
            </main>
        </div>
    );
}
