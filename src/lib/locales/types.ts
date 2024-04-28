type TranslationTarget =
	| string
	| {
			counts: Record<number | 'default', string>;
	  };

export type I18nDict = Record<string, TranslationTarget>;
