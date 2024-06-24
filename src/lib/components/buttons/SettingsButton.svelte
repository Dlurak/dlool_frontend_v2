<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let disabled = false;
	export let icon: IconSource | null = null;

	export let color: 'green' | 'red' | 'orange' | 'blue' = 'green';
</script>

<button
	{disabled}
	class="
		flex items-center justify-center gap-1 rounded px-3 py-1
		disabled:cursor-not-allowed disabled:opacity-60
	"
	class:bg-emerald-400={color === 'green'}
	class:dark:bg-emerald-600={color === 'green'}
	class:bg-red-500={color === 'red'}
	class:bg-orange-500={color === 'orange'}
	class:bg-blue-400={color === 'blue'}
	class:dark:bg-blue-600={color === 'blue'}
	on:click
>
	{#if icon}
		<Icon src={icon} class="h-6 w-6" />
	{/if}

	<slot />
</button>
