
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { Message } from '@/ai/schemas';

// NOTE: This is a diagnostic version of the component.
// It is intentionally hardcoded to be open and has no logic.
export function Chatbot() {
  const messages: Message[] = [
      {role: 'model', content: 'I am open for testing.'}
  ];

  return (
    <Sheet open={true}>
      <SheetContent
        className="flex h-full flex-col p-0 w-full max-w-lg md:max-w-2xl bg-gradient-futuristic"
        side="right"
      >
        <SheetHeader className="p-4 border-b border-white/10">
          <SheetTitle className="text-glow">NoteMark Assistant</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-4">
          <div className="space-y-6">
            {messages.slice().reverse().map((message, index) => (
              <div
                key={index}
                className={'flex items-start gap-4'}
              >
                <Avatar className="h-9 w-9 border-2 border-primary/50 text-primary">
                  <AvatarFallback className="bg-transparent">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div
                  className={'max-w-[85%] rounded-xl p-4 text-sm shadow-md bg-card/80 backdrop-blur-sm text-foreground'}
                >
                  <p className="leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
