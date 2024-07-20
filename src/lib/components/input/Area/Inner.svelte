<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon, type IconSource } from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';

	export let placeholder: Readable<string>;
	export let icon: IconSource | null = null;

	export let value: string = '';

	export let isValid: boolean | null = null;
	export let rows = 2;

	export let ele: HTMLTextAreaElement | undefined;

	const dispatch = createEventDispatcher<{
		input: string;
	}>();
</script>

<div class="flex w-full items-stretch gap-2">
	{#if icon}
		<div class="flex items-center px-2">
			<Icon src={icon} class="h-6 w-6" mini solid />
		</div>
	{/if}

	<textarea
		{rows}
		bind:this={ele}
		bind:value
		placeholder={$placeholder}
		class="w-full resize-y bg-transparent focus:outline-none"
		on:input={({ currentTarget }) => {
			dispatch('input', currentTarget.value);
		}}
	/>

	{#if isValid !== null}
		<div class="flex flex-col items-center justify-evenly gap-2 px-2">
			<slot name="pre-validator" />
			<div class="h-2 w-2 rounded-full" class:bg-red-500={!isValid} class:bg-green-500={isValid} />
			<slot name="post-validator" />
		</div>
	{/if}
</div>
