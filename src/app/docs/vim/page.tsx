
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Code, Keyboard } from 'lucide-react';

const commandData = {
  'Changing Vim Modes': [
    { cmd: 'i', desc: 'Enter INSERT mode' },
    { cmd: 'a', desc: 'Enter INSERT mode after the cursor (append)' },
    { cmd: 'A', desc: 'Enter INSERT mode at the end of the line (Append)' },
    { cmd: 'o', desc: 'Open new line below and enter INSERT mode' },
    { cmd: 'O', desc: 'Open new line above and enter INSERT mode' },
    { cmd: 'v', desc: 'Enter VISUAL mode' },
    { cmd: 'Ctrl-v', desc: 'Enter VISUAL-BLOCK mode' },
    { cmd: ':', desc: 'Enter COMMAND-LINE mode' },
    { cmd: 'R', desc: 'Enter REPLACE mode' },
    { cmd: 'ESC', desc: 'Go back to NORMAL mode' },
  ],
  'Exiting': [
    { cmd: ':w', desc: 'Write (save) file' },
    { cmd: ':wa', desc: 'Write (save) all open files' },
    { cmd: ':q', desc: 'Quit' },
    { cmd: ':q!', desc: 'Quit and discard unsaved changes' },
    { cmd: ':wq or :x', desc: 'Write (save) and quit' },
    { cmd: ':wqa', desc: 'Write and quit on all open files' },
  ],
  'Moving Around': {
    'Arrows': [
      { cmd: 'h', desc: 'Move cursor left' },
      { cmd: 'j', desc: 'Move cursor down' },
      { cmd: 'k', desc: 'Move cursor up' },
      { cmd: 'l', desc: 'Move cursor right' },
    ],
    'Within a Line': [
        { cmd: '$', desc: 'End of line' },
        { cmd: '0', desc: 'Beginning of line' },
        { cmd: '^', desc: 'First non-blank character' },
        { cmd: 'fx', desc: 'Find next occurrence of x' },
        { cmd: 'Fx', desc: 'Find previous occurrence of x' },
        { cmd: 'tx', desc: 'Move before next x' },
        { cmd: 'Tx', desc: 'Move before previous x' },
        { cmd: ';', desc: 'Repeat last f/F/t/T forward' },
        { cmd: ',', desc: 'Repeat last f/F/t/T backward' },
    ],
    'Word Movements': [
        { cmd: 'w', desc: 'Start of next word' },
        { cmd: 'W', desc: 'Start of next WORD' },
        { cmd: 'b', desc: 'Start of previous word' },
        { cmd: 'B', desc: 'Start of previous WORD' },
        { cmd: 'e', desc: 'End of word' },
        { cmd: 'E', desc: 'End of WORD' },
    ],
    'Specific Lines': [
        { cmd: 'gg', desc: 'First line' },
        { cmd: 'G', desc: 'Last line' },
        { cmd: '{number}G', desc: 'Go to line {number}'},
    ],
    'Screen Movements': [
        { cmd: 'Ctrl-F', desc: 'Page forward' },
        { cmd: 'Ctrl-B', desc: 'Page backward' },
        { cmd: 'Ctrl-D', desc: 'Half-page down' },
        { cmd: 'Ctrl-U', desc: 'Half-page up' },
    ],
  },
  'Editing Text': {
    'Delete': [
        { cmd: 'd{motion}', desc: 'Delete over motion' },
        { cmd: 'dd', desc: 'Delete line' },
        { cmd: 'D', desc: 'Delete to end of line' },
        { cmd: 'x', desc: 'Delete character' },
    ],
    'Yank/Paste': [
        { cmd: 'y{motion}', desc: 'Yank over motion' },
        { cmd: 'yy', desc: 'Yank line' },
        { cmd: 'p', desc: 'Paste after' },
        { cmd: 'P', desc: 'Paste before' },
    ],
    'Change': [
        { cmd: 'c{motion}', desc: 'Change over motion' },
        { cmd: 'cc', desc: 'Change line' },
        { cmd: '.', desc: 'Repeat last change' },
    ],
    'Undo/Redo': [
        { cmd: 'u', desc: 'Undo' },
        { cmd: 'Ctrl-R', desc: 'Redo' },
    ]
  },
  'Search & Replace': {
      'Search': [
        { cmd: '/pattern', desc: 'Search forward' },
        { cmd: '?pattern', desc: 'Search backward' },
        { cmd: '*', desc: 'Search for word under cursor (forward)' },
        { cmd: '#', desc: 'Search for word under cursor (backward)' },
        { cmd: 'n', desc: 'Repeat search (same direction)' },
        { cmd: 'N', desc: 'Repeat search (opposite direction)' },
      ],
      'Replace': [
        { cmd: ':%s/old/new/g', desc: 'Replace all in file' },
        { cmd: ':%s/old/new/gc', desc: 'Replace all with confirmation' },
      ],
  },
  'Text Objects': {
    'Common Objects': [
        { cmd: 'iw', desc: 'inside word' },
        { cmd: 'aw', desc: 'around word' },
        { cmd: 'i"', desc: 'inside double quotes' },
        { cmd: 'a"', desc: 'around double quotes' },
        { cmd: 'i(', desc: 'inside parentheses' },
        { cmd: 'a(', desc: 'around parentheses' },
        { cmd: 'i{', desc: 'inside curly braces' },
        { cmd: 'a{', desc: 'around curly braces' },
    ],
    'Usage': [
        { cmd: 'd + i + w', desc: '`diw` - delete inside word' },
        { cmd: 'c + i + "', desc: '`ci"` - change inside quotes' },
        { cmd: 'y + a + p', desc: '`yap` - yank around paragraph' },
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
