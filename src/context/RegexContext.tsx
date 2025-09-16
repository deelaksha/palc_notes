'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RegexContextType {
  pattern: string;
  setPattern: (pattern: string) => void;
  text: string;
  setText: (text: string) => void;
}

const RegexContext = createContext<RegexContextType | undefined>(undefined);

export const RegexProvider = ({ children }: { children: ReactNode }) => {
  const [pattern, setPattern] = useState<string>('fox');
  const [text, setText] = useState<string>('The quick brown fox jumps over the lazy dog.');

  return (
    <RegexContext.Provider value={{ pattern, setPattern, text, setText }}>
      {children}
    </RegexContext.Provider>
  );
};

export const useRegex = () => {
  const context = useContext(RegexContext);
  if (context === undefined) {
    throw new Error('useRegex must be used within a RegexProvider');
  }
  return context;
};
