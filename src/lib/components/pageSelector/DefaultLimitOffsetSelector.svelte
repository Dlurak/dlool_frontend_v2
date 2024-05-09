<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PageSelector from '$lib/components/pageSelector/PageSelector.svelte';

	type Query = {
		limit: number;
		offset: number;
	};

	export let query: Query;

	export let totalAmount: number;

	const dispatch = createEventDispatcher<{
		pageChage: Query;
	}>();

	$: pageCount = Math.ceil(totalAmount / query.limit);
	$: currentPage = Math.round(query.offset / query.limit);
</script>

<PageSelector
	{currentPage}
	{pageCount}
	leftIsDisabled={currentPage === 0}
	rightIsDisabled={currentPage + 1 >= pageCount}
	on:prev={() => {
		dispatch('pageChage', {
			limit: Math.max(query.limit, 1),
			offset: Math.max(query.offset - query.limit, 0)
		});
	}}
	on:next={() => {
		dispatch('pageChage', {
			limit: Math.max(query.limit, 1),
			offset: Math.min(query.offset + query.limit, totalAmount - 1)
		});
	}}
	on:first={() => {
		dispatch('pageChage', {
			limit: Math.max(query.limit, 1),
			offset: 0
		});
	}}
	on:last={() => {
		dispatch('pageChage', {
			limit: Math.max(query.limit, 1),
			offset: Math.max(totalAmount - query.limit, 0)
		});
	}}
/>
