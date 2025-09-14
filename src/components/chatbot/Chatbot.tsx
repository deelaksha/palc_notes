
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { contextualChat } from '@/ai/flows/contextual-chat';
import type { Message } from '@/ai/schemas';

// NOTE: This is a diagnostic version of the component.
// It is intentionally hardcoded to be open and has no logic.
export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await contextualChat({
        chatHistory: newMessages,
        question: input,
      });
      setMessages((prev) => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error('Error getting response from AI', error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: 'Sorry, I ran into an error.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        // Use a more robust scrolling method
        const element = scrollAreaRef.current.children[0] as HTMLElement;
        if(element) {
            element.scrollTop = element.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-primary"
          >
            <Bot className="h-7 w-7" />
            <span className="sr-only">Open chat</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          className="flex h-full w-full flex-col p-0 sm:max-w-lg"
          side="right"
        >
          <SheetHeader className="p-4 border-b">
            <SheetTitle>NoteMark Assistant</SheetTitle>
          </SheetHeader>
          <div className="flex-1 flex flex-col-reverse overflow-y-auto p-4 gap-4">
              <div className="flex-shrink-0 space-y-4">
                  {messages.map((message, index) => (
                      <div
                          key={index}
                          className={`flex items-start gap-3 ${
                              message.role === 'user' ? 'justify-end' : ''
                          }`}
                      >
                          {message.role === 'model' && (
                              <Avatar className="h-8 w-8 border-2 border-primary/50 text-primary">
                                  <AvatarFallback className="bg-transparent">
                                      <Bot className="h-5 w-5" />
                                  </AvatarFallback>
                              </Avatar>
                          )}
                          <div
                              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm shadow-md ${
                                  message.role === 'user'
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-card text-card-foreground'
                              }`}
                          >
                              <p className="leading-relaxed">{message.content}</p>
                          </div>
                          {message.role === 'user' && (
                              <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                      <User className="h-5 w-5" />
                                  </AvatarFallback>
                              </Avatar>
                          )}
                      </div>
                  ))}
                   {isLoading && (
                      <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 border-2 border-primary/50 text-primary">
                              <AvatarFallback className="bg-transparent">
                                  <Bot className="h-5 w-5" />
                              </AvatarFallback>
                          </Avatar>
                          <div className="max-w-[80%] rounded-xl px-4 py-3 text-sm shadow-md bg-card text-card-foreground">
                              <div className="flex items-center space-x-2">
                                  <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-0"></span>
                                  <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-200"></span>
                                  <span className="h-2 w-2 bg-primary rounded-full animate-pulse delay-400"></span>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          </div>

          <SheetFooter className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                Send
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

