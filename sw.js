// Parliament — Service Worker
// Cache-first strategy. All core assets cached on install.
// No external font dependencies — app works fully offline.

const CACHE = 'parliament-v5';
const CORE = [
  '/ddmm-dashboard/',
  '/ddmm-dashboard/index.html',
  '/ddmm-dashboard/manifest.json',
];

// ── Install: pre-cache everything ──────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clear old caches ─────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first, network fallback ───────────
self.addEventListener('fetch', e => {
  // Only handle GET requests for same-origin or core assets
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      // Not in cache — try network, then cache the response
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // Offline and not cached — return index.html for navigation requests
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
