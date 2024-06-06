<script>
	import BoolSetting from '$lib/components/settings/BoolSetting.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import { title } from '$lib/stores';
	import SelectSetting from '$lib/components/settings/SelectSetting.svelte';

	title.set(i('title.settings.general'));

	const navTexts = svocal('settings.nav.texts');
	const weekStartsOn = svocal('settings.weekStartsOn');
</script>

<div class="flex flex-col gap-2">
	<BoolSetting label={i('settings.general.nav.texts')} bind:value={$navTexts} />

	<SelectSetting
		bind:value={$weekStartsOn}
		label={i('settings.general.weekStartsOn')}
		options={new Array(7).fill(0).map((_, ind) => {
			const num = (ind + 1) % 7;

			return {
				label: i('calendar.weekday', {}, { count: num }),
				value: num
			};
		})}
	/>
</div>
