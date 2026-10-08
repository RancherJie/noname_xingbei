/**
 * Xingbei built-in image cache reader.
 *
 * Only serves same-origin image/theme images already validated and saved by
 * game/preload-images.mjs. Never writes arbitrary network responses to cache.
 * Other game resources and WebSocket connections remain untouched.
 */
"use strict";

const CACHE_PREFIX = "xingbei-image-assets-v1-";
const STATE_CACHE = "xingbei-image-cache-state-v1";
const STATE_URL = new URL("__xingbei-image-cache-state__", self.registration.scope).href;
const SCOPE_URL = new URL(self.registration.scope);
const IMAGE_EXTENSION = /\.(?:png|jpe?g|gif|svg|webp|avif|bmp|ico)$/i;

self.addEventListener("install", event => {
	event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
	event.waitUntil(self.clients.claim());
});

async function activeCacheName() {
	const state = await caches.open(STATE_CACHE);
	const response = await state.match(STATE_URL);
	if (!response) return null;
	try {
		const parsed = await response.json();
		const name = parsed && typeof parsed.cacheName === "string" ? parsed.cacheName : "";
		if (!name.startsWith(CACHE_PREFIX) || !/^[a-f0-9]{40}-[a-f0-9]{40}$/.test(name.slice(CACHE_PREFIX.length))) return null;
		return name;
	} catch {
		return null;
	}
}

self.addEventListener("message", event => {
	if (event.data?.type !== "XINGBEI_IMAGE_CACHE_STATUS" || !event.ports?.[0]) return;
	const port = event.ports[0];
	event.waitUntil((async () => {
		const cacheName = await activeCacheName();
		port.postMessage({ type: "XINGBEI_IMAGE_CACHE_STATUS", cacheName });
	})().catch(error => {
		port.postMessage({ type: "XINGBEI_IMAGE_CACHE_STATUS", cacheName: null, error: String(error) });
	}));
});

self.addEventListener("fetch", event => {
	const request = event.request;
	if (request.method !== "GET" || request.cache === "no-store") return;
	const url = new URL(request.url);
	if (url.origin !== SCOPE_URL.origin) return;
	if (!url.pathname.startsWith(SCOPE_URL.pathname)) return;
	const relativePath = url.pathname.slice(SCOPE_URL.pathname.length);
	if (!(relativePath.startsWith("image/") || relativePath.startsWith("theme/")) || !IMAGE_EXTENSION.test(relativePath)) return;

	event.respondWith((async () => {
		try {
			const cacheName = await activeCacheName();
			if (cacheName) {
				const cache = await caches.open(cacheName);
				const stored = await cache.match(request, { ignoreSearch: true });
				if (stored) return stored;
			}
		} catch (error) {
			console.warn("[Xingbei SW] Cache lookup failed", error);
		}
		// Fail open for missing/unlisted assets; do not cache unverified content.
		return fetch(request);
	})());
});
