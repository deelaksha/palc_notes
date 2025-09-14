
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, BrainCircuit, ShieldClose } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import type { Quiz } from '@/ai/flows/quiz-generator';
import { generateQuiz } from '@/ai/flows/quiz-generator';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

type QuizState = 'idle' | 'loading' | 'active' | 'finished';

export function Chatbot({ pageContent }: { pageContent: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerateNewQuiz = async (isContinuation: boolean) => {
    // This functionality is temporarily disabled.
    setMessages([{ role: 'bot', content: 'I apologize, but all AI features are temporarily disabled due to API rate limits.' }]);
  };

  const handleStopQuiz = () => {
    setQuizState('idle');
    setQuiz(null);
    setMessages((prev) => [...prev, { role: 'bot', content: 'Quiz stopped. Ask me anything else!'}]);
  }

  const handleAnswerQuestion = (selectedIndex: number) => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    const feedbackMessage = {
      role: 'bot' as const,
      content: isCorrect
        ? `Correct! 🎉\n\n**Explanation:** ${currentQuestion.explanation}`
        : `Not quite. The correct answer was **${currentQuestion.options[currentQuestion.correctAnswer]}**.\n\n**Explanation:** ${currentQuestion.explanation}`,
    };
    setMessages((prev) => [...prev, feedbackMessage]);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Regenerate the quiz with new questions for a continuous loop
      handleGenerateNewQuiz(true);
    }
  };


  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const botMessage = { role: 'bot' as const, content: "I apologize, but all AI features (including chat and quizzes) are temporarily disabled due to API rate limits. The engineers are working on a more permanent solution." };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = { role: 'bot' as const, content: 'Sorry, something went wrong. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderQuizQuestion = () => {
    if (!quiz || quizState !== 'active') return null;

    const question = quiz.questions[currentQuestionIndex];
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 justify-start">
          <BrainCircuit className="size-6 text-primary flex-shrink-0" />
          <div className="max-w-xs md:max-w-sm rounded-lg px-4 py-2 bg-muted markdown-content">
            <MarkdownRenderer markdown={`**${question.question}**`} />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
            {question.options.map((option, index) => (
                <Button key={index} variant="outline" className="w-full justify-start" onClick={() => handleAnswerQuestion(index)}>
                    {option}
                </Button>
            ))}
        </div>
      </div>
    );
  };


  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='fixed inset-0 z-50 w-full h-full'
          >
            <div className="bg-background/80 backdrop-blur-lg flex flex-col h-full w-full rounded-none">
              <div className="flex-1 p-4 overflow-y-auto space-y-4 relative">
                 <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                        <X className="size-5" />
                    </Button>
                 </div>
                {(messages.length === 0) ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <MessageSquare className="size-12 mb-2" />
                    <p className="font-bold text-lg">NoteMark Assistant</p>
                    <p>All AI features are temporarily disabled due to API rate limits.</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.role === 'bot' && <Bot className="size-6 text-primary flex-shrink-0" />}
                      <div className={cn(
                          'max-w-xs md:max-w-sm rounded-lg px-4 py-2 markdown-content',
                          message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      )}>
                          <MarkdownRenderer markdown={message.content} />
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
                 {renderQuizQuestion()}
                <div ref={messagesEndRef} />
              </div>
              <footer className="p-4 border-t border-border/50 bg-background/80">
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
                      placeholder="AI features are temporarily disabled..."
                      className="pr-12 resize-none bg-transparent"
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
          {isOpen ? <X className="size-7" /> : <Sparkles className="size-7" />}
        </Button>
      </motion.div>
    </>
  );
}
