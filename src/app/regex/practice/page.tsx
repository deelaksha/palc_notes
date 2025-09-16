import { InteractiveRegexExample } from '@/components/regex/InteractiveRegexExample';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

const content = `
# 🌟 Common Patterns & Practice

The best way to learn regex is to use it. This section provides a reference for common real-world patterns and practice problems to test your skills.

---

## ✨ 1. Common Pattern Reference
`;

const examples = [
    {
        title: "Email Validation (simplified)",
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        text: 'My email is test@example.com.',
    },
    {
        title: "US Phone Number",
        pattern: '\\(?\\d{3}\\)?[ -]?\\d{3}[ -]?\\d{4}',
        text: 'Call (123)-456-7890 or 123 456 7890.',
    },
    {
        title: "Date (YYYY-MM-DD)",
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        text: '2023-10-27',
    },
    {
        title: "URL (simple)",
        pattern: 'https?:\\/\\/[\\w\\-.]+\\.\\w{2,}(\\/\\S*)?',
        text: 'Visit https://www.example.com/path for info.',
    },
    {
        title: "Password Strength (8+ chars, lower, upper, digit)",
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$',
        text: 'A_strong_p@ssw0rd!',
    },
    {
        title: "Username (3-16 chars, letters, numbers, underscore)",
        pattern: '^[a-zA-Z0-9_]{3,16}$',
        text: 'valid_user_123',
    },
    {
        title: "IPv4 Address",
        pattern: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
        text: 'The server is at 192.168.1.1.',
    },
    {
        title: "Hex Color Codes",
        pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b',
        text: 'Colors: #F0A3C1, #FFF, #12345.',
    },
    {
        title: "Extract Image Filenames",
        pattern: '<img src="([^"]+)"',
        text: '<img src="image1.jpg">, <img src="photo.png">',
    },
    {
        title: "Validate Time (HH:MM)",
        pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$',
        text: 'Time is 14:30, not 25:00.',
    },
    {
        title: "Find Duplicate Words",
        pattern: '\\b(\\w+)\\s+\\1\\b',
        text: 'This is a test test.',
    },
    {
        title: "Extract Quoted Strings",
        pattern: '"([^"]*)"',
        text: 'He said "hello" and she said "world".',
    }
];

const content2 = `
---

## ✨ 2. How to Test Regex

You should never write regex blind! Always use a testing tool.
- **Online Tools**: [regex101.com](https://regex101.com) is the gold standard. It provides real-time matching, a full explanation of your pattern, a reference library, and supports multiple regex "flavors" (like Python, JS, PCRE).
- **In Code**: Our own visualizer is great for learning!

---

## ✨ 3. Tips & Best Practices
- **Be Specific**: Write patterns that are as specific as possible. \`.+\` is powerful but lazy. \`[^<]+\` (match anything that isn't a closing bracket) is often better and more performant.
- **Comment Your Regex**: Complex regex is hard to read. Use comments if your engine supports them (\`(?#...) \` or free-spacing mode \`x\`).
- **Start Simple**: Build your pattern piece by piece. Get one part working, then add the next.
- **Debug with a Tool**: Use regex101.com or our visualizer to see exactly how the engine is processing your string step-by-step.
- **Avoid Catastrophic Backtracking**: A poorly written regex like \`(a|b|c)*d\` on a long string without a 'd' can take forever to run. Be careful with nested quantifiers and alternation.
`;

export default function RegexPracticePage() {
    return (
        <div className="flex">
            <main className="flex-1">
                <MarkdownRenderer markdown={content} />
                 <div className="space-y-4">
                    {examples.map((ex, i) => (
                        <div key={i}>
                            <h4 className="font-semibold text-foreground mb-2">{ex.title}</h4>
                            <InteractiveRegexExample pattern={ex.pattern} text={ex.text} explanation="" />
                        </div>
                    ))}
                </div>
                <MarkdownRenderer markdown={content2} />
            </main>
        </div>
    );
}
