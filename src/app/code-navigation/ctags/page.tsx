
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function CtagsRedirectPage() {
  useEffect(() => {
    redirect('/docs/code-navigation/ctags');
  }, []);

  return null;
}
