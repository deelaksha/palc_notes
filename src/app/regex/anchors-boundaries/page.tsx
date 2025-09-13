
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# ⚓️ Anchors & Boundaries

Anchors are special metacharacters that don't match any character. Instead, they match a **position** before, after, or between characters. They are crucial for ensuring your pattern matches at the right place.

---

## ✨ 1. Start and End of String Anchors

These are the most common anchors. They lock your pattern to the beginning or end of the entire string (or line, with the multiline flag).

### Caret: \`^\` (Start of String)
The caret \`^\` asserts that the position is the very beginning of the string.

- **Input Text**: "Hello world"
- **Regex Pattern**: \`^Hello\`
- **Explanation**: The engine first checks if it's at the start of the string. It is. Then it matches "H", "e", "l", "l", "o". This is a match.
- **Output**: "Hello"

If we tried the pattern \`world^\`, it would fail because "world" is not at the start of the string.

### Dollar Sign: \`$\` (End of String)
The dollar sign \`$\` asserts that the position is the very end of the string.

- **Input Text**: "Hello world"
- **Regex Pattern**: \`world$\`
- **Explanation**: The engine matches "world" and then checks if the position immediately after is the end of the string. It is. This is a match.
- **Output**: "world"

- **Real-world Example**: Validating a username format. You want to ensure the entire string matches, not just part of it. A pattern like \`^[a-z0-9]{3,16}$\` ensures the string starts, contains 3-16 valid characters, and then immediately ends. Without the anchors, "!!username!!" would match because it *contains* a valid username.

---

## ✨ 2. Word Boundaries

Word boundaries are incredibly useful for matching whole words.

### Word Boundary: \`\\b\`
The anchor \`\\b\` matches a position that is a "word boundary". A word boundary is a position between a word character and a non-word character, or at the start/end of a string.

- **Word Characters** (\`\\w\`): Letters (\`a-z\`, \`A-Z\`), numbers (\`0-9\`), and the underscore (\`_\`).
- **Non-Word Characters** (\`\\W\`): Everything else (spaces, punctuation like \`.\`, \`,\`, etc.).

- **Input Text**: "The cat scattered."
- **Regex Pattern**: \`\\bcat\\b\`
- **Explanation**:
    1.  In "The cat", the space before "c" creates a boundary. The space after "t" creates another. \`cat\` is matched.
    2.  In "scattered", "s" and "c" are both word characters, so there is no boundary before the "c". This is not a match.
- **Output**: "cat"

### Non-Word Boundary: \`\\B\`
The anchor \`\\B\` is the opposite of \`\\b\`. It matches any position that is **not** a word boundary.

- **Input Text**: "The bobcat scattered."
- **Regex Pattern**: \`\\Bcat\`
- **Explanation**: The engine looks for "cat" that does *not* have a word boundary before it. In "bobcat", the position between "b" and "c" is not a boundary because both are word characters. This is a match.
- **Output**: "cat" (inside "bobcat")

- **Real-world Example**: You want to find all instances of the word "view" but not "review" or "preview". The pattern \`\\bview\\b\` is perfect for this. Without the boundaries, a simple search for "view" would incorrectly match inside "review".
`;

export default function RegexAnchorsPage() {
  return <MarkdownRenderer markdown={content} />;
}
