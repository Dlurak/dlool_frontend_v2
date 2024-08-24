import { i } from '$lib/i18n/store';
import type { Readable } from 'svelte/store';

type Box = {
	emoji: string;
	description: Readable<string>;
	title: Readable<string>;
};

export const boxes: Box[] = [
	{
		emoji: '📱',
		title: i('home.boxes.crossPlattform'),
		description: i('home.boxes.crossPlattform.description')
	},

	{
		emoji: '👨‍👩‍👧‍👦',
		title: i('home.boxes.collaborative'),
		description: i('home.boxes.collaborative.description')
	},

	{
		emoji: '⚙️',
		title: i('home.boxes.customizable'),
		description: i('home.boxes.customizable.description')
	},

	{
		emoji: '🗽',
		title: i('home.boxes.libre'),
		description: i('home.boxes.libre.description')
	},

	{
		emoji: '🎓',
		title: i('home.boxes.students'),
		description: i('home.boxes.students.description')
	},

	{
		emoji: '🧠',
		title: i('home.boxes.easy'),
		description: i('home.boxes.easy.description')
	}
];
