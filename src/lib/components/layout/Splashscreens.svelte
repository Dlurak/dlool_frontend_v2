<script lang="ts">
	import { iconBg } from '$lib/stores';

	type Size = [number, number, 'portrait' | 'landscape'];
	const sizes: Size[] = [
		[810, 1080, 'portrait'],
		[1032, 1376, 'landscape'],
		[320, 568, 'portrait'],
		[375, 667, 'portrait'],
		[414, 736, 'landscape'],
		[428, 926, 'landscape'],
		[1024, 1366, 'portrait'],
		[820, 1180, 'portrait'],
		[810, 1080, 'landscape'],
		[414, 896, 'landscape'],
		[1024, 1366, 'landscape'],
		[393, 852, 'landscape'],
		[768, 1024, 'landscape'],
		[430, 932, 'landscape'],
		[393, 852, 'portrait'],
		[834, 1112, 'portrait'],
		[768, 1024, 'portrait'],
		[430, 932, 'portrait'],
		[414, 896, 'landscape'],
		[428, 926, 'portrait'],
		[834, 1210, 'portrait'],
		[320, 568, 'landscape'],
		[834, 1194, 'landscape'],
		[834, 1210, 'landscape'],
		[744, 1133, 'portrait'],
		[390, 844, 'landscape'],
		[744, 1133, 'landscape'],
		[414, 736, 'portrait'],
		[834, 1194, 'portrait'],
		[820, 1180, 'landscape'],
		[375, 812, 'portrait'],
		[834, 1112, 'landscape'],
		[414, 896, 'portrait'],
		[375, 667, 'landscape'],
		[414, 896, 'portrait'],
		[1032, 1376, 'portrait'],
		[375, 812, 'landscape'],
		[390, 844, 'portrait']
	];

	function splashPath(width: number, height: number, bg: string) {
		return `/api/splash?width=${width}&height=${height}&bg=${encodeURIComponent(bg)}`;
	}
</script>

<svelte:head>
	{#each sizes as [width, height, orientation]}
		<link
			rel="apple-touch-startup-image"
			media={`screen and (device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: 2) and (orientation: ${orientation})`}
			href={splashPath(width * 2, height * 2, $iconBg)}
		/>
	{/each}
</svelte:head>
