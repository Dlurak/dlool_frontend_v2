<script>
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
</script>

<MetaData title={i('title.settings')} />

<div class="flex h-full items-center justify-center">
	<span>
		<Store store={i('settings.noneSelected')} />
	</span>
</div>
