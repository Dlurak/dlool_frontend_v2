<script lang="ts">
	import type { Readable } from 'svelte/store';
	import Store from '../utils/Store.svelte';
	import { self } from '$lib/utils/utils';

	export let label: Readable<string>;
	export let value: number;

	export let min = 0;
	export let max = 100;
	export let step = 1;

	export let valueFmt: (val: number) => string | number = self;
</script>

<div class="flex items-center justify-between gap-2">
	<span>
		<Store store={label} />
	</span>

	<span class="flex items-center gap-2">
		<input
			{min}
			{max}
			{step}
			bind:value
			type="range"
			class="bg-emerald-400 dark:bg-emerald-600 my-4 h-1 cursor-pointer appearance-none rounded-md"
		/>

		<span>{valueFmt(value)}</span>
	</span>
</div>
