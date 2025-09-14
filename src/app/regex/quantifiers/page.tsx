
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { Chatbot } from '@/components/chatbot/Chatbot';

const content = `
# 🔢 Quantifiers: Greedy vs. Lazy

Quantifiers answer the question, "How many times should this part of the pattern appear?" They are essential for matching repeating characters.

---

## ✨ 1. The Basic Quantifiers

| Quantifier | Name | What it Does | Example | Matches in "booot" |
|---|---|---|---|---|
| \`*\` | Star | Matches the preceding character **0 or more** times | \`o*\` | "ooo" |
| \`+\` | Plus | Matches the preceding character **1 or more** times | \`o+\` | "ooo" |
| \`?\` | Question Mark | Matches the preceding character **0 or 1** time | \`o?\` | "o" (the first one) |

### Specific Repetitions with Curly Braces \`{}\`

| Quantifier | What it Does | Example | Matches in "booot" |
|---|---|---|---|
| \`{n}\` | Exactly \`n\` times | \`o{3}\` | "ooo" |
| \`{n,}\` | \`n\` or more times | \`o{2,}\` | "ooo" |
| \`{n,m}\` | Between \`n\` and \`m\` times (inclusive) | \`o{1,2}\` | "oo" (the first two) |

- **Real-world Example**: Matching a phone number format. The pattern \`\\d{3}-\\d{4}\` would match a 3-digit area code, a dash, and a 4-digit number, like "555-1234".

---

## ✨ 2. Greedy vs. Lazy Matching

This is a critical concept. By default, quantifiers are **Greedy**. This means they try to match **as much text as possible** while still allowing the rest of the pattern to match.

### Greedy Quantifiers
Let's see a greedy quantifier in action.

- **Input Text**: \`<h1>This is a heading</h1>\`
- **Greedy Regex**: \`<.*>\`
- **Explanation**:
    1.  The engine sees \`<\` and matches the first one.
    2.  Then it sees \`.*\`. The \`.\` matches any character, and the \`*\` says "match 0 or more times, greedily".
    3.  The engine's greedy nature makes it consume the *entire rest of the string*: \`h1>This is a heading</h1>\`.
    4.  It reaches the end of the string. Now it checks the rest of the pattern: \`>\`.
    5.  The engine has to backtrack from the end of its greedy match, one character at a time, until it finds a \`>\` that allows the pattern to succeed. It finds the very last \`>\`.
- **Output**: \`<h1>This is a heading</h1>\` (The whole thing!)

This is often not what you want. You probably wanted to match just the tags.

### Lazy Quantifiers
To make a quantifier **Lazy**, you add a question mark \`?\` after it (\`*?\`, \`+?\`, \`{n,m}?\`). A lazy quantifier tries to match **as little text as possible**.

- **Input Text**: \`<h1>This is a heading</h1>\`
- **Lazy Regex**: \`<.*?>\`
- **Explanation**:
    1.  The engine sees \`<\` and matches the first one.
    2.  Then it sees \`.*?\`. It's lazy, so it first tries to match *zero* characters.
    3.  It checks the rest of the pattern: \`>\`. Does the next character match? Yes, it's 'h'. No match.
    4.  The lazy quantifier expands its match one character at a time. It matches 'h', then checks for \`>\`. No. It matches '1', then checks for \`>\`. Yes!
- **Output**: The engine finds two matches: \`<h1>\` and \`</h1>\`.

- **Pitfall**: Using greedy quantifiers like \`.*\`, especially with patterns that can be found multiple times in a string, is a common source of bugs. When in doubt, start with a lazy quantifier (\`.*?_\
\`) or a more specific negated character set (\`[^>]*\`). The pattern \`<[^>]*>\` is often a better and more efficient way to match an HTML tag than \`<.*?>\`.
`;

export default function RegexQuantifiersPage() {
    return (
        <>
            <MarkdownRenderer markdown={content} />
            <Chatbot pageContent={content} />
        </>
    );
}
