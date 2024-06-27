<script lang="ts">
	import Store from '$lib/components/utils/Store.svelte';
	import TextInput from '$lib/components/input/Text.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import { DocumentArrowDown, DocumentArrowUp, Icon, Plus, Trash } from 'svelte-hero-icons';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import ColorPreview from '$lib/components/settings/color/ColorPreview.svelte';
	import { DEFAULT_SUBJECT_COLOR } from '$lib/constants/settings';
	import { removeKey } from '$lib/utils/objects/removeKey';
	import { replaceKey } from '$lib/utils/objects/replaceKey';
	import BoolSetting from '$lib/components/settings/BoolSetting.svelte';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { downloadJSON } from '$lib/utils/files/download';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import { loadFromFile } from '$lib/components/settings/color/loadFromFile';

	const colors = svocal('settings.color');
	const showHex = svocal('settings.color.showHex');
</script>

<MetaData title={i('settings.color.title')} />

<div class="flex w-full flex-col gap-2">
	<h3><Store store={i('settings.color.heading')} /></h3>

	<p><Store store={i('settings.color.description')} /></p>

	<div class="flex flex-col justify-between gap-2 sm:flex-row">
		<Store store={i('settings.color.importAndExport')} />

		<span class="flex gap-2">
			<SettingsButton on:click={loadFromFile}>
				<Icon src={DocumentArrowDown} class="h-5 w-5" />
				<Store store={i('settings.color.import')} />
			</SettingsButton>

			<SettingsButton
				color="blue"
				on:click={() => {
					downloadJSON($colors, 'dlool-colors.json');
				}}
			>
				<Icon src={DocumentArrowUp} class="h-5 w-5" />
				<Store store={i('settings.color.export')} />
			</SettingsButton>
		</span>
	</div>

	{#each Object.entries($colors) as [subject, hexColor], ind}
		{@const isLast = ind === Object.keys($colors).length - 1}
		<div class="flex flex-col justify-between gap-2 sm:flex-row">
			<ColorPreview
				{hexColor}
				{subject}
				on:change={({ detail: color }) => {
					colors.update((obj) => {
						obj[subject] = color;
						return obj;
					});
				}}
			/>

			<span class="flex gap-2">
				<TextInput
					value={subject}
					placeholder={i('settings.color.subject.placeholder')}
					on:input={({ detail }) => {
						colors.update((obj) => {
							return replaceKey(obj, subject, detail);
						});
					}}
				/>

				<QuickAction
					icon={Trash}
					color="red"
					on:click={() => {
						colors.update((obj) => removeKey(obj, subject));
					}}
				/>
			</span>
		</div>
		{#if !isLast}
			<hr class="border-2 border-zinc-200 dark:border-zinc-800" />
		{/if}
	{/each}

	<button
		class="flex w-full items-center justify-center gap-2 rounded-sm bg-zinc-200 py-1 transition-colors hover:bg-zinc-300 focus:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700 disabled:dark:hover:bg-zinc-800"
		on:click={() => {
			colors.update((old) => ({
				...old,
				'': DEFAULT_SUBJECT_COLOR
			}));
		}}
		disabled={!!$colors['']}
	>
		<Store store={i('settings.color.new')} />
		<Icon class="h-6 w-6" src={Plus} />
	</button>

	<BoolSetting label={i('settings.color.showHex')} bind:value={$showHex} />
</div>
