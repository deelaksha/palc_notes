
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function CscopeRedirectPage() {
  useEffect(() => {
    redirect('/docs/code-navigation/cscope');
  }, []);

  return null;
}
