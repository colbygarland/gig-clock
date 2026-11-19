// Keeps Gig Clock working with no signal.
// Serves files from the cache at once, then fetches fresh copies in the
// background, so a new deploy shows up the next time the app opens.

const CACHE = "gig-clock-v1";
const FILES = [
  "./",
  "./clock.js",
  "./manifest.webmanifest",
  "./fonts/DSEG7Classic-Bold.woff2",
  "./favicon.svg",
  "./favicon.png",
  "./apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request, { ignoreSearch: true });
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cached ?? Response.error());

      if (cached) {
        event.waitUntil(fresh);
        return cached;
      }

      return fresh;
    }),
  );
});
