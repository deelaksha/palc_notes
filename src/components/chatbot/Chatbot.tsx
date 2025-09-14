
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Bot, Send, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type Message = {
  id: string;
  text: string;
  role: 'user' | 'assistant';
  isQuizQuestion?: boolean;
  options?: string[];
  quizState?: 'correct' | 'incorrect' | 'answered';
};

const initialBotMessage =
  "I'm the NoteMark Assistant. The AI chat and quiz features are temporarily disabled due to API rate limits. We are working to restore them. Thanks for your patience!";

export function Chatbot({ pageContext }: { pageContext?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot-message',
      text: initialBotMessage,
      role: 'assistant',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: `user-${Date.now()}`, text: input, role: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate a bot response for disabled state
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: 'The AI features are currently disabled.',
        role: 'assistant',
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex h-full max-h-[80vh] flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-headline text-lg font-semibold">NoteMark Assistant</h2>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : ''
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-lg p-3 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p>{message.text}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-lg p-3 text-sm bg-muted">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground animation-delay-200" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground animation-delay-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AI features are disabled..."
            className="flex-1"
            disabled={true}
          />
          <Button type="submit" size="icon" disabled={true}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
