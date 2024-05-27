<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: unknown;
	export let active: unknown;

	const dispatch = createEventDispatcher<{
		activate: null;
	}>();
</script>

<button
	on:click={() => {
		active = value;
		dispatch('activate', null);
	}}
	class=" w-full rounded-sm py-1 text-center text-xl hover:bg-black hover:bg-opacity-20"
	class:border-b-2={value === active}
>
	<slot />
</button>
