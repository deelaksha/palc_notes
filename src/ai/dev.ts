
'use server';
/**
 * @fileoverview This file is used to register AI flows for development.
 * It is not included in the production build.
 */
import { ai } from '@/ai/genkit';
import { defineDotprompt } from '@genkit-ai/dotprompt';

// @ts-ignore
import contextualChat from './prompts/contextual-chat.prompt';
// @ts-ignore
import quizGenerator from './prompts/quiz-generator.prompt';
// @ts-ignore
import generalChat from './prompts/general-chat.prompt';

defineDotprompt({
  name: 'contextualChat',
  prompt: contextualChat,
  model: 'googleai/gemini-1.5-flash-latest',
});

defineDotprompt({
  name: 'quizGenerator',
  prompt: quizGenerator,
  model: 'googleai/gemini-1.5-flash-latest',
});

defineDotprompt({
  name: 'generalChat',
  prompt: generalChat,
  model: 'googleai/gemini-1.5-flash-latest',
});


export { generalChat } from './flows/general-chat';
