
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CStringsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Strings</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Learn to manipulate text with C's null-terminated strings and the standard library.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">What Are Strings in C?</h2>
                    <p className="mb-4 text-muted-foreground">
                        In C, a string is not a built-in data type. Instead, it is represented as an **array of characters** that is terminated by a special **null character**, `\0`. This null character is crucial because it's how C functions know where the string ends.
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// This creates a character array of size 6'}</span><br/>
                            <span className="syntax-comment">{'// H  e  l  l  o  \\0'}</span><br/>
                            <span className="syntax-datatype">char</span> greeting[] <span className="syntax-operator">=</span> <span className="syntax-string">"Hello"</span>;
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. String Input/Output</h2>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">`scanf` and `printf`</h3>
                    <p className="mb-4 text-muted-foreground">You can use the `%s` format specifier to read and write strings. However, `scanf` is unsafe as it stops reading at the first whitespace, which can lead to buffer overflows.</p>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">`fgets` and `puts` (Safer Alternatives)</h3>
                    <p className="mb-4 text-muted-foreground">
                        <b className="text-foreground">`fgets(str, size, stdin)`</b>: Reads a line from standard input, including the newline character, up to a specified size. This is much safer than `gets` or `scanf` because it prevents buffer overflows.
                    </p>
                     <p className="mb-4 text-muted-foreground">
                        <b className="text-foreground">`puts(str)`</b>: Prints a string to the console and automatically adds a newline character at the end.
                    </p>
                     <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">char</span> name[50];<br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Enter your name: "</span>);<br/>
                            <span className="syntax-function">fgets</span>(name, <span className="syntax-keyword">sizeof</span>(name), stdin); <span className="syntax-comment">{'// Safely read input'}</span><br/><br/>
                            <span className="syntax-function">printf</span>(<span className="syntax-string">"Hello, "</span>);<br/>
                            <span className="syntax-function">puts</span>(name); <span className="syntax-comment">{'// Print the name with a newline'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Common String Functions (`&lt;string.h&gt;`)</h2>
                    <p className="mb-4 text-muted-foreground">To use these functions, you must include the string library: <code className="font-mono text-sm bg-muted text-foreground p-1 rounded">#include &lt;string.h&gt;</code></p>
                    
                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">`strlen()` - String Length</h3>
                    <p className="mb-4 text-muted-foreground">Calculates the length of a string, *not* including the null terminator `\0`.</p>
                     <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">char</span> text[] <span className="syntax-operator">=</span> <span className="syntax-string">"C is fun"</span>;<br/>
                            <span className="syntax-datatype">int</span> length <span className="syntax-operator">=</span> <span className="syntax-function">strlen</span>(text); <span className="syntax-comment">{'// length will be 8'}</span>
                        </CodeSyntax>
                    </CodeBlock>
                    
                     <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">`strcpy()` and `strncpy()` - String Copy</h3>
                     <p className="mb-4 text-muted-foreground"><b className="text-foreground">`strcpy(dest, src)`</b> copies the source string into the destination. It's unsafe because it doesn't check for buffer sizes. <b className="text-foreground">`strncpy`</b> is the safer version, as it takes a maximum number of characters to copy.</p>
                     <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">char</span> source[] <span className="syntax-operator">=</span> <span className="syntax-string">"Hello"</span>;<br/>
                            <span className="syntax-datatype">char</span> destination[10];<br/>
                            <span className="syntax-function">strncpy</span>(destination, source, <span className="syntax-keyword">sizeof</span>(destination) <span className="syntax-operator">-</span> <span className="syntax-number">1</span>);<br/>
                            destination[<span className="syntax-keyword">sizeof</span>(destination) <span className="syntax-operator">-</span> <span className="syntax-number">1</span>] <span className="syntax-operator">=</span> <span className="syntax-string">'\0'</span>; <span className="syntax-comment">{'// Ensure null-termination'}</span>
                        </CodeSyntax>
                    </CodeBlock>

                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">`strcat()` and `strncat()` - String Concatenation</h3>
                    <p className="mb-4 text-muted-foreground">Appends the source string to the end of the destination string. Like `strcpy`, `strncat` is the safer version.</p>
                    <CodeBlock className="mb-6">
                        <CodeSyntax>
                            <span className="syntax-datatype">char</span> str1[20] <span className="syntax-operator">=</span> <span className="syntax-string">"Hello, "</span>;<br/>
                            <span className="syntax-datatype">char</span> str2[] <span className="syntax-operator">=</span> <span className="syntax-string">"World!"</span>;<br/>
                            <span className="syntax-function">strncat</span>(str1, str2, <span className="syntax-keyword">sizeof</span>(str1) <span className="syntax-operator">-</span> <span className="syntax-function">strlen</span>(str1) <span className="syntax-operator">-</span> <span className="syntax-number">1</span>); <span className="syntax-comment">{'// str1 is now "Hello, World!"'}</span>
                        </CodeSyntax>
                    </CodeBlock>

                    <h3 className="text-2xl font-semibold mb-2 text-secondary-accent">`strcmp()` and `strncmp()` - String Comparison</h3>
                    <p className="mb-4 text-muted-foreground">Compares two strings lexicographically. It returns `0` if they are equal, a negative value if the first string comes before the second, and a positive value otherwise.</p>
                    <CodeBlock className="mb-6">
                        <CodeSyntax>
                           <span className="syntax-keyword">if</span> (<span className="syntax-function">strcmp</span>(<span className="syntax-string">"apple"</span>, <span className="syntax-string">"apple"</span>) <span className="syntax-operator">==</span> <span className="syntax-number">0</span>) {'{'}<br/>
                           &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment">{'// This will be true'}</span><br/>
                           {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
            </main>
        </div>
    );
}
