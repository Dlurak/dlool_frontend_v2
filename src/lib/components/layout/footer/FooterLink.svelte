<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { Readable } from 'svelte/store';
	import { Icon, type IconSource } from 'svelte-hero-icons';

	export let action: () => void;
	export let name: Readable<string>;
	export let icon: IconSource | null = null;
</script>

<button
	on:click={action}
	class="
		relative flex w-full justify-center gap-2 py-2
		after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black
		after:transition-[width] hover:after:w-full after:dark:bg-white
	"
>
	{#if icon}
		<Icon src={icon} class="h-6 w-6" mini />
	{/if}
	<Store store={name} />
</button>
