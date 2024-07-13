<script>
	import { isDlool } from '$lib/dlool/info';
	import { i } from '$lib/i18n/store';
	import { cookie } from '$lib/utils/store/cookie';
	import { QuestionMarkCircle } from 'svelte-hero-icons';
	import QuickAction from '../buttons/QuickAction.svelte';
	import SettingsButton from '../buttons/SettingsButton.svelte';
	import TextInput from '../input/Text.svelte';
	import { sendDefaultErrorToast, sendToast } from '../layout/toasts';
	import Store from '../utils/Store.svelte';
	import { slide } from 'svelte/transition';
	import { animationLength } from '$lib/utils/store/animation';

	const urlCookie = cookie('api.url');
	let urlInput = $urlCookie;

	urlCookie.subscribe((u) => {
		urlInput = u;
	});

	let showDescription = false;
</script>

<section class="flex flex-col gap-2">
	<h3><Store store={i('settings.api')} /></h3>

	<div class="flex flex-wrap justify-between gap-2">
		<span class="flex items-center gap-1">
			<Store store={i('settings.api.url')} />
			<QuickAction
				icon={QuestionMarkCircle}
				small
				on:click={() => (showDescription = !showDescription)}
			/>
		</span>

		<span class="flex gap-2">
			<TextInput bind:value={urlInput} placeholder={i('settings.api.placeholder')} />
			<SettingsButton
				on:click={() => {
					isDlool(urlInput)
						.then((isValid) => {
							if (isValid) urlCookie.set(urlInput);

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
	{#if showDescription}
		<div transition:slide={{ duration: $animationLength }} class="text-gray-500 dark:text-gray-400">
			<Store store={i('settings.api.description')} />
		</div>
	{/if}
</section>
