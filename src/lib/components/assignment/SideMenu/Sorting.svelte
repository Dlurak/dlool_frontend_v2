<script lang="ts">
	import Chips from '$lib/components/filter/Chips.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import type { OrderKey, SortOrder } from '$lib/types/sorting';
	import { objectEntries } from '$lib/utils/objects/entries';
	import { createEventDispatcher } from 'svelte';
	import { ArrowDownRight, ArrowUpRight } from 'svelte-hero-icons';

	const ORDER_KEYS = [
		'due',
		'from',
		'subject',
		'description',
		'versionsCount'
	] as const satisfies OrderKey[];

	export let direction: SortOrder = 'desc';
	export let orderKey: OrderKey = 'due';

	const orderings = {
		asc: ArrowUpRight,
		desc: ArrowDownRight
	};

	const dispatch = createEventDispatcher<{
		change: {
			direction: SortOrder;
			orderKey: OrderKey;
		};
	}>();
</script>

<h3><Store store={i('sorting')} /></h3>
<div class="flex flex-wrap gap-2">
	<Chips
		bind:value={direction}
		options={objectEntries(orderings).map(([value, icon]) => ({
			icon,
			value,
			label: i(`sorting.${value}`)
		}))}
		on:change={({ detail: direction }) => dispatch('change', { direction, orderKey })}
	/>

	<Chips
		bind:value={orderKey}
		options={ORDER_KEYS.map((value) => ({
			value,
			label: i(`sorting.assignments.${value}`)
		}))}
		on:change={({ detail: orderKey }) => dispatch('change', { direction, orderKey })}
	/>
</div>
