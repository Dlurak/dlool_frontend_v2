<script lang="ts">
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { stringify } from '$lib/utils/dates/custom';
	import { Icon, Clock } from 'svelte-hero-icons';
	import Store from '../../utils/Store.svelte';
	import { i } from '$lib/i18n/store';

	export let assignment: Assignment;
</script>

<div
	class="flex flex-col gap-2 rounded px-2 py-1 outline outline-2 outline-zinc-300 dark:outline-zinc-700"
>
	<h3>{assignment.subject}</h3>

	<p>{assignment.description}</p>

	<div class="flex items-center gap-1 text-sm">
		<Icon src={Clock} class="h-4 w-4" micro />
		<Store
			store={i('assignments.assignment.date', {
				start: stringify(assignment.from),
				end: stringify(assignment.due)
			})}
		/>
	</div>
</div>
