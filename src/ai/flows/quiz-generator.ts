
'use server';

/**
 * @fileOverview An AI flow that generates a quiz based on provided content.
 *
 * - generateQuiz - A function that creates a quiz.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - Quiz - The output type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizInputSchema = z.object({
  context: z.string().describe('The page content to generate the quiz from.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The question.'),
  options: z.array(z.string()).describe('An array of 4 multiple-choice options.'),
  correctAnswer: z.number().describe('The 0-based index of the correct answer in the options array.'),
  explanation: z.string().describe('A brief explanation of why the answer is correct.'),
});

export const QuizSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array of 3-5 quiz questions.'),
});
export type Quiz = z.infer<typeof QuizSchema>;

export async function generateQuiz(
  input: GenerateQuizInput
): Promise<Quiz> {
  return quizGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quizGeneratorPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: QuizSchema },
  prompt: `You are a helpful and fun quiz master. Your task is to generate a short, multiple-choice quiz (3 to 5 questions) based on the provided page content.

The questions should be relevant to the main topics of the content and test the user's understanding.
Each question must have exactly 4 options.
You must also provide a brief explanation for why the correct answer is correct.

Page Content:
---
{{{context}}}
---
`,
});

const quizGeneratorFlow = ai.defineFlow(
  {
    name: 'quizGeneratorFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: QuizSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
