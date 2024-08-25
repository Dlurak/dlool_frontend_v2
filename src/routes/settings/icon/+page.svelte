<script>
	import ColorPreview from '$lib/components/settings/color/ColorPreview.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { iconBg, isApple, settingsHeader } from '$lib/stores';
	import { mediaQuery } from 'nutzlich';

	let colorchanges = 0;
	const isBrowser = mediaQuery('(display-mode: browser)');

	settingsHeader.set(i('settings.icon'));
</script>

<MetaData title={i('settings.icon')} />

{#if $isApple && isBrowser}
	<p>
		<Store store={i('settings.description')} />
	</p>

	<ColorPreview
		bind:hexColor={$iconBg}
		subject={''}
		on:change={() => {
			colorchanges += 1;
		}}
	/>

	{#if colorchanges >= 1}
		<Store store={i('settings.warning')} />
	{/if}
{:else}
	<p>
		<Store store={i('settings.icon.fallback')} />
	</p>
{/if}
