<script>
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
</script>

<div class="flex h-full w-full items-center justify-center">
	<Store store={i('notes.nothing')} />
</div>
