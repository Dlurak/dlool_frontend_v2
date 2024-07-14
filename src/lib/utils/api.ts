import { get } from 'svelte/store';
import { svocal } from './store/svocal';
import Cookie from 'js-cookie';
import { safeMap } from '$lib/utils/null/safeMap';
import { jsonParse } from '$lib/utils/json';
import { storeCookieDefaults, type CookieKey, type CookieValue } from '$lib/utils/store/cookie';

/**
 * Retrieves the base URL for the Dlool-API either from the users settings or from the default
 * As the setting is stored in a cookie this even works on the server and client!
 *
 * @returns The Base URL for the Dlool-API
 */
export const getApibase = () => {
	// TODO: Find a way to use the cookie store instead of this manual way
	const cookieKey: CookieKey = 'api.url';
	type Value = CookieValue<typeof cookieKey>;
	const fallback = storeCookieDefaults[cookieKey] as Value;

	try {
		const stored = safeMap(Cookie.get(cookieKey), (x) => jsonParse<Value>(x));

		return stored || fallback;
	} catch {
		// when the json parsing fails reset the cookie
		Cookie.remove(cookieKey);
		return fallback;
	}
};

export const getAuthHeader = () => {
	const tok = get(svocal('auth.access.token'));

	if (!tok) return '';
	return `Bearer ${tok}`;
};

/**
 * A enum for the http methods used by the Dlool-API
 */
export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}
