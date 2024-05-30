<script>
	import TextInput from '$lib/components/input/Text.svelte';
	import PasswordInput from '$lib/components/input/Password.svelte';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import { derived } from 'svelte/store';
	import Store from '$lib/components/utils/Store.svelte';

	const generatedByLogin = derived(svocal('auth.access.generatedBy'), (gb) => gb === 'login');
</script>

<div>
	<h3>
		<Store store={i('settings.profileDetails.change')} />
	</h3>

	<div class="flex flex-col gap-3">
		<div class="flex items-center justify-between">
			<span><Store store={i('settings.profileDetails.displayname')} /></span>

			<span class="flex h-full min-w-[50%] items-stretch gap-2">
				<TextInput
					placeholder={i('settings.profileDetails.displayname')}
					disabled={!$generatedByLogin}
				/>
				<SettingsButton disabled={!$generatedByLogin}>
					<Store store={i('settings.save')} />
				</SettingsButton>
			</span>
		</div>

		<div class="flex items-center justify-between">
			<span><Store store={i('settings.profileDetails.password')} /></span>

			<span class="flex h-full min-w-[50%] items-stretch gap-2">
				<PasswordInput placeholder={i('settings.profileDetails.password')} />
				<SettingsButton disabled={!$generatedByLogin}>
					<Store store={i('settings.save')} />
				</SettingsButton>
			</span>
		</div>
	</div>
</div>
