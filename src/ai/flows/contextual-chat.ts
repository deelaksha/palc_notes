
'use server';

/**
 * @fileOverview A contextual chatbot that answers questions based on provided page content.
 *
 * - contextualChat - A function that answers a question based on a given context.
 * - ContextualChatInput - The input type for the contextualChat function.
 * - ContextualChatOutput - The return type for the contextualChatOutput function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
    role: z.enum(['user', 'bot']),
    content: z.string(),
});

const ContextualChatInputSchema = z.object({
  context: z
    .string()
    .describe('The content of the documentation page to use as context.'),
  history: z.array(ChatMessageSchema).describe('The previous messages in the conversation.'),
  question: z.string().describe('The user\'s current question about the content.'),
});
export type ContextualChatInput = z.infer<typeof ContextualChatInputSchema>;

const ContextualChatOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, based on the provided context or general knowledge.'),
  isQuizRequest: z.boolean().describe('Whether the user is asking to be quizzed.'),
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

Your primary task is to answer the user's question. You have two modes of operation:

1.  **Contextual Assistant**: First, analyze the user's question and the conversation history. If the question is about the "Page Context" provided below, you MUST use that context to form your answer.
2.  **General Knowledge Assistant**: If the user's question is a general knowledge question (like "who is the founder of AI?") or is not related to the "Page Context", you MUST switch to your general knowledge mode and provide a helpful and accurate answer. Do not apologize for the context not having the information.

Additionally, you have a special command:
- If the user asks for a quiz (e.g., "quiz me", "test my knowledge"), set the isQuizRequest flag to true and provide a simple confirmation message like "Starting a quiz for you now!".

Your answers should always be formatted in simple markdown.

Page Context:
---
{{{context}}}
---

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
