import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Source_Code_Pro, JetBrains_Mono } from 'next/font/google';
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
import { BookOpen, Code, Github, FileCode, Regex, Terminal, Network } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { RegexProvider } from '@/context/RegexContext';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

const fontJetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['300', '400', '600', '700'],
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
    href: '/regex',
    icon: <Regex />,
    label: 'Regex',
  },
   {
    href: '/docs/networking',
    icon: <Network />,
    label: 'Networking',
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
          fontSourceCodePro.variable,
          fontJetBrainsMono.variable
        )}
      >
        <RegexProvider>
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
        </RegexProvider>
      </body>
    </html>
  );
}
