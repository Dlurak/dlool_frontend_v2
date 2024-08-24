<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import type { Readable } from 'svelte/store';

	export let emoji: string;
	export let title: Readable<string>;
	export let description: Readable<string>;

	export let disfoccused = false;
</script>

<div
	class="flex h-full flex-col rounded-md bg-black bg-opacity-20 p-5 shadow-md transition-all hover:scale-[1.01] hover:shadow-lg print:shadow-none"
	class:scale-95={disfoccused}
	class:brightness-50={disfoccused}
>
	<div class="py-2 print:hidden">
		<span class="rounded-sm bg-black bg-opacity-20 p-2 text-xl">{emoji}</span>
	</div>
	<h3><Store store={title} /></h3>
	<Store store={description} />
</div>
