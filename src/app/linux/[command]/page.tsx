'use client';

import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OldLinuxCommandRedirectPage() {
  const params = useParams();
  const command = params.command as string;

  useEffect(() => {
    if (command) {
      redirect(`/docs/linux/${command}`);
    } else {
      redirect('/docs/linux');
    }
  }, [command]);

  return null;
}
