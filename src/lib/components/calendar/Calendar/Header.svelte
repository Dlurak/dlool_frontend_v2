<script lang="ts">
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { createEventDispatcher } from 'svelte';
	import { ChevronLeft, ChevronRight } from 'svelte-hero-icons';

	export let displayMonth: Date;

	const dispatch = createEventDispatcher<{
		prev: null;
		next: null;
	}>();
</script>

<div class="flex w-full">
	<QuickAction
		icon={ChevronLeft}
		on:click={() => {
			dispatch('prev');
		}}
	/>

	<span class="w-full text-center">
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
		on:click={() => {
			dispatch('next');
		}}
	/>
</div>
