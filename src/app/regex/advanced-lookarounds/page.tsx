
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { Chatbot } from '@/components/chatbot/Chatbot';

const content = `
# 🧙‍♂️ Advanced Magic: Lookarounds

Lookarounds are the secret weapons of a Regex master. Like anchors, they are **zero-width assertions**, meaning they match a position, not characters. They allow you to create conditions—"match this pattern, but only if it's next to that other pattern"—without including the "other pattern" in the final match.

---

## ✨ 1. Lookahead \`(?=...)\`
**Positive Lookahead**: Asserts that the characters following the current position must match the pattern inside the lookahead, but doesn't consume them.

Think of it as looking ahead in the string to see if a condition is met before deciding to match.

- **Use Case**: You want to match the word "Mission", but only if it's followed by a colon.
- **Input Text**: "Mission: 1, Mission 2, Mission: 3"
- **Regex**: \`Mission(?=:)\`
- **Explanation**:
    1.  The engine matches "Mission".
    2.  It then encounters the lookahead \`(?=:)\`. It *peeks* forward. Is the next character a colon \`:\`?
    3.  In "Mission: 1", yes it is. The lookahead succeeds. The entire match is "Mission". The colon is not included.
    4.  In "Mission 2", the lookahead peeks forward and sees a space. It fails. The engine backtracks and determines there is no match here.
- **Output**: "Mission" (twice)

---

## ✨ 2. Negative Lookahead \`(?!...)\`
**Negative Lookahead**: Asserts that the characters following the current position must **not** match the pattern inside the lookahead.

- **Use Case**: You want to match the word "cat", but not if it's part of the word "catfish".
- **Input Text**: "I have a cat, a dog, and a catfish."
- **Regex**: \`\\bcat(?!fish)\\b\`
- **Explanation**:
    1.  The engine matches the whole word "cat".
    2.  It hits the negative lookahead \`(?!fish)\`. It peeks forward. Are the next characters "fish"? No, they are a comma and a space. The lookahead succeeds. Match found: "cat".
    3.  Later, in "catfish", the engine matches "cat".
    4.  It peeks forward. Are the next characters "fish"? Yes. The negative lookahead *fails*. This is not a match.
- **Output**: "cat"

---

## ✨ 3. Lookbehind \`(?<=...)\`
**Positive Lookbehind**: Asserts that the characters preceding the current position must match the pattern inside the lookbehind.

Think of it as looking over your shoulder to check what came before.

- **Use Case**: You want to extract the numbers from prices in dollars, but you don't want the dollar sign in your match.
- **Input Text**: "$100, €50, $20"
- **Regex**: \`(?<=\\$)\\d+\`
- **Explanation**:
    1.  The engine moves along the string. When it gets to "1", it triggers the lookbehind.
    2.  It *peeks* backward. Is the preceding character a dollar sign \`$\`? (Note the \`\\$\` to escape it). Yes. The lookbehind succeeds.
    3.  The engine then proceeds to match \`\\d+\`, which matches "100".
    4.  Later, when it gets to "5", it peeks backward and sees "€". The lookbehind fails. No match.
- **Output**: "100" and "20"
- **Important Note**: Many regex engines require the pattern inside a lookbehind to be of a fixed length. You can't put quantifiers like \`*\` or \`+\` in them in most flavors.

---

## ✨ 4. Negative Lookbehind \`(?<!...)\`
**Negative Lookbehind**: Asserts that the characters preceding the current position must **not** match the pattern.

- **Use Case**: You want to find a number, but only if it's not preceded by "ID: ".
- **Input Text**: "Order: 123, ID: 456, Quantity: 789"
- **Regex**: \`(?<!ID: )\\b\\d+\\b\`
- **Explanation**:
    1.  When the engine gets to "123", it looks behind. Is it preceded by "ID: "? No. The lookbehind succeeds. Match: "123".
    2.  When it gets to "456", it looks behind. Is it preceded by "ID: "? Yes. The negative lookbehind *fails*. No match.
    3.  When it gets to "789", it looks behind. It's not preceded by "ID: ". Match: "789".
- **Output**: "123" and "789"

---

## Example: Password Strength Check
Lookaheads are famously used for password validation. Let's create a pattern that requires at least one lowercase letter, one uppercase letter, one digit, and is at least 8 characters long.

- **Regex**: \`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\`
- **Explanation**:
    - \`^\`: Anchor to the start of the string.
    - \`(?=.*[a-z])\`: A lookahead that asserts "somewhere in the string, there is a lowercase letter". It doesn't consume any characters.
    - \`(?=.*[A-Z])\`: A second lookahead from the same starting position. It asserts "somewhere in the string, there is an uppercase letter".
    - \`(?=.*\\d)\`: A third lookahead asserting "somewhere in the string, there is a digit".
    - After all three lookaheads succeed (without moving the cursor!), the engine finally tries to consume characters with \`.{8,}\`.
    - \`.{8,}$\`: This matches any character, 8 or more times, until the end of the string.

This powerful combination lets you enforce multiple conditions on the same string simultaneously.
`;

export default function RegexAdvancedPage() {
    return (
        <>
            <MarkdownRenderer markdown={content} />
            <Chatbot pageContent={content} />
        </>
    );
}
