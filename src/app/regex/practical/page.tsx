'use client';
import { RegexVisualizer } from '@/components/regex/RegexVisualizer';
import { useRegex } from '@/context/RegexContext';

export default function RegexPracticalPage() {
  const { pattern, text, setPattern, setText } = useRegex();
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 md:p-8 lg:p-12">
      <RegexVisualizer
        initialPattern={pattern}
        initialText={text}
        onPatternChange={setPattern}
        onTextChange={setText}
      />
    </div>
  );
}
