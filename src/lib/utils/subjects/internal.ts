import { objectEntries } from '$lib/utils/objects/entries';

export const serialized = {
	informatik: ['informatik', 'info', 'computer science', 'programming'],
	biologie: ['bio', 'biology', 'biologie'],
	geschichte: ['geschichte', 'geschi'],
	mathematik: ['mathe', 'mathematick', 'mathematik', 'mathemathik', 'mathemathics', 'math'],
	religion: ['reli', 'religion'],
	powi: ['powi', 'wipo'],
	physics: ['physics', 'physic', 'physik']
};

export function internalSubjectRepresentation(subj: string) {
	const subject = subj.trim().toLowerCase();
	const entries = objectEntries(serialized);
	const entry = entries.find(([_, alts]) => alts.includes(subject));

	return entry ? entry[0] : subject;
}
