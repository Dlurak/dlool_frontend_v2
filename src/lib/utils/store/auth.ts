import { derived } from 'svelte/store';
import { svocal } from './svocal';
import { currentMs } from '../dates/current';

interface AuthProps {
	query?: {
		school: string | null;
		classes: string[];
	};
}

export const useAuth = (props: AuthProps = {}) => {
	const tokenExpires = svocal('auth.access.expires');
	const userDetails = svocal('dlool.ownUserDetails');

	return {
		userDetails,
		isInClass: derived(userDetails, ($ud) => {
			const matches = $ud?.classes.some(({ school, name }) => {
				const schoolMatches = props.query?.school === school.name;
				const classMatches = props.query?.classes.includes(name);

				return schoolMatches && classMatches;
			});

			return matches ?? false;
		}),
		isLoggedIn: derived(tokenExpires, ($tokenExpires) => {
			return $tokenExpires !== null && $tokenExpires > currentMs();
		})
	};
};
