
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# 📦 Grouping & Capturing

Parentheses \`()\` are one of the most powerful features in regex. They let you group parts of a pattern together and "capture" the text that matches inside them for later use.

---

## ✨ 1. Grouping
At its simplest, grouping lets you apply a quantifier to a whole sequence of characters, not just one.

- **Input Text**: "hahaha"
- **Regex Pattern**: \`(ha)+\`
- **Explanation**:
    1.  The \`(ha)\` creates a group containing "ha".
    2.  The \`+\` quantifier applies to the *entire group*, meaning "match the sequence 'ha' one or more times".
- **Output**: "hahaha"

Without the group, the pattern \`ha+\` would mean "match 'h' followed by 'a' one or more times", which would only match "haaaa...".

---

## ✨ 2. Capturing Groups
When you group a pattern using \`()\`, the text that matches inside the group is automatically "captured" and stored in memory. These captures are numbered starting from 1 based on the opening parenthesis's position.

- **Input Text**: "My file is image.jpg and not image.png"
- **Regex Pattern**: \`(image)\\.(jpg|png)\`
- **Explanation**:
    - \`(image)\`: This is **Group 1**. It captures the text "image".
    - \`\\.\`: Matches a literal dot.
    - \`(jpg|png)\`: This is **Group 2**. It uses alternation and captures either "jpg" or "png".
- **Output Matches**: "image.jpg" and "image.png"
- **Captured Groups for the first match ("image.jpg")**:
    - **Group 1**: "image"
    - **Group 2**: "jpg"

### Backreferences
You can refer back to a captured group *within the same regex pattern* using \`\\1\`, \`\\2\`, etc. This is perfect for finding repeated words.

- **Input Text**: "This is a test test."
- **Regex Pattern**: \`\\b(\\w+)\\s+\\1\\b\`
- **Explanation**:
    - \`\\b\`: Word boundary.
    - \`(\\w+)\`: Matches one or more word characters and captures them into **Group 1**. Let's say it captures "test".
    - \`\\s+\`: Matches one or more spaces.
    - \`\\1\`: This is the backreference. It tells the engine to match the exact text that was captured by Group 1, which is "test".
    - \`\\b\`: Word boundary.
- **Output**: "test test"

---

## ✨ 3. Non-Capturing Groups \`(?:...)\`
Sometimes you need to group parts of your pattern (e.g., to use a quantifier or alternation) but you don't care about capturing the result. Using a non-capturing group \`(?:...)\` is slightly more efficient because the engine doesn't have to store the matched text.

- **Regex Pattern**: \`(?:Mr|Mrs|Ms)\\. [A-Z]\\w*\`
- **Explanation**: The \`(?:Mr|Mrs|Ms)\` part groups the titles together so the \`\\.\` applies to all of them, but it doesn't create a capture group that you'd have to skip over if you had other, more important capture groups later in the pattern.

---

## ✨ 4. Named Groups \`(?<name>...)\`
In modern regex engines, you can give your capture groups names, which makes your regex and the code that uses it much more readable. The syntax varies slightly between languages (\`(?<name>...)\` or \`(?P<name>...)\` are common).

- **Input Text**: "Date: 2023-10-27"
- **Regex Pattern**: \`Date: (?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})\`
- **Explanation**: Instead of remembering that the year is Group 1, the month is Group 2, etc., you can now access the captured values by the names "year", "month", and "day". This makes your code self-documenting.

- **Captured Groups**:
    - **year**: "2023"
    - **month**: "10"
    - **day**: "27"
`;

export default function RegexGroupingPage() {
  return <MarkdownRenderer markdown={content} />;
}
