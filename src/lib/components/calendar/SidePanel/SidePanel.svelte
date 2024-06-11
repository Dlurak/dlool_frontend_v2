<script lang="ts">
	import { goto } from '$app/navigation';
	import Filter from '$lib/components/filter/SchoolAndClass.svelte';
	import PageSelector from '$lib/components/pageSelector/DefaultLimitOffsetSelector.svelte';
	import { wrapWithPromise } from '$lib/utils/promises';
	import { useAuth } from '$lib/utils/store/auth';
	import { objToQueryParams } from '$lib/utils/url/query';
	import { writable } from 'svelte/store';
	import New from './New.svelte';

	export let query: {
		school: string | null;
		classes: string[];
		limit: number;
		offset: number;
	};
	const queryStore = writable(query);
	export let totalCount: undefined | Promise<number>;

	$: queryStore.set(query);

	const { isInClass, isLoggedIn } = useAuth({ query: queryStore });
</script>

<div class="flex flex-col gap-4">
	<Filter on:change {query} />

	{#if $isInClass && $isLoggedIn && query.school}
		<New
			query={{
				school: query.school,
				classes: query.classes
			}}
		/>
	{/if}
	{#await wrapWithPromise(totalCount) then tc}
		{#if tc && tc > query.limit}
			<PageSelector
				totalAmount={tc}
				query={{
					limit: query.limit,
					offset: query.offset
				}}
				on:pageChage={({ detail }) => {
					goto(`?${objToQueryParams({ ...query, ...detail })}`);
				}}
			/>
		{/if}
	{/await}
</div>
