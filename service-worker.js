const CACHE_NAME = 'xiaoliuren-v10.5.225';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './home-poster-v10.5.144.webp'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL).catch(() => undefined)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => {
      if (key !== CACHE_NAME && key.indexOf('xiaoliuren') !== -1) return caches.delete(key);
      return Promise.resolve();
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const accept = req.headers.get('accept') || '';
  const url = new URL(req.url);
  const isHTML = req.mode === 'navigate' || accept.includes('text/html') || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/');
  if (isHTML) {
    event.respondWith(fetch(req, { cache: 'no-store' }).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy)).catch(() => undefined);
      return res;
    }).catch(() => caches.match('./index.html').then((res) => res || caches.match('./'))));
    return;
  }
  event.respondWith(fetch(req).then((res) => {
    const copy = res.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => undefined);
    return res;
  }).catch(() => caches.match(req)));
});
