<script lang="ts" context="module">
	const FLIP_DURATION = 300;

	type ItemPool = {
		name: NavigationTarget;
		id: number;
	};

	const ITEM_POOL: ItemPool[] = (
		['homework', 'calendar', 'notes', 'login', 'register', 'launcher'] as const
	).map((name, id) => ({ name, id }));

	function createItemsFromNames(names: NavigationTarget[]) {
		return ITEM_POOL.filter(({ name }) => names.includes(name));
	}

	const isSelectedId = (id: number, selected: ItemPool[]) => !!selected.find((x) => x.id === id);
</script>

<script lang="ts">
	import type { NavigationTarget } from '$lib/components/layout/navigation/types';
	import { svocal } from '$lib/utils/store/svocal';
	import { get } from 'svelte/store';
	import DropArea from './DropArea.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';

	const selectedSvocal = svocal('settings.nav.entries');

	let selectedPreview = createItemsFromNames(get(selectedSvocal));
	let notSelectedPreview = ITEM_POOL.filter(({ id }) => !isSelectedId(id, selectedPreview));
</script>

<div class="flex flex-col gap-2 rounded">
	<DropArea
		block={1}
		flipDurationMs={FLIP_DURATION}
		bind:items={selectedPreview}
		on:final={({ detail }) => {
			selectedSvocal.set(detail.map(({ name }) => name));
		}}
	>
		<h4 slot="pre-content"><Store store={i('settings.general.nav.composer.your')} /></h4>
	</DropArea>

	<DropArea flipDurationMs={FLIP_DURATION} bind:items={notSelectedPreview}>
		<h4 slot="pre-content"><Store store={i('settings.general.nav.composer.available')} /></h4>
		<span class="text-gray-500" slot="empty">
			<Store store={i('settings.general.nav.composer.empty')} />
		</span>
	</DropArea>
</div>
