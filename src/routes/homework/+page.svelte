<script lang="ts">
	import AssignmentGrid from '$lib/components/assignment/AssignmentGrid/AssignmentGrid.svelte';
	import LoadingCircle from '$lib/components/utils/LoadingCircle.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { useAuth } from '$lib/utils/store/auth';
	import type { PageData } from './$types';
	import Panes from '$lib/components/panes/Panes.svelte';

	export let data: PageData;

	const { isLoggedIn } = useAuth();
</script>

{#if data.data}
	{#await data.data}
		<LoadingCircle />
	{:then data}
		<div class="flex w-full max-w-[120rem]">
			<Panes minimum={200}>
				<div slot="a">
					<div>
						<h3>Filters</h3>
					</div>
					{#if $isLoggedIn}
						<div>
							<h3>Create a new assignment</h3>
						</div>
					{/if}
				</div>

				<div slot="b">
					<AssignmentGrid assignments={data.data.assignments} />
				</div>
			</Panes>
		</div>
	{:catch}
		<Store store={i('error')} />
	{/await}
{:else if data.message === 'no school/class provided'}
	<Store store={i('assignments.filter.needToSet')} />
{/if}
