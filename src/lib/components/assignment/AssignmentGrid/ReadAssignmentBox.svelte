<script lang="ts">
	import type { Assignment } from '$lib/dlool/assignments/list';
	import { stringify } from '$lib/utils/dates/custom';
	import { Icon, Clock } from 'svelte-hero-icons';
	import Store from '../../utils/Store.svelte';
	import { i } from '$lib/i18n/store';

	export let assignment: Assignment;
</script>

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
