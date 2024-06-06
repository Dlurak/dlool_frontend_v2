<script lang="ts">
	import type { Readable } from 'svelte/store';

	export let title: Readable<string> | null = null;
</script>

<svelte:head>
	{#if title}
		<title>{$title} | Dlool</title>
	{:else}
		<title>Dlool</title>
	{/if}
</svelte:head>
