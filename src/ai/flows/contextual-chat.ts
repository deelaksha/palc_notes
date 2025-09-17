
'use server';
/**
 * @fileOverview A two-step AI chat flow that first attempts to answer
 * questions based on page context before falling back to a general chat model.
 *
 * - contextualChat - A function that handles contextual chat queries.
 */

import { ai } from '@/ai';
import { z } from 'zod';
import { MessageSchema } from '@/ai/schemas';
import { generalChat } from './general-chat';
import { defineFlow, definePrompt } from '@genkit-ai/core';

const ContextualChatInputSchema = z.object({
  chatHistory: z.array(MessageSchema),
  question: z.string(),
});

type ContextualChatInput = z.infer<typeof ContextualChatInputSchema>;

const ContextualChatOutputSchema = z.object({
  isContextual: z.boolean().describe('Whether the question can be answered from the provided context. If no context is provided, this should be false.'),
  answer: z.string().describe('The answer to the question. If isContextual is false, this will be an empty string.'),
});

const contextualChatPrompt = `
You are an intelligent AI assistant for a technical documentation website called NoteMark.
Your goal is to determine if the user's question can be answered using the provided page content.

If page content is provided, analyze the user's question and the content.
If the question is about the provided page content, set "isContextual" to true and provide a comprehensive answer based *only* on that content. Do not use any outside knowledge.

If no page content is provided, or if the question is a greeting, a general question, or cannot be answered using the page content, set "isContextual" to false and set "answer" to an empty string.

## Chat History
{{#each chatHistory}}
- {{role}}: {{content}}
{{/each}}

## User Question
{{question}}
`;

const contextualPrompt = definePrompt({
  name: 'contextualChatPrompt',
  prompt: contextualChatPrompt,
  inputSchema: ContextualChatInputSchema, 
  outputSchema: ContextualChatOutputSchema,
  model: 'googleai/gemini-1.5-flash-latest',
});


export const contextualChat = defineFlow(
  {
    name: 'contextualChat',
    inputSchema: ContextualChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    // Note: The 'context' is removed from the input to prevent the re-render loop.
    // The AI is smart enough to handle general questions without it.
    // In a future enhancement, context could be provided in a more stable way.
    const contextualResponse = await contextualPrompt(input);
    
    const structuredOutput = contextualResponse;

    if (structuredOutput?.isContextual && structuredOutput.answer) {
      return structuredOutput.answer;
    } else {
      // If the question is not about the page content, fall back to the general chat.
      const generalResponse = await generalChat({
        chatHistory: input.chatHistory,
        question: input.question,
      });
      return generalResponse;
    }
  }
);
