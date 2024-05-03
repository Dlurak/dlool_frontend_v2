<script lang="ts">
	import AssignmentBox from '$lib/components/assignment/AssignmentBox.svelte';
	import LoadingCircle from '$lib/components/utils/LoadingCircle.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.data}
	{#await data.data}
		<LoadingCircle />
	{:then data}
		<div class="grid w-full grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4">
			{#each data.data.assignments as assignment}
				<AssignmentBox {assignment} />
			{/each}
		</div>
	{:catch}
		<Store store={i('error')} />
	{/await}
{:else if data.message === 'no school/class provided'}
	<Store store={i('assignments.filter.needToSet')} />
{/if}
