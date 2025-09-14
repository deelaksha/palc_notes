
'use server';
/**
 * @fileOverview A general-purpose AI chat flow.
 *
 * - generalChat - A function that handles general chat queries.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { MessageSchema } from '@/ai/schemas';

const GeneralChatInputSchema = z.object({
  chatHistory: z.array(MessageSchema),
  question: z.string(),
});

type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const prompt = ai.definePrompt(
  {
    name: 'generalChatPrompt',
    input: { schema: GeneralChatInputSchema },
    output: { format: 'text' },
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

export const generalChat = ai.defineFlow(
  {
    name: 'generalChat',
    inputSchema: GeneralChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
