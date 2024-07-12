import { get } from 'svelte/store';
import { svocal } from './store/svocal';
import { cookie } from '$lib/utils/store/cookie';

export const getApibase = () => get(cookie('api.url'));

export const getAuthHeader = () => {
	const tok = get(svocal('auth.access.token'));

	if (!tok) return '';
	return `Bearer ${tok}`;
};

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}
