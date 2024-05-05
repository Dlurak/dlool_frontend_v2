import { get } from 'svelte/store';
import { svocal } from '../store/svocal';

interface IsUserInClassProps {
	class: string;
	school: string;
}

export const isUserInClass = (props: IsUserInClassProps) => {
	const userDetails = get(svocal('dlool.ownUserDetails'))?.classes?.map(({ name, school }) => ({
		name,
		school: school.name
	}));

	if (!userDetails) return false;

	return userDetails.some(({ name, school }) => {
		const classMatches = name === props.class;
		const schoolMatches = school === props.school;

		return classMatches && schoolMatches;
	});
};
