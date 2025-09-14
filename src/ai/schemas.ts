/**
 * @fileOverview
 * This file contains the Zod schemas and TypeScript types for data structures
 * shared between the client and server, particularly for AI flows.
 */

import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
