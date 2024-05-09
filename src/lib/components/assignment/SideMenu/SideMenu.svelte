<script lang="ts">
	import type { CustomDate } from '$lib/utils/dates/custom';
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import CreateAssignment from './CreateAssignment.svelte';
	import Filter from './Filter/Filter.svelte';
	import PageSelector from './PageSelector/PageSelector.svelte';

	export let query: {
		school: string | null;
		classes: string[];

		limit: number;
		offset: number;

		dueStart: CustomDate | null;
		dueEnd: CustomDate | null;

		fromStart: CustomDate | null;
		fromEnd: CustomDate | null;
	};

	export let totalAmount: Promise<number | undefined> | undefined;

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

	{#if isInClass && $isLoggedIn && query.school}
		<hr class="border-zinc-300 dark:border-zinc-700" />
		<CreateAssignment
			bind:this={createEle}
			school={query.school}
			allowedClasses={query.classes}
			on:submit
		/>
	{/if}

	{#if totalAmount}
		{#await totalAmount then totalAmountNum}
			{#if totalAmountNum && totalAmountNum > query.limit}
				<hr class="border-zinc-300 dark:border-zinc-700" />
				<PageSelector {query} totalAmount={totalAmountNum} on:pageChage />
			{/if}
		{/await}
	{/if}
</div>
