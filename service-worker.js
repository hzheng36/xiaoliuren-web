/* 小六壬占卜 · v10.1.5 模式切换与设置保护版 */
const CACHE_NAME = 'xiaoliuren-v10-1-5-mode-settings-protect';
const APP_SHELL = ['./', './index.html'];

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
    // HTML 页面网络优先，避免 GitHub Pages 更新后仍被旧缓存卡住。
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone()).catch(() => undefined);
        cache.put('./index.html', fresh.clone()).catch(() => undefined);
        return fresh;
      } catch (err) {
        const cached = await caches.match(req) || await caches.match('./index.html') || await caches.match('./');
        if (cached) return cached;
        throw err;
      }
    })());
    return;
  }

  // 其它静态资源也采用网络优先，失败时回退缓存。
  event.respondWith((async () => {
    try {
      const fresh = await fetch(req);
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
