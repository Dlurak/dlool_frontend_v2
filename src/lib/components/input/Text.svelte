<script lang="ts">
	import { Icon, type IconSource } from 'svelte-hero-icons';
	import type { Readable } from 'svelte/store';
	import Frame from './Frame.svelte';
	import { createEventDispatcher } from 'svelte';
	import { randomStr } from '$lib/utils/random';

	export let placeholder: Readable<string>;
	export let icon: IconSource | null = null;

	export let value = '';

	export let showSecondLine = false;

	export let isValid: boolean | null = null;

	export let disabled = false;
	export let options: string[] = [];

	export let minimal = false;

	const id = randomStr(16);
	const dispatch = createEventDispatcher<{
		input: string;
		enter: null;
	}>();
</script>

<Frame {disabled} {minimal}>
	<div class="flex w-full flex-col">
		<div class="flex w-full items-center gap-2">
			{#if icon}
				<Icon src={icon} class="h-6 w-6" mini solid />
			{/if}

			<input
				{disabled}
				type="text"
				class="w-full bg-transparent focus:outline-none disabled:cursor-not-allowed"
				list={id}
				placeholder={$placeholder}
				on:input={({ currentTarget }) => {
					dispatch('input', currentTarget.value);
				}}
				on:keydown={({ key }) => {
					if (key === 'Enter') dispatch('enter', null);
				}}
				on:focus
				on:blur
				bind:value
			/>

			<slot name="postInput" />

			{#if isValid !== null}
				<div class="flex h-full items-center px-2">
					<div
						class="h-2 w-2 rounded-full"
						class:bg-red-500={!isValid}
						class:bg-green-500={isValid}
					/>
				</div>
			{/if}
		</div>

		{#if showSecondLine}
			<div class="pb-1 pt-2 empty:hidden">
				<slot name="secondLine" />
			</div>
		{/if}
	</div>
</Frame>

<datalist {id}>
	{#each options as option}
		<option value={option} />
	{/each}
</datalist>
