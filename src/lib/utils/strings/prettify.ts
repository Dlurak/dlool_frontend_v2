type ReplacementRule = {
	pattern: RegExp;
	newVal: string;
};

const replacementRules: ReplacementRule[] = [
	{ pattern: /->>/, newVal: '↠' },
	{ pattern: /<<-/, newVal: '↞' },
	{ pattern: /<-</, newVal: '↢' },
	{ pattern: />->/, newVal: '↣' },
	{ pattern: /<-\|/, newVal: '↤' },
	{ pattern: /<->/, newVal: '↔' },
	{ pattern: /<~/, newVal: '↜' },
	{ pattern: /~>/, newVal: '↝' },
	{ pattern: /<-/, newVal: '←' },
	{ pattern: /->/, newVal: '→' },
	{ pattern: /\|->/, newVal: '↦' },
	{ pattern: /=>/, newVal: '⇒' }
];

function applyReplacementRules(str: string, rules: ReplacementRule[]) {
	if (rules.length === 0) return str;

	const { pattern, newVal } = rules[0];

	return applyReplacementRules(
		str.replaceAll(new RegExp(pattern.source, 'g'), newVal),
		rules.slice(1)
	);
}

export function prettify(ugly: string) {
	return applyReplacementRules(ugly.trim(), replacementRules);
}
