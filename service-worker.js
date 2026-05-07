const CACHE_NAME = 'xiaoliuren-v10-1-2-spacing-consistency-fix';
const ASSETS = ['./','./index.html','./README.md'];
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME && k.startsWith('xiaoliuren-')).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { if(event.request.method !== 'GET') return; event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => { const copy=resp.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(()=>{}); return resp; }).catch(()=>cached))); });
