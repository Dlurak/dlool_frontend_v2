<script lang="ts">
	import { useAuth } from '$lib/utils/store/auth';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { i } from '$lib/i18n/store';
	import { confirm } from '$lib/components/layout/confirmation';
	import { svocal } from '$lib/utils/store/svocal';
	import { derived } from 'svelte/store';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import Store from '$lib/components/utils/Store.svelte';
	import { deleteAccount } from '$lib/dlool/userSettings/delete';
	import { createEventDispatcher } from 'svelte';

	const { userDetails } = useAuth();

	const dispatch = createEventDispatcher<{ reset: null }>();

	const generatedByLogin = derived(svocal('auth.access.generatedBy'), (gb) => gb === 'login');
</script>

<div>
	<h3><Store store={i('settings.deleteAccount')} /></h3>
	<SettingsButton
		color="red"
		disabled={!$generatedByLogin}
		on:click={async () => {
			const username = $userDetails?.username;
			if (!username) return;

			const confirmed = await confirm({
				ok: i('settings.deleteAccount.confirm.ok'),
				desc: i('settings.deleteAccount.confirm.desc', { name: username }),
				title: i('settings.deleteAccount.confirm.title')
			});
			if (!confirmed) return;

			deleteAccount()
				.then(() => {
					dispatch('reset', null);
					sendToast({
						type: 'success',
						content: i('settings.deleteAccount.success', { name: username }),
						timeout: 5_000
					});
				})
				.catch(sendDefaultErrorToast);
		}}
	>
		<Store store={i('settings.deleteAccount.delete')} />
	</SettingsButton>
</div>
