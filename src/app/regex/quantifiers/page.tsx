import { InteractiveRegexExample } from '@/components/regex/InteractiveRegexExample';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# 🔢 Quantifiers: Greedy vs. Lazy

Quantifiers answer the question, "How many times should this part of the pattern appear?" They are essential for matching repeating characters.

---

## ✨ 1. The Basic Quantifiers

| Quantifier | Name | What it Does |
|---|---|---|
| \`*\` | Star | Matches the preceding character **0 or more** times |
| \`+\` | Plus | Matches the preceding character **1 or more** times |
| \`?\` | Question Mark | Matches the preceding character **0 or 1** time |

### Specific Repetitions with Curly Braces \`{}\`

| Quantifier | What it Does |
|---|---|
| \`{n}\` | Exactly \`n\` times |
| \`{n,}\` | \`n\` or more times |
| \`{n,m}\` | Between \`n\` and \`m\` times (inclusive) |

- **Real-world Example**: Matching a phone number format.
`;
const example1 = {
  pattern: '\\d{3}-\\d{4}',
  text: 'My number is 555-1234.',
  explanation: `This would match a 3-digit area code, a dash, and a 4-digit number.`
};

const example2 = {
  pattern: '\\b[a-zA-Z]{4,8}\\b',
  text: 'Find four to eight letter words.',
  explanation: `This will match whole words with 4 to 8 letters.`
};

const content2 = `
---

## ✨ 2. Greedy vs. Lazy Matching

This is a critical concept. By default, quantifiers are **Greedy**. This means they try to match **as much text as possible** while still allowing the rest of the pattern to match.

### Greedy Quantifiers
Let's see a greedy quantifier in action.
`;

const example3 = {
  pattern: '<.*>',
  text: '<h1>This is a heading</h1>',
  explanation: `
1.  The engine sees \`<\` and matches the first one.
2.  Then it sees \`.*\`. The \`.\` matches any character, and the \`*\` says "match 0 or more times, greedily".
3.  The engine's greedy nature makes it consume the *entire rest of the string*: \`h1>This is a heading</h1>\`.
4.  It reaches the end of the string. Now it checks the rest of the pattern: \`>\`.
5.  The engine has to backtrack from the end of its greedy match, one character at a time, until it finds a \`>\` that allows the pattern to succeed. It finds the very last \`>\`.
- **Output**: \`<h1>This is a heading</h1>\` (The whole thing!)
This is often not what you want. You probably wanted to match just the tags.
`
};

const content3 = `
### Lazy Quantifiers
To make a quantifier **Lazy**, you add a question mark \`?\` after it (\`*?\`, \`+?\`, \`{n,m}?\`). A lazy quantifier tries to match **as little text as possible**.
`;

const example4 = {
  pattern: '<.*?>',
  text: '<h1>This is a heading</h1>',
  explanation: `
1.  The engine sees \`<\` and matches the first one.
2.  Then it sees \`.*?\`. It's lazy, so it first tries to match *zero* characters.
3.  It checks the rest of the pattern: \`>\`. Does the next character match? Yes, it's 'h'. No match.
4.  The lazy quantifier expands its match one character at a time. It matches 'h', then checks for \`>\`. No. It matches '1', then checks for \`>\`. Yes!
- **Output**: The engine finds two matches: \`<h1>\` and \`</h1>\`.
- **Pitfall**: Using greedy quantifiers like \`.*\`, especially with patterns that can be found multiple times in a string, is a common source of bugs. When in doubt, start with a lazy quantifier (\`.*?_\`) or a more specific negated character set (\`[^>]*\`). The pattern \`<[^>]*>\` is often a better and more efficient way to match an HTML tag than \`<.*?>\`.
`
};

export default function RegexQuantifiersPage() {
    return (
        <div className="flex">
            <main className="flex-1">
                <MarkdownRenderer markdown={content} />
                <InteractiveRegexExample {...example1} />
                <InteractiveRegexExample {...example2} />
                <MarkdownRenderer markdown={content2} />
                <InteractiveRegexExample {...example3} />
                <MarkdownRenderer markdown={content3} />
                <InteractiveRegexExample {...example4} />
            </main>
        </div>
    );
}
