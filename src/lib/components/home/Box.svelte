<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { Readable } from 'svelte/store';

	export let emoji: string;
	export let title: Readable<string>;
	export let description: Readable<string>;

	export let disfoccused = false;
</script>

<div
	class="flex h-full flex-col rounded-md bg-zinc-200 p-5 shadow-md transition-all hover:scale-[1.01] hover:shadow-lg dark:bg-zinc-900 print:shadow-none"
	class:scale-95={disfoccused}
	class:brightness-95={disfoccused}
	class:dark:brightness-70={disfoccused}
>
	<div class="py-2 print:hidden">
		<span class="rounded-sm bg-zinc-300 p-2 text-xl dark:bg-zinc-800">{emoji}</span>
	</div>
	<h3><Store store={title} /></h3>
	<Store store={description} />
</div>
