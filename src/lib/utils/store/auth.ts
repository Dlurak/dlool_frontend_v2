import { derived, readable, type Readable } from 'svelte/store';
import { svocal } from './svocal';
import { currentMs } from '../dates/current';

interface AuthProps {
	query?: Readable<{
		school: string | null;
		classes: string[];
	}>;
}

export const useAuth = (props: AuthProps = {}) => {
	const tokenExpires = svocal('auth.access.expires');
	const userDetails = svocal('dlool.ownUserDetails');
	const generatedByLogin = derived(svocal('auth.access.generatedBy'), (gb) => gb === 'login');

	return {
		userDetails: { subscribe: userDetails.subscribe },
		isInClass: derived(
			[userDetails, props.query ?? readable({ school: null, classes: [] })],
			([$ud, $query]) => {
				const matches = $ud?.classes.some(({ school, name }) => {
					const schoolMatches = $query?.school === school.name;
					const classMatches = $query?.classes.includes(name);

					return schoolMatches && classMatches;
				});

				return matches ?? false;
			}
		),
		isLoggedIn: derived(tokenExpires, ($tokenExpires) => {
			return $tokenExpires !== null && $tokenExpires > currentMs();
		}),
		generatedByLogin
	};
};
