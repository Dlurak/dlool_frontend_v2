<script lang="ts" generics="V">
	import type { Readable } from 'svelte/store';
	import NotTyppable from '../select/NotTyppable.svelte';
	import Store from '../utils/Store.svelte';
	import Select from '../select/Select.svelte';

	export let label: Readable<string>;
	// eslint-disable-next-line no-undef
	export let value: V;
	export let options: {
		label: Readable<string>;
		// eslint-disable-next-line no-undef
		value: V;
	}[];

	export let typpable = false;
</script>

<div class="flex flex-col items-center justify-between gap-2 sm:flex-row">
	<span class="w-full"><Store store={label} /></span>

	{#if typpable}
		<Select {options} placeholder={label} bind:firstValue={value} on:change />
	{:else}
		<NotTyppable {options} bind:value on:change />
	{/if}
</div>
