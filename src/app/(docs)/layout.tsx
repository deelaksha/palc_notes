
'use client';

import { Logo } from '@/components/icons';
import { Header } from '@/components/layout/Header';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { BookOpen, Code, FileCode, GitBranchPlus, Github, Home, Info, Search, Terminal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: <Home /> },
  { href: '/vim', label: 'Vim', icon: <Code /> },
  { href: '/linux', label: 'Linux', icon: <Terminal /> },
  { href: '/github', label: 'GitHub', icon: <Github /> },
  { href: '/git-advanced', label: 'Git Advanced', icon: <GitBranchPlus /> },
  { href: '/code-navigation', label: 'Code Navigation', icon: <FileCode /> },
  { href: '/notes', label: 'Notes', icon: <BookOpen /> },
  { href: '/about', label: 'About', icon: <Info /> },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Link href="/" className="block group-data-[collapsible=icon]:hidden">
              <Logo />
            </Link>
            <SidebarTrigger className="hidden md:flex" />
          </div>

          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SidebarInput placeholder="Search..." className="pl-9" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href) && (item.href === '/' ? pathname === '/' : true)}
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
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
