'use client';

import { cn } from '@/lib/utils';
import React, { useState, useEffect, useCallback } from 'react';

interface TocItem {
  level: number;
  text: string;
  href: string;
}

const parseTocMarkdown = (markdown: string): TocItem[] => {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const items: TocItem[] = [];
  const regex = /^(\s*)\*\s*\[(.*?)\]\((.*?)\)/;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const [, indent, text, href] = match;
      const level = Math.floor(indent.length / 2) + 1;
      items.push({ level, text, href });
    }
  }
  return items;
};

export function RenderedToc({ tocMarkdown }: { tocMarkdown: string }) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setTocItems(parseTocMarkdown(tocMarkdown));
  }, [tocMarkdown]);

  const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // 80px offset for header
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    const elements = tocItems.map(item => document.getElementById(item.href.substring(1))).filter(Boolean);
    elements.forEach((el) => {
        if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg bg-card border">
      <h3 className="font-headline text-lg font-semibold mb-3">On this page</h3>
      <ul className="space-y-2">
        {tocItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={cn(
                'text-sm transition-colors hover:text-foreground',
                activeId === item.href.substring(1)
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground',
                `pl-${(item.level - 1) * 4}`
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
