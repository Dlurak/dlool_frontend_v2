<script>
	import { ownUserInfo } from '$lib/dlool/userInfo/own';
	import { currentMs } from '$lib/utils/dates/current';
	import { svocal } from '$lib/utils/store/svocal';

	const accessToken = svocal('auth.access.token');
	const accessTokenExpires = svocal('auth.access.expires');

	function isExpired() {
		if (!$accessTokenExpires) return true;
		return $accessTokenExpires < currentMs();
	}

	accessToken.subscribe(async (val) => {
		if (!val) return;
		if (isExpired()) return;

		svocal('dlool.ownUserDetails').set(await ownUserInfo().then((d) => d.data));
	});
</script>
