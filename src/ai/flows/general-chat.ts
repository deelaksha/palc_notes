
'use server';

/**
 * @fileOverview A general purpose chatbot.
 *
 * - generalChat - A function that answers a question.
 * - GeneralChatInput - The input type for the generalChat function.
 * - GeneralChatOutput - The return type for the generalChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
    role: z.enum(['user', 'bot']),
    content: z.string(),
});

const GeneralChatInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The previous messages in the conversation.'),
  question: z.string().describe('The user\'s current question.'),
});
type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const GeneralChatOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
type GeneralChatOutput = z.infer<typeof GeneralChatOutputSchema>;


export async function generalChat(
  input: GeneralChatInput
): Promise<GeneralChatOutput> {
  return generalChatFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generalChatPrompt',
  input: { schema: GeneralChatInputSchema },
  output: { schema: GeneralChatOutputSchema },
  prompt: `You are a helpful and friendly general knowledge assistant. Your name is "NoteMark Assistant".

Answer the user's question accurately. Format your answers in simple markdown.

Conversation History:
---
{{#each history}}
**{{role}}**: {{content}}
{{/each}}
---

User's Current Question:
"{{{question}}}"
`,
});

const generalChatFlow = ai.defineFlow(
  {
    name: 'generalChatFlow',
    inputSchema: GeneralChatInputSchema,
    outputSchema: GeneralChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
