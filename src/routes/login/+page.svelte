<script context="module" lang="ts">
	type State = 'base' | 'loading' | 'success' | 'incorrect';

	interface Props {
		state: Writable<State>;
		redirectDestination: Readable<string | null>;
		disabled: boolean;

		username: string;
		pwd: string;

		refreshToken: Writable<string | null>;
		refreshExpires: Writable<number | null>;
		accessToken: Writable<string | null>;
		accessExpires: Writable<number | null>;
		generatedBy: Writable<'login' | 'refreshToken' | null>;
	}

	function clickHandler({
		state,
		username,
		pwd,
		redirectDestination,
		disabled,
		refreshToken,
		refreshExpires,
		accessToken,
		accessExpires,
		generatedBy
	}: Props) {
		if (disabled) return;

		state.set('loading');

		login({
			username: username.trim(),
			password: pwd.trim(),
			refreshToken,
			refreshExpires,
			accessToken,
			accessExpires,
			generatedBy
		})
			.then((data) => {
				console.log('success');
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

				const redirectDest = get(redirectDestination);
				if (redirectDest) {
					goto(redirectDest);
				}
			})
			.catch(() => {
				state.set('base');
			});
	}
</script>

<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import PasswordInput from '$lib/components/input/Password.svelte';
	import { i } from '$lib/i18n/store';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Store from '$lib/components/utils/Store.svelte';
	import { getConditions } from '$lib/utils/strings/password';
	import { login } from '$lib/dlool/login';
	import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
	import { sendToast } from '$lib/components/layout/toasts';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import { svocal } from '$lib/utils/store/svocal';

	let username = '';
	let pwd = '';

	const state = writable<State>('base');

	const redirectDestination = derived(page, (p) => p.url.searchParams.get('redirect'));

	$: disabled = !(
		getConditions(pwd.trim()).every(({ isValid }) => isValid) &&
		!!username.trim() &&
		$state === 'base'
	);

	const refreshToken = svocal('auth.refresh.token');
	const refreshExpires = svocal('auth.refresh.expires');
	const accessToken = svocal('auth.access.token');
	const accessExpires = svocal('auth.access.expires');
	const generatedBy = svocal('auth.access.generatedBy');
</script>

<MetaData title={i('title.login')} />

<div
	class="flex w-[min(100%,28rem)] flex-col gap-4 rounded-md p-4 outline outline-2 outline-gray-400"
>
	<TextInput placeholder={i('username')} bind:value={username} on:input={() => state.set('base')} />
	<PasswordInput
		placeholder={i('password')}
		bind:value={pwd}
		on:input={() => state.set('base')}
		on:enter={() => {
			clickHandler({
				redirectDestination,
				state,
				username,
				pwd,
				disabled,
				refreshToken,
				refreshExpires,
				accessToken,
				accessExpires,
				generatedBy
			});
		}}
	/>

	<PrimaryButton
		{disabled}
		on:click={() => {
			clickHandler({
				redirectDestination,
				state,
				username,
				pwd,
				disabled,
				refreshToken,
				refreshExpires,
				accessToken,
				accessExpires,
				generatedBy
			});
		}}
	>
		<Store store={i('login.login')} />
	</PrimaryButton>
</div>
