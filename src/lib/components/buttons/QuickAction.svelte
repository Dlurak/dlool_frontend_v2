<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let icon: IconSource;
	export let small = false;
	export let disabled = false;

	export let color: null | 'red' | 'blue' | 'indigo' = null;
</script>

<button
	on:click
	{disabled}
	class="
		rounded p-1
		hover:bg-zinc-200 focus:bg-zinc-200
		disabled:opacity-30
		dark:hover:bg-zinc-800 dark:focus:bg-zinc-800
	"
	class:text-red-500={color === 'red'}
	class:text-blue-500={color === 'blue'}
	class:text-indigo-500={color === 'indigo'}
>
	<Icon src={icon} mini={!small} micro={small} class={`${small ? 'h-5 w-5' : 'h-7 w-7'}`} />
</button>
