import { confirm } from '$lib/components/layout/confirmation';
import { sendToast } from '$lib/components/layout/toasts';
import { i } from '$lib/i18n/store';
import { readJSON } from '$lib/utils/files/upload';
import { svocal } from '$lib/utils/store/svocal';
import { get } from 'svelte/store';
import { z } from 'zod';
import convert from 'color-convert';

const colors = svocal('settings.color');

const scheme = z.union([
	z.record(z.string(), z.string().regex(/^#?(([a-f\d]{3})|([a-f\d]{6}))$/i)),
	z.array(
		z.object({
			subject: z.string(),
			color: z.object({
				r: z.number().int().max(255).min(0),
				g: z.number().int().max(255).min(0),
				b: z.number().int().max(255).min(0)
			})
		})
	)
]);

export async function loadFromFile() {
	const confirmed =
		Object.keys(get(colors)).length === 0 ||
		(await confirm({
			ok: i('settings.color.import'),
			desc: i(
				'settings.color.import.confirm',
				{ amount: `${Object.keys(get(colors)).length}` },
				{ count: Object.keys(get(colors)).length }
			)
		}));
	if (!confirmed) return;

	const newColors = await readJSON(scheme).catch(() => null);

	if (newColors === null) {
		sendToast({
			type: 'error',
			timeout: 5_000,
			content: i('settings.color.import.error')
		});
		return;
	}

	sendToast({
		type: 'success',
		timeout: 5_000,
		content: i('settings.color.import.success')
	});

	if (Array.isArray(newColors)) {
		const entries = newColors.map(({ subject, color }) => {
			const hex = `#${convert.rgb.hex([color.r, color.g, color.b])}`;
			return [subject, hex] as const;
		});
		colors.set(Object.fromEntries(entries));
		return;
	}
	colors.set(newColors);
}
