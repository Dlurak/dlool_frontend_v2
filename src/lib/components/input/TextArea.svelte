<script lang="ts">
	import { type IconSource } from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';
	import Frame from './Frame.svelte';
	import Line from './Area/Line.svelte';
	import Inner from './Area/Inner.svelte';
	import Markdown from '../markdown/Markdown.svelte';

	export let placeholder: Readable<string>;
	export let icon: IconSource | null = null;

	export let markdown = false;

	export let value: string = '';

	export let isValid: boolean | null = null;
	export let rows = 2;

	let viewMode: 'edit' | 'preview' = 'edit';
</script>

<Frame>
	<div class="flex w-full flex-col items-stretch gap-2">
		{#if markdown}
			<Line bind:viewMode />
		{/if}

		<hr class="h-1 w-full border-zinc-300 dark:border-zinc-700" />

		{#if viewMode === 'edit'}
			<Inner {placeholder} {icon} {isValid} {rows} bind:value on:input />
		{:else if viewMode === 'preview'}
			<Markdown markdown={value} />
		{/if}
	</div>
</Frame>
