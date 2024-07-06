import type { Context, Shortcut } from '$lib/components/layout/KeyboardModal/types';
import { i } from '$lib/i18n/store';

export const shortcuts: Record<Context, Shortcut[]> = {
	global: [
		{
			keys: [
				{
					modifier: ['Ctrl'],
					keys: ['k']
				}
			],
			description: i('keyboardshortcuts.launcher')
		},
		{
			keys: [
				{
					modifier: ['Ctrl'],
					keys: ['?']
				},
				{
					modifier: ['Ctrl'],
					keys: ['ß']
				}
			],
			description: i('keyboardshortcuts.keyboardHelpMenu')
		}
	]
};
