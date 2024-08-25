<script>
	import { goto } from '$app/navigation';
	import { useAuth } from '$lib/utils/store/auth';
	import { browser } from '$app/environment';
	import { svocal } from '$lib/utils/store/svocal';
	import Logout from '$lib/components/settings/profile/Logout.svelte';
	import Delete from '$lib/components/settings/profile/Delete.svelte';
	import Details from '$lib/components/settings/profile/Details.svelte';
	import { i } from '$lib/i18n/store';
	import MetaData from '$lib/components/utils/MetaData.svelte';
	import { settingsHeader } from '$lib/stores';
	import Info from '$lib/components/utils/Info.svelte';
	import Store from '$lib/components/utils/Store.svelte';

	const { isLoggedIn, generatedByLogin } = useAuth();
	isLoggedIn.subscribe((isLoggedIn) => {
		if (!isLoggedIn && browser) goto(`/login?redirect=/settings/profile`);
	});

	const reset = () => {
		svocal('auth.refresh.token').set(null);
		svocal('auth.refresh.expires').set(null);
		svocal('auth.access.token').set(null);
		svocal('auth.access.expires').set(null);
		svocal('auth.access.generatedBy').set(null);
	};

	settingsHeader.set(i('title.settings.profile'));
</script>

<MetaData title={i('title.settings.profile')} />

<div class="flex flex-col gap-4">
	{#if !$generatedByLogin}
		<Info>
			<Store store={i('settings.profile.info')} />
		</Info>
	{/if}

	<Logout on:reset={reset} />
	<Details on:reset={reset} />
	<Delete on:reset={reset} />
</div>
