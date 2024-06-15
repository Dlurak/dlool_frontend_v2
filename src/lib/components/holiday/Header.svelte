<script context="module" lang="ts">
	function addMonths(summand: number, startDate: Date) {
		return new Date(startDate.getFullYear(), startDate.getMonth() + summand, startDate.getDate());
	}
</script>

<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'svelte-hero-icons';
	import QuickAction from '../buttons/QuickAction.svelte';
	import Store from '../utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { createEventDispatcher } from 'svelte';

	export let date: Date;

	const dispatch = createEventDispatcher<{
		change: {
			year: string;
			month: string;
		};
	}>();

	async function gotoDate(date: Date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const monthStr = month.toString().padStart(2, '0');

		dispatch('change', {
			year: `${year}`,
			month: monthStr
		});
	}
</script>

<div class="flex w-full justify-evenly">
	<QuickAction
		icon={ChevronLeft}
		on:click={() => {
			gotoDate(addMonths(-1, date));
		}}
	/>

	<h3>
		<Store
			store={i('calendar.month', { year: `${date.getFullYear()}` }, { count: date.getMonth() })}
		/>
	</h3>

	<QuickAction
		icon={ChevronRight}
		on:click={() => {
			gotoDate(addMonths(1, date));
		}}
	/>
</div>
