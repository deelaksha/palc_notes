
'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Book, Braces, Brackets, Captions, CaseSensitive, Regex, Star, Wand2, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
    {
        name: 'The Basics: Characters & Sets',
        description: 'Start with literal characters, wildcards, and character sets.',
        href: '/regex/basics',
        icon: <Book className="size-8" />,
        color: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:border-blue-500/50',
    },
    {
        name: 'Anchors & Boundaries',
        description: 'Learn to match at the start/end of strings and words.',
        href: '/regex/anchors-boundaries',
        icon: <CaseSensitive className="size-8" />,
        color: 'bg-green-500/10 text-green-400 border-green-500/20 hover:border-green-500/50',
    },
    {
        name: 'Quantifiers: Greedy & Lazy',
        description: 'Specify how many times a character should repeat.',
        href: '/regex/quantifiers',
        icon: <Braces className="size-8" />,
        color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:border-yellow-500/50',
    },
    {
        name: 'Grouping & Capturing',
        description: 'Group patterns and capture substrings for later use.',
        href: '/regex/grouping-capturing',
        icon: <Brackets className="size-8" />,
        color: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:border-purple-500/50',
    },
    {
        name: 'Advanced: Lookarounds',
        description: 'Master lookaheads and lookbehinds for complex context.',
        href: '/regex/advanced-lookarounds',
        icon: <Wand2 className="size-8" />,
        color: 'bg-red-500/10 text-red-400 border-red-500/20 hover:border-red-500/50',
    },
    {
        name: 'Common Patterns & Practice',
        description: 'Test your knowledge with real-world examples and problems.',
        href: '/regex/practice',
        icon: <Star className="size-8" />,
        color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:border-indigo-500/50',
    },
];

export default function RegexHubPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col flex-1"
        >
            <main className="flex-1 p-4 md:p-8 lg:p-12">
                <header className="text-center mb-12">
                    <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                        <Regex className="size-12 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
                        The Regex Adventure
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        A complete guide to mastering Regular Expressions. Choose a topic to begin your journey from novice to wizard!
                    </p>
                </header>

                <section className="w-full">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Link href="/regex/practical" className="group lg:col-span-3">
                                <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/30 hover:border-purple-500/60">
                                    <CardHeader className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-lg w-fit bg-purple-500/20 text-purple-400`}>
                                                    <Eye className="size-8" />
                                                </div>
                                                <div>
                                                    <CardTitle className="font-headline text-lg text-foreground">
                                                        Practical Regex Visualizer
                                                    </CardTitle>
                                                    <CardDescription className="mt-1">
                                                        Watch the regex engine work in real-time with an animated visualizer.
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary mt-1" />
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                            {categories.map((cat) => (
                                <Link key={cat.name} href={cat.href} className="group">
                                    <Card className={`h-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 ${cat.color}`}>
                                        <CardHeader className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col gap-4">
                                                    <div className={`p-3 rounded-lg w-fit ${cat.color}`}>
                                                        {cat.icon}
                                                    </div>
                                                    <div>
                                                        <CardTitle className="font-headline text-lg text-foreground">
                                                            {cat.name}
                                                        </CardTitle>
                                                        <CardDescription className="mt-1">
                                                            {cat.description}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                                <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary mt-1" />
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </motion.div>
    );
}
