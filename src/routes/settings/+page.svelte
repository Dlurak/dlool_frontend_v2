<script>
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { title } from '$lib/stores';

	title.set(i('title.settings'))
</script>

<div class="flex h-full items-center justify-center">
	<span>
		<Store store={i('settings.noneSelected')} />
	</span>
</div>
