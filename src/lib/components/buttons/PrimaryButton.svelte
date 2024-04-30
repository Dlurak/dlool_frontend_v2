<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<button
	class="
		w-full rounded-md bg-emerald-500 py-1 text-white shadow-lg transition-all
		hover:scale-105 hover:shadow-2xl
		focus-visible:scale-105 focus-visible:shadow-2xl
		active:scale-95
		disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none
		disabled:hover:scale-105 disabled:hover:shadow-2xl
	"
	{disabled}
	on:click={() => dispatch('click')}
>
	<slot />
</button>
