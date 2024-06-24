<svelte:options accessors />

<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { Icon } from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';
	import type { IconSource } from 'svelte-hero-icons';

	export let label: Readable<string>;
	export let icon: IconSource;
</script>

<div
	class="
	flex flex-col items-center gap-2 rounded-sm bg-zinc-200 bg-opacity-50 px-2 py-2 shadow outline outline-1 outline-zinc-300 backdrop-blur-md
	dark:bg-zinc-700 dark:bg-opacity-50 dark:outline-zinc-600
	"
>
	<Icon src={icon} class="h-10 w-10" solid />

	<Store store={label} />
</div>
