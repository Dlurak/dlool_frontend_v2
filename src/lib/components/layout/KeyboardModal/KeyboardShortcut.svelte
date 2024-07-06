<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import Key from './Key.svelte';
	import type { Shortcut } from './types';

	export let shortcut: Shortcut;
	export let isApple: boolean;
</script>

<div class="flex h-full flex-col gap-2">
	<b>
		<Store store={shortcut.description} />
	</b>

	<ul>
		{#each shortcut.keys as keys}
			{@const all = [...keys.modifier, ...keys.keys]}

			<li class="flex gap-1">
				{#each all as key}
					<Key {isApple} {key} />
				{/each}
			</li>
		{/each}
	</ul>
</div>
