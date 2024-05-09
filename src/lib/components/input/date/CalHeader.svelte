<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'svelte-hero-icons';
	import { createEventDispatcher } from 'svelte';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';

	export let displayMonth: Date;

	export let disableLeft = false;
	export let disableRight = false;

	const dispatch = createEventDispatcher<{
		prev: null;
		next: null;
	}>();
</script>

<div class="flex items-center justify-between gap-2">
	<QuickAction
		icon={ChevronLeft}
		disabled={disableLeft}
		on:click={() => {
			dispatch('prev');
		}}
	/>
	<span class="text-nowrap">
		<Store
			store={i(
				'calendar.month',
				{ year: `${displayMonth.getFullYear()}` },
				{ count: displayMonth.getMonth() }
			)}
		/>
	</span>
	<QuickAction
		icon={ChevronRight}
		disabled={disableRight}
		on:click={() => {
			dispatch('next');
		}}
	/>
</div>
