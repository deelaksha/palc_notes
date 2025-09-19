
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { ArrowRight, GitBranch, Share2, Repeat, PencilRuler } from 'lucide-react';
import Link from 'next/link';

const controlFlowTopics = [
    {
        name: 'if, else if, else',
        description: 'The fundamental conditional statements for making decisions in your code.',
        href: '/docs/c-programming/conditionals',
        icon: <GitBranch className="size-8" />,
    },
    {
        name: 'switch statement',
        description: 'A clean alternative to long `if-else` chains for checking a variable against multiple constant values.',
        href: '/docs/c-programming/switch',
        icon: <Share2 className="size-8" />,
    },
    {
        name: 'Loops (for, while, do-while)',
        description: 'Execute blocks of code repeatedly based on a condition.',
        href: '/docs/c-programming/loops',
        icon: <Repeat className="size-8" />,
    },
    {
        name: 'break and continue',
        description: 'Keywords to control the flow from within a loop, allowing you to exit early or skip an iteration.',
        href: '/docs/c-programming/loops',
        icon: <PencilRuler className="size-8" />,
    },
];

export default function ControlFlowHubPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Control Flow in C
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn how to direct the execution path of your program using conditionals, loops, and control statements.
          </p>
        </header>

        <section className="w-full max-w-2xl mx-auto">
          <div className="grid gap-6 md:grid-cols-1">
            {controlFlowTopics.map((topic) => (
              <Link key={topic.name} href={topic.href} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-md text-foreground">
                          {topic.icon}
                        </div>
                        <div>
                          <CardTitle className="font-headline">
                            {topic.name}
                          </CardTitle>
                          <CardDescription>
                            {topic.description}
                          </CardDescription>
                        </div>
                      </div>
                      <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="w-full max-w-2xl mx-auto mt-12">
            <Card className="border-primary/50">
                <CardHeader>
                    <CardTitle className="text-primary font-headline">✅ Practice Problems</CardTitle>
                    <CardDescription>Test your understanding of control flow with these classic programming challenges.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Write a program to calculate the **Factorial** of a number using a loop.</li>
                        <li>Write a program to check if a number is a **Prime Number**.</li>
                        <li>Write a program to generate the **Multiplication Table** for a given number.</li>
                        <li>Write a program to print the **Fibonacci Series** up to a certain number of terms.</li>
                    </ul>
                </CardContent>
            </Card>
        </section>
      </main>
    </div>
  );
}
