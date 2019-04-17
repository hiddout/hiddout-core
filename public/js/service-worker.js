'use strict';

const CACHE_VERSION = 1;
let CURRENT_CACHES = {
	offline: 'hiddout-v' + CACHE_VERSION,
};

self.addEventListener('install', (event) => {
	console.log('The service worker is being installed.');
	event.waitUntil(
		caches.open(CURRENT_CACHES.offline).then(function(cache) {
			return cache.addAll([
				'/public/static/Hiddout.png',
			]);
		}),
	);
});

self.addEventListener('activate', function(event) {
	let expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
		return CURRENT_CACHES[key];
	});

	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (expectedCacheNames.indexOf(cacheName) === -1) {
						console.log('Deleting out of date cache:', cacheName);
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.open(CURRENT_CACHES.offline).then(function(cache) {
			return fetch(event.request)
				.then(function(response) {
					cache.put(event.request, response.clone());
					return response;
				})
				.catch(() =>
					cache.match(event.request)
				);
		}),
	);
});
