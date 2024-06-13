<script>
	import BoolSetting from '$lib/components/settings/BoolSetting.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import SelectSetting from '$lib/components/settings/SelectSetting.svelte';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import RangeSettings from '$lib/components/settings/RangeSettings.svelte';
	import Store from '$lib/components/utils/Store.svelte';

	const navTexts = svocal('settings.nav.texts');
	const weekStartsOn = svocal('settings.weekStartsOn');
	const homeworkTransparency = svocal('settings.homework.transparency');
	const launcherOutlineWidth = svocal('settings.launcher.outlineWidth')
</script>

<MetaData title={i('title.settings.general')} />

<div class="flex flex-col gap-2">
	<section class="flex flex-col gap-2">
		<h3><Store store={i('settings.general.nav')} /></h3>

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

		<RangeSettings
			label={i('settings.general.launcher.outlineWidth')}
			bind:value={$launcherOutlineWidth}
			min={0}
			max={10}
			step={1}
		/>
	</section>
</div>
