
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';
import { BookOpen, Code, FileCode, Github, Network, Regex, Terminal } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Chatbot } from '@/components/chatbot/Chatbot';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

const menuItems = [
  {
    href: '/docs/vim',
    icon: <Code />,
    label: 'Vim',
  },
  {
    href: '/docs/linux',
    icon: <Terminal />,
    label: 'Linux',
  },
  {
    href: '/docs/github',
    icon: <Github />,
    label: 'Git Tutorial',
  },
  {
    href: '/docs/code-navigation',
    icon: <FileCode />,
    label: 'Code Navigation',
  },
  {
    href: '/regex',
    icon: <Regex />,
    label: 'Regex',
  },
  {
    href: '/docs/notes',
    icon: <BookOpen />,
    label: 'Notes',
  },
];

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
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <Logo />
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarGroup>
                  <SidebarMenuItem>
                    {menuItems.map((item) => (
                      <Link href={item.href} key={item.label}>
                        <SidebarMenuButton
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    ))}
                  </SidebarMenuItem>
                </SidebarGroup>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <Header />
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Chatbot />
        <Toaster />
      </body>
    </html>
  );
}
