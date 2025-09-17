
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowDown, ArrowUp, Search, X } from 'lucide-react';

const longFileContent = `Welcome to the 'less' command simulator.
This is a very long file to demonstrate how 'less' works.
You can use it to view large files without loading the whole thing into memory.

Use the scrollbar on the right to navigate up and down.
In a real terminal, you would use the Arrow Keys, Page Up, and Page Down.

'less' is powerful because it's a "pager", meaning it displays content one page at a time.

Line 7
Line 8
Line 9
Line 10: Let's add a keyword here: 'Error'.

Line 12
Line 13
Line 14
Line 15
Line 16
Line 17
Line 18
Line 19
Line 20: Another keyword for searching: 'Success'.

Line 22
Line 23
Line 24
Line 25
Line 26
Line 27
Line 28
Line 29
Line 30

This program is more powerful than 'cat' for large files.
It also allows you to search for text.

To search forward, you would type '/' followed by your search term and press Enter.
Example: /Success

To search backward, you would type '?' followed by your term.
Example: ?Error

To go to the next match, press 'n'.
To go to the previous match, press 'N'.

Line 45
Line 46
Line 47
Line 48
Line 49
Line 50

To quit 'less' at any time, just press 'q'.

This is the end of the file.
`;

const LessGame = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-6 border-2 border-neon-blue/50">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-neon-blue" />
                    <h2 className="text-xl font-bold">`less large_file.log`</h2>
                </div>
                <div className="bg-dark-primary p-4 rounded-lg h-96 font-mono text-sm overflow-y-scroll relative">
                    <pre className="whitespace-pre-wrap">
                        {longFileContent}
                    </pre>
                </div>
                <div className="mt-4 p-4 bg-dark-secondary rounded-lg text-sm">
                    <h3 className="font-bold mb-2">How to Use:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div className="flex items-center gap-2"><ArrowUp className="w-4 h-4"/> / <ArrowDown className="w-4 h-4"/> : Scroll</div>
                        <div className="flex items-center gap-2"><Search className="w-4 h-4"/> : (Simulated) Type `/` to search</div>
                        <div className="flex items-center gap-2">n / N : Next/Prev match</div>
                        <div className="flex items-center gap-2"><X className="w-4 h-4"/> : Press `q` to quit</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { LessGame };
