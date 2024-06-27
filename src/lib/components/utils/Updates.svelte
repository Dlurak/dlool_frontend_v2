<script context="module" lang="ts">
	type Update = {
		user: {
			username: string;
			displayname: string;
		};
		time: number;
	};
</script>

<script lang="ts">
	import { useToggle } from 'nutzlich';
	import UpdatedAt from './UpdatedAt.svelte';
	import QuickAction from '../buttons/QuickAction.svelte';
	import { ChevronDown, ChevronUp } from 'svelte-hero-icons';

	export let updates: Update[];
	const showAllEdits = useToggle(false);
</script>

<div class="flex flex-col">
	{#each updates
		.map((data, ind) => ({ ...data, isFirst: ind === 0 }))
		.reverse()
		.slice(0, $showAllEdits ? Infinity : 1) as update, ind}
		{@const isAtTop = ind === 0}
		{@const type = update.isFirst ? 'created' : 'edited'}

		<span class="flex w-fit justify-center gap-1">
			<UpdatedAt {type} timestamp={update.time} displayname={update.user.displayname} />
			{#if isAtTop && updates.length > 1}
				<QuickAction
					icon={$showAllEdits ? ChevronUp : ChevronDown}
					small
					on:click={showAllEdits.toggle}
				/>
			{/if}
		</span>
	{/each}
</div>
