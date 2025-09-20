
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CFileHandlingPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming: File Handling</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A comprehensive guide to managing files in C.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. File Handling in C</h2>
                    <p className="mb-4 text-muted-foreground">
                        File handling in C allows you to store and retrieve data from the disk. To interact with a file, you first need to declare a file pointer.
                    </p>

                    <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">FILE Pointer (`FILE *fp;`)</h3>
                    <p className="mb-4 text-muted-foreground">
                        The <strong>`FILE`</strong> is a structure that is defined in the `&lt;stdio.h&gt;` header. It contains information about the file, such as its name, current position, and access mode. You declare a pointer to this structure to interact with the file.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-datatype">FILE</span> <span className="syntax-operator">*</span>fp<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>

                    <h3 className="text-2xl font-bold text-secondary-accent mt-8 mb-2">File Open (`fopen`) and Close (`fclose`)</h3>
                    <p className="mb-4 text-muted-foreground">
                        The <strong>`fopen()`</strong> function is used to open a file. It takes two arguments: the filename and the mode. It returns a `FILE` pointer if the file is opened successfully, or `NULL` on failure. The <strong>`fclose()`</strong> function is used to close an opened file, which frees up system resources.
                    </p>
                    <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-datatype">FILE</span> <span className="syntax-operator">*</span>fp<span className="syntax-semicolon">;</span><br />
                            fp <span className="syntax-operator">=</span> <span className="syntax-function">fopen</span>(<span className="syntax-string">"file.txt"</span>, <span className="syntax-string">"r"</span>)<span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-keyword">if</span> (fp <span className="syntax-operator">==</span> <span className="syntax-datatype">NULL</span>) {'{'}<br />
                            &nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Error opening file!\n"</span>)<span className="syntax-semicolon">;</span><br />
                            &nbsp;&nbsp;<span className="syntax-keyword">return</span> <span className="syntax-number">1</span><span className="syntax-semicolon">;</span><br />
                            {'}'}<br />
                            <br />
                            <span className="syntax-comment">{'// File operations go here'}</span><br />
                            <br />
                            <span className="syntax-function">fclose</span>(fp)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. File Modes</h2>
                    <p className="mb-4 text-muted-foreground">
                        The file mode specifies how you intend to use the file. A `b` can be added to the mode for binary files (e.g., `rb`).
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>`"r"` (Read):</strong> Opens a file for reading. File must exist.</li>
                        <li><strong>`"w"` (Write):</strong> Opens a file for writing. Creates the file if it doesn't exist. If it exists, its contents are overwritten.</li>
                        <li><strong>`"a"` (Append):</strong> Opens a file for writing, adding to the end. Creates the file if it doesn't exist.</li>
                        <li><strong>`"r+"` (Read/Update):</strong> Opens a file for both reading and writing. File must exist.</li>
                        <li><strong>`"w+"` (Write/Update):</strong> Opens a file for both reading and writing. Creates the file if it doesn't exist, otherwise truncates it.</li>
                        <li><strong>`"a+"` (Append/Update):</strong> Opens a file for both reading and appending. Creates the file if it doesn't exist.</li>
                    </ul>
                </Card>
                
                <Card className="p-6 shadow-lg border-border">
                     <h2 className="text-3xl font-bold mb-4 text-primary">3. Reading and Writing to a File</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-secondary-accent mt-4 mb-2">Writing Functions</h3>
                            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                                <li>
                                    <p><strong>`fputc(char, fp)`:</strong> Writes a single character to the file.</p>
                                    <CodeBlock className="mt-2"><CodeSyntax><span className="syntax-function">fputc</span>(<span className="syntax-string">'A'</span>, fp)<span className="syntax-semicolon">;</span></CodeSyntax></CodeBlock>
                                </li>
                                <li>
                                    <p><strong>`fputs(string, fp)`:</strong> Writes a string to the file.</p>
                                    <CodeBlock className="mt-2"><CodeSyntax><span className="syntax-function">fputs</span>(<span className="syntax-string">"Hello, World!"</span>, fp)<span className="syntax-semicolon">;</span></CodeSyntax></CodeBlock>
                                </li>
                                <li>
                                    <p><strong>`fprintf(fp, format, ...)`:</strong> Writes formatted output to the file, similar to `printf`.</p>
                                    <CodeBlock className="mt-2"><CodeSyntax><span className="syntax-function">fprintf</span>(fp, <span className="syntax-string">"Age: %d"</span>, <span className="syntax-number">25</span>)<span className="syntax-semicolon">;</span></CodeSyntax></CodeBlock>
                                </li>
                                <li>
                                    <p><strong>`fwrite(ptr, size, count, fp)`:</strong> Writes a block of data to a binary file. Used for writing structs or arrays.</p>
                                    <CodeBlock className="mt-2"><CodeSyntax><span className="syntax-function">fwrite</span>(<span className="syntax-operator">&</span>my_data, <span className="syntax-function">sizeof</span>(my_data), <span className="syntax-number">1</span>, fp)<span className="syntax-semicolon">;</span></CodeSyntax></CodeBlock>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-secondary-accent mt-4 mb-2">Reading Functions</h3>
                            <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                                <li>
                                    <p><strong>`fgetc(fp)`:</strong> Reads a single character from the file.</p>
                                    <CodeBlock className="mt-2"><CodeSyntax><span className="syntax-datatype">char</span> c <span className="syntax-operator">=</span> <span className="syntax-function">fgetc</span>(fp)<span className="syntax-semicolon">;</span></CodeSyntax></CodeBlock>
                                </li>
                                <li>
                                    <p><strong>`fgets(str, size, fp)`:</strong> Reads a line from the file and stores it in a string.</p>
                                    <CodeBlock className="mt-2"><CodeSyntax><span className="syntax-function">fgets</span>(buffer, <span className="syntax-number">255</span>, fp)<span className="syntax-semicolon">;</span></CodeSyntax></CodeBlock>
                                </li>
                                <li>
                                    <p><strong>`fscanf(fp, format, ...)`:</strong> Reads formatted input from the file, similar to `scanf`.</p>
                                    <CodeBlock className="mt-2"><CodeSyntax><span className="syntax-function">fscanf</span>(fp, <span className="syntax-string">"%d"</span>, <span className="syntax-operator">&</span>age)<span className="syntax-semicolon">;</span></CodeSyntax></CodeBlock>
                                </li>
                                <li>
                                    <p><strong>`fread(ptr, size, count, fp)`:</strong> Reads a block of data from a binary file.</p>
                                    <CodeBlock className="mt-2"><CodeSyntax><span className="syntax-function">fread</span>(<span className="syntax-operator">&</span>my_data, <span className="syntax-function">sizeof</span>(my_data), <span className="syntax-number">1</span>, fp)<span className="syntax-semicolon">;</span></CodeSyntax></CodeBlock>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>

                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. File Positioning</h2>
                    <p className="mb-4 text-muted-foreground">
                        These functions allow you to control the position of the file pointer, which determines where the next read or write operation will occur.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>
                            <strong>`fseek(fp, offset, origin)`:</strong> Moves the file pointer to a new position. **`origin`** can be `SEEK_SET` (from the beginning), `SEEK_CUR` (from the current position), or `SEEK_END` (from the end).
                        </li>
                        <li>
                            <strong>`ftell(fp)`:</strong> Returns the current position of the file pointer, as an integer offset from the beginning of the file.
                        </li>
                        <li>
                            <strong>`rewind(fp)`:</strong> Resets the file pointer to the beginning of the file.
                        </li>
                    </ul>
                     <CodeBlock className="mt-4">
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Move to the 5th byte from the beginning'}</span><br />
                            <span className="syntax-function">fseek</span>(fp, <span className="syntax-number">5</span>, SEEK_SET)<span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-comment">{'// Get the current position'}</span><br />
                            <span className="syntax-datatype">long</span> position <span className="syntax-operator">=</span> <span className="syntax-function">ftell</span>(fp)<span className="syntax-semicolon">;</span><br />
                            <br />
                            <span className="syntax-comment">{'// Rewind to the start of the file'}</span><br />
                            <span className="syntax-function">rewind</span>(fp)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

            </main>
        </div>
    );
}
