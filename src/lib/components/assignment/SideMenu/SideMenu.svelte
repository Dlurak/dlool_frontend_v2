<script lang="ts">
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import Filter from './Filter.svelte';

	export let query: {
		school: string | null;
		classes: string[];
	};

	const { isLoggedIn } = useAuth();
	const userDetails = svocal('dlool.ownUserDetails');

	$: isInClass =
		$userDetails?.classes.some(({ school, name }) => {
			const schoolMatches = query.school === school.name;
			const classMatches = query.classes.includes(name);

			return schoolMatches && classMatches;
		}) ?? false;
</script>

<div>
	<Filter {query} on:filterApply />
</div>

{#if isInClass && $isLoggedIn}
	<div>
		<h3>Create a new assignment</h3>
	</div>
{/if}
