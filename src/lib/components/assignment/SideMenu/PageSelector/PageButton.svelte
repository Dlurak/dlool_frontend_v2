<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let icon: IconSource;
	export let disabled = false;
</script>

<button
	on:click
	{disabled}
	class="
		flex items-center justify-center rounded-sm bg-zinc-200 py-1 hover:bg-zinc-300 focus-visible:bg-zinc-300
		disabled:opacity-50
		dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus-visible:bg-zinc-700
	"
>
	<Icon src={icon} class="h-6 w-6" />
</button>
