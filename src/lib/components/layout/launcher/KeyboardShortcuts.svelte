<script lang="ts">
	import { useLauncher } from './hook';

	const { isOpen, focusedIndex, filteredAndSortedOptions } = useLauncher();
</script>

<svelte:window
	on:keydown={(e) => {
		const { key, ctrlKey } = e;

		if (key === 'k' && ctrlKey) {
			e.preventDefault();
			isOpen.toggle();
			return;
		}

		if (!$isOpen) return;

		if (key === 'ArrowDown') {
			focusedIndex.inc();
			return;
		}
		if (key === 'ArrowUp') {
			focusedIndex.dec();
			return;
		}
		if (key === 'Escape') {
			isOpen.close();
			return;
		}
		if (key === 'Enter') {
			$filteredAndSortedOptions[$focusedIndex].callback();
			return;
		}
	}}
/>
