
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

Your primary task is to answer the user's question. You should prioritize using the page context provided below.

- First, determine if the user is asking for a quiz. Phrases like "quiz me", "test my knowledge", or "start a quiz" should be interpreted as a quiz request. If it is a quiz request, set the isQuizRequest flag to true and provide a simple confirmation message as the answer, like "Starting a quiz for you now!".
- If the user's question is about the content on the page, provide a clear and concise answer based on that information.
- If the answer is not found in the context or if the question is a general knowledge question, use your general knowledge to provide a helpful and accurate answer.
- If the user asks for more examples or details about a specific command or flag mentioned in the context, provide them in a structured format using markdown. Use headings, lists, and code blocks to make the information clear and easy to read.
- Your answers should be formatted in simple markdown.
- You have access to the conversation history. Use it to understand follow-up questions.

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
