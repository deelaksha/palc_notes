
import { notFound } from 'next/navigation';
import { osiLayersData } from '@/lib/osi-layers';
import { OsiLayerGame } from '@/components/networking/OsiLayerGame';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ListTree, Waypoints } from 'lucide-react';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return osiLayersData.map((layer) => ({
    layer: layer.slug,
  }));
}

export default function OsiLayerDetailPage({ params }: { params: { layer: string } }) {
  const layer = osiLayersData.find((l) => l.slug === params.layer);

  if (!layer) {
    notFound();
  }

  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/docs/networking/osi-model">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to OSI Model Overview
                </Link>
            </Button>
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <span className={cn("flex items-center justify-center size-12 rounded-full text-white font-bold text-2xl", layer.color)}>
                        {layer.layerNumber}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
                       {layer.name} Layer
                    </h1>
                </div>
                <p className="text-lg text-muted-foreground">{layer.summary}</p>
            </header>

            <div className="space-y-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Interactive Demo</CardTitle>
                        <CardDescription>A small animation showing the core concept of the {layer.name} layer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <OsiLayerGame layer={layer.name as any} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ListTree/> Key Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                           {layer.responsibilities.map(resp => <li key={resp}>{resp}</li>)}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Waypoints/> Common Protocols</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {layer.protocols.map(proto => (
                                <div key={proto} className="bg-muted px-3 py-1 rounded-full text-sm font-medium">{proto}</div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CheckCircle/> Real World Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{layer.realWorldExample}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </main>
  );
}
