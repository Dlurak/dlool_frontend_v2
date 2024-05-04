<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { i } from '$lib/i18n/store';
	import AssignmentBox from './AssignmentBox.svelte';

	export let assignments: Assignment[];
</script>

{#if assignments.length}
	<div class="grid w-full grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4">
		{#each assignments as assignment}
			<AssignmentBox {assignment} />
		{/each}
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<Store store={i('assignments.noData')} />
	</div>
{/if}
