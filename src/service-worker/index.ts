/// <reference lib="webworker" />
import { version } from '$service-worker';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { filterForType } from '$lib/utils/service-worker/getRouteName';

// const worker = self as unknown as ServiceWorkerGlobalScope;

const cacheName = `cache-${version}`;

const ONE_MONTH_IN_SEC = 30 * 24 * 60 * 60;

registerRoute(
	filterForType('image'),
	new CacheFirst({
		cacheName,
		plugins: [new ExpirationPlugin({ maxAgeSeconds: ONE_MONTH_IN_SEC })]
	})
);

registerRoute(
	filterForType('holiday'),
	new CacheFirst({
		cacheName,
		plugins: [new ExpirationPlugin({ maxAgeSeconds: 2 * ONE_MONTH_IN_SEC })]
	})
);

// the api sends a `Vary`= `*` header
// This header makes it not possible to cache
registerRoute(
	filterForType('dlool-api'),
	new NetworkFirst({
		cacheName,
		plugins: [new ExpirationPlugin({ maxAgeSeconds: ONE_MONTH_IN_SEC })]
	})
);

registerRoute(
	filterForType('general'),
	new NetworkFirst({
		cacheName,
		plugins: [new ExpirationPlugin({ maxAgeSeconds: ONE_MONTH_IN_SEC })]
	})
);
