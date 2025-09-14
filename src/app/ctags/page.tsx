
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function OldCtagsPage() {
  useEffect(() => {
    redirect('/code-navigation/ctags');
  }, []);

  return null;
}
