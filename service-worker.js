/* 小六壬占卜 · v10.2.6-version-gender-result-fix */
const CACHE_NAME = 'xiaoliuren-v10.2.6-version-gender-result-fix';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL).catch(() => undefined))
  );
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
  if (event.data && event.data.type === 'CLEAR_OLD_CACHES') {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && k.indexOf('xiaoliuren') !== -1 ? caches.delete(k) : Promise.resolve()))));
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isHTML = req.mode === 'navigate' || accept.includes('text/html');

  if (isHTML) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'reload' });
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone()).catch(() => undefined);
        cache.put('./index.html', fresh.clone()).catch(() => undefined);
        cache.put('./', fresh.clone()).catch(() => undefined);
        return fresh;
      } catch (err) {
        const cached = await caches.match(req) || await caches.match('./index.html') || await caches.match('./');
        if (cached) return cached;
        throw err;
      }
    })());
    return;
  }

  event.respondWith((async () => {
    try {
      const fresh = await fetch(req, { cache: 'reload' });
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, fresh.clone()).catch(() => undefined);
      return fresh;
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      throw err;
    }
  })());
});
