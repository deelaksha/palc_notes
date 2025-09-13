

'use client';

import { Logo } from '@/components/icons';
import { Header } from '@/components/layout/Header';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { BookOpen, Code, FileCode, GitBranchPlus, Github, Home, Info, Regex, Terminal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: <Home /> },
  { href: '/docs/vim', label: 'Vim', icon: <Code /> },
  { href: '/docs/linux', label: 'Linux', icon: <Terminal /> },
  { href: '/docs/github', label: 'GitHub', icon: <Github /> },
  { href: '/docs/git-advanced', label: 'Git Advanced', icon: <GitBranchPlus /> },
  { href: '/docs/code-navigation', label: 'Code Navigation', icon: <FileCode /> },
  { href: '/regex', label: 'Regex', icon: <Regex /> },
  { href: '/docs/notes', label: 'Notes', icon: <BookOpen /> },
  { href: '/docs/about', label: 'About', icon: <Info /> },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2">
                <Logo />
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(item.href) && item.href !== '/'}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
