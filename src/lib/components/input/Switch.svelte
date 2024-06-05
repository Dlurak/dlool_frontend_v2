<!-- TODO: Use a native checkbox -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let checked = false;

	const dispatch = createEventDispatcher<{
		toggle: boolean;
		activate: boolean;
		inactivate: boolean;
	}>();
</script>

<button
	class="relative h-7 w-14 rounded-full p-1 transition-all"
	class:bg-emerald-600={checked}
	class:bg-zinc-300={!checked}
	class:dark:bg-zinc-500={!checked}
	on:click={() => {
		checked = !checked;

		dispatch('toggle', checked);
		dispatch(checked ? 'activate' : 'inactivate', checked);
	}}
>
	<div
		class="aspect-square h-full rounded-full bg-white shadow transition-all"
		class:translate-x-7={checked}
	/>
</button>
