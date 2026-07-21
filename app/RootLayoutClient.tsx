'use client';

import { useServiceWorkerUpdates } from './hooks/useServiceWorkerUpdates';
import { UIEnhancements } from './components/UIEnhancements';
import { FloatingSupportWidget } from './components/FloatingSupportWidget';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  useServiceWorkerUpdates();

  return (
    <>
      <UIEnhancements />
      {children}
      <FloatingSupportWidget />
    </>
  );
}
