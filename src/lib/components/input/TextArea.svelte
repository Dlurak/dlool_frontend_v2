<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';
	import Frame from './Frame.svelte';
	import { createEventDispatcher } from 'svelte';

	export let placeholder: Readable<string>;
	export let icon: IconSource | null = null;

	export let value: string = '';

	export let isValid: boolean | null = null;
	export let rows = 2;

	const dispatch = createEventDispatcher<{
		input: string;
	}>();
</script>

<Frame>
	{#if icon}
		<div class="flex items-center px-2">
			<Icon src={icon} class="h-6 w-6" mini solid />
		</div>
	{/if}

	<textarea
		bind:value
		{rows}
		placeholder={$placeholder}
		class="w-full resize-none bg-transparent focus:outline-none"
		on:input={({ currentTarget }) => {
			dispatch('input', currentTarget.value);
		}}
	/>

	{#if isValid !== null}
		<div class="flex h-full items-center px-2">
			<div class="h-2 w-2 rounded-full" class:bg-red-500={!isValid} class:bg-green-500={isValid} />
		</div>
	{/if}
</Frame>
