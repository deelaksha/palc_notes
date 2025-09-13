
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function FileHandlingRedirectPage() {
  useEffect(() => {
    redirect('/code-navigation');
  }, []);

  return null;
}
