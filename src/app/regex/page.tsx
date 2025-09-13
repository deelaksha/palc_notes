
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { TableOfContents } from '@/components/toc/TableOfContents';

const regexTutorialContent = `
# 🧙‍♂️ The Ultimate Guide to Regular Expressions (Regex)

Welcome, adventurer, to the world of Regular Expressions! Think of Regex as a secret language for finding and manipulating text. It may look like a cat walked on your keyboard at first, but once you learn its secrets, you'll wield immense power over strings and data.

---

## ✨ 1. Introduction to Regex

### What is Regex?
A **Regular Expression** (or **Regex**) is a special sequence of characters that defines a search pattern. You can use this pattern to find specific words, numbers, or structures within text. It's like a super-powered version of the "Find" feature in your text editor.

### Why use Regex?
- **Validation**: Check if an email address, phone number, or password is in the correct format.
- **Searching**: Find complex patterns in large log files or documents.
- **Replacing**: Find all instances of a word and replace them with another.
- **Extraction**: Pull out all URLs or email addresses from a block of text.

### Where is it used?
Regex is used almost everywhere in programming and text processing:
- **Text editors and IDEs** (like VS Code, Vim) for advanced search and replace.
- **Programming languages** (like JavaScript, Python, Java, Go) for string manipulation.
- **Command-line tools** (like \`grep\`, \`sed\`, \`awk\`).
- **Databases** (like MySQL, PostgreSQL) for complex queries.
- **Web servers** (like Nginx, Apache) for URL rewriting.

---

## ✨ 2. Basic Concepts and Syntax

Let's start with the building blocks of our secret language.

### Literal Characters
The simplest regex is just a plain string of characters. The regex \`hello\` will find the exact substring "hello" in your text.

- **Input Text**: "hello world"
- **Regex Pattern**: \`hello\`
- **Explanation**: The engine looks for the character 'h', followed by 'e', 'l', 'l', 'o'.
- **Output**: "hello"

### Special Characters (Metacharacters)
These are characters with special meanings. They are the wizards of our language.

| Character | Name | What it Does | Example | Matches |
|---|---|---|---|---|
| \`.\` | Wildcard | Matches any single character (except newline) | \`h.t\` | "hat", "hot", "h@t" |
| \`*\` | Kleene Star | Matches the preceding character **0 or more** times | \`bo*t\` | "bt", "bot", "boot" |
| \`+\` | Plus | Matches the preceding character **1 or more** times | \`bo+t\` | "bot", "boot" (but not "bt") |
| \`?\` | Question Mark | Matches the preceding character **0 or 1** time | \`colou?r\` | "color", "colour" |
| \`^\` | Caret | Matches the **start** of a string (see Anchors) | \`^start\` | "start of the line" |
| \`$\` | Dollar | Matches the **end** of a string (see Anchors) | \`end$\` | "this is the end" |
| \`\\\` | Backslash | **Escapes** a special character, treating it as a literal | \`\\.\` | Matches an actual dot "." |

### Escaping Characters
What if you actually want to find a dot `.` or a plus `+`? You use a backslash \`\\\` to tell the engine, "Hey, this next character is just a normal guy, not a wizard."

- **Input Text**: "The file is file.txt"
- **Regex Pattern**: \`file\\.txt\`
- **Explanation**: We escape the dot with a backslash \`\\.\` to match a literal dot.
- **Output**: "file.txt"
- **Pitfall**: Forgetting to escape special characters is a very common mistake! \`file.txt\` would match "file-txt" or "file@txt".

### Character Sets \`[]\`
Character sets, or character classes, let you match one character from a specific group.

| Pattern | What it Does | Example | Matches |
|---|---|---|---|
| \`[abc]\` | Matches a single 'a', 'b', or 'c' | \`h[aeiou]t\` | "hat", "het" |
| \`[a-z]\` | Matches any single lowercase letter from 'a' to 'z' | \`[a-z]ing\` | "sing", "ring" |
| \`[A-Z0-9]\` | Matches any uppercase letter or any digit | \`[A-Z][0-9]\` | "A1", "C5" |
| \`[^abc]\` | **Negation**: Matches any single character **except** 'a', 'b', or 'c' | \`h[^o]t\` | "hat", "hit" (but not "hot") |

---

## ✨ 3. Anchors and Boundaries

Anchors don't match characters; they match a position.

| Anchor | Name | What it Does | Example | Matches |
|---|---|---|---|---|
| \`^\` | Start of String | Matches the position at the very beginning of the string. | \`^Hello\` | "Hello world" |
| \`$\` | End of String | Matches the position at the very end of the string. | \`world$\` | "Hello world" |
| \`\\b\` | Word Boundary | Matches the position between a word character and a non-word character. | \`\\bcat\\b\` | "the cat sat" (matches "cat") |
| \`\\B\` | Non-Word Boundary | The opposite of \`\\b\`. Matches a position that is *not* a word boundary. | \`\\Bcat\\B\` | "bobcat" (matches "cat") |

- **Word Characters**: Letters, numbers, and the underscore (\`[a-zA-Z0-9_]\`).
- **Real-world Example for \`\\b\`**: If you search for \`cat\`, you might also match "caterpillar". Using \`\\bcat\\b\` ensures you only find the whole word "cat".

---

## ✨ 4. Quantifiers

Quantifiers specify how many times a character or group should be repeated.

| Quantifier | What it Does | Example | Matches |
|---|---|---|---|
| \`*\` | 0 or more times | \`a*\` | "", "a", "aa", "aaa" |
| \`+\` | 1 or more times | \`a+\` | "a", "aa", "aaa" |
| \`?\` | 0 or 1 time | \`a?\` | "", "a" |
| \`{n}\` | Exactly \`n\` times | \`a{3}\` | "aaa" |
| \`{n,}\` | \`n\` or more times | \`a{2,}\` | "aa", "aaa", "aaaa" |
| \`{n,m}\` | Between \`n\` and \`m\` times (inclusive) | \`a{2,4}\` | "aa", "aaa", "aaaa" |

### Greedy vs. Lazy Quantifiers
By default, quantifiers are **Greedy**. They try to match as much text as possible.

- **Input Text**: \`<h1>Title</h1>\`
- **Greedy Regex**: \`<.*>\`
- **Output**: \`<h1>Title</h1>\` (It matches from the first \`<\` to the very last \`>\`)

To make a quantifier **Lazy**, you add a question mark \`?\` after it. A lazy quantifier tries to match as little text as possible.

- **Input Text**: \`<h1>Title</h1>\`
- **Lazy Regex**: \`<.*?>\`
- **Output**: \`<h1>\` and \`</h1>\` (It matches from \`<\` to the *next* \`>\`, twice)

---

## ✨ 5. Grouping and Capturing

Parentheses \`()\` are used to group parts of a pattern together.

### Capturing Groups
When you group a pattern, the matched part is "captured" into a numbered group.

- **Input Text**: "My file is image.jpg and not image.png"
- **Regex Pattern**: \`(image)\\.(jpg|png)\`
- **Explanation**:
    - \`(image)\`: Captures "image" into **Group 1**.
    - \`\\.\`: Matches a literal dot.
    - \`(jpg|png)\`: Captures either "jpg" or "png" into **Group 2**.
- **Output Matches**: "image.jpg" and "image.png"
- **Captured Groups for "image.jpg"**:
    - Group 1: "image"
    - Group 2: "jpg"

### Backreferences
You can refer back to a captured group using \`\\1\`, \`\\2\`, etc. This is useful for finding repeated words.

- **Input Text**: "hello hello world"
- **Regex Pattern**: \`\\b(\\w+)\\s+\\1\\b\`
- **Explanation**:
    - \`\\b\`: Word boundary.
    - \`(\\w+)\`: Matches one or more word characters and captures them into **Group 1**.
    - \`\\s+\`: Matches one or more spaces.
    - \`\\1\`: This is the backreference. It matches the exact text that was captured by Group 1.
    - \`\\b\`: Word boundary.
- **Output**: "hello hello"

### Non-Capturing Groups \`(?:...)\`
Sometimes you need to group things (e.g., for alternation) but you don't want to capture them. This is slightly more efficient.

- **Regex Pattern**: \`(?:Mr|Mrs|Ms)\\. [A-Z]\\w*\`
- **Explanation**: The \`(?:Mr|Mrs|Ms)\` part groups the titles together so the \`\\.\` applies to all of them, but it doesn't create a capture group.

### Named Groups \`(?<name>...)\`
In modern regex engines, you can name your capture groups, which makes your code much more readable.

- **Input Text**: "Date: 2023-10-27"
- **Regex Pattern**: \`Date: (?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})\`
- **Explanation**: Instead of Group 1, 2, 3, you can access the captures by the names "year", "month", and "day".

---

## ✨ 6. Alternation

The pipe character \`|\` acts like an "OR". It lets you match one of several possible patterns.

- **Input Text**: "I have a cat and a dog."
- **Regex Pattern**: \`cat|dog\`
- **Explanation**: The engine will look for either the sequence 'c-a-t' OR the sequence 'd-o-g'.
- **Output**: "cat" and "dog"

**Pitfall**: Be careful with scope. \`cat|dogfood\` will match "cat" OR "dogfood". If you want to match "catfood" or "dogfood", you need to group it: \`(cat|dog)food\`.

---

## ✨ 7. Common Patterns and Examples

| Use Case | Regex Pattern | Explanation |
|---|---|---|
| **Email Validation** | \`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\` | Starts with user chars, then @, then domain, then ., then TLD. (A simplified version). |
| **US Phone Number** | \`\\(?\\d{3}\\)?[ -]?\\d{3}[ -]?\\d{4}\` | Matches formats like (123)-456-7890, 123-456-7890, 123 456 7890, 1234567890. |
| **Date (YYYY-MM-DD)** | \`^\\d{4}-\\d{2}-\\d{2}$\` | Exactly 4 digits, a dash, 2 digits, a dash, 2 digits. Anchored to start/end. |
| **URL (simple)** | \`https?:\/\/[\\w\\-.]+\\.\\w{2,}(\\/\\S*)?\` | Matches http/https, domain, and optional path. |
| **Password Strength** | \`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\` | Requires at least one lowercase, one uppercase, one digit, and be at least 8 chars long. (Uses Lookaheads). |

---

## ✨ 8. Regex Flags/Modifiers

Flags are options that change how the regex engine behaves. They are usually placed after the closing slash of a pattern (e.g., \`/pattern/i\`).

| Flag | Name | What it Does |
|---|---|---|
| \`i\` | Ignore Case | Makes the entire pattern case-insensitive. \`/cat/i\` matches "cat", "Cat", "CAT". |
| \`g\` | Global | Finds all matches in the string, not just the first one. |
| \`m\` | Multiline | Allows \`^\` and \`$\` to match the start/end of each **line**, not just the whole string. |
| \`s\` | Dot All | Allows the wildcard \`.\` to also match newline characters. |

---

## ✨ 9. Advanced Topics

These are the tools of a true Regex master. They allow you to match based on context without including that context in the match itself.

### Lookahead \`(?=...)\`
Asserts that the characters following the current position must match the pattern inside the lookahead, but doesn't consume them.

- **Input Text**: "Mission: 1, Mission: 2, Mission: 3"
- **Regex**: \`Mission(?=:) \`
- **Explanation**: This matches the word "Mission" ONLY if it is immediately followed by a colon \`:\`. The colon itself is not part of the match.
- **Output**: "Mission" (3 times)

### Negative Lookahead \`(?!...)\`
Asserts that the characters following the current position must NOT match the pattern.

- **Input Text**: "I have a cat, a dog, and a catfish."
- **Regex**: \`\\bcat(?!fish)\\b\`
- **Explanation**: Matches the whole word "cat" ONLY if it is NOT followed by "fish".
- **Output**: "cat"

### Lookbehind \`(?<=...)\`
Asserts that the characters preceding the current position must match the pattern.

- **Input Text**: "$100, €50, $20"
- **Regex**: \`(?<=\\$)\\d+\`
- **Explanation**: Matches one or more digits ONLY if they are preceded by a dollar sign \`$\`. The dollar sign is not part of the match.
- **Output**: "100", "20"

### Negative Lookbehind \`(?<!...)\`
Asserts that the characters preceding the current position must NOT match the pattern.

- **Input Text**: "Total: 150 items, Subtotal: 50 items"
- **Regex**: \`(?<!Sub)total: \\d+\`
- **Explanation**: Matches "total: " followed by digits ONLY if it is NOT preceded by "Sub".
- **Output**: "total: 150"

---

## ✨ 10. How to Test Regex

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

## ✨ 11. Practice Problems

1.  **Match Hex Color Codes**: Find all hex color codes, like \`#FFFFFF\` or \`#A0C34F\`.
    - **Input**: "The main color is #F0A3C1 and the accent is #FFF."
    - **Solution**: \`#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b\`

2.  **Extract Image Filenames**: From a list of HTML tags, get just the filenames.
    - **Input**: \`<img src="image1.jpg">, <img src="photo.png">\`
    - **Solution**: \`<img src="([^"]+)"\` (The filename is in capture group 1).

3.  **Find Words with 5+ Letters**:
    - **Input**: "This is a simple test sentence."
    - **Solution**: \`\\b\\w{5,}\\b\`

4.  **Validate a Time Format (HH:MM)**:
    - **Input**: "14:30", "25:00"
    - **Solution**: \`^([01]\\d|2[0-3]):([0-5]\\d)$\` (Matches "14:30", rejects "25:00").

5.  **Remove Leading/Trailing Whitespace from Lines**:
    - **Input**: "  hello world  "
    - **Solution**: Find \`^\\s+|\\s+$\` and replace with nothing (using global and multiline flags).

6.  **Capture Key-Value Pairs**:
    - **Input**: "name=John, age=30"
    - **Solution**: \`(\\w+)=([^,]+)\`

7.  **Find all Markdown Headers**: Match lines starting with \`# \`, \`## \`, etc.
    - **Input**: "# Title\\n## Subtitle"
    - **Solution**: \`^#{1,6} .+\` (with multiline flag)

8.  **Match a Valid Username**: 4-16 characters, letters, numbers, and underscores only.
    - **Input**: "test_user123", "bad-user"
    - **Solution**: \`^[a-zA-Z0-9_]{4,16}$\`

9.  **Extract Quoted Strings**:
    - **Input**: He said "hello" and she said "world".
    - **Solution**: \`"([^"]*)"\`

10. **Find Duplicate Words**:
    - **Input**: "This is is a test test."
    - **Solution**: \`\\b(\\w+)\\s+\\1\\b\`

---

## ✨ 12. Tips, Tricks, and Best Practices
- **Be Specific**: Write patterns that are as specific as possible. \`.+\` is lazy, but \`[^<]+\` (match anything that isn't a closing bracket) is often better and more performant.
- **Comment Your Regex**: Complex regex is hard to read. Use comments if your engine supports them (\`(?#...) \` or free-spacing mode \`x\`).
- **Start Simple**: Build your pattern piece by piece. Get one part working, then add the next.
- **Debug with a Tool**: Use regex101.com to see exactly how the engine is processing your string step-by-step.
- **Avoid Catastrophic Backtracking**: A poorly written regex like \`(a|b|c)*d\` on a long string without a 'd' can take forever to run. Be careful with nested quantifiers and alternation.

---

## 🚀 Summary and Next Steps

### Key Takeaways
- Regex is a pattern-matching language.
- Start with simple literals and add special characters (\`.\`, \`*\`, \`+\`).
- Use character sets \`[]\` to define groups of allowed characters.
- Use anchors \`^\` and \`$\` to lock your pattern to the start/end of a string.
- Group with \`()\` to capture parts of your match.
- Use tools like regex101.com to build and debug your patterns.

### Next Steps
- **Practice!** The only way to get good at regex is to use it. Try solving challenges on sites like [RegexCrossword](https://regexcrossword.com/).
- **Learn Your Flavor**: Regex isn't perfectly standardized. Learn the specific "flavor" used by your main programming language (e.g., PCRE, Python, JavaScript).
- **Read Others' Regex**: Look at open-source code to see how experienced developers use regex for real-world problems.

You've taken your first step into a larger world. Go forth and conquer the world of text!
`;

export default function RegexPage() {
    return (
        <div className="flex">
            <main className="flex-1 py-8 px-4 md:px-8 lg:px-12 markdown-content">
                <MarkdownRenderer markdown={regexTutorialContent} />
            </main>
            <aside className="hidden lg:block w-80 p-8">
                <div className="sticky top-20">
                    <TableOfContents content={regexTutorialContent} />
                </div>
            </aside>
        </div>
    );
}
