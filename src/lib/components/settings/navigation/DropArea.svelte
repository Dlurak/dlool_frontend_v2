<script lang="ts" context="module">
	type ItemPool = {
		name: NavigationTarget;
		id: number;
	};
</script>

<script lang="ts">
	import { navbarEntries } from '$lib/constants/navbar';
	import { dndzone } from 'svelte-dnd-action';
	import NavbarSettingButton from './NavbarSettingButton.svelte';
	import { flip } from 'svelte/animate';
	import type { NavigationTarget } from '$lib/components/layout/navigation/types';
	import { createEventDispatcher } from 'svelte';

	export let items: ItemPool[];
	export let flipDurationMs: number;
	export let block = 0;

	const dispatch = createEventDispatcher<{
		final: ItemPool[];
	}>();
</script>

<section
	class="
		 flex flex-col gap-3
		 rounded px-4 py-3 outline outline-1 outline-zinc-300
		dark:outline-zinc-600
	"
	use:dndzone={{
		items,
		flipDurationMs,
		dropTargetStyle: {},
		dragDisabled: items.length <= block
	}}
	on:consider={({ detail }) => {
		items = detail.items;
	}}
	on:finalize={({ detail }) => {
		items = detail.items;
		dispatch('final', items);
	}}
>
	<div>
		<slot name="pre-content" />
	</div>

	<div class="flex min-h-20 flex-wrap items-center justify-center gap-2">
		{#each items as item (item.id)}
			{@const obj = navbarEntries[item.name]}

			<span animate:flip={{ duration: flipDurationMs }} class="flex-1">
				<NavbarSettingButton label={obj.text} icon={obj.icon} />
			</span>
		{:else}
			<slot name="empty" />
		{/each}
	</div>
</section>
