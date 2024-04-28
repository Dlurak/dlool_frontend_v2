import type { NavigationTarget } from '$lib/components/layout/navigation/types';
import type { LocaleAbbr } from '$lib/i18n/i18n';
import { localstorage } from 'svocal';

const sv = {
	'settings.nav.entries': [
		'settings.nav.entries',
		() =>
			[
				'homework',
				'notes',
				'calendar',
				'launcher'
			] satisfies NavigationTarget[] as NavigationTarget[]
	],
	'settings.nav.texts': ['settings.nav.texts', () => true],
	'i18n.currentlang': ['i18n.currentlang', () => 'de' satisfies LocaleAbbr as LocaleAbbr]
} as const;

type SvocalKey = keyof typeof sv;

export const svocal = <T extends SvocalKey>(key: T) => {
	const entry = sv[key];

	const svocalKey = entry[0];
	const fallback = entry[1]() as ReturnType<(typeof sv)[T][1]>;

	return localstorage(svocalKey, fallback);
};
