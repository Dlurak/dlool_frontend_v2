<script>
	import { ownUserInfo } from '$lib/dlool/userInfo/own';
	import { svocal } from '$lib/utils/store/svocal';

	const accessToken = svocal('auth.access.token');

	accessToken.subscribe(async (val) => {
		if (!val) return;

		svocal('dlool.ownUserDetails').set(await ownUserInfo().then((d) => d.data));
	});
</script>
