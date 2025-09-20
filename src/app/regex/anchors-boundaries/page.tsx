
'use client';

import { InteractiveRegexExample } from '@/components/regex/InteractiveRegexExample';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { motion } from 'framer-motion';

const content = `
# ⚓️ Anchors & Boundaries

Anchors are special metacharacters that don\'t match any character. Instead, they match a **position** before, after, or between characters. They are crucial for ensuring your pattern matches at the right place.

---

## ✨ 1. Start and End of String Anchors

These are the most common anchors. They lock your pattern to the beginning or end of the entire string (or line, with the multiline flag).

### Caret: \`^\` (Start of String)
The caret \`^\` asserts that the position is the very beginning of the string.
`;

const example1 = {
  pattern: '^Hello',
  text: 'Hello world\\nAnother line',
  explanation: `The engine first checks if it\'s at the start of the string. It is. Then it matches "H", "e", "l", "l", "o". This is a match.`
};

const content2 = `
### Dollar Sign: \`$\` (End of String)
The dollar sign \`$\` asserts that the position is the very end of the string.
`;

const example2 = {
  pattern: 'world$',
  text: 'Hello world',
  explanation: `The engine matches "world" and then checks if the position immediately after is the end of the string. It is. This is a match.`
};

const content3 = `
- **Real-world Example**: Validating a username format. You want to ensure the entire string matches, not just part of it. A pattern like \`^[a-z0-9]{3,16}$\` ensures the string starts, contains 3-16 valid characters, and then immediately ends. Without the anchors, "!!username!!" would match because it *contains* a valid username.

---

## ✨ 2. Word Boundaries

Word boundaries are incredibly useful for matching whole words.

### Word Boundary: \`\\b\`
The anchor \`\\b\` matches a position that is a "word boundary". A word boundary is a position between a word character and a non-word character, or at the start/end of a string.

- **Word Characters** (\`\\w\`): Letters (\`a-z\`, \`A-Z\`), numbers (\`0-9\`), and the underscore (\`_\`).
- **Non-Word Characters** (\`\\W\`): Everything else (spaces, punctuation like \`.\`, \`,\`, etc.).
`;

const example3 = {
  pattern: '\\bcat\\b',
  text: 'The cat scattered.',
  explanation: `
1.  In "The cat", the space before "c" creates a boundary. The space after "t" creates another. \`cat\` is matched.
2.  In "scattered", "s" and "c" are both word characters, so there is no boundary before the "c". This is not a match.`
};

const content4 = `
### Non-Word Boundary: \`\\B\`
The anchor \`\\B\` is the opposite of \`\\b\`. It matches any position that is **not** a word boundary.
`;

const example4 = {
  pattern: '\\Bcat',
  text: 'The bobcat scattered.',
  explanation: `The engine looks for "cat" that does *not* have a word boundary before it. In "bobcat", the position between "b" and "c" is not a boundary because both are word characters. This is a match.`
};

const content5 = `
- **Real-world Example**: You want to find all instances of the word "view" but not "review" or "preview". The pattern \`\\bview\\b\` is perfect for this. Without the boundaries, a simple search for "view" would incorrectly match inside "review".

---
## ✨ 3. Multiline Mode Anchors

Some regex engines have a "multiline mode" (often enabled with a flag like \`/m\`). In this mode, \`^\` and \`$\` change their meaning slightly.

- \`^\`: Matches the start of the entire string OR the start of a new line (immediately after a newline character \`\\n\`).
- \`$\`: Matches the end of the entire string OR the end of a line (immediately before a newline character \`\\n\`).
`;

const example5 = {
  pattern: '^Line',
  text: 'Line 1\\nLine 2\\nLine 3',
  explanation: `This will match "Line" at the beginning of all three lines. Without multiline mode, it would only match the first one.`
};

export default function RegexAnchorsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex">
        <main className="flex-1">
          <MarkdownRenderer markdown={content} />
          <InteractiveRegexExample {...example1} />
          <MarkdownRenderer markdown={content2} />
          <InteractiveRegexExample {...example2} />
          <MarkdownRenderer markdown={content3} />
          <InteractiveRegexExample {...example3} />
          <MarkdownRenderer markdown={content4} />
          <InteractiveRegexExample {...example4} />
          <MarkdownRenderer markdown={content5} />
          <InteractiveRegexExample {...example5} />
        </main>
      </div>
    </motion.div>
  );
}
