<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;
	export let color: 'default' | 'green' | 'yellow' | 'red' = 'default';

	const dispatch = createEventDispatcher();
</script>

<button
	{disabled}
	class="
		w-full rounded-md py-2 shadow-md
		transition-all hover:shadow-lg hover:brightness-110
		active:scale-95
		disabled:cursor-not-allowed disabled:opacity-50
	"
	class:bg-emerald-400={color === 'default'}
	class:bg-green-400={color === 'green'}
	class:bg-yellow-400={color === 'yellow'}
	class:bg-red-400={color === 'red'}
	class:dark:bg-emerald-500={color === 'default'}
	class:dark:bg-green-500={color === 'green'}
	class:dark:bg-yellow-500={color === 'yellow'}
	class:dark:bg-red-500={color === 'red'}
	on:click={() => dispatch('click')}
>
	<slot />
</button>
