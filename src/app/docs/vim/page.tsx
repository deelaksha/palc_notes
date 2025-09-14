
import { CodeBlock } from '@/components/markdown/CodeBlock';

export default function VimPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 font-headline">
          The Vim Grimoire
        </h1>
        <p className="text-lg text-muted-foreground">
          Unlock the ancient and powerful magic of the Vim editor.
        </p>
      </header>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
          Chapter 1: The Five Modes of Power
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Vim is unlike other editors. It has different 'modes' for different tasks. Mastering them is the key to speed!
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Normal Mode</strong>: The default mode. Your keyboard keys are powerful spells for moving, deleting, and copying.</li>
            <li><strong>Insert Mode</strong>: The 'typing' mode. Press `i` to enter it and type text like normal. Press `Esc` to return to Normal Mode.</li>
            <li><strong>Visual Mode</strong>: The 'selection' mode. Press `v` to highlight text to copy or delete.</li>
            <li><strong>Command-Line Mode</strong>: The 'master control' mode. Press `:` in Normal Mode to enter commands like saving (`:w`) or quitting (`:q`).</li>
            <li><strong>Replace Mode</strong>: The 'overwrite' mode. Press `R` to type over existing text.</li>
          </ul>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-card-nested border-l-4 border-l-yellow-400">
          <p><span className="text-tips font-bold">Quest Tip:</span> The `Esc` key is your sacred artifact. It always returns you to the safety of Normal Mode.</p>
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-secondary-accent">
          Chapter 2: Movement Spells
        </h2>
        <div className="space-y-6 text-muted-foreground">
          <p>In Normal Mode, you never need the mouse. Your hands stay on the keyboard, making you a faster coder.</p>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                  <h4 className="font-bold text-lg mb-2 text-command">Basic Movement:</h4>
                  <ul className="list-disc list-inside space-y-1">
                      <li>`h`: Move left</li>
                      <li>`j`: Move down</li>
                      <li>`k`: Move up</li>
                      <li>`l`: Move right</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-lg mb-2 text-command">Jumping Spells:</h4>
                  <ul className="list-disc list-inside space-y-1">
                      <li>`w`: Jump forward to the start of the next word.</li>
                      <li>`b`: Jump backward to the start of the previous word.</li>
                      <li>`0`: Jump to the beginning of the line.</li>
                      <li>`$`: Jump to the end of the line.</li>
                      <li>`gg`: Teleport to the very top of the file.</li>
                      <li>`G`: Teleport to the very bottom of the file.</li>
                  </ul>
              </div>
          </div>
        </div>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-tertiary-accent">
          Chapter 3: Editing and Alteration
        </h2>
        <div className="space-y-6 text-muted-foreground">
          <p>These spells let you shape and mold your text with incredible efficiency.</p>
          <ul className="list-none space-y-4">
            <li>
                <h4 className="text-lg font-bold text-command">Entering Insert Mode:</h4>
                <p>`i`: Start typing before the cursor. `a`: Start typing after the cursor. `o`: Create a new line below and start typing.</p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-command">Deletion Spells:</h4>
              <p>`x`: Delete the character under the cursor. `dw`: Delete a whole word. `dd`: Delete an entire line.</p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-command">Copy & Paste (Yank & Put):</h4>
              <p>`yy`: Yank (copy) the current line. `p`: Put (paste) the copied text after the cursor.</p>
            </li>
            <li>
              <h4 className="text-lg font-bold text-command">Undo & Redo:</h4>
              <p>`u`: Undo the last action. `Ctrl + r`: Redo an undone change.</p>
            </li>
          </ul>
           <div className="mt-6 p-4 rounded-xl bg-card-nested border-l-4 border-l-yellow-400">
             <p><span className="text-tips font-bold">Quest Tip:</span> Combine numbers with spells! `2dd` deletes two lines. `3yy` yanks three lines. `5j` moves down 5 lines. This is the secret to Vim's power!</p>
           </div>
        </div>
      </section>

       <section className="bg-card p-6 md:p-8 rounded-2xl shadow-xl border border-border">
        <h2 className="text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary-accent">
          Chapter 4: The All-Seeing Eye (Search & Replace)
        </h2>
        <div className="space-y-6 text-muted-foreground">
           <p>Quickly find and alter any text in your ancient scrolls.</p>
           <ul className="list-none space-y-4">
              <li>
                <h4 className="text-lg font-bold text-command">Searching:</h4>
                <p>In Normal Mode, type `/search-term` and press Enter to search forward. Press `n` for the next match, and `N` for the previous one.</p>
              </li>
              <li>
                <h4 className="text-lg font-bold text-command">Replacing:</h4>
                <p>This is a master-level command-line spell.</p>
                <CodeBlock className="bg-code-bg text-code-text">:%s/old_word/new_word/g</CodeBlock>
                <div className="mt-4 p-4 rounded-xl bg-card-nested border-l-4 border-l-blue-400">
                    <h4 className="text-xl font-bold text-white mb-2">Breaking Down the Spell</h4>
                    <ul className="list-disc list-inside space-y-2">
                        <li><span className="text-tag font-bold">:%s</span>: The 'substitute' spell for the whole file.</li>
                        <li><span className="text-label font-bold">/old_word/</span>: The text you want to find.</li>
                        <li><span className="text-label font-bold">/new_word/</span>: The text you want to replace it with.</li>
                        <li><span className="text-tag font-bold">/g</span>: The 'global' flag, meaning replace every instance on each line, not just the first one.</li>
                    </ul>
                </div>
              </li>
           </ul>
        </div>
      </section>
    </div>
  );
}
