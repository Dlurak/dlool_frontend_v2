import en from '$lib/locales/en';
import de from '$lib/locales/de';
import { svocal } from '$lib/utils/store/svocal';
import { get } from 'svelte/store';
import type { DefaultValue } from '$lib/types/objects';
import type { ExtractWordsAfterSign, ReplaceSubstringType } from '$lib/types/strings';

const languages = { en, de } as const;

const currentLanguage = svocal('i18n.currentlang');

export type LocaleAbbr = keyof typeof languages;
export type Token = keyof (typeof languages)[LocaleAbbr];

export const abbrevations = Object.keys(languages) satisfies string[] as LocaleAbbr[];

type Amount = number | 'default';
type Count = Record<Amount, string>;

type GenerateCount<T extends { counts: Count } | string> = T extends { counts: Count }
	? T['counts']
	: { default: T };

type ProcessCount<Counts extends Count, A extends Amount> = Counts extends {
	[P in A]: infer U;
}
	? { default: U }
	: Counts;

type BaseString<
	Tok extends Token,
	Opt extends Pick<I18nProps, 'count'>,
	Loc extends LocaleAbbr
> = ProcessCount<
	GenerateCount<(typeof languages)[Loc][Tok]>,
	DefaultValue<'count', Opt, 'default', Amount>
>['default'];

export type Pairs<
	Tok extends Token,
	Opt extends I18nProps,
	Loc extends LocaleAbbr
	// @ts-ignore
> = Record<ExtractWordsAfterSign<BaseString<Tok, Opt, Loc>, '$'>[number], string>;

export type I18nProps = { count?: Amount };

export const int = <
	Tok extends Token,
	Opt extends I18nProps,
	Pai extends Pairs<Tok, Opt, LocaleAbbr>
>(
	token: Tok,
	pairs = {} as Pai,
	options = {} as Opt
) => {
	type Base = BaseString<Tok, Opt, LocaleAbbr>;
	const baseVal = languages[get(currentLanguage)][token];

	const count = options.count ?? 'default';

	const unproccessedString = (
		typeof baseVal === 'string'
			? baseVal
			: // @ts-ignore
				baseVal.counts[count] ?? baseVal.counts.default
	) as Base;

	// @ts-ignore
	const parted = unproccessedString.replace(
		/\$([a-zA-Z]+)/g,
		// @ts-ignore
		(match, key) => pairs[key] || match
		// @ts-ignore
	) as ReplaceSubstringType<Base, Pai>;

	// @ts-ignore
	return parted;
};
