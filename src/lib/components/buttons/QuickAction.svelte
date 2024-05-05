<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let icon: IconSource;
	export let small = false;
</script>

<button
	on:click
	class="
		rounded p-1
		hover:bg-zinc-200 focus:bg-zinc-200
		dark:hover:bg-zinc-800 dark:focus:bg-zinc-800
	"
	{...$$restProps}
>
	<Icon src={icon} mini={!small} micro={small} class={small ? 'h-5 w-5' : 'h-7 w-7'} />
</button>
