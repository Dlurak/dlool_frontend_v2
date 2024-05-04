<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let icon: IconSource;
</script>

<button
	on:click
	class="
		rounded p-1
		hover:bg-zinc-200 focus:bg-zinc-200
		dark:hover:bg-zinc-800 dark:focus:bg-zinc-800
	"
>
	<Icon src={icon} mini class="h-7 w-7" />
</button>
