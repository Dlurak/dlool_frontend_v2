<script>
	import TextInput from '$lib/components/input/Text.svelte';
	import PasswordInput from '$lib/components/input/Password.svelte';
	import { i } from '$lib/i18n/store';
	import PwdStrength from '$lib/components/passwordStrength/PwdStrength.svelte';

	let pwd = '';
</script>

<div class="flex w-full flex-col gap-4 rounded-md p-4 outline outline-2 outline-gray-400 sm:w-fit">
	<TextInput placeholder={i('literal', { literal: 'Username' })} />
	<TextInput placeholder={i('literal', { literal: 'Displayname' })} />
	<PasswordInput placeholder={i('literal', { literal: 'Password' })} bind:value={pwd} />

	<PwdStrength {pwd} />

	<button class="w-full rounded-md bg-emerald-500 py-1 text-white shadow-lg disabled:shadow-none">
		Register
	</button>
</div>
