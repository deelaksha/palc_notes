
'use client';
import { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const regexData = [
    {
        char: '.',
        name: 'Dot (Any Character)',
        description: 'Matches any single character except newline',
        demoString: 'cat bat rat 123 @#$',
        pattern: '.',
        examples: {
            matches: ['a', 'B', '3', '@', ' '],
            noMatches: ['\\n (newline)']
        }
    },
    {
        char: '\\d',
        name: 'Digit',
        description: 'Matches any digit (0-9)',
        demoString: 'abc123def456ghi',
        pattern: '\\d',
        examples: {
            matches: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            noMatches: ['a', 'b', 'c', '@', '#']
        }
    },
    {
        char: '\\D',
        name: 'Non-Digit',
        description: 'Matches any character that is not a digit',
        demoString: '123-ABC-456',
        pattern: '\\D',
        examples: {
            matches: ['-', 'A', 'B', 'C'],
            noMatches: ['1', '2', '3', '4', '5', '6']
        }
    },
    {
        char: '\\w',
        name: 'Word Character',
        description: 'Matches any word character (letters, digits, underscore)',
        demoString: 'hello_123 @#$ test-case',
        pattern: '\\w',
        examples: {
            matches: ['h', 'e', 'l', 'o', '_', '1', '2', '3', 't', 's'],
            noMatches: ['@', '#', '$', '-', ' ']
        }
    },
    {
        char: '\\W',
        name: 'Non-Word Character',
        description: 'Matches any character that is not a letter, digit, or underscore',
        demoString: 'hello_123 @#$ test-case',
        pattern: '\\W',
        examples: {
            matches: [' ', '@', '#', '$', '-'],
            noMatches: ['h', 'e', 'l', 'o', '_', '1', '2', '3']
        }
    },
    {
        char: '\\s',
        name: 'Whitespace',
        description: 'Matches any whitespace character (space, tab, newline)',
        demoString: 'hello world\\ttest\\nline',
        pattern: '\\s',
        examples: {
            matches: [' (space)', '\\t (tab)', '\\n (newline)'],
            noMatches: ['a', '1', '@']
        }
    },
     {
        char: '\\S',
        name: 'Non-Whitespace',
        description: 'Matches any character that is not whitespace',
        demoString: 'hello world',
        pattern: '\\S',
        examples: {
            matches: ['h','e','l','l','o','w','o','r','l','d'],
            noMatches: [' ']
        }
    },
    {
        char: '^',
        name: 'Caret (Start of Line)',
        description: 'Matches the start of a line or string',
        demoString: 'hello world\\nhello again\\nhi there',
        pattern: '^hello',
        examples: {
            matches: ['hello (at start of line)'],
            noMatches: ['hello (in middle)', 'hi there']
        }
    },
    {
        char: '$',
        name: 'Dollar (End of Line)',
        description: 'Matches the end of a line or string',
        demoString: 'test end\\nanother test\\nfinal end',
        pattern: 'end$',
        examples: {
            matches: ['end (at end of line)'],
            noMatches: ['end (in middle)']
        }
    },
    {
        char: '\\b',
        name: 'Word Boundary',
        description: 'Matches at a word boundary (between \\w and \\W)',
        demoString: 'cat catch dog doggy',
        pattern: '\\bcat\\b',
        examples: {
            matches: ['cat (as a whole word)'],
            noMatches: ['catch (cat is part of a word)']
        }
    },
    {
        char: '\\B',
        name: 'Not a Word Boundary',
        description: 'Matches everywhere except at a word boundary',
        demoString: 'cat catch concatenate',
        pattern: '\\Bcat\\B',
        examples: {
            matches: ['concatenate (cat is inside the word)'],
            noMatches: ['cat', 'catch']
        }
    },
    {
        char: '[]',
        name: 'Character Class',
        description: 'Matches any single character within the brackets',
        demoString: 'cat bat rat mat hat sat',
        pattern: '[cbr]at',
        examples: {
            matches: ['cat', 'bat', 'rat'],
            noMatches: ['mat', 'hat', 'sat']
        }
    },
    {
        char: '[^...]',
        name: 'Negated Character Class',
        description: 'Matches any single character NOT within the brackets',
        demoString: 'cat bat rat mat hat sat',
        pattern: '[^cbr]at',
        examples: {
            matches: ['mat', 'hat', 'sat'],
            noMatches: ['cat', 'bat', 'rat']
        }
    },
    {
        char: '*',
        name: 'Asterisk (Zero or More)',
        description: 'Matches the preceding character zero or more times',
        demoString: 'a aa aaa baaa ca',
        pattern: 'a*',
        examples: {
            matches: ['a', 'aa', 'aaa', 'baaa (aaa part)', 'ca (a part)', '(empty string)'],
            noMatches: ['b', 'c']
        }
    },
    {
        char: '+',
        name: 'Plus (One or More)',
        description: 'Matches the preceding character one or more times',
        demoString: 'a aa aaa b ba bbb',
        pattern: 'a+',
        examples: {
            matches: ['a', 'aa', 'aaa', 'ba (a part)'],
            noMatches: ['b', '(empty string)']
        }
    },
    {
        char: '?',
        name: 'Question Mark (Optional)',
        description: 'Matches the preceding character zero or one time',
        demoString: 'color colour favor favour',
        pattern: 'colou?r',
        examples: {
            matches: ['color', 'colour'],
            noMatches: ['colouur', 'colr']
        }
    },
    {
        char: '*?',
        name: 'Lazy Asterisk',
        description: 'Matches zero or more times, but as few as possible (lazy)',
        demoString: '<div>content</div>',
        pattern: '<.*?>',
        examples: {
            matches: ['<div>', '</div>'],
            noMatches: ['The entire string (which <.*> would match)']
        }
    },
    {
        char: '+?',
        name: 'Lazy Plus',
        description: 'Matches one or more times, but as few as possible (lazy)',
        demoString: '<h1>Title</h1> <h2>Subtitle</h2>',
        pattern: '<.+?>',
        examples: {
            matches: ['<h1>', '</h1>', '<h2>', '</h2>'],
            noMatches: ['<h1>Title</h1> <h2>Subtitle</h2>']
        }
    },
    {
        char: '{}',
        name: 'Quantifier Braces',
        description: 'Matches a specific number of occurrences',
        demoString: 'a aa aaa aaaa aaaaa',
        pattern: 'a{2,4}',
        examples: {
            matches: ['aa', 'aaa', 'aaaa'],
            noMatches: ['a', 'aaaaa']
        }
    },
    {
        char: '|',
        name: 'Pipe (OR)',
        description: 'Acts as an OR operator, matching either the pattern before or after',
        demoString: 'cat dog bird mouse',
        pattern: 'cat|dog',
        examples: {
            matches: ['cat', 'dog'],
            noMatches: ['bird', 'mouse']
        }
    },
    {
        char: '()',
        name: 'Capturing Group',
        description: 'Groups characters together and creates a captured group',
        demoString: 'abc abcabc abcabcabc',
        pattern: '(abc)+',
        examples: {
            matches: ['abc', 'abcabc', 'abcabcabc'],
            noMatches: ['ab', 'bc', 'def']
        }
    },
    {
        char: '\\1',
        name: 'Backreference',
        description: 'Matches the text captured by the Nth group. \\1 refers to the first group.',
        demoString: 'catcat dogdog bird-bird',
        pattern: '(\\w+)\\1',
        examples: {
            matches: ['catcat', 'dogdog'],
            noMatches: ['bird-bird (it has a hyphen in between)']
        }
    },
    {
        char: '(?:...)',
        name: 'Non-Capturing Group',
        description: 'Groups characters together without creating a captured group',
        demoString: 'cats or dogs',
        pattern: '(?:cat|dog)s',
        examples: {
            matches: ['cats', 'dogs'],
            noMatches: ['cat', 'dog']
        }
    },
    {
        char: '(?=...)',
        name: 'Positive Lookahead',
        description: 'Asserts that the following characters match a group, but doesn\'t include those characters in the match',
        demoString: 'cat1 dog2 bird3',
        pattern: '\\w+(?=\\d)',
        examples: {
            matches: ['cat', 'dog', 'bird'],
            noMatches: ['cat1', 'dog2', 'bird3']
        }
    },
    {
        char: '(?!...)',
        name: 'Negative Lookahead',
        description: 'Asserts that the following characters DO NOT match a group',
        demoString: 'cat1 dog cat2',
        pattern: 'cat(?!\\d)',
        examples: {
            matches: ['cat (not followed by a digit)'],
            noMatches: ['cat1', 'cat2']
        }
    },
    {
        char: '(?<=...)',
        name: 'Positive Lookbehind',
        description: 'Asserts that the preceding characters match a group, but doesn\'t include them in the match',
        demoString: '$100 €200 £300',
        pattern: '(?<=\\€)\\d+',
        examples: {
            matches: ['200 (preceded by €)'],
            noMatches: ['100', '300']
        }
    },
    {
        char: '(?<!...)',
        name: 'Negative Lookbehind',
        description: 'Asserts that the preceding characters DO NOT match a group',
        demoString: '$100 €200 £300',
        pattern: '(?<!\\$)\\d+',
        examples: {
            matches: ['200', '300'],
            noMatches: ['100 (preceded by $)']
        }
    },
    {
        char: 'Flags',
        name: 'Regex Flags',
        description: 'Modifiers that change how the pattern is interpreted',
        demoString: 'Cat cat\\nCAT',
        pattern: 'cat',
        examples: {
            matches: ['g: global (find all matches)', 'i: ignore case', 'm: multiline (^ and $ match start/end of lines)'],
            noMatches: ['Pattern "cat" with no flags finds only the first "cat".', 'Pattern "cat" with /i flag finds "Cat", "cat", "CAT".']
        }
    }
];

type RegexItem = typeof regexData[0];

export default function RegexPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegex, setSelectedRegex] = useState<RegexItem | null>(null);
    const [tryString, setTryString] = useState('');
    const [tryPattern, setTryPattern] = useState('');

    const demoStringRef = useRef<HTMLDivElement>(null);
    const tryResultRef = useRef<HTMLDivElement>(null);

    const filteredRegexData = regexData.filter(regex =>
        regex.char.toLowerCase().includes(searchQuery.toLowerCase()) ||
        regex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        regex.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectRegex = (regex: RegexItem) => {
        setSelectedRegex(regex);
        setTryString(regex.demoString.replace(/\\n/g, '\n'));
        setTryPattern(regex.pattern);
    };

    const animateMatches = () => {
        if (!selectedRegex || !demoStringRef.current) return;
        const demoStringEl = demoStringRef.current;
        const originalText = selectedRegex.demoString.replace(/\\n/g, '\n');
        demoStringEl.innerHTML = originalText;

        setTimeout(() => {
            try {
                const regex = new RegExp(selectedRegex.pattern, 'gi');
                const highlighted = originalText.replace(regex, '<span class="highlight">$&</span>');
                demoStringEl.innerHTML = highlighted;
            } catch (error) {
                console.error('Regex pattern error:', error);
            }
        }, 300);
    };

    useEffect(() => {
        if (selectedRegex) {
            animateMatches();
        }
    }, [selectedRegex]);

    useEffect(() => {
        if (!tryResultRef.current) return;
        if (!tryString || !tryPattern) {
            tryResultRef.current.innerHTML = 'Enter both a pattern and test string';
            return;
        }
        try {
            const regex = new RegExp(tryPattern, 'gi');
            const matches = tryString.match(regex);
            if (matches) {
                const highlighted = tryString.replace(regex, '<span class="highlight">$&</span>');
                tryResultRef.current.innerHTML = `Found ${matches.length} match(es):<br><br>${highlighted}`;
            } else {
                tryResultRef.current.innerHTML = `No matches found:<br><br>${tryString}`;
            }
        } catch (error: any) {
            tryResultRef.current.innerHTML = `Invalid regex pattern: ${error.message}`;
        }
    }, [tryString, tryPattern]);


    return (
        <main>
            <div className="regex-container">
                <div className="regex-header">
                    <h1>Learn Regex Interactively</h1>
                    <p>Click on a Regex Character to See How It Works</p>
                </div>
                
                <div className="regex-sidebar">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-box"
                            placeholder="Search regex characters..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="regex-list">
                        {filteredRegexData.map((regex) => (
                            <div
                                key={regex.name}
                                className={`regex-item ${selectedRegex?.name === regex.name ? 'active' : ''}`}
                                onClick={() => selectRegex(regex)}
                            >
                                <div className="regex-char">{regex.char}</div>
                                <div className="regex-name">{regex.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="regex-main-content">
                    {!selectedRegex ? (
                        <div className="welcome-message">
                            <h2>👈 Choose a regex character from the sidebar to start learning!</h2>
                            <p>Each character has visual examples and interactive demos to help you understand how regex works.</p>
                        </div>
                    ) : (
                        <div className={`content-display ${selectedRegex ? 'active' : ''}`}>
                            <div className="demo-section">
                                <div className="demo-title">{selectedRegex.char} - {selectedRegex.name}</div>
                                <div className="demo-string" ref={demoStringRef}></div>
                                <button onClick={animateMatches} style={{background: 'linear-gradient(90deg, #00d4aa, #64ffda)', color: '#1a1a2e', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', margin: '1rem 0'}}>▶ Show Matches</button>
                            </div>
                            
                            <div className="explanation">
                                <h3>What does {selectedRegex.char} do?</h3>
                                <p>{selectedRegex.description}</p>
                            </div>
                            
                            <div className="examples">
                                <div className="example-box matches">
                                    <div className="example-title">✅ Matches:</div>
                                    {selectedRegex.examples.matches.map(match => <div key={match}>• {match}</div>)}
                                </div>
                                <div className="example-box no-matches">
                                    <div className="example-title">❌ No Match:</div>
                                    {selectedRegex.examples.noMatches.map(match => <div key={match}>• {match}</div>)}
                                </div>
                            </div>
                            
                            <div className="try-section">
                                <div className="try-title">🧪 Try It Yourself</div>
                                <div>Test String:</div>
                                <input type="text" className="try-input" placeholder="Enter text to test..." value={tryString} onChange={e => setTryString(e.target.value)} />
                                <div>Your Regex Pattern:</div>
                                <input type="text" className="try-input" placeholder="Enter regex pattern..." value={tryPattern} onChange={e => setTryPattern(e.target.value)} />
                                <div className="try-result" ref={tryResultRef}></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
