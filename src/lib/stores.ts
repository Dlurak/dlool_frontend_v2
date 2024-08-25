import { readable, writable } from 'svelte/store';
import { svocal } from './utils/store/svocal';

export const navHeight = writable(0);
export const footerHeight = writable(0);
export const currentLang = svocal('i18n.currentlang');

export const openedModals = writable(0);

export const iconBg = writable('#ffffff');

export const isApple = writable(false);

export const settingsHeader = writable(readable(''));
