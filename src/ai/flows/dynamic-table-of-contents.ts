'use server';

/**
 * @fileOverview A dynamic table of contents generator for markdown notes.
 *
 * - generateTableOfContents - A function that generates a table of contents for a given markdown content.
 * - GenerateTableOfContentsInput - The input type for the generateTableOfContents function.
 * - GenerateTableOfContentsOutput - The return type for the generateTableOfContents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTableOfContentsInputSchema = z.object({
  markdownContent: z
    .string()
    .describe('The markdown content for which to generate the table of contents.'),
});
type GenerateTableOfContentsInput = z.infer<
  typeof GenerateTableOfContentsInputSchema
>;

const GenerateTableOfContentsOutputSchema = z.object({
  tableOfContents: z
    .string()
    .describe('The generated table of contents in markdown format.'),
});
type GenerateTableOfContentsOutput = z.infer<
  typeof GenerateTableOfContentsOutputSchema
>;

export async function generateTableOfContents(
  input: GenerateTableOfContentsInput
): Promise<GenerateTableOfContentsOutput> {
  return generateTableOfContentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTableOfContentsPrompt',
  input: {schema: GenerateTableOfContentsInputSchema},
  output: {schema: GenerateTableOfContentsOutputSchema},
  prompt: `You are an expert technical writer, skilled at creating concise and accurate tables of contents for technical documentation.

  Given the following markdown content, generate a table of contents that accurately reflects the document's structure. The table of contents should:

  1.  Include links to each section within the document.
  2.  Be formatted as a markdown list.
  3.  Use appropriate indentation to represent the hierarchy of headings.
  4.  Omit any introductory or concluding sections that are not part of the core content.

  Markdown Content:
  {{markdownContent}}`,
});

const generateTableOfContentsFlow = ai.defineFlow(
  {
    name: 'generateTableOfContentsFlow',
    inputSchema: GenerateTableOfContentsInputSchema,
    outputSchema: GenerateTableOfContentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
