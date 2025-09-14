
import React from 'react';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  // This layout is now simplified to only provide the structure for docs pages,
  // inheriting the main sidebar and header from the root layout.
  return <div className="flex-1">{children}</div>;
}
