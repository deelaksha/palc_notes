import { config } from 'dotenv';
config();

import '@/ai/flows/dynamic-table-of-contents.ts';
// import '@/ai/flows/contextual-chat.ts'; - Temporarily disabled to prevent rate-limiting
import '@/ai/flows/quiz-generator.ts';
// import '@/ai/flows/general-chat.ts'; - Temporarily disabled to prevent rate-limiting
