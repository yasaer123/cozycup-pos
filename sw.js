// Simple offline-fallback service worker for CozyCup POS installation support
     const CACHE_NAME = 'cozycup-pos-v2';
     self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME)); });
     self.addEventListener('fetch', (e) => { e.respondWith(fetch(e.request).catch(() => caches.match(e.request))); });
