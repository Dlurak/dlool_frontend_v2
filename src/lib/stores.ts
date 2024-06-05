import { writable, type Readable } from 'svelte/store';
import { svocal } from './utils/store/svocal';

export const navHeight = writable(0);
export const footerHeight = writable(0);
export const currentLang = svocal('i18n.currentlang');

export const title = writable<Readable<string> | null>(null);
