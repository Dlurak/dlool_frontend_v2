<script lang="ts">
	import { clickOutside } from 'nutzlich';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		close: null;
	}>();
</script>

<div
	class="rounded bg-zinc-300 px-2 py-2 dark:bg-zinc-700"
	use:clickOutside={{
		callback: () => dispatch('close', null)
	}}
>
	<slot />
</div>
