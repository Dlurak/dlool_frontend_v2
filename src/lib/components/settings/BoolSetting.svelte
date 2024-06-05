<script lang="ts">
	import type { Readable } from 'svelte/store';
	import Switch from '../input/Switch.svelte';
	import Store from '../utils/Store.svelte';

	export let label: Readable<string>;
	export let value: boolean;
</script>

<div class="flex items-center justify-between gap-2">
	<span>
		<Store store={label} />
	</span>

	<Switch bind:checked={value} />
</div>
