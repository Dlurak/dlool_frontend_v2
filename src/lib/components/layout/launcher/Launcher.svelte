<script lang="ts">
	import KeyboardShortcuts from './KeyboardShortcuts.svelte';
	import LauncherBg from './LauncherBg.svelte';
	import LauncherPopup from './LauncherPopup.svelte';
	import { useLauncher } from './hook';

	const { isOpen } = useLauncher();
</script>

<KeyboardShortcuts />

{#if $isOpen}
	<LauncherBg>
		<LauncherPopup />
	</LauncherBg>
{/if}
