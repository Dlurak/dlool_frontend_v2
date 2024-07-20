<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MarkdownSymbolButton from './MarkdownSymbolButton.svelte';
	import ModeButton from './ModeButton.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';

	type Mode = 'edit' | 'preview';
	export let viewMode: Mode = 'edit';

	const handler = (mode: Mode) => () => (viewMode = mode);

	const dispatch = createEventDispatcher<{
		heading: null;
		bold: null;
		italic: null;
		link: null;
	}>();
</script>

<div class="flex justify-between gap-1">
	<div class="flex justify-start gap-1">
		<ModeButton on:click={handler('edit')} active={viewMode === 'edit'}>
			<Store store={i('markdownEditor.views.edit')} />
		</ModeButton>
		<ModeButton on:click={handler('preview')} active={viewMode === 'preview'}>
			<Store store={i('markdownEditor.views.preview')} />
		</ModeButton>
	</div>

	<div class="flex justify-start gap-1">
		<MarkdownSymbolButton type="heading" on:click={() => dispatch('heading')} />
		<MarkdownSymbolButton type="bold" on:click={() => dispatch('bold')} />
		<MarkdownSymbolButton type="italic" on:click={() => dispatch('italic')} />
		<MarkdownSymbolButton type="link" on:click={() => dispatch('link')} />
	</div>
</div>
