<script lang="ts">
	import type { Assignment } from '$lib/dlool/assignments/list';
	import AssignmentBox from './AssignmentBox.svelte';

	export let assignments: Assignment[];
</script>

<div class="grid w-full grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4">
	{#each assignments as assignment}
		<AssignmentBox {assignment} />
	{/each}
</div>
