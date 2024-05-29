<script>
	import Store from "$lib/components/utils/Store.svelte";
	import { i } from "$lib/i18n/store";
</script>

<div class="h-full flex items-center justify-center">
	<span>
		<Store store={i("settings.noneSelected")} />
	</span>
</div>
