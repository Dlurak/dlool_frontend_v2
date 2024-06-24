<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import BoolSetting from '$lib/components/settings/BoolSetting.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import SelectSetting from '$lib/components/settings/SelectSetting.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import RangeSettings from '$lib/components/settings/RangeSettings.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import type { PageData } from './$types';
	import { readable } from 'svelte/store';
	import { currentLang } from '$lib/stores';
	import { Holiday } from 'open-holiday-js';
	import NavbarCustomizor from '$lib/components/settings/navigation/NavbarCustomizor.svelte';
	import QuickAction from '$lib/components/buttons/QuickAction.svelte';
	import { Plus, Trash } from 'svelte-hero-icons';
	import { removeNthElement } from '$lib/utils/arrays/remove';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { onDestroy } from 'svelte';
	import { self } from '$lib/utils/utils';
	import { browser } from '$app/environment';

	const navTexts = svocal('settings.nav.texts');
	const weekStartsOn = svocal('settings.weekStartsOn');
	const homeworkTransparency = svocal('settings.homework.transparency');
	const homeworkPresets = svocal('settings.homeworkPresets');
	const launcherOutlineWidth = svocal('settings.launcher.outlineWidth');
	const launcherWidth = svocal('settings.launcher.width');

	const holidayAutoDetect = svocal('holidays.autoDetect');
	const holidayCountry = svocal('holidays.country');
	const holidayState = svocal('holidays.state');

	const holiday = new Holiday();

	const sizes = ['small', 'medium', 'large'] as const;

	export let data: PageData;

	onDestroy(() => {
		if (!browser) return
		homeworkPresets.update((old) => old.map((x) => x.trim()).filter(self));
	});
</script>

<MetaData title={i('title.settings.general')} />

<div class="flex flex-col gap-2">
	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.nav')} /></h3>

		<NavbarCustomizor />
		<BoolSetting label={i('settings.general.nav.texts')} bind:value={$navTexts} />
	</section>

	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.assignments')} /></h3>

		<RangeSettings
			label={i('settings.general.assignments.transparency')}
			bind:value={$homeworkTransparency}
			min={0}
			max={1}
			step={0.05}
			valueFmt={(num) => `${Math.round(num * 100)}%`}
		/>

		<div class="flex justify-between">
			<span> Hi </span>

			<div class="flex flex-col gap-2">
				{#each $homeworkPresets as preset, ind}
					<span class="flex gap-1">
						<TextInput placeholder={readable('')} bind:value={preset} />
						<QuickAction
							icon={Trash}
							on:click={() => homeworkPresets.update((old) => removeNthElement(old, ind))}
						/>
					</span>
				{/each}

				<SettingsButton
					icon={Plus}
					color="green"
					disabled={$homeworkPresets.map((x) => x.trim()).includes('')}
					on:click={() => homeworkPresets.update((old) => ['', ...old])}
				>
					<span> Neues hinzufügen </span>
				</SettingsButton>
			</div>
		</div>
	</section>

	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.calendar')} /></h3>

		<SelectSetting
			bind:value={$weekStartsOn}
			label={i('settings.general.calendar.weekStartsOn')}
			options={new Array(7).fill(0).map((_, ind) => {
				const num = (ind + 1) % 7;

				return {
					label: i('calendar.weekday', {}, { count: num }),
					value: num
				};
			})}
		/>
	</section>

	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.launcher')} /></h3>

		<SelectSetting
			label={i('settings.general.launcher.width')}
			options={sizes.map((t) => ({
				value: t,
				label: i(`settings.general.launcher.width.${t}`)
			}))}
			bind:value={$launcherWidth}
		/>

		<RangeSettings
			label={i('settings.general.launcher.outlineWidth')}
			bind:value={$launcherOutlineWidth}
			min={0}
			max={10}
			step={1}
		/>
	</section>

	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.holiday')} /></h3>

		<BoolSetting label={i('settings.genral.holiday.autoDetect')} bind:value={$holidayAutoDetect} />

		<SelectSetting
			typpable
			label={i('settings.genral.holiday.country')}
			options={data.countries.map(({ isoCode, name }) => ({
				label: readable(
					(
						name.find(({ language }) => language === $currentLang.toUpperCase()) ??
						name.find(({ language }) => language === 'EN')
					)?.text ?? ''
				),
				value: isoCode
			}))}
			bind:value={$holidayCountry}
			on:select={() => {
				// @ts-expect-error I am certain
				holidayState.set(null);
			}}
		/>

		{#await holiday.getSubdivisions($holidayCountry) then d}
			{#if d.length > 0}
				<SelectSetting
					typpable
					label={i('settings.genral.holiday.state')}
					options={d.map(({ shortName, name }) => ({
						label: readable(
							(
								name.find(({ language }) => language === $currentLang.toUpperCase()) ??
								name.find(({ language }) => language === 'EN')
							)?.text ?? ''
						),
						value: shortName
					}))}
					bind:value={$holidayState}
					on:select
				/>
			{/if}
		{/await}
	</section>
</div>
