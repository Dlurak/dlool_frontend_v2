import { svocal } from '$lib/utils/store/svocal';
import { createMediaStore } from 'svelte-media-queries';
import { derived } from 'svelte/store';

const manual = svocal('settings.reduceMotion');

export const animationLength = derived(
	[manual, createMediaStore('(prefers-reduced-motion: reduce)')],
	([reduced, manual]) => {
		if (manual) return 0;
		if (reduced) return 0;

		return 300;
	}
);
