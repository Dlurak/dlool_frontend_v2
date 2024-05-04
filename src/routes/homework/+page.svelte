<script lang="ts">
	import AssignmentGrid from '$lib/components/assignment/AssignmentGrid/AssignmentGrid.svelte';
	import LoadingCircle from '$lib/components/utils/LoadingCircle.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import type { PageData } from './$types';
	import Panes from '$lib/components/panes/Panes.svelte';
	import SideMenu from '$lib/components/assignment/SideMenu/SideMenu.svelte';

	export let data: PageData;
</script>

{#if data.data}
	{#await data.data}
		<LoadingCircle />
	{:then assignmentData}
		<div class="flex w-full max-w-[120rem]">
			<Panes minimum={200}>
				<div slot="a">
					<SideMenu query={data.query} />
				</div>

				<div slot="b">
					{#if assignmentData}
						<AssignmentGrid assignments={assignmentData.data.assignments} />
					{:else}
						<div class="flex items-center justify-center">
							<Store store={i('error')} />
						</div>
					{/if}
				</div>
			</Panes>
		</div>
	{:catch}
		<Store store={i('error')} />
	{/await}
{:else if data.message === 'no school/class provided'}
	<Store store={i('assignments.filter.needToSet')} />
{/if}
