const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];
const STATIC_ASSETS = [
    '/index.html',
    '/apple-touch-icon.png',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
    '/src/styles.css',
    '/src/colors.css',
    '/src/index.js'
]
async function preCache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(STATIC_ASSETS)
}

const self = this;
// Install SW
self.addEventListener('install', (event) => {
    self.skipWaiting()
    event.waitUntil(preCache())
});

async function cleanupCache() {
    const keys = await caches.keys();
    const keysToDelete = keys.map(key => {
        if(key !== CACHE_NAME){
            return caches.delete(key)
        }
    })
    return Promise.all(keysToDelete)
}
// Activate the SW
self.addEventListener('activate', (event) => {
    event.waitUntil(cleanupCache())
});

async function fetchAssets(event) {
    try {
        const response = await fetch(event.request);
        return response
    } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event, request)
    }
}
// listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(fetchAssets(event))
});
