
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function CSwitchPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Switch Statement</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A detailed, point-by-point guide to the `switch` statement in C.
                </p>
            </header>

            <main>
                <div className="space-y-8">
                    <Card className="p-6 shadow-lg border-border">
                        <h2 className="text-3xl font-bold mb-4 text-primary">The `switch` Statement</h2>
                        <p className="mb-4 text-muted-foreground">
                            The `switch` statement is a control flow statement that allows you to test a variable for equality against a list of values. It is a cleaner alternative to a long `if...else if` chain when you are checking a single expression against multiple constant integer values.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                            <li>The `switch` expression is evaluated once. The value must be an integer or a character.</li>
                            <li>The `case` labels are matched against the value of the expression. Each `case` must have a unique constant value.</li>
                            <li>The `break` keyword is crucial. It causes the program to exit the `switch` statement. Without it, execution will "fall-through" to the next case.</li>
                            <li>The `default` case is optional and handles values that don't match any `case` label. It is typically placed at the end.</li>
                        </ul>
                        <CodeBlock>
                            <CodeSyntax>
                                <span className="syntax-datatype">int</span> day <span className="syntax-operator">=</span> <span className="syntax-number">4</span><span className="syntax-semicolon">;</span><br />
                                <span className="syntax-keyword">switch</span> (day) {'{'}<br />
                                &nbsp;&nbsp;<span className="syntax-keyword">case</span> <span className="syntax-number">1</span>:<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Monday\n"</span>)<span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">break</span><span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;<span className="syntax-keyword">case</span> <span className="syntax-number">2</span>:<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Tuesday\n"</span>)<span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">break</span><span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;<span className="syntax-keyword">case</span> <span className="syntax-number">3</span>:<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Wednesday\n"</span>)<span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">break</span><span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;<span className="syntax-keyword">case</span> <span className="syntax-number">4</span>:<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Thursday\n"</span>)<span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">break</span><span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;<span className="syntax-keyword">default</span>:<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Weekend\n"</span>)<span className="syntax-semicolon">;</span><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">break</span><span className="syntax-semicolon">;</span><br />
                                {'}'}
                            </CodeSyntax>
                        </CodeBlock>
                    </Card>
                </div>
            </main>
        </div>
    );
}
