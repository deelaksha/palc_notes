'use client';
import { useEffect } from 'react';
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
        description: 'Matches a group after the main expression without including it in the result',
        demoString: 'cat1 dog2 bird3',
        pattern: '\\w+(?=\\d)',
        examples: {
            matches: ['cat', 'dog', 'bird'],
            noMatches: ['cat1', 'dog2', 'bird3']
        }
    }
];

export default function RegexPage() {
    useEffect(() => {
        let currentRegex = null;

        function initializeApp() {
            renderRegexList();
            setupSearch();
        }

        function renderRegexList() {
            const regexList = document.getElementById('regexList');
            if (!regexList) return;
            regexList.innerHTML = '';
            
            regexData.forEach((regex, index) => {
                const item = document.createElement('div');
                item.className = 'regex-item';
                item.innerHTML = `
                    <div class="regex-char">${regex.char}</div>
                    <div class="regex-name">${regex.name}</div>
                `;
                item.addEventListener('click', () => selectRegex(index));
                regexList.appendChild(item);
            });
        }

        function setupSearch() {
            const searchBox = document.getElementById('searchBox');
            if (!searchBox) return;
            searchBox.addEventListener('input', (e) => {
                const query = (e.target as HTMLInputElement).value.toLowerCase();
                const items = document.querySelectorAll('.regex-item');
                
                items.forEach((item, index) => {
                    const regex = regexData[index];
                    const matchesSearch = 
                        regex.char.toLowerCase().includes(query) ||
                        regex.name.toLowerCase().includes(query) ||
                        regex.description.toLowerCase().includes(query);
                    
                    (item as HTMLElement).style.display = matchesSearch ? 'block' : 'none';
                });
            });
        }

        function selectRegex(index: number) {
            document.querySelectorAll('.regex-item').forEach(item => item.classList.remove('active'));
            const selectedElement = document.querySelectorAll('.regex-item')[index];
            if (selectedElement) {
                selectedElement.classList.add('active');
            }
            
            currentRegex = regexData[index];
            displayRegexContent(currentRegex);
            
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) welcomeMessage.style.display = 'none';
            
            const contentDisplay = document.getElementById('contentDisplay');
            if(contentDisplay) {
                contentDisplay.style.display = 'block';
                contentDisplay.classList.add('active');
            }
        }

        function displayRegexContent(regex: any) {
            const content = document.getElementById('contentDisplay');
            if (!content) return;
            
            content.innerHTML = `
                <div class="demo-section">
                    <div class="demo-title">${regex.char} - ${regex.name}</div>
                    <div class="demo-string" id="demoString">${regex.demoString.replace(/\\n/g, '\n')}</div>
                    <button id="showMatchesBtn" style="background: linear-gradient(90deg, #00d4aa, #64ffda); color: #1a1a2e; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; margin: 1rem 0;">▶ Show Matches</button>
                </div>
                
                <div class="explanation">
                    <h3>What does ${regex.char} do?</h3>
                    <p>${regex.description}</p>
                </div>
                
                <div class="examples">
                    <div class="example-box matches">
                        <div class="example-title">✅ Matches:</div>
                        ${regex.examples.matches.map((match: string) => `<div>• ${match}</div>`).join('')}
                    </div>
                    <div class="example-box no-matches">
                        <div class="example-title">❌ No Match:</div>
                        ${regex.examples.noMatches.map((match: string) => `<div>• ${match}</div>`).join('')}
                    </div>
                </div>
                
                <div class="try-section">
                    <div class="try-title">🧪 Try It Yourself</div>
                    <div>Test String:</div>
                    <input type="text" class="try-input" id="testString" placeholder="Enter text to test..." value="${regex.demoString.replace(/\\n/g, '\n')}">
                    <div>Your Regex Pattern:</div>
                    <input type="text" class="try-input" id="testPattern" placeholder="Enter regex pattern..." value="${regex.pattern}">
                    <div class="try-result" id="tryResult">Enter a pattern and test string to see matches highlighted</div>
                </div>
            `;
            
            document.getElementById('showMatchesBtn')?.addEventListener('click', animateMatches);
            setupTryItSection();
            setTimeout(() => animateMatches(), 500);
        }

        function animateMatches() {
            if (!currentRegex) return;
            
            const demoStringEl = document.getElementById('demoString');
            if (!demoStringEl) return;
            const originalText = currentRegex.demoString.replace(/\\n/g, '\n');
            
            demoStringEl.innerHTML = originalText;
            
            setTimeout(() => {
                try {
                    const regex = new RegExp(currentRegex.pattern, 'gi');
                    const highlighted = originalText.replace(regex, '<span class="highlight">$&</span>');
                    demoStringEl.innerHTML = highlighted;
                } catch (error) {
                    console.log('Regex pattern error:', error);
                }
            }, 300);
        }

        function setupTryItSection() {
            const testStringEl = document.getElementById('testString') as HTMLInputElement;
            const testPatternEl = document.getElementById('testPattern') as HTMLInputElement;
            const tryResultEl = document.getElementById('tryResult');

            function updateTryResult() {
                if (!tryResultEl || !testStringEl || !testPatternEl) return;
                const string = testStringEl.value;
                const pattern = testPatternEl.value;
                
                if (!string || !pattern) {
                    tryResultEl.innerHTML = 'Enter both a pattern and test string';
                    return;
                }
                
                try {
                    const regex = new RegExp(pattern, 'gi');
                    const matches = string.match(regex);
                    
                    if (matches) {
                        const highlighted = string.replace(regex, '<span class="highlight">$&</span>');
                        tryResultEl.innerHTML = `Found ${matches.length} match(es):<br><br>${highlighted}`;
                    } else {
                        tryResultEl.innerHTML = `No matches found:<br><br>${string}`;
                    }
                } catch (error: any) {
                    tryResultEl.innerHTML = `Invalid regex pattern: ${error.message}`;
                }
            }
            
            testStringEl.addEventListener('input', updateTryResult);
            testPatternEl.addEventListener('input', updateTryResult);
            updateTryResult();
        }

        initializeApp();
    }, []);

    return (
        <>
            <style jsx global>{`
                .container {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    min-height: calc(100vh - 56px); /* Adjust for header */
                }

                .header {
                    grid-column: 1 / -1;
                    background: linear-gradient(90deg, #0f3460, #16537e);
                    padding: 1rem;
                    text-align: center;
                    border-bottom: 3px solid #00d4aa;
                    box-shadow: 0 4px 20px rgba(0, 212, 170, 0.3);
                }

                .header h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #00d4aa;
                    margin-bottom: 0.5rem;
                    text-shadow: 0 0 20px rgba(0, 212, 170, 0.5);
                }

                .header p {
                    font-size: 1.1rem;
                    color: #a8b2d1;
                    opacity: 0.9;
                }

                .sidebar {
                    background: rgba(15, 52, 96, 0.4);
                    border-right: 3px solid #00d4aa;
                    overflow-y: auto;
                    height: calc(100vh - 170px);
                }
                
                 .search-container {
                    padding: 1rem;
                    background: rgba(22, 83, 126, 0.3);
                    border-bottom: 2px solid #00d4aa;
                }

                .search-box {
                    width: 100%;
                    padding: 0.8rem;
                    background: rgba(15, 52, 96, 0.8);
                    border: 2px solid #00d4aa;
                    border-radius: 10px;
                    color: #e0e6ed;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .search-box:focus {
                    border-color: #64ffda;
                    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
                }

                .regex-list { padding: 1rem; }
                .regex-item {
                    background: linear-gradient(135deg, #1e3a8a, #3730a3);
                    margin: 0.8rem 0;
                    padding: 1rem;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    position: relative;
                    overflow: hidden;
                }
                .regex-item:hover {
                    transform: translateX(8px) scale(1.02);
                    border-color: #00d4aa;
                    box-shadow: 0 8px 25px rgba(0, 212, 170, 0.4);
                }
                .regex-item.active {
                    background: linear-gradient(135deg, #00d4aa, #64ffda);
                    color: #1a1a2e;
                    border-color: #64ffda;
                    transform: translateX(12px) scale(1.05);
                    box-shadow: 0 10px 30px rgba(0, 212, 170, 0.6);
                }
                .regex-char {
                    font-size: 1.8rem;
                    font-weight: bold;
                    font-family: 'Courier New', monospace;
                    margin-bottom: 0.3rem;
                }
                .regex-name {
                    font-size: 0.9rem;
                    opacity: 0.8;
                }

                .main-content {
                    padding: 2rem;
                    overflow-y: auto;
                     height: calc(100vh - 170px);
                }

                .welcome-message {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: #64ffda;
                    font-size: 1.5rem;
                }

                .content-display { display: none; }
                .content-display.active {
                    display: block;
                    animation: slideInRight 0.5s ease-out;
                }

                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .demo-section {
                    background: linear-gradient(135deg, rgba(22, 83, 126, 0.3), rgba(15, 52, 96, 0.3));
                    border-radius: 15px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    border: 2px solid #00d4aa;
                    box-shadow: 0 8px 32px rgba(0, 212, 170, 0.2);
                }
                .demo-title {
                    font-size: 2.5rem;
                    color: #00d4aa;
                    margin-bottom: 1rem;
                    font-family: 'Courier New', monospace;
                    text-shadow: 0 0 10px rgba(0, 212, 170, 0.5);
                }
                .demo-string {
                    background: #1a1a2e;
                    padding: 1.5rem;
                    border-radius: 10px;
                    font-family: 'Courier New', monospace;
                    font-size: 1.3rem;
                    margin: 1rem 0;
                    border: 2px solid #3730a3;
                    position: relative;
                    overflow: hidden;
                    white-space: pre-wrap;
                }

                .highlight {
                    background: linear-gradient(90deg, #00d4aa, #64ffda);
                    color: #1a1a2e;
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                    animation: glow 2s infinite alternate;
                    font-weight: bold;
                }

                @keyframes glow {
                    0% { box-shadow: 0 0 5px rgba(0, 212, 170, 0.5); }
                    100% { box-shadow: 0 0 20px rgba(0, 212, 170, 0.8), 0 0 30px rgba(0, 212, 170, 0.6); }
                }
                .explanation {
                    background: rgba(15, 52, 96, 0.6);
                    padding: 2rem;
                    border-radius: 12px;
                    margin: 1.5rem 0;
                    border-left: 5px solid #00d4aa;
                }
                .explanation h3 {
                    font-size: 1.8rem;
                    color: #64ffda;
                    margin-bottom: 1rem;
                }
                .explanation p {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    margin-bottom: 1rem;
                }
                .examples {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1.5rem 0;
                }
                .example-box {
                    background: rgba(30, 58, 138, 0.4);
                    padding: 1.5rem;
                    border-radius: 10px;
                    border: 2px solid #3730a3;
                }
                .example-box.matches {
                    border-color: #00d4aa;
                    background: rgba(0, 212, 170, 0.1);
                }
                .example-box.no-matches {
                    border-color: #ff6b6b;
                    background: rgba(255, 107, 107, 0.1);
                }
                .example-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 0.8rem;
                }
                .matches .example-title { color: #00d4aa; }
                .no-matches .example-title { color: #ff6b6b; }
                .try-section {
                    background: linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(55, 48, 163, 0.4));
                    padding: 2rem;
                    border-radius: 12px;
                    margin-top: 2rem;
                    border: 2px solid #64ffda;
                }
                .try-title {
                    font-size: 1.8rem;
                    color: #64ffda;
                    margin-bottom: 1rem;
                }
                .try-input {
                    width: 100%;
                    padding: 1rem;
                    background: rgba(26, 26, 46, 0.8);
                    border: 2px solid #00d4aa;
                    border-radius: 8px;
                    color: #e0e6ed;
                    font-size: 1.1rem;
                    font-family: 'Courier New', monospace;
                    margin: 0.5rem 0;
                    outline: none;
                    transition: all 0.3s ease;
                }
                .try-input:focus {
                    border-color: #64ffda;
                    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
                }
                .try-result {
                    background: #1a1a2e;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                    border: 2px solid #3730a3;
                    font-family: 'Courier New', monospace;
                    min-height: 50px;
                }
                @media (max-width: 768px) {
                    .container { grid-template-columns: 1fr; }
                    .sidebar, .main-content { height: auto; max-height: none; }
                }
            `}</style>
            <main>
                <div className="container">
                    <div className="header">
                        <h1>Learn Regex Interactively</h1>
                        <p>Click on a Regex Character to See How It Works</p>
                    </div>
                    
                    <div className="sidebar">
                        <div className="search-container">
                            <input type="text" className="search-box" placeholder="Search regex characters..." id="searchBox" />
                        </div>
                        <div className="regex-list" id="regexList">
                            {/* Regex items will be populated by JavaScript */}
                        </div>
                    </div>
                    
                    <div className="main-content">
                        <div className="welcome-message" id="welcomeMessage">
                            <h2>👈 Choose a regex character from the sidebar to start learning!</h2>
                            <p>Each character has visual examples and interactive demos to help you understand how regex works.</p>
                        </div>
                        <div className="content-display" id="contentDisplay">
                            {/* Dynamic content will be loaded here */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
