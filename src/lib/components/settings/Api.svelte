<script>
	import { isDlool } from '$lib/dlool/info';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import SettingsButton from '../buttons/SettingsButton.svelte';
	import TextInput from '../input/Text.svelte';
	import { sendDefaultErrorToast, sendToast } from '../layout/toasts';
	import Store from '../utils/Store.svelte';

	let urlInput = '';
	const urlSvocal = svocal('api.url');
	urlSvocal.subscribe((u) => {
		urlInput = u;
	});
</script>

<section class="flex flex-col gap-2">
	<h3><Store store={i('settings.api')} /></h3>

	<div class="flex flex-wrap justify-between gap-2">
		<span><Store store={i('settings.api.url')} /></span>

		<span class="flex gap-2">
			<TextInput placeholder={i('settings.api.placeholder')} />
			<SettingsButton
				on:click={() => {
					isDlool(urlInput)
						.then((isValid) => {
							if (isValid) urlSvocal.set(urlInput);

							sendToast({
								timeout: 5_000,
								type: isValid ? 'success' : 'error',
								content: i(isValid ? 'settings.api.success' : 'settings.api.error')
							});
						})
						.catch(sendDefaultErrorToast);
				}}
			>
				<Store store={i('settings.save')} />
			</SettingsButton>
		</span>
	</div>
</section>
