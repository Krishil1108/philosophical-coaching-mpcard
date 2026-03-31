'use client';

import { useServiceWorkerUpdates } from './hooks/useServiceWorkerUpdates';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  useServiceWorkerUpdates();

  return <>{children}</>;
}
