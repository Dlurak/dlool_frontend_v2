<script>
	import { navHeight } from '$lib/stores';
	import { svocal } from '$lib/utils/store/svocal';
	import { flip } from 'svelte/animate';
	import NavigationButton from './NavigationButton.svelte';
	import { animationLength } from '$lib/utils/store/animation';

	const navEntries = svocal('settings.nav.entries');
</script>

<div
	class="fixed bottom-4 z-10 w-full p-4 sm:sticky sm:bottom-auto sm:top-0 sm:p-0 print:hidden"
	bind:clientHeight={$navHeight}
>
	<nav
		class="
			flex items-center justify-between gap-2 rounded-md
			bg-neutral-400 bg-opacity-50 px-4 py-2 shadow-md backdrop-blur-lg
			sm:rounded-none sm:bg-neutral-100 sm:bg-opacity-50 sm:shadow-none
			dark:bg-neutral-800 dark:bg-opacity-50 sm:dark:bg-neutral-900 sm:dark:bg-opacity-50
		"
	>
		<div class="hidden h-12 w-full sm:inline-block">
			<a class="aspect-square h-12 w-12" href="/">
				<img src="/assets/logo.svg" alt="Dlools logo" class="h-full object-contain" title="Dlool" />
			</a>
		</div>

		<div
			class="grid w-full grid-cols-[repeat(auto-fit,minmax(0,1fr))] items-center justify-evenly sm:w-fit"
		>
			{#each $navEntries as navTarget (navTarget)}
				<span animate:flip={{ duration: $animationLength }}>
					<NavigationButton target={navTarget} />
				</span>
			{/each}
		</div>
	</nav>
</div>
