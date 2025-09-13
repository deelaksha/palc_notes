
'use client';

import { Logo } from '@/components/icons';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
      <Link href="/">
        <Logo />
      </Link>
      <SidebarTrigger />
    </header>
  );
}
