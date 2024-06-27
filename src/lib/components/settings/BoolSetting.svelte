<script lang="ts">
	import type { Readable } from 'svelte/store';
	import Switch from '../input/Switch.svelte';
	import Store from '../utils/Store.svelte';
	import QuickAction from '../buttons/QuickAction.svelte';
	import { QuestionMarkCircle } from 'svelte-hero-icons';
	import { slide } from 'svelte/transition';

	export let label: Readable<string>;
	export let value: boolean;
	export let description: Readable<string> | null = null;

	let showDescription = false;
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between gap-2">
		<span class="flex items-center gap-1">
			<Store store={label} />
			{#if description}
				<QuickAction
					icon={QuestionMarkCircle}
					small
					on:click={() => (showDescription = !showDescription)}
				/>
			{/if}
		</span>

		<Switch bind:checked={value} />
	</div>
	{#if description && showDescription}
		<div transition:slide class="text-gray-500 dark:text-gray-400">
			<Store store={description} />
		</div>
	{/if}
</div>
