
'use server';
/**
 * @fileOverview A general-purpose AI chat flow.
 *
 * - generalChat - A function that handles general chat queries.
 */

import { ai } from '@/ai';
import { z } from 'zod';
import { MessageSchema } from '@/ai/schemas';
import { defineFlow, definePrompt } from '@genkit-ai/core';

const GeneralChatInputSchema = z.object({
  chatHistory: z.array(MessageSchema),
  question: z.string(),
});

type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const prompt = definePrompt(
  {
    name: 'generalChatPrompt',
    inputSchema: GeneralChatInputSchema,
    outputFormat: 'text',
    model: 'googleai/gemini-1.5-flash-latest',
    prompt: `
You are a helpful and friendly AI assistant named NoteMark.
Your personality is witty, knowledgeable, and slightly playful.
Answer the user's question.

Here is the chat history so far:
{{#each chatHistory}}
- {{role}}: {{content}}
{{/each}}

Here is the user's question:
{{{question}}}
`,
  },
);

export const generalChat = defineFlow(
  {
    name: 'generalChat',
    inputSchema: GeneralChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const response = await prompt.generate(input);
    return response.text();
  }
);
