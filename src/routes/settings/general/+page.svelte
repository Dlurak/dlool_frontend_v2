<script>
	import BoolSetting from '$lib/components/settings/BoolSetting.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import { title } from '$lib/stores';

	title.set(i('title.settings.general'))

	const navTexts = svocal('settings.nav.texts');
</script>

<BoolSetting label={i('settings.general.nav.texts')} bind:value={$navTexts} />
