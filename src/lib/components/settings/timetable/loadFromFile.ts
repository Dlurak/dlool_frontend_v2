import { confirm } from '$lib/components/layout/confirmation';
import { sendToast } from '$lib/components/layout/toasts';
import { oldTimetableScheme, timetableScheme } from '$lib/components/settings/timetable/types';
import { allLessons, cleanUpTimeTable } from '$lib/components/settings/timetable/utils';
import { i } from '$lib/i18n/store';
import { readJSON } from '$lib/utils/files/upload';
import { safePromise } from '$lib/utils/promises';
import { svocal } from '$lib/utils/store/svocal';
import { get } from 'svelte/store';
import { z } from 'zod';

const timetable = svocal('settings.timetable');

export async function loadFromFile() {
	const confirmed =
		allLessons(get(timetable)).length === 0 ||
		(await confirm({
			desc: i('settings.timetable.confirm.desc')
		}));
	if (!confirmed) return;

	const data = await safePromise(readJSON(z.union([timetableScheme, oldTimetableScheme])));

	if (data.type === 'success') {
		timetable.set(cleanUpTimeTable(data.data));
		sendToast({
			type: 'success',
			timeout: 5_000,
			content: i('settings.timetable.import.success')
		});
		return;
	}

	sendToast({
		type: 'error',
		timeout: 5_000,
		content: i('settings.timetable.import.error')
	});
}
