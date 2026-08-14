// Hand-written, no build tooling — bump CACHE_VERSION on any change to
// this file or to SHELL_URLS to force clients onto a fresh cache set.
// API requests (cross-origin, to the backend) are never intercepted here —
// offline support for note/category data lives entirely in IndexedDB
// (see src/lib/offline/*), this service worker only owns the app shell
// (HTML/JS/CSS/icons) so the app can cold-start while offline.
const CACHE_VERSION = 'v1';
const SHELL_CACHE = 'mininote-shell-' + CACHE_VERSION;
const RUNTIME_CACHE = 'mininote-runtime-' + CACHE_VERSION;

const SHELL_URLS = [
  '/', '/login', '/notes', '/offline.html', '/manifest.json',
  '/icons/icon-192.png', '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      Promise.all(SHELL_URLS.map((u) => cache.add(u).catch(() => {}))))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

function isStaticAsset(pathname) {
  return pathname.startsWith('/_next/static/') || pathname.startsWith('/icons/')
    || /\.(png|jpg|jpeg|svg|ico|woff2?|css)$/.test(pathname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return; // never intercept writes
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // API/backend calls pass straight through

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(async () => (
          (await caches.match(request))
          || (await caches.match('/offline.html'))
          || (await caches.match('/'))
        ))
    );
    return;
  }

  if (isStaticAsset(url.pathname)) {
    // Content-hashed by Next.js under /_next/static — safe to serve
    // cache-first indefinitely once fetched once.
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
        return res;
      }))
    );
  }
});
