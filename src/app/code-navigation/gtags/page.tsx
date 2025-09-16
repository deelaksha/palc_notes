
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function GtagsRedirectPage() {
  useEffect(() => {
    redirect('/code-navigation');
  }, []);

  return null;
}
