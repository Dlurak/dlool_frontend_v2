<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';
	import Frame from './Frame.svelte';

	export let placeholder: Readable<string>;
	export let icon: IconSource | null = null;

	export let value: string = '';

	export let isValid: boolean | null = null;
</script>

<Frame>
	{#if icon}
		<Icon src={icon} class="h-6 w-6" mini solid />
	{/if}

	<input
		type="text"
		class="w-full bg-transparent focus:outline-none"
		placeholder={$placeholder}
		on:input
		on:focus
		on:blur
		bind:value
	/>

	{#if isValid !== null}
		<div class="flex h-full items-center px-2">
			<div class="h-2 w-2 rounded-full" class:bg-red-500={!isValid} class:bg-green-500={isValid} />
		</div>
	{/if}
</Frame>
