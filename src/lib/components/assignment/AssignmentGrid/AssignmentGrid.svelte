<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import { derived } from 'svelte/store';
	import AssignmentBox from './AssignmentBox.svelte';

	export let assignments: Assignment[];
	export let overdueAssignments: Assignment[];
	export let school: string;

	const transparency = svocal('settings.homework.transparency');
	const showOverdue = derived(transparency, (t) => t > 0);
</script>

{#if assignments.length || overdueAssignments.length}
	<div class="flex w-full flex-col gap-4">
		{#if assignments.length}
			<h2>
				<Store store={i('assignments.upcoming')} />
			</h2>

			<div
				class="grid w-full grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4 empty:hidden"
			>
				{#each assignments as assignment}
					<AssignmentBox {assignment} {school} on:delete on:update />
				{/each}
			</div>
		{/if}

		{#if $showOverdue && overdueAssignments.length}
			<h2>
				<Store store={i('assignments.overdue')} />
			</h2>

			<div
				class="grid w-full grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4 empty:hidden"
			>
				{#each overdueAssignments as assignment}
					<AssignmentBox {assignment} {school} on:delete on:update overdue />
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<Store store={i('assignments.noData')} />
	</div>
{/if}
