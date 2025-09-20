
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CStructsUnionsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming: Structures & Unions</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A detailed, point-by-point guide to structures and unions in C.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. Structures (`struct`)</h2>
                    <p className="mb-4 text-muted-foreground">
                        A <strong>structure</strong> in C is a user-defined data type that allows you to group different data types into a single unit. This is useful for representing real-world objects with multiple, related attributes, such as a student, a book, or a point in a 2D plane.
                    </p>
                    <p className="mb-4 text-muted-foreground">
                        The `struct` keyword is used to define a structure.
                    </p>
                    <CodeBlock className="mb-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Syntax for defining a structure'}</span><br/>
                            <span className="syntax-keyword">struct</span> Student {'{'}<br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">char</span> name[50]<span className="syntax-semicolon">;</span><br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">int</span> roll_number<span className="syntax-semicolon">;</span><br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">float</span> marks<span className="syntax-semicolon">;</span><br/>
                            {'};'}
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mb-4 text-muted-foreground">
                        To use this structure, you declare a variable of that type, just like you would with a built-in data type.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-keyword">struct</span> Student s1<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Access Operators (`.` and `->`)</h2>
                    <p className="mb-4 text-muted-foreground">
                        Once you have a structure variable, you need a way to access its individual members. C provides two operators for this:
                    </p>
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Dot Operator (`.`)</h3>
                    <p className="mb-4 text-muted-foreground">Used to access members of a structure variable directly.</p>
                    <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-keyword">struct</span> Student s1<span className="syntax-semicolon">;</span><br/>
                            <span className="syntax-function">strcpy</span>(s1.name, <span className="syntax-string">"Alice"</span>)<span className="syntax-semicolon">;</span><br/>
                            s1.roll_number <span className="syntax-operator">=</span> <span className="syntax-number">101</span><span className="syntax-semicolon">;</span><br/>
                            s1.marks <span className="syntax-operator">=</span> <span className="syntax-number">95.5</span><span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>

                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">Arrow Operator (`->`)</h3>
                    <p className="mb-4 text-muted-foreground">Used to access members of a structure through a <strong>pointer</strong> to that structure. It is a shorthand for dereferencing the pointer and then using the dot operator.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-keyword">struct</span> Student* ptr_s1 <span className="syntax-operator">=</span> &s1<span className="syntax-semicolon">;</span><br/>
                            <span className="syntax-comment">{'// Both of these lines do the same thing:'}</span><br/>
                            ptr_s1-&gt;roll_number <span className="syntax-operator">=</span> <span className="syntax-number">102</span><span className="syntax-semicolon">;</span><br/>
                            (*ptr_s1).roll_number <span className="syntax-operator">=</span> <span className="syntax-number">102</span><span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Nested Structures</h2>
                    <p className="mb-4 text-muted-foreground">
                        You can define a structure inside another structure. This is called a <strong>nested structure</strong> and is useful for organizing complex data.
                    </p>
                    <CodeBlock className="mb-4">
                        <CodeSyntax>
                            <span className="syntax-keyword">struct</span> Address {'{'}<br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">char</span> street[50]<span className="syntax-semicolon">;</span><br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">char</span> city[50]<span className="syntax-semicolon">;</span><br/>
                            {'};'}<br/>
                            <br/>
                            <span className="syntax-keyword">struct</span> Student {'{'}<br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">int</span> roll_number<span className="syntax-semicolon">;</span><br/>
                            &nbsp;&nbsp;<span className="syntax-keyword">struct</span> Address addr<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// Nested structure'}</span><br/>
                            {'};'}
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mb-4 text-muted-foreground">
                        To access a member of the inner structure, you use the dot operator multiple times.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-keyword">struct</span> Student s1<span className="syntax-semicolon">;</span><br/>
                            <span className="syntax-function">strcpy</span>(s1.addr.city, <span className="syntax-string">"New York"</span>)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. `typedef` for Renaming</h2>
                    <p className="mb-4 text-muted-foreground">
                        The `typedef` keyword is used to create a new name, or alias, for an existing data type. It is commonly used with structures to simplify the syntax when declaring variables, making the code cleaner and more readable.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-keyword">typedef</span> <span className="syntax-keyword">struct</span> {'{'}<br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">char</span> name[50]<span className="syntax-semicolon">;</span><br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">int</span> age<span className="syntax-semicolon">;</span><br/>
                            {'}'} Person<span className="syntax-semicolon">;</span><br/>
                            <br/>
                            <span className="syntax-comment">{'// Now you can declare a variable without the \'struct\' keyword'}</span><br/>
                            Person p1<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">5. Unions (`union`)</h2>
                    <p className="mb-4 text-muted-foreground">
                        A <strong>union</strong> is a special data type that allows you to store different data types in the <strong>same memory location</strong>. This means that a union can hold only one member's value at any given time.
                    </p>
                    <p className="mb-4 text-muted-foreground">
                        The size of a union is equal to the size of its largest member. This is a key difference from structures, where the size is the sum of all members' sizes.
                    </p>
                    <p className="my-4 text-center text-sm text-muted-foreground">
                        A structure allocates memory for all members, while a union's members share the same memory block.
                    </p>
                    <CodeBlock className="mb-4">
                        <CodeSyntax>
                            <span className="syntax-keyword">union</span> Data {'{'}<br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">int</span> i<span className="syntax-semicolon">;</span><br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">float</span> f<span className="syntax-semicolon">;</span><br/>
                            &nbsp;&nbsp;<span className="syntax-datatype">char</span> c<span className="syntax-semicolon">;</span><br/>
                            {'};'}<br/>
                            <br/>
                            <span className="syntax-keyword">union</span> Data data<span className="syntax-semicolon">;</span><br/>
                            <br/>
                            <span className="syntax-comment">{'// The size of \'data\' is the size of the largest member (float)'}</span><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Size of union: %lu\\n"</span>, <span className="syntax-function">sizeof</span>(data))<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mb-4 text-muted-foreground">
                        Because the memory is shared, accessing a member that was not the last one written will result in unpredictable behavior. You must be careful to use only the active member.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-keyword">union</span> Data data<span className="syntax-semicolon">;</span><br/>
                            <br/>
                            <span className="syntax-comment">{'// Write to the integer member'}</span><br/>
                            data.i <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span><br/>
                            <br/>
                            <span className="syntax-comment">{'// The value of \'f\' and \'c\' is now garbage!'}</span><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Integer: %d\\n"</span>, data.i)<span className="syntax-semicolon">;</span><br/>
                            <br/>
                            <span className="syntax-comment">{'// Overwrite with a new value (float)'}</span><br/>
                            data.f <span className="syntax-operator">=</span> <span className="syntax-number">22.5</span><span className="syntax-semicolon">;</span><br/>
                            <br/>
                            <span className="syntax-comment">{'// Now, \'i\' and \'c\' are garbage!'}</span><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Float: %f\\n"</span>, data.f)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                <Card className="p-6 rounded-xl shadow-lg border" style={{backgroundColor: '#1A1A1A', borderColor: '#333333'}}>
                    <h2 className="text-3xl font-bold mb-4 text-primary">6. Enumerations (`enum`)</h2>
                    <p className="mb-4 text-muted-foreground">
                        An <strong>enumeration</strong> is a user-defined data type that consists of a set of named integer constants. This makes your code more readable and easier to maintain by allowing you to use descriptive names instead of "magic numbers." The keyword used to define an enumeration is `enum`.
                    </p>
                    <CodeBlock className="mt-4 mb-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Defining an enumeration for colors'}</span><br />
                            <span className="syntax-keyword">enum</span> colors {'{'}<br />
                            &nbsp;&nbsp;RED,<br />
                            &nbsp;&nbsp;GREEN,<br />
                            &nbsp;&nbsp;BLUE<br />
                            {'};'}
                        </CodeSyntax>
                    </CodeBlock>
                    <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">Implicit Integer Values</h3>
                    <p className="mb-4 text-muted-foreground">
                        By default, the values in an enumeration are assigned integer values starting from `0`. Each subsequent value is incremented by `1`.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>`RED` is implicitly `0`</li>
                        <li>`GREEN` is implicitly `1`</li>
                        <li>`BLUE` is implicitly `2`</li>
                    </ul>
                    <CodeBlock className="mt-4 mb-4">
                        <CodeSyntax>
                            <span className="syntax-keyword">enum</span> colors favorite_color <span className="syntax-operator">=</span> BLUE<span className="syntax-semicolon">;</span><br />
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"The value of BLUE is: %d\\n"</span>, favorite_color)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                    <p className="mb-4 text-muted-foreground">
                        This code would output `2`.
                    </p>
                    <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">Assigning Custom Values</h3>
                    <p className="mb-4 text-muted-foreground">
                        You can also explicitly assign custom integer values to the members of an enumeration. If you assign a value to one member, the subsequent members will automatically increment from that new value.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Defining an enumeration with custom values'}</span><br />
                            <span className="syntax-keyword">enum</span> numbers {'{'}<br />
                            &nbsp;&nbsp;ONE <span className="syntax-operator">=</span> <span className="syntax-number">1</span>,<br />
                            &nbsp;&nbsp;FIVE <span className="syntax-operator">=</span> <span className="syntax-number">5</span>,<br />
                            &nbsp;&nbsp;SIX,<br />
                            &nbsp;&nbsp;EIGHT <span className="syntax-operator">=</span> <span className="syntax-number">8</span><br />
                            {'};'}<br />
                            <br />
                            <span className="syntax-comment">{'// In this enumeration:'}</span><br />
                            <span className="syntax-comment">{'// ONE is 1'}</span><br />
                            <span className="syntax-comment">{'// FIVE is 5'}</span><br />
                            <span className="syntax-comment">{'// SIX is 6 (increments from the previous value)'}</span><br />
                            <span className="syntax-comment">{'// EIGHT is 8'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
            </main>
        </div>
    );
}
