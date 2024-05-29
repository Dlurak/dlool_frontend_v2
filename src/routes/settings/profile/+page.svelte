<script>
	import TextInput from '$lib/components/input/Text.svelte';
	import PasswordInput from '$lib/components/input/Password.svelte';
	import { goto } from '$app/navigation';
	import { useAuth } from '$lib/utils/store/auth';
	import SettingsButton from '$lib/components/buttons/SettingsButton.svelte';
	import { i } from '$lib/i18n/store';
	import { browser } from '$app/environment';
	import { confirm } from '$lib/components/layout/confirmation';
	import { logout, logoutFromAll } from '$lib/dlool/logout';
	import { svocal } from '$lib/utils/store/svocal';
	import { derived, get } from 'svelte/store';
	import { sendDefaultErrorToast, sendToast } from '$lib/components/layout/toasts';
	import Store from '$lib/components/utils/Store.svelte';
	import { fmtNum } from '$lib/utils/intl';

	const { isLoggedIn } = useAuth();
	isLoggedIn.subscribe((isLoggedIn) => {
		if (!isLoggedIn && browser) goto(`/login`);
	});

	const reset = () => {
		svocal('auth.refresh.token').set(null);
		svocal('auth.refresh.expires').set(null);
		svocal('auth.access.token').set(null);
		svocal('auth.access.expires').set(null);
		svocal('auth.access.generatedBy').set(null);
	};

	const generatedByLogin = derived(svocal('auth.access.generatedBy'), (gb) => gb === 'login')
</script>

<div class="flex flex-col gap-4">
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
							reset();
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
							reset();
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

	<div>
		<h3>Change details</h3>
		<div class="flex flex-col gap-3">
			<div class="flex items-center justify-between">
				<span>Displayname</span>

				<span class="flex h-full min-w-[50%] items-stretch gap-2">
					<TextInput placeholder={i('literal')} />
					<SettingsButton disabled>Speichern</SettingsButton>
				</span>
			</div>

			<div class="flex items-center justify-between">
				<span>Password</span>

				<span class="flex h-full min-w-[50%] items-stretch gap-2">
					<PasswordInput placeholder={i('literal')} />
					<SettingsButton disabled>Speichern</SettingsButton>
				</span>
			</div>
		</div>
	</div>

	<div>
		<h3>Delete your account</h3>
		<SettingsButton color="red" disabled>Delete</SettingsButton>
	</div>
</div>
