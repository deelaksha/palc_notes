
'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';

export default function CommandPracticalPage() {
  return (
    <div className="flex flex-col min-h-screen font-mono bg-gradient-to-br from-dark-primary via-dark-secondary to-blue-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 animated-bg animate-float -z-10"></div>

      <header className="p-4 md:p-8 z-20">
        <Button
          asChild
          variant="ghost"
          className="text-white hover:bg-gray-800 hover:text-white"
        >
          <Link href={`/docs/networking/routing`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Command Hub
          </Link>
        </Button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center text-white glass-effect p-12 rounded-2xl">
          <Construction className="mx-auto h-16 w-16 mb-4 text-amber-400" />
          <h2 className="text-3xl font-bold mb-2">
            Practical Example Coming Soon!
          </h2>
          <p className="text-gray-300">
            A new interactive exercise for routing is under construction.
          </p>
        </div>
      </main>
    </div>
  );
}
