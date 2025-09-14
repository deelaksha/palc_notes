
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { allDocsContext } from '@/lib/all-docs-context';

const content = `
# 🌟 Common Patterns & Practice

The best way to learn regex is to use it. This section provides a reference for common real-world patterns and practice problems to test your skills.

---

## ✨ 1. Common Pattern Reference

| Use Case | Regex Pattern | Explanation |
|---|---|---|
| **Email Validation** | \`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\` | Starts with user chars, then @, then domain, then ., then TLD. (A simplified version). |
| **US Phone Number** | \`\\(?\\d{3}\\)?[ -]?\\d{3}[ -]?\\d{4}\` | Matches formats like (123)-456-7890, 123-456-7890, 123 456 7890, 1234567890. |
| **Date (YYYY-MM-DD)** | \`^\\d{4}-\\d{2}-\\d{2}$\` | Exactly 4 digits, a dash, 2 digits, a dash, 2 digits. Anchored to start/end. |
| **URL (simple)** | \`https?:\\/\\/[\\w\\-.]+\\.\\w{2,}(\\/\\S*)?\` | Matches http/https, domain, and optional path. |
| **Password Strength** | \`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\` | Requires at least one lowercase, one uppercase, one digit, and be at least 8 chars long. (Uses Lookaheads). |

---

## ✨ 2. How to Test Regex

You should never write regex blind! Always use a testing tool.
- **Online Tools**: [regex101.com](https://regex101.com) is the gold standard. It provides real-time matching, a full explanation of your pattern, a reference library, and supports multiple regex "flavors" (like Python, JS, PCRE).
- **In Code**:

<CodeBlock>
// JavaScript
const text = "My email is test@example.com";
const pattern = /[a-z]+@[a-z]+\\.[a-z]+/;
const match = text.match(pattern);
console.log(match[0]); // "test@example.com"
</CodeBlock>

<CodeBlock>
# Python
import re
text = "My email is test@example.com"
pattern = r"[a-z]+@[a-z]+\\.[a-z]+"
match = re.search(pattern, text)
print(match.group(0)) # "test@example.com"
</CodeBlock>

---

## ✨ 3. Practice Problems

### Problem 1: Match Hex Color Codes
Find all 3 or 6-digit hex color codes.
- **Input**: "The main color is #F0A3C1 and the accent is #FFF. Invalid: #F, #12345."
- **Solution**: \`#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b\`
- **Explanation**: It looks for a \`#\` followed by either exactly 6 hex characters OR exactly 3 hex characters, followed by a word boundary.

### Problem 2: Extract Image Filenames
From a list of HTML tags, get just the filenames from the \`src\` attribute.
- **Input**: \`<img src="image1.jpg">, <img src="photo.png">\`
- **Solution**: \`<img src="([^"]+)"\`
- **Explanation**: It finds the literal text \`<img src="\`, then uses a capturing group \`([^"]+)\` to capture one or more characters that are NOT a double quote. The filename is in capture group 1.

### Problem 3: Validate a Time Format (HH:MM)
Match valid 24-hour time formats from 00:00 to 23:59.
- **Input**: "Valid: 14:30, 09:05. Invalid: 25:00, 12:60"
- **Solution**: \`^([01]\\d|2[0-3]):([0-5]\\d)$\`
- **Explanation**: Anchored start/end. The hour part \`([01]\\d|2[0-3])\` matches a 0 or 1 followed by any digit, OR a 2 followed by a digit from 0-3. The minute part \`([0-5]\\d)\` matches a digit from 0-5 followed by any digit.

### Problem 4: Find Duplicate Words
Find consecutive repeated words.
- **Input**: "This is a test test. This is fine."
- **Solution**: \`\\b(\\w+)\\s+\\1\\b\`
- **Explanation**: Uses a capturing group \`(\\w+)\` to grab a word, followed by one or more spaces \`\\s+\`, and a backreference \`\\1\` to match the exact same word again.

### Problem 5: Extract Quoted Strings
Capture the content inside double quotes.
- **Input**: He said "hello" and she said "world".
- **Solution**: \`"([^"]*)"\`
- **Explanation**: It matches a \`"\`, then captures zero or more characters that are not a \`"\` (\`[^"]*\`), and finally matches the closing \`"\`. The content is in group 1.

---

## ✨ 4. Tips & Best Practices
- **Be Specific**: Write patterns that are as specific as possible. \`.+\` is powerful but lazy. \`[^<]+\` (match anything that isn't a closing bracket) is often better and more performant.
- **Comment Your Regex**: Complex regex is hard to read. Use comments if your engine supports them (\`(?#...) \` or free-spacing mode \`x\`).
- **Start Simple**: Build your pattern piece by piece. Get one part working, then add the next.
- **Debug with a Tool**: Use regex101.com to see exactly how the engine is processing your string step-by-step.
- **Avoid Catastrophic Backtracking**: A poorly written regex like \`(a|b|c)*d\` on a long string without a 'd' can take forever to run. Be careful with nested quantifiers and alternation.
`;

export default function RegexPracticePage() {
    return (
        <>
            <MarkdownRenderer markdown={content} />
            <Chatbot pageContent={allDocsContext} />
        </>
    );
}
