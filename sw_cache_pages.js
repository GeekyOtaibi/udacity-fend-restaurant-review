const cacheName = "v1";
const cacheAssets = [
  "index.html",
  "restaurant.html",
  "data/restaurants.json",
  "css/styles.css",
  "js/main.js",
  "js/dbhelper.js",
  "js/restaurant_info.js"
];

self.addEventListener("install", e => {
  //cache files if service worker is installed
  e.waitUntil(
    caches
      .open(cacheName)
      .then(caches => {
        caches.addAll(cacheAssets);
      })
      .catch(() => self.skipWaiting()) //? if open cacheName failed skip waiting
  );
});

self.addEventListener("activate", e => {
  // if service worker activated delete old cache to add new cache
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("delete old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", e => {
    //fetch all stored caches
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
