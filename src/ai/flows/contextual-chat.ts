'use server';

/**
 * @fileOverview A contextual chatbot that answers questions based on provided page content.
 *
 * - contextualChat - A function that answers a question based on a given context.
 * - ContextualChatInput - The input type for the contextualChat function.
 * - ContextualChatOutput - The return type for the contextualChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ContextualChatInputSchema = z.object({
  context: z
    .string()
    .describe('The content of the documentation page to use as context.'),
  question: z.string().describe('The user\'s question about the content.'),
});
export type ContextualChatInput = z.infer<typeof ContextualChatInputSchema>;

export const ContextualChatOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, based only on the provided context.'),
});
export type ContextualChatOutput = z.infer<typeof ContextualChatOutputSchema>;


export async function contextualChat(
  input: ContextualChatInput
): Promise<ContextualChatOutput> {
  return contextualChatFlow(input);
}


const prompt = ai.definePrompt({
  name: 'contextualChatPrompt',
  input: { schema: ContextualChatInputSchema },
  output: { schema: ContextualChatOutputSchema },
  prompt: `You are a helpful and friendly assistant on a documentation website. Your name is "NoteMark Assistant".

Your task is to answer the user's question based ONLY on the context provided below. The context is a page from a tutorial for learning developer tools.

- If the answer is found in the context, provide a clear and concise answer based on that information.
- If the answer cannot be found in the context, you MUST politely state that you can only answer questions about the content on the current page.
- Do not use any external knowledge. Do not browse the web.
- Your answers should be formatted in simple markdown.

Page Context:
---
{{{context}}}
---

User's Question:
"{{{question}}}"
`,
});

const contextualChatFlow = ai.defineFlow(
  {
    name: 'contextualChatFlow',
    inputSchema: ContextualChatInputSchema,
    outputSchema: ContextualChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
