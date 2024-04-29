<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { Github } from 'svelte-bootstrap-icons';

	const resources = ['frontend', 'backend'] as const satisfies string[];
</script>

<div class="w-full">
	<h3><Store store={i('footer.contact')} /></h3>

	<div class="grid grid-cols-2">
		{#each resources as resource}
			<a href={`https://github.com/Dlurak/dlool_${resource}_v2`} class="flex items-center gap-1">
				<Github />
				<Store store={i(`footer.contact.${resource}`)} />
			</a>
		{/each}
	</div>
</div>
