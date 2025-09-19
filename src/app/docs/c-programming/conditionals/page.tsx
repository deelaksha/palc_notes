
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CConditionalsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Conditional Statements</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A detailed guide to decision-making with `if`, `else if`, and `else` in C.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">What Are Conditional Statements?</h2>
                    <p className="mb-4 text-muted-foreground">
                        Imagine your program is walking down a path. Conditional statements are forks in that path. They allow your code to ask a question and choose a direction based on a "yes" or "no" answer. This is the core of making your program intelligent and responsive.
                    </p>
                    <p className="mb-4 text-muted-foreground">
                        The "question" is a condition that evaluates to either true (represented by any non-zero value in C) or false (represented by `0`).
                    </p>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. The `if` Statement</h2>
                    <p className="mb-4 text-muted-foreground">This is the simplest decision. The code inside the `if` block will only run if the condition in the parentheses `()` is true.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> age <span className="syntax-operator">=</span> <span className="syntax-number">20</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-keyword">if</span> (age <span className="syntax-operator">{'>='}</span> <span className="syntax-number">18</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"You are old enough to vote.\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. The `if...else` Statement</h2>
                    <p className="mb-4 text-muted-foreground">This provides an alternative path. If the `if` condition is true, the first block runs. If it's false, the `else` block runs instead.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> temperature <span className="syntax-operator">=</span> <span className="syntax-number">25</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-keyword">if</span> (temperature <span className="syntax-operator">{'>'}</span> <span className="syntax-number">30</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"It's a hot day. Stay hydrated!\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'} <span className="syntax-keyword">else</span> {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"The weather is pleasant.\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. The `if...else if...else` Ladder</h2>
                    <p className="mb-4 text-muted-foreground">This is used for checking a series of conditions. The program checks them one by one from top to bottom. As soon as it finds a true condition, it runs that block of code and skips the rest of the ladder.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> score <span className="syntax-operator">=</span> <span className="syntax-number">85</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-keyword">if</span> (score <span className="syntax-operator">{'>='}</span> <span className="syntax-number">90</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Grade: A\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'} <span className="syntax-keyword">else if</span> (score <span className="syntax-operator">{'>='}</span> <span className="syntax-number">80</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Grade: B\n"</span>)<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// This block runs'}</span><br />
                            {'}'} <span className="syntax-keyword">else if</span> (score <span className="syntax-operator">{'>='}</span> <span className="syntax-number">70</span>) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Grade: C\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'} <span className="syntax-keyword">else</span> {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Grade: D or F\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. The Ternary Operator (`?:`)</h2>
                     <p className="mb-4 text-muted-foreground">
                        The ternary operator is a compact, one-line version of a simple `if...else` statement. It's great for assigning a value to a variable based on a condition.
                    </p>
                    <p className="mb-4 text-muted-foreground font-semibold">
                        The syntax is: `condition ? value_if_true : value_if_false;`
                    </p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> x <span className="syntax-operator">=</span> <span className="syntax-number">10</span>, y <span className="syntax-operator">=</span> <span className="syntax-number">20</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-comment">{'// Find the maximum of two numbers'}</span><br/>
                            <span className="syntax-datatype">int</span> max <span className="syntax-operator">=</span> (x <span className="syntax-operator">{'>'}</span> y) <span className="syntax-operator">?</span> x <span className="syntax-operator">:</span> y<span className="syntax-semicolon">;</span> <span className="syntax-comment">{'// max will be assigned the value of y, which is 20'}</span><br /><br />
                             <span className="syntax-function">printf</span>(<span className="syntax-string">"The maximum value is %d\n"</span>, max)<span className="syntax-semicolon">;</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

            </main>
        </div>
    );
}
