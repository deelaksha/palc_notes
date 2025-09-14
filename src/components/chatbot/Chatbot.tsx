'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contextualChat } from '@/ai/flows/contextual-chat';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

type Message = {
  role: 'user' | 'bot';
  content: string;
};


export function Chatbot({ pageContent }: { pageContent: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const result = await contextualChat({
        context: pageContent,
        history: messages, // Pass the history before the new user message
        question: input
      });
      const botMessage = { role: 'bot' as const, content: result.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = { role: 'bot' as const, content: 'Sorry, something went wrong. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-8 z-50 w-[calc(100%-2rem)] max-w-sm"
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl flex flex-col h-[60vh]">
              <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Bot className="text-primary size-6" />
                  <h3 className="font-bold text-lg">NoteMark Assistant</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="size-5" />
                </Button>
              </header>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <MessageSquare className="size-12 mb-2" />
                    <p>Ask me anything about this page!</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.role === 'bot' && <Bot className="size-6 text-primary flex-shrink-0" />}
                      <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <MarkdownRenderer markdown={message.content} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
                 {isLoading && (
                    <div className="flex justify-start gap-3">
                        <Bot className="size-6 text-primary flex-shrink-0" />
                        <div className="bg-muted rounded-lg px-4 py-3 flex items-center">
                            <Loader2 className="size-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                 )}
                <div ref={messagesEndRef} />
              </div>
              <footer className="p-4 border-t">
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask a question..."
                    className="pr-12 resize-none"
                    rows={1}
                    disabled={isLoading}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={handleSendMessage}
                    disabled={isLoading || input.trim() === ''}
                  >
                    <Send className="size-5" />
                  </Button>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-4 right-4 sm:right-8 z-50"
      >
        <Button size="icon" className="rounded-full w-14 h-14 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="size-7" /> : <Bot className="size-7" />}
        </Button>
      </motion.div>
    </>
  );
}
