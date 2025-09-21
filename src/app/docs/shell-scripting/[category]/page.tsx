
import { shellScriptingData, slugify } from '@/lib/shell-scripting-data';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function generateStaticParams() {
  return shellScriptingData.map((category) => ({
    category: slugify(category.title),
  }));
}

export default function ShellCategoryPage({ params }: { params: { category: string } }) {
  const category = shellScriptingData.find(cat => slugify(cat.title) === params.category);

  if (!category) {
    notFound();
  }

  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
             <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/shell-scripting">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Roadmap
                </Link>
            </Button>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-primary">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="markdown-content prose-lg dark:prose-invert max-w-none">
                     <MarkdownRenderer markdown={category.content} />
                </CardContent>
            </Card>
        </div>
    </main>
  );
}
