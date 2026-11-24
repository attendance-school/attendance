// الشبكة أولًا: أي تعديل ترفعه على GitHub يظهر فورًا. الكاش للطوارئ فقط (بدون نت).
const C = 'hodoor-plus-v2';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'manifest.json'])).catch(() => {}));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return; // Firebase وغيره يعدّي عادي
  e.respondWith(
    fetch(r, { cache: 'no-cache' })
      .then(res => { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); return res; })
      .catch(() => caches.match(r).then(m => m || caches.match('./')))
  );
});
