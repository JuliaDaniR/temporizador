// service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  event.waitUntil(
      caches.open('cache-v1').then((cache) => {
          return cache.addAll([
              './',
              './index.html',
              './style.css',
              './script.js',
              './icons/temporizador.png',
              './icons/temporizador1.png'
          ]);
      })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['cache-v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
