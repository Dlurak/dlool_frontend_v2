<script>
	import Panes from '$lib/components/panes/Panes.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { settings } from '$lib/constants/settings';
	import { Icon } from 'svelte-hero-icons';
</script>

<Panes>
	<div slot="a">
		{#each settings as s}
			<a
				href={`/settings${s.uri}`}
				class="flex gap-2 rounded px-2 py-1 text-black hover:bg-zinc-300 dark:text-white dark:hover:bg-zinc-800"
			>
				{#if s.icon}
					<Icon src={s.icon} class="h-6 w-6" />
				{/if}
				<Store store={s.label} />
			</a>
		{/each}
	</div>

	<div slot="b" class="hidden w-full md:block">
		<slot />
	</div>
</Panes>
