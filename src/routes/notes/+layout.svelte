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
	import New from '$lib/components/notes/New.svelte';
	import { useAuth } from '$lib/utils/store/auth';
	import { svocal } from '$lib/utils/store/svocal';
	import Store from '$lib/components/utils/Store.svelte';
	import { Icon, ArrowLeft } from 'svelte-hero-icons';

	const isRootPage = derived(page, ($page) => $page.route.id === '/notes');
	const isSmall = mediaQuery('(max-width: 768px)');

	export let data: LayoutData;

	const { isLoggedIn } = useAuth();
	const userDetails = svocal('dlool.ownUserDetails');

	$: isInClass =
		$userDetails?.classes.some(({ school, name }) => {
			const schoolMatches = data.query?.school === school.name;
			const classMatches = data.query?.classes.includes(name);

			return schoolMatches && classMatches;
		}) ?? false;
</script>

<Panes>
	<div slot="a" class="flex flex-col gap-4">
		{#if !$isSmall || $isRootPage}
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

			{#if isInClass && $isLoggedIn && data.query?.school}
				<New
					query={{
						school: data.query.school,
						classes: data.query.classes
					}}
					on:create={() => {
						invalidateAll();
					}}
				/>
			{/if}

			{#if data.data}
				{#await data.data}
					<LoadingCircle />
				{:then notes}
					{@const totalAmount = notes.data.totalCount}
					{#each notes.data.notes as note}
						<NoteBox {note} on:delete={invalidateAll} />
					{:else}
						<span class="w-full text-center"><Store store={i('note.noData')} /></span>
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
		{/if}
	</div>

	<div slot="b" class="h-full w-full">
		{#if $isSmall && !$isRootPage}
			<div>
				<a href={`/notes${$page.url.search}`}>
					<Icon src={ArrowLeft} mini class="h-6 w-6 text-black dark:text-white" />
				</a>
			</div>
		{/if}
		{#if !($isSmall && $isRootPage)}
			<slot />
		{/if}
	</div>
</Panes>
