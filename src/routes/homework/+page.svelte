<script lang="ts">
	import AssignmentGrid from '$lib/components/assignment/AssignmentGrid/AssignmentGrid.svelte';
	import LoadingCircle from '$lib/components/utils/LoadingCircle.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import type { PageData } from './$types';
	import Panes from '$lib/components/panes/Panes.svelte';
	import SideMenu from '$lib/components/assignment/SideMenu/SideMenu.svelte';
	import { goto } from '$app/navigation';
	import { objToQueryParams } from '$lib/utils/url/query';

	export let data: PageData;
</script>

<Panes minimum={200}>
	<div slot="a">
		<SideMenu
			query={data.query ?? {
				school: null,
				classes: []
			}}
			on:filterApply={({ detail }) => goto(`?${objToQueryParams(detail)}`)}
		/>
	</div>

	<div slot="b" class="flex w-full items-center justify-center">
		{#if data.data}
			{#await data.data}
				<LoadingCircle />
			{:then assignmentData}
				{#if assignmentData}
					<div class="h-full w-full">
						<AssignmentGrid assignments={assignmentData.data.assignments} />
					</div>
				{:else}
					<div class="flex items-center justify-center">
						<Store store={i('error')} />
					</div>
				{/if}
			{:catch}
				<Store store={i('error')} />
			{/await}
		{:else if data.message === 'no school/class provided'}
			<Store store={i('assignments.filter.needToSet')} />
		{/if}
	</div>
</Panes>
