
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function OldNetworkSimulationPage() {
  useEffect(() => {
    redirect('/docs/notes/network-simulation');
  }, []);

  return null;
}
