import en from '$lib/locales/en';
import de from '$lib/locales/de';
import { svocal } from '$lib/utils/store/svocal';
import { get } from 'svelte/store';

const languages = { en, de } as const;

const currentLanguage = svocal('i18n.currentlang');

export type LocaleAbbr = keyof typeof languages;
export type Token = keyof (typeof languages)[LocaleAbbr];

type Count = Record<number | 'default', string>;

type GenerateCount<T extends { counts: Count } | string> = T extends { counts: Count }
	? T['counts']
	: { default: T };

type DefaultCount<
	T extends { count?: number | 'default' },
	Default extends number | 'default'
> = T extends { count: infer C } ? (C extends undefined ? 'default' : C) : Default;

type ProcessCount<Counts extends Count, Amount extends number | 'default'> = Counts extends {
	[P in Amount]: infer U;
}
	? { default: U }
	: Counts;

type I18nProps = {
	count?: number | 'default';
};

export const i = <Tok extends Token, Opt extends I18nProps>(
	token: Tok,
	options: Opt = {} as Opt
) => {
	type Base = (typeof languages)[LocaleAbbr][Tok];
	const baseVal = languages[get(currentLanguage)][token] as Base;

	const count = options.count ?? 'default';

	const unproccessedString = (
		typeof baseVal === 'string'
			? baseVal
			: // @ts-ignore
				baseVal.counts[count]
	) as ProcessCount<GenerateCount<Base>, DefaultCount<Opt, 'default'>>['default'];

	return unproccessedString;
};

const test = i('nav.homework', {});
