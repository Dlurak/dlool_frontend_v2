<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { LauncherSelectableItem } from '$lib/constants/launcher';
	import { Icon } from 'svelte-hero-icons';
	import { useLauncher } from './hook';
	import { createEventDispatcher } from 'svelte';

	const { detailed } = useLauncher();
	const dispatch = createEventDispatcher<{
		focus: number;
		apply: number;
	}>();

	export let item: LauncherSelectableItem;
	export let index: number;
	export let isFocused: boolean;

	let ele: HTMLButtonElement | undefined;

	$: {
		if (ele && isFocused) {
			ele.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
		}
	}
</script>

{#if index !== 0}
	<hr class="border-1 w-full border-zinc-600" />
{/if}

<button
	tabindex="-1"
	on:mousemove={() => {
		dispatch('focus', index);
	}}
	on:click={() => {
		dispatch('apply', index);
	}}
	class="flex min-h-16 w-full items-center gap-3 px-4 py-2 text-start"
	class:bg-emerald-500={isFocused}
	class:bg-opacity-10={isFocused}
	bind:this={ele}
>
	{#if item.icon && $detailed}
		<Icon src={item.icon} class="h-6 w-6" />
	{/if}

	<div>
		<h4><Store store={item.label} /></h4>

		{#if $detailed && item.description}
			<span>
				<Store store={item.description} />
			</span>
		{/if}
	</div>
</button>
