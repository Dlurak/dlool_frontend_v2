<script lang="ts">
	import { iconBg } from '$lib/stores';

	function iconPath(size: number, bg: string) {
		return `/api/icon?size=${size}&bg=${encodeURIComponent(bg)}`;
	}
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />

	<link rel="apple-touch-icon" sizes="180x180" href={iconPath(180, $iconBg)} />
	<link rel="apple-touch-icon" sizes="167x167" href={iconPath(167, $iconBg)} />
	<link rel="apple-touch-icon" sizes="152x152" href={iconPath(152, $iconBg)} />
	<link rel="apple-touch-icon" sizes="120x120" href={iconPath(120, $iconBg)} />
</svelte:head>
