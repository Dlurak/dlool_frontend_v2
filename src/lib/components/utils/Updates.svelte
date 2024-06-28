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
	import { slide } from 'svelte/transition';

	export let updates: Update[];
	const showAllEdits = useToggle(false);
</script>

<div class="flex flex-col">
	<span class="flex w-fit items-center justify-center gap-1" transition:slide>
		<UpdatedAt
			type={updates.length === 1 ? 'created' : 'edited'}
			timestamp={updates[updates.length - 1].time}
			displayname={updates[updates.length - 1].user.displayname}
		/>
		{#if updates.length > 1}
			<QuickAction
				icon={$showAllEdits ? ChevronUp : ChevronDown}
				small
				on:click={showAllEdits.toggle}
			/>
		{/if}
	</span>

	{#if $showAllEdits}
		<div transition:slide>
			{#each updates
				.map((data, ind) => ({ ...data, isFirst: ind === 0 }))
				.reverse()
				.slice(1) as update}
				{@const type = update.isFirst ? 'created' : 'edited'}

				<span class="flex w-fit justify-center gap-1" transition:slide>
					<UpdatedAt {type} timestamp={update.time} displayname={update.user.displayname} />
				</span>
			{/each}
		</div>
	{/if}
</div>
