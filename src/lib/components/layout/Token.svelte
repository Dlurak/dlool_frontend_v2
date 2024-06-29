<script>
	import { refresh } from '$lib/dlool/refresh';
	import { currentMs } from '$lib/utils/dates/current';
	import { svocal } from '$lib/utils/store/svocal';
	import { sendToast } from './toasts';
	import { i } from '$lib/i18n/store';
	import { onMount } from 'svelte';
	import { network } from 'nutzlich';

	const accessTokenExpires = svocal('auth.access.expires');
	const refreshToken = svocal('auth.refresh.token');
	const net = network();

	onMount(async () => {
		accessTokenExpires.subscribe((val) => {
			if (val === null) return;
			if (!$refreshToken) return;
			if ($net.isOffline) return;

			const msLeft = val - currentMs();

			setTimeout(
				() => {
					if (!$refreshToken) return;

					refresh({
						refreshToken: $refreshToken
					}).catch(() => {
						sendToast({
							type: 'error',
							content: i('toast.refreshToken.error')
						});
					});
				},
				Math.max(2_000, msLeft - 5_000)
			);
		});
	});
</script>
