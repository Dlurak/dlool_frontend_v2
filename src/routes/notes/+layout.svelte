<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import NoteBox from '$lib/components/notes/NoteBox.svelte';
	import Panes from '$lib/components/panes/Panes.svelte';
	import { mediaQuery } from 'nutzlich';
	import { derived } from 'svelte/store';
	import LoadingCircle from '$lib/components/utils/LoadingCircle.svelte';
	import Filter from '$lib/components/notes/Filter.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { objToQueryParams } from '$lib/utils/url/query';
	import { sendToast } from '$lib/components/layout/toasts';
	import { i } from '$lib/i18n/store';
	import PageSelector from '$lib/components/pageSelector/DefaultLimitOffsetSelector.svelte';

	const isRootPage = derived(page, ($page) => $page.route.id === '/notes');
	const isSmall = mediaQuery('(max-width: 768px)');

	export let data: LayoutData;
</script>

<Panes>
	<div slot="a" class="flex flex-col gap-4">
		<Filter
			query={data.query ?? {
				school: null,
				classes: []
			}}
			on:change={({ detail }) => {
				goto(`?${objToQueryParams(detail)}`)
					.then(invalidateAll)
					.then(() => {
						sendToast({
							type: 'success',
							content: i('toast.filter.applied'),
							timeout: 5_000
						});
					});
			}}
		/>

		{#if data.data}
			{#await data.data}
				<LoadingCircle />
			{:then notes}
				{@const totalAmount = notes.data.totalCount}
				{#each notes.data.notes as note}
					<NoteBox {note} on:delete={invalidateAll} />
				{/each}

				{#if totalAmount > data.query.limit}
					<hr class="border-zinc-300 dark:border-zinc-700" />

					<PageSelector
						{totalAmount}
						query={data.query}
						on:pageChage={({ detail }) => {
							goto(`?${objToQueryParams({ ...data.query, ...detail })}`);
						}}
					/>
				{/if}
			{/await}
		{/if}
	</div>

	<div slot="b" class="h-full w-full">
		{#if !($isSmall && $isRootPage)}
			<slot />
		{/if}
	</div>
</Panes>
