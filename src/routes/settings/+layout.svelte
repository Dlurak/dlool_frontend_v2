<script>
	import { page } from '$app/stores';
	import Panes from '$lib/components/panes/Panes.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { settings } from '$lib/constants/settings';
	import { Icon } from 'svelte-hero-icons';
	import { derived } from 'svelte/store';

	const isOverviewPage = derived(page, (p) => p.route.id === '/settings');
</script>

<Panes>
	<div slot="a" class="flex flex-col gap-1 md:block" class:hidden={!$isOverviewPage}>
		{#each settings as s}
			{#if s === 'hr'}
				<div class="py-2">
					<hr class="border-zinc-300 dark:border-zinc-700" />
				</div>
			{:else}
				<a
					href={`/settings${s.uri}`}
					class="flex gap-2 rounded px-2 py-1 text-black hover:bg-zinc-300 dark:text-white dark:hover:bg-zinc-800"
				>
					{#if s.icon}
						<Icon src={s.icon} class="h-6 w-6" />
					{/if}
					<Store store={s.label} />
				</a>
			{/if}
		{/each}
	</div>

	<div slot="b" class="w-full" class:hidden={$isOverviewPage} class:md:block={$isOverviewPage}>
		<slot />
	</div>
</Panes>
