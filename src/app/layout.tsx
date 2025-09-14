
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { cn } from '@/lib/utils';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontInter.variable,
          fontSourceCodePro.variable
        )}
      >
        {/* Intentionally rendering only the chatbot for diagnosis */}
        <Chatbot />
        <Toaster />
      </body>
    </html>
  );
}
