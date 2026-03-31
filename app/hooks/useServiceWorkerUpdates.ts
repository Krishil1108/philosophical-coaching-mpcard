'use client';

import { useEffect } from 'react';

export function useServiceWorkerUpdates() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
          scope: '/',
        });

        // Check for updates every 60 seconds
        const checkForUpdates = async () => {
          try {
            await registration.update();
          } catch (err) {
            console.error('Update check failed:', err);
          }
        };

        const updateInterval = setInterval(checkForUpdates, 60000);

        // Listen for new service worker activation
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'activated' &&
              navigator.serviceWorker.controller
            ) {
              // New version available - show notification (optional)
              console.log('App updated to latest version');

              // Optional: Show update notification
              if (typeof window !== 'undefined') {
                window.dispatchEvent(
                  new CustomEvent('app-update-available', {
                    detail: { registration },
                  })
                );
              }
            }
          });
        });

        // Cleanup
        return () => clearInterval(updateInterval);
      } catch (err) {
        console.error('ServiceWorker registration failed:', err);
      }
    };

    // Register on mount
    register();

    // Check for new version on visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) {
            reg.update().catch(() => {});
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
