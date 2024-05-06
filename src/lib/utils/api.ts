import { get } from 'svelte/store';
import { svocal } from './store/svocal';

export const getApibase = () => get(svocal('api.url'));

const getAuthHeader = () => {
	const tok = get(svocal('auth.access.token'));

	if (!tok) return '';
	return `Bearer ${tok}`;
};

export const getHeader = (): HeadersInit => {
	const auth = getAuthHeader();

	if (auth) {
		return {
			Authorization: auth,
			'Content-Type': 'application/json'
		};
	}

	return { 'Content-Type': 'application/json' };
};
