<script lang="ts">
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import CreateAssignment from './CreateAssignment.svelte';
	import Filter from './Filter.svelte';

	export let query: {
		school: string | null;
		classes: string[];
	};

	let createEle: CreateAssignment | null = null;
	export const postCreate = (b: boolean) => createEle?.postCreate(b);

	const { isLoggedIn } = useAuth();
	const userDetails = svocal('dlool.ownUserDetails');

	$: isInClass =
		$userDetails?.classes.some(({ school, name }) => {
			const schoolMatches = query.school === school.name;
			const classMatches = query.classes.includes(name);

			return schoolMatches && classMatches;
		}) ?? false;
</script>

<div class="flex flex-col gap-4">
	<div>
		<Filter {query} on:filterApply />
	</div>

	<hr class="border-zinc-300 dark:border-zinc-700" />

	{#if isInClass && $isLoggedIn && query.school}
		<CreateAssignment
			bind:this={createEle}
			school={query.school}
			allowedClasses={query.classes}
			on:submit
		/>
	{/if}
</div>
