import { writable } from 'svelte/store';
import Cookie from 'js-cookie';
import { safeMap } from '$lib/utils/null/safeMap';
import { onMount } from 'svelte';
import { browser } from '$app/environment';

const cookies = {
	'api.url': 'https://dlool.onrender.com' as string
} as const satisfies Record<string, unknown>;

type CookieKey = keyof typeof cookies;
type CookieValue<T extends CookieKey> = (typeof cookies)[T];

export function cookie<TKey extends CookieKey>(key: TKey) {
	const fallbackValue = cookies[key] as CookieValue<TKey>;
	const realValue = Cookie.get(key);
	const domEventName = `DLOOL-INTERNAL-set-cookie-${key}`;

	const { set, subscribe } = writable(
		safeMap<string, CookieValue<TKey>>(realValue, JSON.parse) ?? fallbackValue
	);

	onMount(() => {
		document.addEventListener(domEventName, () => {
			const realValue = Cookie.get(key);
			if (realValue === undefined) return;

			set(JSON.parse(realValue));
		});
	});

	return {
		subscribe,
		set: (data: CookieValue<TKey>) => {
			Cookie.set(key, JSON.stringify(data), {
				expires: 300
			});
			if (browser) {
				document.dispatchEvent(new Event(domEventName));
			}
			set(data);
		}
	};
}
