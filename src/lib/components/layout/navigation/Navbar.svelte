<script>
	import { navHeight } from '$lib/stores';
	import { svocal } from '$lib/utils/store/svocal';
	import NavigationButton from './NavigationButton.svelte';

	const navEntries = svocal('settings.nav.entries');
</script>

<div
	class="fixed bottom-4 z-10 w-full p-4 sm:sticky sm:bottom-auto sm:top-0 sm:p-0 print:hidden"
	bind:clientHeight={$navHeight}
>
	<nav
		class="flex items-center justify-between gap-2 rounded-md bg-neutral-400 bg-opacity-50 px-4 py-2 shadow-md backdrop-blur-lg sm:rounded-none sm:bg-neutral-100 sm:shadow-none dark:bg-neutral-800 dark:bg-opacity-50 sm:dark:bg-neutral-900"
	>
		<a class="hidden aspect-square h-12 w-12 sm:inline-block" href="/">
			<img src="/assets/logo.svg" alt="Dlools logo" class="h-full object-contain" title="Dlool" />
		</a>

		<div class="flex w-full items-center justify-evenly gap-2 sm:w-fit sm:gap-6">
			{#each $navEntries as navTarget}
				<NavigationButton target={navTarget} />
			{/each}
		</div>
	</nav>
</div>
