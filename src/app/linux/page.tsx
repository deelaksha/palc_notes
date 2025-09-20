'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function OldLinuxRedirectPage() {
  useEffect(() => {
    redirect('/docs/linux');
  }, []);

  return null;
}
