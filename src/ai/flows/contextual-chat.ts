
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

export const ContextualChatInputSchema = z.object({
  context: z
    .string()
    .describe('The content of the documentation page to use as context.'),
  history: z.array(ChatMessageSchema).describe('The previous messages in the conversation.'),
  question: z.string().describe('The user\'s current question about the content.'),
});
export type ContextualChatInput = z.infer<typeof ContextualChatInputSchema>;

const ContextualChatOutputSchema = z.object({
  answer: z.string().describe('The answer to the question, based on the provided context.'),
  isGeneralQuestion: z.boolean().describe('Whether the question is a general knowledge question unrelated to the context.'),
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
  prompt: `You are an expert documentation assistant named "NoteMark Assistant". Your primary task is to determine if the user's question can be answered from the "Page Context" provided.

Analyze the user's question and the conversation history.

1.  **If the question IS related to the "Page Context"**:
    - Provide a helpful and accurate answer using ONLY the provided context.
    - Set the \`isGeneralQuestion\` flag to \`false\`.
    - Your answers should be formatted in simple markdown.

2.  **If the question IS NOT related to the "Page Context"**:
    - Do NOT answer the question.
    - Set the \`isGeneralQuestion\` flag to \`true\`.
    - Set the \`answer\` field to a brief, generic confirmation like "Let me check on that for you."

3.  **Special Command: Quizzes**:
    - If the user asks for a quiz (e.g., "quiz me", "test my knowledge"), set the \`isQuizRequest\` flag to \`true\`, set \`isGeneralQuestion\` to \`false\`, and set the \`answer\` to a simple confirmation message like "Starting a quiz for you now!".

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
