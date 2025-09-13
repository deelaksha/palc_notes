
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Search, Code, Server } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    name: 'Ctags & Cscope',
    description: 'Classic, fast, and reliable indexers for symbol definition and usage lookup.',
    href: '/code-navigation/ctags-cscope',
    icon: <Code className="size-8" />,
  },
  {
    name: 'Gtags (GNU Global)',
    description: 'A powerful source code tagging system that works across different languages.',
    href: '/code-navigation/gtags',
    icon: <Code className="size-8" />,
  },
  {
    name: 'LSP (Language Server Protocol)',
    description: 'Modern, intelligent, and real-time code analysis provided by language-specific servers.',
    href: '/code-navigation/lsp',
    icon: <Server className="size-8" />,
  },
  {
    name: 'ripgrep (rg) & The Silver Searcher (ag)',
    description: 'Blazingly fast text search tools optimized for searching source code.',
    href: '/code-navigation/ripgrep-ag',
    icon: <Search className="size-8" />,
  },
];

export default function CodeNavigationPage() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2">
            Code Navigation & Indexing
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A collection of powerful tools to help you search, understand, and navigate large codebases with speed and efficiency.
          </p>
        </header>

        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {tools.map((tool) => (
                <Link key={tool.name} href={tool.href} className="group">
                  <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-accent group-hover:shadow-lg group-hover:shadow-accent/10 group-hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-accent/10 p-3 rounded-md text-accent">
                            {tool.icon}
                          </div>
                          <div>
                            <CardTitle className="font-headline">
                              {tool.name}
                            </CardTitle>
                            <CardDescription>
                              {tool.description}
                            </CardDescription>
                          </div>
                        </div>
                        <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
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
