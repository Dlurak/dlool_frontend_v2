import { readable, writable } from 'svelte/store';
import { svocal } from './utils/store/svocal';
import { useBounds } from '$lib/utils/store/bounds';

export const navHeight = writable(0);
export const footerHeight = writable(0);
export const currentLang = svocal('i18n.currentlang');

export const openedModals = useBounds({
	initial: 0,
	min: 0,
	max: Infinity
});

export const iconBg = writable('#ffffff');

export const isApple = writable(false);

export const settingsHeader = writable(readable(''));
