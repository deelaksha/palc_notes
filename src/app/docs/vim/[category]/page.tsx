
import { vimCommandData, slugify, unslugify } from '@/lib/vim-commands';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return Object.keys(vimCommandData).map((category) => ({
    category: slugify(category),
  }));
}

export default function VimCategoryPage({ params }: { params: { category: string } }) {
  const categoryName = Object.keys(vimCommandData).find(key => slugify(key) === params.category);

  if (!categoryName) {
    notFound();
  }

  const commands = vimCommandData[categoryName as keyof typeof vimCommandData];

  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/docs/vim">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Vim Categories
            </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">{categoryName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20%]">Command</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commands.map(({ cmd, desc }) => (
                  <TableRow key={cmd}>
                    <TableCell className="font-mono font-semibold text-primary">{cmd}</TableCell>
                    <TableCell>{desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
