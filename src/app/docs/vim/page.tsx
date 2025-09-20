
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Code, Keyboard } from 'lucide-react';

const commandData = {
  'Changing Vim Modes': [
    { cmd: 'i', desc: 'Enter INSERT mode right before the cursor.' },
    { cmd: 'a', desc: 'Enter INSERT mode after the cursor (think: append).' },
    { cmd: 'A', desc: 'Enter INSERT mode at the very end of the current line (think: Append).' },
    { cmd: 'o', desc: 'Open a new line below the current line and enter INSERT mode.' },
    { cmd: 'O', desc: 'Open a new line above the current line and enter INSERT mode.' },
    { cmd: 'v', desc: 'Enter VISUAL mode for character-by-character selection.' },
    { cmd: 'Ctrl-v', desc: 'Enter VISUAL-BLOCK mode to select text in columns.' },
    { cmd: ':', desc: 'Enter COMMAND-LINE mode to run commands like :w or :q.' },
    { cmd: 'R', desc: 'Enter REPLACE mode to overwrite text as you type.' },
    { cmd: 'ESC', desc: 'The universal key to return to NORMAL mode from any other mode.' },
  ],
  'Exiting': [
    { cmd: ':w', desc: 'Write (save) the file without exiting.' },
    { cmd: ':wa', desc: 'Write (save) all currently open files.' },
    { cmd: ':q', desc: 'Quit the current file. Fails if there are unsaved changes.' },
    { cmd: ':q!', desc: 'Force quit and discard any unsaved changes. Use with caution!' },
    { cmd: ':wq or :x', desc: 'Write (save) the file and then quit.' },
    { cmd: ':wqa', desc: 'Write (save) and quit all open files.' },
  ],
  'Moving Around': {
    'Arrows': [
      { cmd: 'h', desc: 'Move the cursor one character to the left.' },
      { cmd: 'j', desc: 'Move the cursor one line down.' },
      { cmd: 'k', desc: 'Move the cursor one line up.' },
      { cmd: 'l', desc: 'Move the cursor one character to the right.' },
    ],
    'Within a Line': [
        { cmd: '$', desc: 'Jump to the end of the current line.' },
        { cmd: '0', desc: 'Jump to the absolute beginning of the line (column 0).' },
        { cmd: '^', desc: 'Jump to the first non-whitespace character on the line.' },
        { cmd: 'fx', desc: 'Jump to the next occurrence of character ‘x’ on the line.' },
        { cmd: 'Fx', desc: 'Jump to the previous occurrence of character ‘x’.' },
        { cmd: 'tx', desc: 'Jump to the position just before the next character ‘x’.' },
        { cmd: 'Tx', desc: 'Jump to the position just after the previous character ‘x’.' },
        { cmd: ';', desc: 'Repeat the last f, F, t, or T movement.' },
        { cmd: ',', desc: 'Repeat the last f, F, t, or T movement in the opposite direction.' },
    ],
    'Word Movements': [
        { cmd: 'w', desc: 'Jump forward to the start of the next word.' },
        { cmd: 'W', desc: 'Jump forward to the start of the next WORD (ignoring punctuation).' },
        { cmd: 'b', desc: 'Jump backward to the start of the previous word.' },
        { cmd: 'B', desc: 'Jump backward to the start of the previous WORD.' },
        { cmd: 'e', desc: 'Jump to the end of the current or next word.' },
        { cmd: 'E', desc: 'Jump to the end of the current or next WORD.' },
        { cmd: 'ge', desc: 'Jump backward to the end of the previous word.' },
        { cmd: 'gE', desc: 'Jump backward to the end of the previous WORD.' },
    ],
    'Sentence & Paragraph': [
        { cmd: ')', desc: 'Jump to the beginning of the next sentence.' },
        { cmd: '(', desc: 'Jump to the beginning of the previous sentence.' },
        { cmd: '}', desc: 'Jump to the next paragraph break.' },
        { cmd: '{', desc: 'Jump to the previous paragraph break.' },
    ],
    'Specific Lines': [
        { cmd: 'gg', desc: 'Go to the very first line of the file.' },
        { cmd: 'G', desc: 'Go to the very last line of the file.' },
        { cmd: '{number}G', desc: 'Jump to a specific line number (e.g., 10G).' },
        { cmd: '{number}j', desc: 'Move down a specific number of lines (e.g., 5j).' },
        { cmd: '{number}k', desc: 'Move up a specific number of lines (e.g., 5k).' },
        { cmd: 'H', desc: 'Move to the High (top) line visible on the screen.' },
        { cmd: 'M', desc: 'Move to the Middle line visible on the screen.' },
        { cmd: 'L', desc: 'Move to the Low (bottom) line visible on the screen.' },
    ],
    'Brackets & Methods': [
        { cmd: '%', desc: 'Jump between matching pairs of (), {}, [].' },
        { cmd: '[(', desc: 'Jump to the previous unmatched opening parenthesis.' },
        { cmd: '[{', desc: 'Jump to the previous unmatched opening curly brace.' },
        { cmd: '])', desc: 'Jump to the next unmatched closing parenthesis.' },
        { cmd: ']}', desc: 'Jump to the next unmatched closing curly brace.' },
        { cmd: ']m', desc: 'Jump to the start of the next method (language-aware).' },
        { cmd: ']M', desc: 'Jump to the end of the next method.' },
        { cmd: '[m', desc: 'Jump to the start of the previous method.' },
        { cmd: '[M', desc: 'Jump to the end of the previous method.' },
    ],
    'Screen & Scrolling': [
        { cmd: 'Ctrl-F', desc: 'Move forward one full screen (page down).' },
        { cmd: 'Ctrl-B', desc: 'Move backward one full screen (page up).' },
        { cmd: 'Ctrl-D', desc: 'Move down half a screen.' },
        { cmd: 'Ctrl-U', desc: 'Move up half a screen.' },
        { cmd: 'zz', desc: 'Center the current line in the middle of the screen.' },
        { cmd: 'zt', desc: 'Place the current line at the top of the screen.' },
        { cmd: 'zb', desc: 'Place the current line at the bottom of the screen.' },
        { cmd: 'Ctrl-E', desc: 'Scroll the screen down one line without moving the cursor.' },
        { cmd: 'Ctrl-Y', desc: 'Scroll the screen up one line without moving the cursor.' },
    ]
  },
  'Search & Jumps': {
      'Search': [
        { cmd: '/pattern', desc: 'Search forward for the specified pattern.' },
        { cmd: '?pattern', desc: 'Search backward for the specified pattern.' },
        { cmd: '*', desc: 'Search forward for the complete word currently under the cursor.' },
        { cmd: '#', desc: 'Search backward for the complete word currently under the cursor.' },
        { cmd: 'n', desc: 'Repeat the last search in the same direction.' },
        { cmd: 'N', desc: 'Repeat the last search in the opposite direction.' },
      ],
      'Jump List': [
        { cmd: 'Ctrl-O', desc: 'Go to the previous (older) location in the jump list.' },
        { cmd: 'Ctrl-I', desc: 'Go to the next (newer) location in the jump list.' },
      ],
  },
  'Editing Text': {
    'Delete': [
        { cmd: 'd{motion}', desc: 'Delete text over the given motion (e.g., `dw` to delete a word).' },
        { cmd: 'dd', desc: 'Delete the entire current line.' },
        { cmd: 'D', desc: 'Delete from the cursor to the end of the line.' },
        { cmd: 'x', desc: 'Delete the single character under the cursor.' },
    ],
    'Yank & Paste': [
        { cmd: 'y{motion}', desc: 'Yank (copy) text over the given motion (e.g., `yw` to copy a word).' },
        { cmd: 'yy', desc: 'Yank (copy) the entire current line.' },
        { cmd: 'p', desc: 'Put (paste) the copied text after the cursor.' },
        { cmd: 'P', desc: 'Put (paste) the copied text before the cursor.' },
    ],
    'Change': [
        { cmd: 'c{motion}', desc: 'Change (delete and enter INSERT mode) text over the motion.' },
        { cmd: 'cc', desc: 'Change (delete and enter INSERT mode) the entire line.' },
        { cmd: '.', desc: 'Repeat the last change command (e.g., insert, delete, or change).' },
    ],
    'Undo/Redo & Replace': [
        { cmd: 'u', desc: 'Undo the last change.' },
        { cmd: 'Ctrl-R', desc: 'Redo changes that were undone.' },
        { cmd: 'r{char}', desc: 'Replace the single character under the cursor with {char}.' },
        { cmd: 'R', desc: 'Enter REPLACE mode to overwrite multiple characters.' },
    ]
  },
  'Search & Replace': [
    { cmd: ':%s/old/new/g', desc: 'Replace all occurrences of "old" with "new" in the entire file.' },
    { cmd: ':%s/old/new/gc', desc: 'Replace all, but ask for confirmation for each occurrence.' },
    { cmd: ':%s/old/new/gi', desc: 'Replace all, ignoring whether the text is uppercase or lowercase.' },
  ],
  'Indentation & Case': {
      'Indentation': [
        { cmd: '>>', desc: 'Indent the current line one level to the right.' },
        { cmd: '<<', desc: 'Un-indent the current line one level to the left.' },
        { cmd: '>{motion}', desc: 'Indent the lines covered by the motion.' },
    ],
      'Changing Case': [
        { cmd: '~', desc: 'Switch the case (upper/lower) of the character under the cursor.' },
        { cmd: 'guu', desc: 'Make the entire current line lowercase.' },
        { cmd: 'gUU', desc: 'Make the entire current line uppercase.' },
    ],
  },
  'Text Objects': {
    'Common Objects': [
        { cmd: 'iw / aw', desc: 'Inside / Around a word.' },
        { cmd: 'ip / ap', desc: 'Inside / Around a paragraph.' },
        { cmd: 'i" / a"', desc: 'Inside / Around double quotes.' },
        { cmd: "i' / a'", desc: 'Inside / Around single quotes.' },
        { cmd: 'i( / a(', desc: 'Inside / Around parentheses.' },
        { cmd: 'i[ / a[', desc: 'Inside / Around square brackets.' },
        { cmd: 'i{ / a{', desc: 'Inside / Around curly braces.' },
        { cmd: 'it / at', desc: 'Inside / Around HTML/XML tags.' },
    ],
    'Usage Examples': [
        { cmd: 'diw', desc: '`d`elete `i`nside `w`ord (delete word under cursor, leave space).' },
        { cmd: 'ci"', desc: '`c`hange `i`nside `"` (delete text inside quotes and enter insert mode).' },
        { cmd: 'yap', desc: '`y`ank `a`round `p`aragraph (copy the whole paragraph).' },
        { cmd: 'vit', desc: '`v`isually select text `i`nside a `t`ag.' },
    ]
  }
};

const CommandTable = ({ commands }: { commands: { cmd: string; desc: string }[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[30%]">Command</TableHead>
        <TableHead>Description</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {commands.map(({ cmd, desc }) => (
        <TableRow key={cmd}>
          <TableCell className="font-mono font-semibold text-primary">{cmd}</TableCell>
          <TableCell>{desc}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function VimCheatsheetPage() {
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
        <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mb-2 flex items-center justify-center gap-4">
                <Keyboard className="size-10"/> Vim Cheatsheet
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A categorized guide to the most essential Vim commands.
            </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(commandData).map(([category, content]) => (
                <Card key={category} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{category}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {Array.isArray(content) ? (
                            <CommandTable commands={content} />
                        ) : (
                            <div className="space-y-6">
                                {Object.entries(content).map(([subCategory, commands]) => (
                                    <div key={subCategory}>
                                        <h4 className="font-semibold text-secondary-foreground mb-2 text-sm uppercase tracking-wider">{subCategory}</h4>
                                        <CommandTable commands={commands} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    </main>
  );
}
