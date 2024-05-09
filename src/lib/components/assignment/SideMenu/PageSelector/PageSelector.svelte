<script lang="ts">
	import {
		ChevronLeft,
		ChevronDoubleLeft,
		ChevronRight,
		ChevronDoubleRight
	} from 'svelte-hero-icons';
	import PageButton from './PageButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';

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

<div class="grid grid-cols-2 gap-1 overflow-hidden rounded-md">
	<PageButton
		icon={ChevronLeft}
		disabled={currentPage === 0}
		on:click={() => {
			dispatch('pageChage', {
				limit: Math.max(query.limit, 1),
				offset: Math.max(query.offset - query.limit, 0)
			});
		}}
	/>
	<PageButton
		icon={ChevronRight}
		disabled={currentPage + 1 >= pageCount}
		on:click={() => {
			dispatch('pageChage', {
				limit: Math.max(query.limit, 1),
				offset: Math.min(query.offset + query.limit, totalAmount - 1)
			});
		}}
	/>

	<PageButton
		icon={ChevronDoubleLeft}
		disabled={currentPage === 0}
		on:click={() => {
			dispatch('pageChage', {
				limit: Math.max(query.limit, 1),
				offset: 0
			});
		}}
	/>
	<PageButton
		icon={ChevronDoubleRight}
		disabled={currentPage + 1 >= pageCount}
		on:click={() => {
			dispatch('pageChage', {
				limit: Math.max(query.limit, 1),
				offset: Math.max(totalAmount - query.limit, 0)
			});
		}}
	/>

	<div class="col-span-2 flex justify-center">
		<Store
			store={i('assignments.pages.currently', {
				current: `${currentPage + 1}`,
				total: `${pageCount}`
			})}
		/>
	</div>
</div>
