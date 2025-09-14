
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Bot, MessageCircle, Send, User } from 'lucide-react';
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { contextualChat } from '@/ai/flows/contextual-chat';
import type { Message } from '@/ai/schemas';

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the new message list directly to avoid state race conditions
      const response = await contextualChat({
        chatHistory: newMessages,
        question: input,
      });

      const botMessage: Message = {
        role: 'model',
        content: response,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary/80 backdrop-blur-md border-primary/50 border-2 hover:bg-primary text-primary-foreground animate-fade-in-up"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex h-full flex-col p-0 w-full max-w-lg md:max-w-2xl bg-gradient-futuristic"
        side="right"
      >
        <SheetHeader className="p-4 border-b border-white/10">
          <SheetTitle className="text-glow">NoteMark Assistant</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col-reverse overflow-y-auto p-4">
          <div className="space-y-6">
            {isLoading && (
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border-2 border-primary/50 text-primary">
                  <AvatarFallback className="bg-transparent">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[85%] rounded-lg p-4 text-sm bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary animation-delay-200" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary animation-delay-400" />
                  </div>
                </div>
              </div>
            )}
            {messages.slice().reverse().map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'justify-end' : ''
                )}
              >
                {message.role === 'model' && (
                  <Avatar className="h-9 w-9 border-2 border-primary/50 text-primary">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[85%] rounded-xl p-4 text-sm shadow-md',
                    message.role === 'user'
                      ? 'bg-primary/20 text-primary-foreground border border-primary/40'
                      : 'bg-card/80 backdrop-blur-sm text-foreground'
                  )}
                >
                  <p className="leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-9 w-9 border-2 border-white/20">
                    <AvatarFallback className="bg-white/10">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-white/10 bg-transparent">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-card/80 backdrop-blur-sm h-12 focus-visible:ring-primary text-base"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="h-12 w-12" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
