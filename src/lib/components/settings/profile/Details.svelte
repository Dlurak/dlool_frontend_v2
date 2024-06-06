<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import PasswordInput from '$lib/components/input/Password.svelte';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { i } from '$lib/i18n/store';
	import { svocal } from '$lib/utils/store/svocal';
	import { derived } from 'svelte/store';
	import Store from '$lib/components/utils/Store.svelte';
	import { changeDetails } from '$lib/dlool/userSettings/settings';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import { getConditions } from '$lib/utils/strings/password';
	import PwdStrength from '$lib/components/passwordStrength/PwdStrength.svelte';
	import { createEventDispatcher } from 'svelte';

	const generatedByLogin = derived(svocal('auth.access.generatedBy'), (gb) => gb === 'login');

	let displayname = '';
	let pwd = '';

	const dispatch = createEventDispatcher<{ reset: null }>();
</script>

<div>
	<h3>
		<Store store={i('settings.profileDetails.change')} />
	</h3>

	<div class="flex flex-col gap-3">
		<div class="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
			<span><Store store={i('settings.profileDetails.displayname')} /></span>

			<span class="flex h-full w-full min-w-[50%] items-stretch gap-2 sm:w-fit">
				<TextInput
					bind:value={displayname}
					placeholder={i('settings.profileDetails.displayname')}
				/>
				<SettingsButton
					disabled={!($generatedByLogin && displayname.trim())}
					on:click={async () => {
						changeDetails({ displayname: displayname.trim() })
							.then(() => {
								sendToast({
									type: 'success',
									timeout: 5_000,
									content: i('settings.profileDetails.displayname.success', {
										name: displayname.trim()
									})
								});
								displayname = '';

								dispatch('reset', null);
							})
							.catch(sendDefaultErrorToast);
					}}
				>
					<Store store={i('settings.save')} />
				</SettingsButton>
			</span>
		</div>

		<div class="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
			<span><Store store={i('settings.profileDetails.password')} /></span>

			<span class="flex h-full w-full min-w-[50%] flex-col gap-2 sm:w-fit">
				<span class="flex w-full items-stretch gap-2">
					<PasswordInput placeholder={i('settings.profileDetails.password')} bind:value={pwd} />
					<SettingsButton
						disabled={!(
							$generatedByLogin && getConditions(pwd.trim()).every(({ isValid }) => isValid)
						)}
						on:click={async () => {
							changeDetails({ password: pwd.trim() })
								.then(() => {
									sendToast({
										type: 'success',
										timeout: 5_000,
										content: i('settings.profileDetails.password.success')
									});
									pwd = '';
									dispatch('reset', null);
								})
								.catch(() => {
									sendToast({
										type: 'error',
										timeout: 5_000,
										content: i('settings.profileDetails.password.error')
									});
								});
						}}
					>
						<Store store={i('settings.save')} />
					</SettingsButton>
				</span>
				<PwdStrength {pwd} />
			</span>
		</div>
	</div>
</div>
