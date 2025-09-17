
/**
 * @fileoverview This file initializes the Genkit AI instance.
 */
import { configure } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

// This is the correct initialization for Genkit v0.5.0
export const ai = configure({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: false,
});
