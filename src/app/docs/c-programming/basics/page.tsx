
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# 🛣️ C Programming Roadmap
## 1. Basics of C (Foundation Layer)

### What is C, history, and uses (system programming, OS, embedded, etc.)

C is a powerful, general-purpose programming language created by Dennis Ritchie at Bell Labs in 1972. It's famous for its performance and for being the language that many other modern languages (like C++, Java, and Python) are built upon or influenced by.

*   **History**: It was developed to write the UNIX operating system.
*   **System Programming**: Because it's so close to the hardware, it's perfect for writing operating systems (like Windows, Linux, macOS), device drivers, and low-level system utilities.
*   **Embedded Systems**: It's the go-to language for programming microcontrollers in devices like microwaves, cars, and smartwatches, where resources are limited.

### Setup (GCC/Clang/MinGW + IDEs like VS Code, Code::Blocks, or Linux terminal)

To start writing C, you need a compiler. A compiler is a program that translates your human-readable C code into machine code that the computer's processor can execute.

*   **Linux**: GCC (GNU Compiler Collection) is almost always pre-installed. You're ready to go!
*   **macOS**: Install the "Command Line Tools" by running \`xcode-select --install\` in the terminal. This gives you the Clang compiler, which is fully compatible with C.
*   **Windows**: The easiest way is to install **MinGW-w64**, which provides GCC for Windows.

You can write C code in any text editor, but an IDE (Integrated Development Environment) can make life easier. **Visual Studio Code (VS Code)** with the C/C++ extension is a fantastic, modern choice.

### Hello World program

This is the traditional first program for any new language. It simply prints "Hello, World!" to the screen.

<CodeBlock>
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
</CodeBlock>

### Structure of a C program (#include, main(), return values)

Let's break down the "Hello, World!" program:

*   \`#include <stdio.h>\`: This is a preprocessor directive. It tells the compiler to include the contents of the "Standard Input/Output" header file. This file contains the declaration for functions like \`printf()\`.
*   \`int main() { ... }\`: This is the **main function**. Every C program must have one. It's the starting point where the execution of your program begins. The \`int\` means it is expected to return an integer value.
*   \`printf("Hello, World!\\n");\`: This is a function call. It calls the \`printf\` function (from \`stdio.h\`) to print the string of text to the console. The \`\\n\` is a special character that means "new line".
*   \`return 0;\`: This line returns the integer value \`0\` from the \`main\` function. A return value of \`0\` is the standard way to signal that the program executed successfully. Any other number usually indicates an error.

### Compilation & execution process

To run your C program, you must first compile it.

1.  Save your "Hello, World!" code in a file named \`hello.c\`.
2.  Open your terminal and navigate to the folder where you saved the file.
3.  Run the compiler:
    <CodeBlock>gcc hello.c -o hello</CodeBlock>
    *   \`gcc\` is the command to call the compiler.
    *   \`hello.c\` is your source code file.
    *   \`-o hello\` tells the compiler that the **o**utput file (the executable program) should be named \`hello\`.
4.  If there are no errors, you will now have a new file named \`hello\` (or \`hello.exe\` on Windows).
5.  Run your program:
    <CodeBlock>./hello</CodeBlock>
    *   \`./\` tells the terminal to look for the program in the current directory.
    *   You should see "Hello, World!" printed on your screen.

---

### ✅ Practice: Write simple programs (Hello, basic arithmetic, printing your name).

Try these to solidify your understanding:

1.  Write a program that prints your name.
2.  Write a program that calculates and prints the result of \`135 + 246\`. (Hint: use \`printf("%d\\n", 135 + 246);\` where \`%d\` is a placeholder for a digit/integer).
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
