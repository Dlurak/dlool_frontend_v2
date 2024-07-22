import { Holiday } from 'open-holiday-js';
import type { PageServerLoad } from './$types';

const holiday = new Holiday();

export const load: PageServerLoad = () => {
	const countries = holiday.getCountries();

	return { countries };
};
