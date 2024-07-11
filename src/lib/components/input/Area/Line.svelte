<script lang="ts">
	import ModeButton from './ModeButton.svelte';

	type Mode = 'edit' | 'preview';
	export let viewMode: Mode = 'edit';

	const handler = (mode: Mode) => () => (viewMode = mode);
</script>

<div class="flex justify-start gap-1">
	<ModeButton on:click={handler('edit')} active={viewMode === 'edit'}>Edit</ModeButton>
	<ModeButton on:click={handler('preview')} active={viewMode === 'preview'}>Preview</ModeButton>
</div>
