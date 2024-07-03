<script lang="ts">
	import type { CustomDate } from '$lib/utils/dates/custom';
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import CreateAssignment from './CreateAssignment.svelte';
	import Filter from './Filter/Filter.svelte';
	import PageSelector from '$lib/components/pageSelector/DefaultLimitOffsetSelector.svelte';
	import Sorting from './Sorting.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { SortOrder, OrderKey } from '$lib/types/sorting';

	let direction: SortOrder = 'desc';
	let orderKey: OrderKey = 'due';

	type FilterQuery = {
		direction: SortOrder;
		orderKey: OrderKey;
	};

	type Query = {
		school: string | null;
		classes: string[];

		limit: number;
		offset: number;

		dueStart: CustomDate | null;
		dueEnd: CustomDate | null;

		fromStart: CustomDate | null;
		fromEnd: CustomDate | null;
	};

	export let query: Query;

	export let totalAmount: Promise<number | undefined> | undefined;

	const { isLoggedIn } = useAuth();
	const userDetails = svocal('dlool.ownUserDetails');

	const dispatch = createEventDispatcher<{
		change: Query & FilterQuery;
	}>();

	$: isInClass =
		$userDetails?.classes.some(({ school, name }) => {
			const schoolMatches = query.school === school.name;
			const classMatches = query.classes.includes(name);

			return schoolMatches && classMatches;
		}) ?? false;
</script>

<div class="flex flex-col gap-4">
	<Sorting
		bind:direction
		bind:orderKey
		on:change={({ detail }) => dispatch('change', { ...query, ...detail })}
	/>
	<div>
		<Filter
			bind:query
			on:filterApply={({ detail }) =>
				dispatch('change', {
					...detail,
					direction,
					orderKey,
					limit: query.limit,
					offset: query.offset
				})}
		/>
	</div>

	{#if isInClass && $isLoggedIn && query.school}
		<hr class="border-zinc-300 dark:border-zinc-700" />
		<CreateAssignment school={query.school} allowedClasses={query.classes} on:submit />
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
