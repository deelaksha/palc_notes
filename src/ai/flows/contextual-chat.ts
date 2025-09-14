
'use server';
/**
 * @fileOverview A two-step AI chat flow that first attempts to answer
 * questions based on page context before falling back to a general chat model.
 *
 * - contextualChat - A function that handles contextual chat queries.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { MessageSchema } from '@/ai/schemas';
import { generalChat } from './general-chat';
import { defineDotprompt } from '@genkit-ai/dotprompt';

// @ts-ignore
import contextualChatPromptFile from '../prompts/contextual-chat.prompt';

const ContextualChatInputSchema = z.object({
  chatHistory: z.array(MessageSchema),
  question: z.string(),
  context: z.string(),
});

type ContextualChatInput = z.infer<typeof ContextualChatInputSchema>;

const ContextualChatOutputSchema = z.object({
  isContextual: z.boolean().describe('Whether the question can be answered from the provided context.'),
  answer: z.string().describe('The answer to the question. If isContextual is false, this will be an empty string.'),
});

const contextualPrompt = defineDotprompt({
  name: 'contextualChatPrompt',
  prompt: contextualChatPromptFile,
  input: {
    schema: ContextualChatInputSchema,
  },
  output: {
    schema: ContextualChatOutputSchema,
  },
  model: 'googleai/gemini-1.5-flash-latest',
});


export const contextualChat = ai.defineFlow(
  {
    name: 'contextualChat',
    inputSchema: ContextualChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const contextualResponse = await contextualPrompt.generate({
        input: input,
    });
    
    const structuredOutput = contextualResponse.output();

    if (structuredOutput?.isContextual) {
      return structuredOutput.answer;
    } else {
      // If the question is not about the page content, fall back to the general chat.
      const generalResponse = await generalChat.invoke({
        chatHistory: input.chatHistory,
        question: input.question,
      });
      return generalResponse;
    }
  }
);
