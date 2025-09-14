
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function CtagsCscopeRedirectPage() {
  useEffect(() => {
    // Redirect to the main code navigation page as this combined page no longer exists.
    redirect('/docs/code-navigation');
  }, []);

  return null;
}
