import {
	Banknotes,
	Beaker,
	Bolt,
	BugAnt,
	BuildingLibrary,
	Calculator,
	ComputerDesktop,
	Fire,
	Language,
	LightBulb,
	MusicalNote,
	PaintBrush,
	type IconSource
} from 'svelte-hero-icons';

type IconObj = {
	subjects: string[];
	icon: IconSource;
};

const iconObjs: IconObj[] = [
	{
		subjects: ['informatik', 'info', 'computer science', 'programming'],
		icon: ComputerDesktop
	},
	{
		subjects: ['biologie', 'bio', 'biology'],
		icon: BugAnt
	},
	{
		subjects: ['chemie', 'chemistry'],
		icon: Beaker
	},
	{
		subjects: [
			'deutsch',
			'englisch',
			'spanisch',
			'german',
			'english',
			'spanish',
			'latin',
			'latein',
			'klingon',
			'japanese',
			'japanisch'
		],
		icon: Language
	},
	{
		subjects: ['geschichte', 'history'],
		icon: BuildingLibrary
	},
	{
		subjects: ['art', 'kunst', 'malen', 'drawing', 'draw'],
		icon: PaintBrush
	},
	{
		subjects: ['mathe', 'mathematik', 'math', 'mathemathics', 'rechnen', 'calculus', 'algebra'],
		icon: Calculator
	},
	{
		subjects: ['musik', 'music'],
		icon: MusicalNote
	},
	{
		subjects: ['physik', 'physics'],
		icon: Bolt
	},
	{
		subjects: ['reli', 'religion'],
		icon: LightBulb
	},
	{
		subjects: ['sport', 'pe'],
		icon: Fire
	},
	{
		subjects: ['powi', 'politik', 'wirtschaft', 'economy'],
		icon: Banknotes
	}
];

export function getSubjectIcon(subject: string) {
	const subj = subject.trim().toLowerCase();

	return iconObjs.find(({ subjects }) => subjects.includes(subj))?.icon ?? null;
}
