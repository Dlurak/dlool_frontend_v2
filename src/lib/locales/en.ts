import type { I18nDict } from './types';

const en = {
	'nav.homework': {
		counts: {
			0: 'zero homework',
			default: 'Homework (default) $part $dynamic'
		}
	},
	'nav.en': 'hi'
} as const satisfies I18nDict;

export default en;
