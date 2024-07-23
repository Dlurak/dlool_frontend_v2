<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { parseHexIntoRgb } from '$lib/utils/colors/conv';
	import { blackOrWhiteText } from '$lib/utils/colors/txtColor';
	import { safeMap } from '$lib/utils/null/safeMap';
	import { capitalize } from '$lib/utils/strings/case';
	import { colorToName } from 'colorame';
	import ColorPicker from './ColorPicker.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import convert from 'color-convert';
	import Store from '$lib/components/utils/Store.svelte';
	import { i } from '$lib/i18n/store';
	import { createEventDispatcher } from 'svelte';
	import { colorNames } from '$lib/constants/colors';
	import { currentLang } from '$lib/stores';
	import { svocal } from '$lib/utils/store/svocal';

	export let subject: string;
	export let hexColor: string;
	export let disabled = false;
	$: txtColor = blackOrWhiteText(parseHexIntoRgb(hexColor));

	let isModalOpened = false;

	let pickerHsl = convert.hex.hsl(hexColor);

	const dispatch = createEventDispatcher<{
		change: string;
	}>();

	const showHex = svocal('settings.color.showHex');
</script>

<button
	{disabled}
	class="
		flex items-center justify-center rounded-sm bg-[--bg] px-2 py-1
		disabled:cursor-not-allowed disabled:opacity-50 disabled:saturate-50
	"
	style:--bg={hexColor}
	class:text-black={txtColor === 'black'}
	class:text-white={txtColor === 'white'}
	on:click={() => {
		isModalOpened = !isModalOpened;
	}}
>
	{#if $showHex}
		{hexColor}
	{:else}
		{safeMap(colorToName(hexColor, colorNames[$currentLang]), capitalize) || hexColor}
	{/if}
</button>

<Modal bind:isOpen={isModalOpened}>
	<div slot="title">
		{#if subject}
			<Store store={i('settings.color.modal.title', { subject: subject.trim() })} />
		{:else}
			<Store store={i('settings.color.modal.title.none')} />
		{/if}
	</div>

	<div slot="body" class="flex flex-col gap-3 py-3">
		<ColorPicker {hexColor} bind:hsl={pickerHsl} />

		<hr class="border-zinc-300 dark:border-zinc-700" />

		<PrimaryButton
			on:click={() => {
				hexColor = `#${convert.hsl.hex(pickerHsl)}`;
				dispatch('change', hexColor);
				isModalOpened = false;
			}}
		>
			<Store store={i('settings.save')} />
		</PrimaryButton>
	</div>
</Modal>
