const CACHE_NAME = "xiaoliuren-v10-1-deep-fix-20260507";
const FILES_TO_CACHE = ["./", "./index.html", "./README.md", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE).catch(()=>{}))); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", event => { if (event.request.method !== "GET") return; event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => { const copy = resp.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(()=>{}); return resp; }).catch(() => caches.match("./index.html")))); });
