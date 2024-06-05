<script>
	import BoolSetting from '$lib/components/settings/BoolSetting.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';

	const navTexts = svocal('settings.nav.texts');
</script>

<BoolSetting label={i('settings.general.nav.texts')} bind:value={$navTexts} />
