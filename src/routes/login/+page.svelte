<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import PasswordInput from '$lib/components/input/Password.svelte';
	import { i } from '$lib/i18n/store';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { getConditions } from '$lib/utils/strings/password';
	import { login } from '$lib/dlool/login';
	import { derived, writable } from 'svelte/store';
	import { sendToast } from '$lib/components/layout/toasts';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import MetaData from '$lib/components/utils/MetaData.svelte';

	let username = '';
	let pwd = '';

	const state = writable<'base' | 'loading' | 'success' | 'incorrect'>('base');

	const redirectDestination = derived(page, (p) => p.url.searchParams.get('redirect'));

	$: disabled = !(
		getConditions(pwd.trim()).every(({ isValid }) => isValid) &&
		!!username.trim() &&
		$state === 'base'
	);
</script>

<MetaData title={i('title.login')} />

<div
	class="flex w-[min(100%,28rem)] flex-col gap-4 rounded-md p-4 outline outline-2 outline-gray-400"
>
	<TextInput placeholder={i('username')} bind:value={username} on:input={() => state.set('base')} />
	<PasswordInput placeholder={i('password')} bind:value={pwd} on:input={() => state.set('base')} />

	<PrimaryButton
		{disabled}
		on:click={() => {
			state.set('loading');

			login({
				username: username.trim(),
				password: pwd.trim()
			})
				.then((data) => {
					if (data.status !== 'success') {
						sendToast({
							type: 'error',
							timeout: 5_000,
							content: i('toast.login.incorrect')
						});
						state.set('incorrect');
						return;
					}

					state.set('success');
					sendToast({
						type: 'success',
						timeout: 5_000,
						content: i('toast.login.success')
					});

					if ($redirectDestination) {
						goto($redirectDestination);
					}
				})
				.catch(() => {
					state.set('base');
				});
		}}
	>
		<Store store={i('login.login')} />
	</PrimaryButton>
</div>
