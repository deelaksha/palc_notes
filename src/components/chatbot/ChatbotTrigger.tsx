
'use client';

import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';
import { MessageCircle } from 'lucide-react';

export function ChatbotTrigger() {
    return (
        <SheetTrigger asChild>
            <Button
              size="icon"
              className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary/80 backdrop-blur-md border-primary/50 border-2 hover:bg-primary text-primary-foreground animate-fade-in-up"
            >
              <MessageCircle className="h-8 w-8" />
              <span className="sr-only">Open Chat</span>
            </Button>
        </SheetTrigger>
    );
}
