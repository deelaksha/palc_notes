
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/markdown/CodeBlock';

const CodeSyntax = ({ children }: { children: React.ReactNode }) => (
    <div className="font-mono text-sm">
        <code>{children}</code>
    </div>
);

export default function COperatorsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-wide">C Programming Operators & Expressions</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A detailed, point-by-point guide to the fundamental concepts of operators and expressions in C.
                </p>
            </header>

            <main className="space-y-8">
                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">What Are Operators & Expressions?</h2>
                    <p className="mb-4 text-muted-foreground">
                        Imagine you're solving a math problem. The numbers you work with (like 5 and 10) are the <span className="font-semibold text-foreground">operands</span>. The symbols you use to do things with them (like `+`, `-`, `*`) are the <span className="font-semibold text-foreground">operators</span>.
                    </p>
                    <p className="mb-4 text-muted-foreground">
                        When you combine operands and operators, you create an <span className="font-semibold text-foreground">expression</span>. For example, `5 + 10` is an expression, and its result is `15`. In C, this is the fundamental way you perform calculations, make comparisons, and build the logic of your program.
                    </p>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">1. Arithmetic Operators</h2>
                    <p className="mb-4 text-muted-foreground">These are the basic math operators you learned in school. They are used for performing numerical calculations.</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><b className="text-foreground">`+` (Addition):</b> Adds two numbers.</li>
                        <li><b className="text-foreground">`-` (Subtraction):</b> Subtracts one number from another.</li>
                        <li><b className="text-foreground">`*` (Multiplication):</b> Multiplies two numbers.</li>
                        <li><b className="text-foreground">`/` (Division):</b> Divides one number by another. <b className='text-amber-400'>Watch out!</b> If you divide two integers, C performs "integer division" and throws away any remainder (e.g., `10 / 3` is `3`, not `3.33`).</li>
                        <li><b className="text-foreground">`%` (Modulus):</b> Gives you the remainder of a division. For example, `10 % 3` is `1`, because 10 divided by 3 is 3 with a remainder of 1. This is incredibly useful for checking if a number is even or odd (`number % 2 == 0`).</li>
                    </ul>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> a <span className="syntax-operator">=</span> <span className="syntax-number">10</span>, b <span className="syntax-operator">=</span> <span className="syntax-number">3</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">int</span> sum <span className="syntax-operator">=</span> a <span className="syntax-operator">+</span> b<span className="syntax-semicolon">;</span> <span className="syntax-comment">// sum is 13</span><br />
                            <span className="syntax-datatype">int</span> quotient <span className="syntax-operator">=</span> a <span className="syntax-operator">/</span> b<span className="syntax-semicolon">;</span> <span className="syntax-comment">// quotient is 3 (integer division)</span><br />
                            <span className="syntax-datatype">int</span> remainder <span className="syntax-operator">=</span> a <span className="syntax-operator">%</span> b<span className="syntax-semicolon">;</span> <span className="syntax-comment">// remainder is 1</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">2. Relational Operators</h2>
                    <p className="mb-4 text-muted-foreground">These operators are used to compare two values. They are the heart of decision-making in C. Every relational expression evaluates to either `0` (representing false) or `1` (representing true).</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><b className="text-foreground">`==` (Equal to):</b> Checks if two values are the same. Don't confuse it with `=`, which is for assignment!</li>
                        <li><b className="text-foreground">`!=` (Not equal to):</b> Checks if two values are different.</li>
                        <li><b className="text-foreground">`>` (Greater than):</b> Checks if the left value is bigger than the right.</li>
                        <li><b className="text-foreground">`{`<` (Less than):</b> Checks if the left value is smaller than the right.</li>
                        <li><b className="text-foreground">`>=` (Greater than or equal to):</b> Checks if the left value is bigger than or the same as the right.</li>
                        <li><b className="text-foreground">`<=` (Less than or equal to):</b> Checks if the left value is smaller than or the same as the right.</li>
                    </ul>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> x <span className="syntax-operator">=</span> <span className="syntax-number">5</span>, y <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-keyword">if</span> (x <span className="syntax-operator">&lt;=</span> y) {'{'} <span className="syntax-comment">// This condition is true</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"x is less than or equal to y\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">3. Logical Operators</h2>
                    <p className="mb-4 text-muted-foreground">Logical operators are used to combine multiple relational expressions into a single true or false value. They are essential for complex conditions.</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><b className="text-foreground">`&&` (Logical AND):</b> Returns true only if the conditions on *both* sides are true. (e.g., "if it's sunny AND it's warm").</li>
                        <li><b className="text-foreground">`||` (Logical OR):</b> Returns true if *at least one* of the conditions is true. (e.g., "if it's Saturday OR it's Sunday").</li>
                        <li><b className="text-foreground">`!` (Logical NOT):</b> Reverses the result. It turns a true expression into false, and a false one into true.</li>
                    </ul>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> age <span className="syntax-operator">=</span> <span className="syntax-number">20</span><span className="syntax-semicolon">;</span><br />
                            <span className="syntax-datatype">int</span> hasLicense <span className="syntax-operator">=</span> <span className="syntax-number">1</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">// 1 for true</span><br />
                            <span className="syntax-keyword">if</span> (age <span className="syntax-operator">&gt;=</span> <span className="syntax-number">18</span> <span className="syntax-operator">&&</span> hasLicense) {'{'} <span className="syntax-comment">// Both are true, so this runs</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">printf</span>(<span className="syntax-string">"Eligible to drive\n"</span>)<span className="syntax-semicolon">;</span><br />
                            {'}'}
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">4. Increment & Decrement Operators</h2>
                    <p className="mb-4 text-muted-foreground">These are handy shortcuts for adding or subtracting 1 from a variable. The position of the operator (`++count` vs `count++`) matters!</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><b className="text-foreground">`++` (Increment):</b> Adds 1 to the variable.</li>
                        <li><b className="text-foreground">`--` (Decrement):</b> Subtracts 1 from the variable.</li>
                        <li><b className="text-foreground">Prefix (`++var`):</b> The variable is incremented *first*, and then its new value is used in the expression.</li>
                        <li><b className="text-foreground">Postfix (`var++`):</b> The variable's *current* value is used in the expression, and then it is incremented afterward.</li>
                    </ul>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> count <span className="syntax-operator">=</span> <span className="syntax-number">5</span><span className="syntax-semicolon">;</span><br />
                            count<span className="syntax-operator">++</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">// count is now 6</span><br /><br />
                            <span className="syntax-comment">// Prefix: increment happens first</span><br />
                            <span className="syntax-datatype">int</span> result <span className="syntax-operator">=</span> <span className="syntax-operator">++</span>count<span className="syntax-semicolon">;</span> <span className="syntax-comment">// count becomes 7, THEN result is set to 7.</span><br /><br />
                            <span className="syntax-comment">// Postfix: assignment happens first</span><br />
                            <span className="syntax-datatype">int</span> another_result <span className="syntax-operator">=</span> count<span className="syntax-operator">++</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">// another_result is set to 7, THEN count becomes 8.</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

                <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">5. Assignment & Shorthand Operators</h2>
                    <p className="mb-4 text-muted-foreground">The `=` operator assigns a value from the right side to the variable on the left. Shorthand operators are a common way to write more concise code.</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li><b className="text-foreground">`+=` (Addition assignment):</b> `x += 5` is the same as `x = x + 5`.</li>
                        <li><b className="text-foreground">`-=`, `*=`, `/=`, `%=` :</b> Work the same way for subtraction, multiplication, division, and modulus.</li>
                    </ul>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-datatype">int</span> total <span className="syntax-operator">=</span> <span className="syntax-number">10</span><span className="syntax-semicolon">;</span><br />
                            total <span className="syntax-operator">+=</span> <span className="syntax-number">5</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">// total is now 15</span><br />
                            total <span className="syntax-operator">*=</span> <span className="syntax-number">2</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">// total is now 30</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>
                
                 <Card className="p-6 shadow-lg border-border">
                    <h2 className="text-3xl font-bold mb-4 text-primary">6. Operator Precedence</h2>
                    <p className="mb-4 text-muted-foreground">Just like in math, C has an order of operations. Precedence determines which operators are evaluated first. Multiplication and division have higher precedence than addition and subtraction. You can always use parentheses `()` to force a specific order.</p>
                    <CodeBlock>
                        <CodeSyntax>
                            <span className="syntax-comment">{'// Multiplication is done first'}</span><br/>
                            <span className="syntax-datatype">int</span> result <span className="syntax-operator">=</span> <span className="syntax-number">5</span> <span className="syntax-operator">+</span> <span className="syntax-number">3</span> <span className="syntax-operator">*</span> <span className="syntax-number">2</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">// Evaluates to 5 + 6, so result is 11</span><br /><br/>
                            <span className="syntax-comment">{'// Parentheses change the order'}</span><br/>
                            <span className="syntax-datatype">int</span> new_result <span className="syntax-operator">=</span> (<span className="syntax-number">5</span> <span className="syntax-operator">+</span> <span className="syntax-number">3</span>) <span className="syntax-operator">*</span> <span className="syntax-number">2</span><span className="syntax-semicolon">;</span> <span className="syntax-comment">// Evaluates to 8 * 2, so result is 16</span>
                        </CodeSyntax>
                    </CodeBlock>
                </Card>

            </main>
        </div>
    );
}
