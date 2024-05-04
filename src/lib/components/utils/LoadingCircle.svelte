<script lang="ts">
	import { i } from '$lib/i18n/store';
	import Store from './Store.svelte';

	export let label = i('loading');
</script>

<div class="flex flex-col items-center gap-2">
	<div class="p-4">
		<div
			class="aspect-square w-20 animate-spin rounded-full border-8 border-transparent border-t-emerald-400 dark:border-t-emerald-500"
		/>
	</div>
	<Store store={label} />
</div>
