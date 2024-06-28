/**
 * TODO:Add english smart subjects
 */

type SmartDetectRule = {
	subject: string;
	pattern: RegExp;
};

const genRegex = (str: string) => new RegExp(`^${str.toLowerCase()}`);

const exactPairs = [
	'Chemie',
	'Physik',
	'Latein',
	'Deutsch',
	'Musik',
	'Sport',
	'Spanisch',
	'Kunst',
	'Französisch'
];

const rules: SmartDetectRule[] = [
	...exactPairs.map((subject) => ({ subject, pattern: genRegex(subject) })),
	{
		subject: 'Mathemathik',
		pattern: /^math?e/
	},
	{
		subject: 'Informatik',
		pattern: /^info(rmatik)?/
	},
	{
		subject: 'Darstellendes Spiel',
		pattern: /^(ds|darstellendes\s*spiel)/
	},
	{
		subject: 'PoWi',
		pattern: /^(powi|politik\s+(und|&)\s+wirtschaft)/
	},
	{
		subject: 'Geschichte',
		pattern: /^geschi/
	},
	{
		subject: 'Biologie',
		pattern: /^bio/
	},
	{
		subject: 'Biologie',
		pattern: /^reli/
	}
];

export function smartSubject(course: string) {
	const found = rules.find(({ pattern }) => pattern.test(course.toLowerCase()));
	return found?.subject;
}
