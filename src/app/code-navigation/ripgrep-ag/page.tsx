
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function RipgrepAgRedirectPage() {
  useEffect(() => {
    redirect('/code-navigation');
  }, []);

  return null;
}
