
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# C Programming Core Syntax

A detailed, point-by-point guide to the fundamental concepts of C programming.

---

## 1. Keywords & Identifiers

<p class="mb-4 text-gray-300" style="color: #E0E0E0;">
    <span class="font-semibold" style="color: #E0E0E0;">Keywords</span> are a set of predefined, reserved words in C that have special meanings. They cannot be used as variable names. Examples include \`int\`, \`for\`, \`while\`, and \`if\`.
</p>
<CodeBlock>
<span class="datatype">int</span> a <span class="operator">=</span> <span class="number">10</span><span class="semicolon">;</span> <span class="comment">// \`int\` is a keyword</span>
<span class="keyword">if</span> (a <span class="operator">></span> <span class="number">5</span>) { <span class="comment">// \`if\` is a keyword</span>
    <span class="function">printf</span>(<span class="string">"a is greater than 5"</span>)<span class="semicolon">;</span>
}
</CodeBlock>
<p class="mb-4 text-gray-300" style="color: #E0E0E0;">
    <span class="font-semibold" style="color: #E0E0E0;">Identifiers</span> are names given to variables, functions, and arrays. They are user-defined and must follow specific rules:
</p>
<ul class="list-disc list-inside space-y-2 text-gray-300" style="color: #E0E0E0;">
    <li>They can only contain letters (A-Z, a-z), digits (0-9), or the underscore (_).</li>
    <li>They must start with a letter or an underscore.</li>
    <li>They are case-sensitive (e.g., \`myVar\` is different from \`myvar\`).</li>
    <li>They cannot be a keyword.</li>
</ul>
<CodeBlock>
<span class="comment">// Valid identifiers</span>
<span class="datatype">int</span> my_variable<span class="semicolon">;</span>
<span class="datatype">float</span> totalSum<span class="semicolon">;</span>
<span class="datatype">char</span> _status<span class="semicolon">;</span>

<span class="comment">// Invalid identifiers</span>
<span class="comment">// int 1st_number; (starts with a digit)</span>
<span class="comment">// float new-variable; (contains a hyphen)</span>
<span class="comment">// double int; (is a keyword)</span>
</CodeBlock>

---

## 2. Variables & Constants

<p class="mb-4 text-gray-300" style="color: #E0E0E0;">
    <span class="font-semibold" style="color: #E0E0E0;">Variables</span> are memory locations used to store data. They can be changed during program execution. They must be declared with a data type before use.
</p>
<CodeBlock>
<span class="datatype">int</span> score <span class="operator">=</span> <span class="number">0</span><span class="semicolon">;</span> <span class="comment">// Declaration and initialization</span>
score <span class="operator">=</span> <span class="number">100</span><span class="semicolon">;</span> <span class="comment">// Value can be changed</span>
</CodeBlock>
<p class="mb-4 text-gray-300" style="color: #E0E0E0;">
    <span class="font-semibold" style="color: #E0E0E0;">Constants</span> are like variables, but their values cannot be modified once they are defined. They are useful for storing fixed values like PI or a maximum size.
</p>
<CodeBlock>
#<span class="keyword">define</span> PI <span class="number">3.14159</span> <span class="comment">// Using the preprocessor directive</span>
<span class="keyword">const</span> <span class="datatype">float</span> G <span class="operator">=</span> <span class="number">9.8</span><span class="semicolon">;</span> <span class="comment">// Using the \`const\` keyword</span>
</CodeBlock>

---

## 3. Data Types

<p class="mb-4 text-gray-300" style="color: #E0E0E0;">
    Data types specify the size and type of values that can be stored in a variable. Here are the core data types in C:
</p>
<ul class="list-disc list-inside space-y-2 text-gray-300" style="color: #E0E0E0;">
    <li><span class="font-semibold" style="color: #E0E0E0;">int:</span> Used to store integers (whole numbers) like 5, -10, or 100. Typically occupies 4 bytes.</li>
    <li><span class="font-semibold" style="color: #E0E0E0;">char:</span> Used to store a single character, like 'A', 'b', or '5'. Occupies 1 byte.</li>
    <li><span class="font-semibold" style="color: #E0E0E0;">float:</span> Used to store single-precision floating-point numbers (numbers with decimal points). Typically 4 bytes.</li>
    <li><span class="font-semibold" style="color: #E0E0E0;">double:</span> Used to store double-precision floating-point numbers. Provides more precision than \`float\`. Typically 8 bytes.</li>
    <li><span class="font-semibold" style="color: #E0E0E0;">void:</span> An incomplete type that represents the absence of a value. It's used for functions that don't return a value or for generic pointers.</li>
</ul>
<CodeBlock>
<span class="datatype">int</span> age <span class="operator">=</span> <span class="number">30</span><span class="semicolon">;</span>
<span class="datatype">char</span> initial <span class="operator">=</span> <span class="string">'G'</span><span class="semicolon">;</span>
<span class="datatype">float</span> price <span class="operator">=</span> <span class="number">19.99</span><span class="semicolon">;</span>
<span class="datatype">double</span> pi_exact <span class="operator">=</span> <span class="number">3.1415926535</span><span class="semicolon">;</span>
</CodeBlock>

---

## 4. Input/Output (scanf, printf)

<p class="mb-4 text-gray-300" style="color: #E0E0E0;">
    The \`<stdio.h>\` header file provides functions for standard input and output.
</p>
<ul class="list-disc list-inside space-y-2 text-gray-300" style="color: #E0E0E0;">
    <li><span class="font-semibold" style="color: #E0E0E0;">printf():</span> Used to print formatted output to the console. It uses format specifiers to insert values into a string.</li>
    <li><span class="font-semibold" style="color: #E0E0E0;">scanf():</span> Used to read formatted input from the user. It requires a format specifier and the address of the variable where the data should be stored.</li>
</ul>
<CodeBlock>
#<span class="keyword">include</span> <span class="string">&lt;stdio.h&gt;</span>

<span class="datatype">int</span> <span class="function">main</span>() {
    <span class="datatype">int</span> userAge<span class="semicolon">;</span>
    <span class="function">printf</span>(<span class="string">"Enter your age: "</span>)<span class="semicolon">;</span>
    <span class="function">scanf</span>(<span class="string">"%d"</span>, &userAge)<span class="semicolon">;</span>
    <span class="function">printf</span>(<span class="string">"You are %d years old.\\n"</span>, userAge)<span class="semicolon">;</span>
    <span class="keyword">return</span> <span class="number">0</span><span class="semicolon">;</span>
}
</CodeBlock>

---

## 5. Type Casting

<p class="mb-4 text-gray-300" style="color: #E0E0E0;">
    Type casting is the process of converting a value from one data type to another. It can be done either implicitly or explicitly.
</p>
<ul class="list-disc list-inside space-y-2 text-gray-300" style="color: #E0E0E0;">
    <li><span class="font-semibold" style="color: #E0E0E0;">Implicit Casting (Coercion):</span> The compiler automatically converts the data type, usually from a smaller to a larger type.</li>
    <li><span class="font-semibold" style="color: #E0E0E0;">Explicit Casting:</span> You manually force a conversion using the cast operator \`(type)\`. This is often required when converting from a larger to a smaller type to avoid data loss.</li>
</ul>
<CodeBlock>
<span class="comment">// Implicit Casting</span>
<span class="datatype">int</span> a <span class="operator">=</span> <span class="number">10</span><span class="semicolon">;</span>
<span class="datatype">double</span> b <span class="operator">=</span> a<span class="semicolon">;</span> <span class="comment">// \`a\` is implicitly converted to a double</span>
<span class="function">printf</span>(<span class="string">"b = %f\\n"</span>, b)<span class="semicolon">;</span> <span class="comment">// Prints 10.000000</span>

<span class="comment">// Explicit Casting</span>
<span class="datatype">double</span> c <span class="operator">=</span> <span class="number">5.75</span><span class="semicolon">;</span>
<span class="datatype">int</span> d <span class="operator">=</span> (<span class="datatype">int</span>)c<span class="semicolon">;</span> <span class="comment">// \`c\` is explicitly cast to an int</span>
<span class="function">printf</span>(<span class="string">"d = %d\\n"</span>, d)<span class="semicolon">;</span> <span class="comment">// Prints 5 (the decimal part is truncated)</span>
</CodeBlock>
`;

export default function CBasicsPage() {
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="markdown-content">
                <MarkdownRenderer markdown={content} />
            </div>
        </div>
    );
}
