<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;
	export let color: 'default' | 'green' | 'yellow' | 'red' = 'default';

	const dispatch = createEventDispatcher();
</script>

<button
	{disabled}
	class="
		w-full rounded-md py-1 text-white shadow-lg transition-all
		hover:scale-105 hover:shadow-2xl
		focus-visible:scale-105 focus-visible:shadow-2xl
		active:scale-95
		disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none
		disabled:hover:scale-105 disabled:hover:shadow-2xl
	"
	class:bg-emerald-500={color === 'default'}
	class:bg-green-500={color === 'green'}
	class:bg-yellow-500={color === 'yellow'}
	class:bg-red-500={color === 'red'}
	on:click={() => dispatch('click')}
>
	<slot />
</button>
