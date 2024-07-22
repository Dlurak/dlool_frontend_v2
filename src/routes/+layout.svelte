<script lang="ts">
	import '../app.css';
	import Token from '$lib/components/layout/Token.svelte';
	import Version from '$lib/components/layout/Version.svelte';
	import UserInfo from '$lib/components/layout/UserInfo.svelte';
	import Confirmation from '$lib/components/layout/confirmation/Confirmation.svelte';
	import Footer from '$lib/components/layout/footer/Footer.svelte';
	import Navbar from '$lib/components/layout/navigation/Navbar.svelte';
	import ToastContainer from '$lib/components/layout/toasts/ToastContainer.svelte';
	import { mediaQuery } from 'nutzlich';
	import { navHeight, footerHeight } from '$lib/stores';
	import Launcher from '$lib/components/layout/launcher/Launcher.svelte';
	import Style from '$lib/components/layout/Style.svelte';
	import KeyboardHelper from '$lib/components/layout/KeyboardModal/KeyboardHelper.svelte';
	import type { LayoutServerData } from './$types';
	import Favicons from '$lib/components/layout/Favicons.svelte';
	import Splashscreens from '$lib/components/layout/Splashscreens.svelte';

	const isBig = mediaQuery('(min-width: 640px)');

	export let data: LayoutServerData;

	$: accessiourHeight = $isBig ? $navHeight + $footerHeight : $footerHeight;
</script>

<Favicons />
<Splashscreens />

<div class="flex min-h-[100dvh] w-full flex-col items-stretch justify-between">
	<Navbar />
	<main
		class="flex h-full min-h-[--h] w-full flex-col items-center px-3 py-3"
		style:--h={`calc(100dvh - ${accessiourHeight}px)`}
	>
		<slot />
	</main>

	<Footer />

	<Token />
	<UserInfo />
	<ToastContainer />
	<Confirmation />
	<Launcher />
	<Version />
	<Style />
	<KeyboardHelper isApple={data.isApple} />
</div>
