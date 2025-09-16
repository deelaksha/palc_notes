
/**
 * @fileoverview This file initializes the Genkit AI instance.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// This is the correct initialization for Genkit v1.x
export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
