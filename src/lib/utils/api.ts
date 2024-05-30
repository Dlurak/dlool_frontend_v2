import { get } from 'svelte/store';
import { svocal } from './store/svocal';

export const getApibase = () => get(svocal('api.url'));

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
