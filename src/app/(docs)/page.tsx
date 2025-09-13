
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function DocsRootPage() {
  useEffect(() => {
    redirect('/home');
  }, []);

  return null;
}
