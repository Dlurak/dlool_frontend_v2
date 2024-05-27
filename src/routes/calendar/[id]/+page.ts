import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { specificCalendar } from '$lib/dlool/calendar/list';

export const load: PageLoad = async ({ params }) => {
	const data = await specificCalendar(params.id);

	if (data.status === 'error' && data.error === 'Calendar event not found') {
		return error(404);
	}

	if (data.status === 'success') return { data: data.data };
};
