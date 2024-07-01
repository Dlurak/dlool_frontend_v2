<script lang="ts">
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
	import { onDestroy } from 'svelte';
	import { self } from '$lib/utils/utils';
	import { browser } from '$app/environment';
	import Api from '$lib/components/settings/Api.svelte';

	const navTexts = svocal('settings.nav.texts');
	const weekStartsOn = svocal('settings.weekStartsOn');
	const tagsInOverview = svocal('settings.tagsInOverview');
	const homeworkPresets = svocal('settings.homeworkPresets');
	const launcherOutlineWidth = svocal('settings.launcher.outlineWidth');
	const launcherWidth = svocal('settings.launcher.width');

	const holidayAutoDetect = svocal('holidays.autoDetect');
	const holidayCountry = svocal('holidays.country');
	const holidayState = svocal('holidays.state');
	const reduceMotion = svocal('settings.reduceMotion');

	const holiday = new Holiday();

	const sizes = ['small', 'medium', 'large'] as const;

	export let data: PageData;

	onDestroy(() => {
		if (!browser) return;
		homeworkPresets.update((old) => old.map((x) => x.trim()).filter(self));
	});
</script>

<MetaData title={i('title.settings.general')} />

<div class="flex flex-col gap-2">
	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.general')} /></h3>
		<BoolSetting label={i('settings.general.general.animations')} bind:value={$reduceMotion} />
	</section>

	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.nav')} /></h3>
		<p>
			<Store store={i('settings.general.nav.description')} />
		</p>
		<NavbarCustomizor />
		<BoolSetting
			label={i('settings.general.nav.texts')}
			bind:value={$navTexts}
			description={i('settings.general.nav.texts.description')}
		/>
	</section>

	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.calendar')} /></h3>

		<SelectSetting
			bind:value={$weekStartsOn}
			label={i('settings.general.calendar.weekStartsOn')}
			description={i('settings.general.calendar.weekStartsOn.description')}
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
		<h3><Store store={i('settings.general.notes')} /></h3>

		<BoolSetting
			bind:value={$tagsInOverview}
			label={i('settings.general.notes.tagsInOverview')}
			description={i('settings.general.notes.tagsInOverview.description')}
		/>
	</section>

	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.launcher')} /></h3>

		<p>
			<Store store={i('settings.general.launcher.description')} />
		</p>

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

		<BoolSetting
			label={i('settings.genral.holiday.autoDetect')}
			bind:value={$holidayAutoDetect}
			description={i('settings.genral.holiday.autoDetect.description')}
		/>

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

	<Api />
</div>
