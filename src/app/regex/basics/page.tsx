
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { Chatbot } from '@/components/chatbot/Chatbot';

const content = `
# 🧙‍♂️ The Basics: Characters & Sets

Welcome, adventurer, to the world of Regular Expressions! Think of Regex as a secret language for finding and manipulating text. Let's start with the absolute basics.

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
| \`\\\` | Backslash | **Escapes** a special character, treating it as a literal | \`\\.\` | Matches an actual dot "." |

### Escaping Characters
What if you actually want to find a dot \`.\` or a plus \`+\`? You use a backslash \`\\\` to tell the engine, "Hey, this next character is just a normal guy, not a wizard."

- **Input Text**: "The file is file.txt"
- **Regex Pattern**: \`file\\.txt\`
- **Explanation**: We escape the dot with a backslash \`\\.\` to match a literal dot.
- **Output**: "file.txt"
- **Pitfall**: Forgetting to escape special characters is a very common mistake! The pattern \`file.txt\` would also match "file-txt" or "file@txt".

### Character Sets \`[]\`
Character sets, or character classes, let you match one character from a specific group.

| Pattern | What it Does | Example | Matches |
|---|---|---|---|
| \`[abc]\` | Matches a single 'a', 'b', or 'c' | \`h[aeiou]t\` | "hat", "het" |
| \`[a-z]\` | Matches any single lowercase letter from 'a' to 'z' | \`[a-z]ing\` | "sing", "ring" |
| \`[A-Z0-9]\` | Matches any uppercase letter or any digit | \`[A-Z][0-9]\` | "A1", "C5" |
| \`[^abc]\` | **Negation**: Matches any single character **except** 'a', 'b', or 'c' | \`h[^o]t\` | "hat", "hit" (but not "hot") |

### Predefined Character Classes

| Class | Equivalent | What it Does |
|---|---|---|
| \`\\d\` | \`[0-9]\` | Matches any digit. |
| \`\\w\` | \`[a-zA-Z0-9_]\` | Matches any "word" character (letter, number, or underscore). |
| \`\\s\` | \`[ \\t\\r\\n\\f]\` | Matches any whitespace character (space, tab, newline). |
| \`\\D\` | \`[^0-9]\` | Matches any character that is **not** a digit. |
| \`\\W\` | \`[^a-zA-Z0-9_]\` | Matches any character that is **not** a word character. |
| \`\\S\` | \`[^ \\t\\r\\n\\f]\` | Matches any character that is **not** a whitespace. |
`;

export default function RegexBasicsPage() {
    return (
        <>
            <MarkdownRenderer markdown={content} />
            <Chatbot pageContent={content} />
        </>
    );
}
