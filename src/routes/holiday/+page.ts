import { Holiday } from 'open-holiday-js';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { svocal } from '$lib/utils/store/svocal';
import type { PageServerData } from './$types';

interface GetLocationProps {
	ip: PageServerData;
	autoDetect: boolean;
	state: string;
	country: string;
}

function getLocation({ state, country, autoDetect, ip }: GetLocationProps) {
	if (autoDetect && ip.isSuccessfull) {
		return {
			state: ip.data.region_code,
			country: ip.data.country_code
		};
	}

	return { state, country };
}

const TIME_REGEX = /^(?:\d{2})?(\d{2})-(\d{2})$/;
const ERR_RETURN = { type: 'error' as const };
const holiday = new Holiday();

export const load: PageLoad = async ({ url, data }) => {
	const dateStr = url.searchParams.get('date');

	const { state, country } = getLocation({
		ip: data,
		autoDetect: get(svocal('holidays.autoDetect')),
		state: get(svocal('holidays.state')),
		country: get(svocal('holidays.country'))
	});

	if (!dateStr) return ERR_RETURN;

	const match = dateStr.match(TIME_REGEX);
	if (match === null) return ERR_RETURN;

	const [_, year, month] = match;

	const startDate = new Date(parseInt(year) + 2_000, parseInt(month) - 1, 1);
	const nextMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
	const endDate = new Date(nextMonth.getTime() - 86400000);

	const [publicHolidays, schoolHolidays, subdivisions, countries] = await Promise.all([
		holiday.getPublicHolidays(country, startDate, endDate),
		holiday.getSchoolHolidays(country, startDate, endDate),
		holiday.getSubdivisions(country),
		holiday.getCountries()
	]);

	const allHolidays = [...publicHolidays, ...schoolHolidays].filter(
		({ nationwide, subdivisions }) => {
			if (nationwide) return true;

			return (subdivisions ?? []).some(({ shortName }) => shortName === state);
		}
	);

	return {
		startDate,
		endDate,
		location: {
			state,
			country,
			apiSubdivision: subdivisions.find(({ shortName }) => shortName === state),
			apiCountry: countries.find(({ isoCode }) => isoCode === country)
		},
		type: 'success' as const,
		holidays: allHolidays
	};
};
