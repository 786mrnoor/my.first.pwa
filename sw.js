const cacheName = 'v1';
const cacheFiles = [
    "/",
    "/index.html",
    "/test.html",
    "/style.css",
    "/script.js",
];


const addResourcesToCache = async (resources) => {
    console.log(caches);
    try {
        const cache = await caches.open(cacheName);
        await cache.addAll(resources);
    }
    catch (err) {
        console.log(err);
        console.log(err.message);
    }
};

self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache(cacheFiles),
    );
});

self.addEventListener("fetch", (event) => {
    const pathname = new URL(event.request.url).pathname;
    if (cacheFiles.includes(pathname)) {
        event.respondWith(cacheFirst(event.request));
    }
});

async function cacheFirst(request) {
    let cache = await caches.open(cacheName);
    let response = await cache.match(request);
    if (response) return response;

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        return Response.error();
    }
}

async function deleteOldCaches(event) {
    let cachesKeys = await caches.keys()
    console.log(cachesKeys);
}

self.addEventListener('activate', (event) => {
    // event.waitUntil(deleteOldCaches(event));
    const cacheAllowlist = [cacheName];
    event.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (!cacheAllowlist.includes(key)) {
                        return caches.delete(key);
                    }
                })
            )
        )
    )
})