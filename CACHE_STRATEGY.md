# Auto-Update Caching Strategy

This application uses a Service Worker with intelligent caching to provide seamless updates without requiring users to close and reopen the website.

## How It Works

### Service Worker (`public/service-worker.js`)
- **Network-First Strategy**: Tries to fetch from the network first, falls back to cache if offline
- **Automatic Caching**: Caches successful responses automatically
- **Cache Versioning**: Implements versioned caching to automatically clear old caches on updates
- **Update Clean-up**: Automatically removes old cache versions on activation

### Update Detection (`app/hooks/useServiceWorkerUpdates.ts`)
- **Periodic Checks**: Checks for updates every 60 seconds
- **Visibility-Based Checks**: Checks for updates when the user returns to the tab
- **Auto-Activation**: Automatically activates new versions silently
- **Event Dispatching**: Dispatches events when updates are available (for optional UI notifications)

## Features

✅ **Seamless Updates**: Users don't need to close/reopen the site for updates
✅ **Offline Support**: Cached pages remain accessible when offline
✅ **Automatic Cache Management**: Old caches are automatically cleared
✅ **Low Overhead**: Minimal performance impact with smart cache versioning
✅ **Graceful Fallback**: Shows offline page when content isn't cached

## Cache Behavior

| Request Type | Behavior |
|---|---|
| Page loads | Network-first, cache fallback |
| Static assets | Cached automatically |
| API calls | Always fresh (not cached by default) |
| External URLs | Passed through without caching |

## Customization

To change the update check interval, modify `UPDATE_CHECK_INTERVAL` in `public/service-worker.js`:
```javascript
const UPDATE_CHECK_INTERVAL = 60000; // milliseconds
```

To add URLs to always cache, update `urlsToCache` in `public/service-worker.js`.

## Deployment

When you deploy new changes:
1. Update CSS/JS files (they're automatically cached)
2. Changes take effect within 60 seconds for active users
3. Inactive tabs update when user returns to them
4. No user action required
