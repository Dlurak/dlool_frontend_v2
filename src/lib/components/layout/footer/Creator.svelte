<script>
	import LangSelect from '$lib/components/i18n/LangSelect.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
</script>

<div class="w-full">
	<div class="flex justify-between">
		<h3><Store store={i('footer.creator')} /></h3>

		<LangSelect />
	</div>
	<div>
		<Store store={i('footer.creator.license')} />
	</div>
</div>
