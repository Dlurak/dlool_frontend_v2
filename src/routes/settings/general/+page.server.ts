import { Holiday } from 'open-holiday-js';
import type { PageServerLoad } from './$types';

const holiday = new Holiday();

export const load: PageServerLoad = async () => {
	const countries = await holiday.getCountries();

	return { countries };
};
