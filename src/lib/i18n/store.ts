import { svocal } from '$lib/utils/store/svocal';
import { int, type I18nProps, type LocaleAbbr, type Pairs, type Token } from './i18n';
import { writable } from 'svelte/store';

export const i = <
	Tok extends Token,
	Opt extends I18nProps,
	Pai extends Pairs<Tok, Opt, LocaleAbbr>
>(
	token: Tok,
	pairs = {} as Pai,
	options = {} as Opt
) => {
	const lang = svocal('i18n.currentlang');
	const translation = writable(int(token, pairs, options));

	lang.subscribe(() => {
		translation.set(int(token, pairs, options));
	});

	return { subscribe: translation.subscribe };
};
