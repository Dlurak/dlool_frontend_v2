<script lang="ts" generics="V">
	import type { Readable } from 'svelte/store';
	import NotTyppable from '../select/NotTyppable.svelte';
	import Store from '../utils/Store.svelte';

	export let label: Readable<string>;
	// eslint-disable-next-line no-undef
	export let value: V;
	export let options: {
		label: Readable<string>;
		// eslint-disable-next-line no-undef
		value: V;
	}[];
</script>

<div class="flex flex-col items-center justify-between gap-2 sm:flex-row">
	<span class="w-full"><Store store={label} /></span>

	<NotTyppable {options} bind:value />
</div>
