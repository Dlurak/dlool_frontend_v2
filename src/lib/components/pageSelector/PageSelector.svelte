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

	export let pageCount: number;
	export let currentPage: number;

	export let leftIsDisabled = false;
	export let rightIsDisabled = false;

	const dispatch = createEventDispatcher<{
		prev: null;
		first: null;
		next: null;
		last: null;
	}>();
</script>

<div class="grid grid-cols-2 gap-1 overflow-hidden rounded-md">
	<PageButton
		icon={ChevronLeft}
		disabled={leftIsDisabled}
		on:click={() => {
			dispatch('prev');
		}}
	/>
	<PageButton
		icon={ChevronRight}
		disabled={rightIsDisabled}
		on:click={() => {
			dispatch('next');
		}}
	/>

	<PageButton
		icon={ChevronDoubleLeft}
		disabled={leftIsDisabled}
		on:click={() => {
			dispatch('first');
		}}
	/>
	<PageButton
		icon={ChevronDoubleRight}
		disabled={rightIsDisabled}
		on:click={() => {
			dispatch('last');
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
