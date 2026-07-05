
// STREAMING_CHUNK: Setting up cache resources...
const CACHE_NAME = 'chillout-pos-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// STREAMING_CHUNK: Activating service worker installer hooks...
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// STREAMING_CHUNK: Cleaning stale resources...
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// STREAMING_CHUNK: Intercepting server requests for offline fallback...
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
