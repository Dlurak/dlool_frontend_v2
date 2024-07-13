<script lang="ts">
	import TextInput from '$lib/components/input/Text.svelte';
	import PasswordInput from '$lib/components/input/Password.svelte';
	import { i } from '$lib/i18n/store';
	import PwdStrength from '$lib/components/passwordStrength/PwdStrength.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import { getConditions } from '$lib/utils/strings/password';
	import { register } from '$lib/dlool/register';
	import { writable } from 'svelte/store';
	import Confetti from 'svelte-confetti';
	import Store from '$lib/components/utils/Store.svelte';
	import { login } from '$lib/dlool/login';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import { svocal } from '$lib/utils/store/svocal';

	let username = '';
	let displayname = '';
	let pwd = '';
	let pwdConfirm = '';

	type Status = 'registering' | 'loading' | 'error' | Awaited<ReturnType<typeof register>>;
	const status = writable<Status>('registering');

	const refreshToken = svocal('auth.refresh.token');
	const refreshExpires = svocal('auth.refresh.expires');
	const accessToken = svocal('auth.access.token');
	const accessExpires = svocal('auth.access.expires');
	const generatedBy = svocal('auth.access.generatedBy');

	const clickHandler = () => {
		status.set('loading');
		register({
			username: username.trim(),
			displayname: displayname.trim(),
			password: pwd.trim()
		})
			.then((data) => {
				status.set(data);
				login({
					username: username.trim(),
					password: pwd.trim(),
					refreshToken,
					refreshExpires,
					accessToken,
					accessExpires,
					generatedBy
				});
			})
			.catch(() => {
				status.set('error');
			});
	};
</script>

<MetaData title={i('title.register')} />

<div
	class="flex w-[min(100%,28rem)] flex-col gap-4 rounded-md p-4 outline outline-2 outline-gray-400"
>
	{#if $status === 'registering' || $status === 'loading'}
		<TextInput placeholder={i('username')} bind:value={username} />
		<TextInput placeholder={i('displayname')} bind:value={displayname} />
		<PasswordInput placeholder={i('password')} bind:value={pwd} />
		<PasswordInput placeholder={i('password.confirm')} bind:value={pwdConfirm} />

		<PwdStrength {pwd} />

		<PrimaryButton
			disabled={!(
				username.trim() &&
				displayname.trim() &&
				pwd === pwdConfirm &&
				getConditions(pwd).every(({ isValid }) => isValid) &&
				$status === 'registering'
			)}
			on:click={clickHandler}
		>
			<Store store={i('register.register')} />
		</PrimaryButton>
	{:else if $status === 'error'}
		<Store store={i('error')} />
	{:else if $status.status === 'error'}
		<h4 class="text-center"><Store store={i('register.nametaken')} /></h4>

		<span><Store store={i('register.nametaken.desc')} /></span>

		<PrimaryButton
			on:click={() => {
				username = '';
				status.set('registering');
			}}
		>
			Go back
		</PrimaryButton>
	{:else if $status.status === 'success'}
		<div class="relative w-full">
			<div class="flex justify-between">
				<Confetti x={[-0.25, 0.25]} y={[0.75, 1.5]} />
				<Confetti x={[-0.25, 0.25]} y={[0.75, 1.5]} />
			</div>

			<div class="text-center">
				<h4 class="text-center"><Store store={i('register.success')} /></h4>
				<span class="w-full text-center">
					<a href="/join">
						<Store store={i('register.joinLink')} />
					</a>
				</span>
			</div>

			<div class="flex justify-between">
				<Confetti x={[-0.25, 0.25]} y={[-0.75, -0.25]} />
				<Confetti x={[-0.25, 0.25]} y={[-0.75, -0.25]} />
			</div>
		</div>
	{/if}
</div>
