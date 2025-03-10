<script lang="ts">
	import { svocal } from '$lib/utils/store/svocal';
	import { clickOutside, mediaQuery } from 'nutzlich';
	import { browser } from '$app/environment';
	import { enableScrolling } from '$lib/utils/dom/scroll';
	import { ArrowDown, Icon, RocketLaunch, ExclamationCircle } from 'svelte-hero-icons';
	import { gradientText } from '$lib/utils/actions/gradientText';
	import SettingsButton from '../buttons/SettingsButton.svelte';
	import Store from '../utils/Store.svelte';
	import { i } from '$lib/i18n/store';

	export let isApple = false;
	let showUpdateIntro = false;
	let secondEle: HTMLDivElement | undefined = undefined;

	const isStandalone = mediaQuery('(display-mode: standalone)');

	const reset = () => {
		if ($isStandalone) return;
		showUpdateIntro = false;
		enableScrolling(true);
		window.localStorage.clear();
	};

	const version = svocal('dlool-version');
	const textStore = i('into.text');

	$: {
		if ($version === '1') showUpdateIntro = true;
	}

	$: {
		if ($version === '1' && browser) enableScrolling(false);
	}
</script>

<svelte:window
	on:keyup={({ key }) => {
		if (showUpdateIntro && key === 'Escape') reset();
	}}
/>

{#if showUpdateIntro}
	<div
		class="
			pointer-events-auto fixed inset-0 top-0 z-10
			flex h-full w-full
			flex-col items-center
			justify-center bg-black bg-opacity-80
		"
	>
		<div
			class="h-full max-h-[70dvh] max-w-[min(24rem,90%)] snap-y snap-mandatory overflow-y-scroll rounded-md bg-gray-200 px-4 py-2 text-lg text-black shadow-2xl dark:bg-zinc-800 dark:text-white"
			use:clickOutside={{
				callback: reset
			}}
		>
			<div class="relative flex h-full snap-center flex-col gap-1">
				<h1 class="text-wrap">
					<Store store={i('intro.nextgen')} /> <br />
					<span use:gradientText>Dlool</span>
				</h1>

				<h3><Store store={i('intro.future')} /></h3>

				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html $textStore}</p>

				<button
					class="absolute bottom-4 right-4 animate-bounce rounded-full bg-zinc-300 p-2 shadow-lg dark:bg-zinc-700"
					on:click={() => {
						if (!secondEle) return;

						secondEle.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					<Icon src={ArrowDown} class="h-6 w-6" />
				</button>
			</div>

			<div class="flex h-full snap-center flex-col gap-1 overflow-y-auto" bind:this={secondEle}>
				<h2 use:gradientText><Store store={i('intro.new')} /></h2>

				<p><Store store={i('intro.new.preambel')} /></p>

				<ul class="list-outside pl-4">
					{#each { length: 5 } as _, ind}
						<li><Store store={i('intro.features', {}, { count: ind })} /></li>
					{/each}
				</ul>

				{#if $isStandalone && isApple}
					<div
						class="flex items-center gap-1 rounded border-2 border-red-500 bg-red-400 bg-opacity-30 px-3"
					>
						<Icon src={ExclamationCircle} class="h-6 w-6 flex-shrink-0" />
						<span>
							<Store store={i('intro.reinstall')} />
						</span>
					</div>
				{:else}
					<div class="flex">
						<SettingsButton icon={RocketLaunch} on:click={reset}>
							<Store store={i('intro.start')} />
						</SettingsButton>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
