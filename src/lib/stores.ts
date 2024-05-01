import { writable } from 'svelte/store';
import { svocal } from './utils/store/svocal';

export const navHeight = writable(0);
export const currentLang = svocal('i18n.currentlang');
