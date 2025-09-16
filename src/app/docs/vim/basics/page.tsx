
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BookOpen, Move, Edit, Search, MousePointer, Save, BookCopy, Rows, Bookmark, Sparkles } from 'lucide-react';
import Link from 'next/link';

const topics = [
    {
        name: 'Modes in Vim',
        description: 'Understand the different modes like Normal, Insert, and Visual.',
        href: '/docs/vim/basics/modes',
        icon: <BookOpen className="size-8" />,
    },
    {
        name: 'Moving Around (Navigation)',
        description: 'Learn how to navigate efficiently within and between files.',
        href: '/docs/vim/basics/navigation',
        icon: <Move className="size-8" />,
    },
    {
        name: 'Typing Text (Insert Mode)',
        description: 'Commands for entering and appending text.',
        href: '/docs/vim/basics/insert-mode',
        icon: <Edit className="size-8" />,
    },
    {
        name: 'Editing Text',
        description: 'Master commands for deleting, copying, and changing text.',
        href: '/docs/vim/basics/editing',
        icon: <Edit className="size-8" />,
    },
    {
        name: 'Searching & Replacing',
        description: 'Find and substitute text across your files.',
        href: '/docs/vim/basics/searching',
        icon: <Search className="size-8" />,
    },
    {
        name: 'Selecting Text (Visual Mode)',
        description: 'Highlight and operate on blocks of text.',
        href: '/docs/vim/basics/visual-mode',
        icon: <MousePointer className="size-8" />,
    },
    {
        name: 'File Commands',
        description: 'Commands for saving, quitting, and opening files.',
        href: '/docs/vim/basics/file-commands',
        icon: <Save className="size-8" />,
    },
    {
        name: 'Managing Buffers',
        description: 'Work with multiple files using buffers.',
        href: '/docs/vim/basics/buffers',
        icon: <BookCopy className="size-8" />,
    },
    {
        name: 'Windows & Tabs',
        description: 'Split your workspace into windows and tabs.',
        href: '/docs/vim/basics/windows-tabs',
        icon: <Rows className="size-8" />,
    },
    {
        name: 'Marks & Jumps',
        description: 'Set marks to quickly jump back to specific locations.',
        href: '/docs/vim/basics/marks-jumps',
        icon: <Bookmark className="size-8" />,
    },
    {
        name: 'Useful Shortcuts',
        description: 'A collection of handy shortcuts to boost productivity.',
        href: '/docs/vim/basics/shortcuts',
        icon: <Sparkles className="size-8" />,
    },
];

export default function VimBasicsHubPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Vim Basics
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The fundamental commands and concepts to get you started with Vim. Click a topic to dive in.
          </p>
        </header>

        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => (
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
          </div>
        </section>
      </main>
    </div>
  );
}
