<script lang="ts">
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { i } from '$lib/i18n/store';
	import { confirm } from '$lib/components/layout/confirmation';
	import { logout, logoutFromAll } from '$lib/dlool/logout';
	import { svocal } from '$lib/utils/store/svocal';
	import { derived, get } from 'svelte/store';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import Store from '$lib/components/utils/Store.svelte';
	import { fmtNum } from '$lib/utils/intl';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		reset: null;
	}>();

	const generatedByLogin = derived(svocal('auth.access.generatedBy'), (gb) => gb === 'login');
</script>

<div>
	<h3><Store store={i('settings.logout')} /></h3>

	<div class="flex gap-2">
		<SettingsButton
			color="orange"
			on:click={async () => {
				const token = get(svocal('auth.refresh.token'));
				if (!token) return;

				const confimred = await confirm({
					ok: i('settings.logout.confirm.ok'),
					desc: i('settings.logout.confirm.desc'),
					title: i('settings.logout')
				});
				if (!confimred) return;

				logout({ refreshToken: token })
					.then(() => {
						dispatch('reset', null);
						sendToast({
							type: 'success',
							content: i('settings.logout.success'),
							timeout: 5_000
						});
					})
					.catch(sendDefaultErrorToast);
			}}
		>
			<Store store={i('settings.logout')} />
		</SettingsButton>

		<SettingsButton
			color="red"
			disabled={!$generatedByLogin}
			on:click={async () => {
				const confimred = await confirm({
					ok: i('settings.logout.confirm.ok'),
					desc: i('settings.logout.all.confirm.desc'),
					title: i('settings.logout.all')
				});
				if (!confimred) return;

				logoutFromAll()
					.then(({ data: { sessionCount } }) => {
						dispatch('reset', null);
						sendToast({
							type: 'success',
							content: i(
								'settings.logout.all.success',
								{ count: fmtNum(sessionCount) },
								{ count: sessionCount }
							),
							timeout: 5_000
						});
					})
					.catch(sendDefaultErrorToast);
			}}
		>
			<Store store={i('settings.logout.all')} />
		</SettingsButton>
	</div>
</div>
