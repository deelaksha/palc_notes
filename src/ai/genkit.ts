
/**
 * @fileoverview This file initializes the Genkit AI instance.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { configureGenkit } from 'genkit';

configureGenkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export { genkit as ai };
