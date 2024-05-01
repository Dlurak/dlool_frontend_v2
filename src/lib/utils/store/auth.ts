import { derived } from 'svelte/store';
import { svocal } from './svocal';
import { currentMs } from '../dates/current';

export const useAuth = () => {
	const tokenExpires = svocal('auth.access.expires');

	return {
		isLoggedIn: derived(tokenExpires, ($tokenExpires) => {
			return $tokenExpires !== null && $tokenExpires > currentMs();
		})
	};
};
