'use client';

import { useServiceWorkerUpdates } from './hooks/useServiceWorkerUpdates';
import { UIEnhancements } from './components/UIEnhancements';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  useServiceWorkerUpdates();

  return (
    <>
      <UIEnhancements />
      {children}
    </>
  );
}
