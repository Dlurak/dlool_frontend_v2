/// <reference lib="webworker" />

import { version } from '$service-worker';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { filterForType } from '$lib/utils/service-worker/getRouteName';
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope

const cacheName = `cache-${version}`;

const ONE_MONTH_IN_SEC = 30 * 24 * 60 * 60;

precacheAndRoute(self.__WB_MANIFEST || []);

clientsClaim();

registerRoute(
	filterForType('image'),
	new StaleWhileRevalidate({
		cacheName: "images",
		plugins: [new ExpirationPlugin({ maxAgeSeconds: ONE_MONTH_IN_SEC })]
	})
);

registerRoute(
	filterForType('holiday'),
	new StaleWhileRevalidate({
		cacheName,
		plugins: [new ExpirationPlugin({ maxAgeSeconds: 0.75 * ONE_MONTH_IN_SEC })]
	})
);

registerRoute(
	filterForType('dlool-api'),
	new NetworkFirst({
		cacheName: "dlool-api",
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
